import React, { useState, useEffect, useRef } from 'react';
import {
  AiOutlineClose,
  AiOutlineSend,
  AiOutlineAudio,
  AiOutlineUpload,
} from 'react-icons/ai';
import { useTranslation } from 'react-i18next';
import { speakText } from '../../utils/tts';

const AiAssistant: React.FC<{
  isAiModalOpen: boolean;
  setIsAiModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ isAiModalOpen, setIsAiModalOpen }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<string[]>([]);
  const [suggestion, setSuggestion] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const { t, i18n } = useTranslation();

  // Setup speech recognition
  useEffect(() => {
    const SpeechRecognition =
      (window.SpeechRecognition ||
        (window as any).webkitSpeechRecognition) as
        | typeof window.SpeechRecognition
        | undefined;

    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.lang =
        i18n.language === 'ar'
          ? 'ar-SA'
          : i18n.language === 'fr'
          ? 'fr-FR'
          : 'en-US';

      recognition.onresult = (event: SpeechRecognitionEvent) => {
        setInput(event.results[0][0].transcript);
      };

      recognitionRef.current = recognition;
    }
  }, [i18n.language]);

  const startListening = () => {
    recognitionRef.current?.start();
  };

  // Handle send
  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setMessages((prev) => [...prev, `🧑: ${userMessage}`]);
    setInput('');
    setSuggestion('');

    try {
      const aiResponse = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage, lang: i18n.language }),
      }).then((res) => res.json());

      const reply = aiResponse.reply || 'Sorry, I didn’t get that.';
      setMessages((prev) => [...prev, `🤖: ${reply}`]);
      speakText(reply, i18n.language);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        `🤖: ${t('An error occurred. Please try again.')}`,
      ]);
    }
  };

  // Typing suggestion
  useEffect(() => {
    const timeout = setTimeout(async () => {
      if (input.length > 3) {
        try {
          const response = await fetch('/api/suggest', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ partial: input }),
          });
          const data = await response.json();
          setSuggestion(data.suggestion || '');
        } catch {
          setSuggestion('');
        }
      } else {
        setSuggestion('');
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [input]);

  // Image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setMessages((prev) => [
        ...prev,
        `🧑: [Uploaded image: ${file.name}]`,
      ]);

      // TODO: Optionally send to backend or AI vision endpoint
    }
  };

  return (
    <>
      {/* AI Button */}
      <div className="fixed bottom-10 right-10 z-50">
        <button
          onClick={() => setIsAiModalOpen(true)}
          className="bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 transition"
        >
          🤖
        </button>
      </div>

      {/* Modal */}
      {isAiModalOpen && (
        <div className="fixed inset-0 bg-white bg-opacity-100 flex items-center justify-center z-50">

          <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-2xl w-full max-w-md">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">{t('AI Assistant')}</h2>
              <button onClick={() => setIsAiModalOpen(false)}>
                <AiOutlineClose className="text-red-500 text-xl" />
              </button>
            </div>

            {/* Language Switcher */}
            <select
              value={i18n.language}
              onChange={(e) => i18n.changeLanguage(e.target.value)}
              className="mb-4 w-full p-2 rounded border"
            >
              <option value="en">English</option>
              <option value="fr">Français</option>
              <option value="ar">العربية</option>
            </select>

            {/* Chat Area */}
            <div className="h-64 overflow-y-auto bg-gray-100 p-3 rounded mb-3 text-sm">
              {messages.map((msg, idx) => (
                <div key={idx} className="mb-2 whitespace-pre-wrap">
                  {msg}
                </div>
              ))}
            </div>

            {/* Input Area */}
            <div className="flex gap-2 items-center">
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder={t('Ask me anything...')}
                className="flex-grow p-2 border rounded"
              />
              <button
                onClick={handleSend}
                className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
              >
                <AiOutlineSend />
              </button>
              <button
                onClick={startListening}
                className="bg-yellow-400 text-white p-2 rounded hover:bg-yellow-500"
              >
                <AiOutlineAudio />
              </button>
              <label className="bg-gray-200 p-2 rounded hover:bg-gray-300 cursor-pointer">
                <AiOutlineUpload />
                <input
                  type="file"
                  hidden
                  onChange={handleImageUpload}
                  accept="image/*"
                />
              </label>
            </div>

            {/* Suggestion */}
            {suggestion && (
              <div className="text-xs text-gray-500 mt-2">
                💡 <em>{t('Suggestion')}: {suggestion}</em>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default AiAssistant;
