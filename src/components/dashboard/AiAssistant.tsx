import React, { useState, useEffect, useRef } from "react";
import {
  AiOutlineClose,
  AiOutlineSend,
  AiOutlineAudio,
  AiOutlineUpload,
} from "react-icons/ai";
import { useTranslation } from "react-i18next";
import { speakText } from "../../utils/tts"; 
import axios from "axios";
import "./AiAssistant.css"
declare global {
  interface Window {
    SpeechRecognition: typeof SpeechRecognition | undefined;
    webkitSpeechRecognition: typeof SpeechRecognition | undefined;
  }

  interface SpeechRecognitionEvent extends Event {
    results: SpeechRecognitionResultList;
  }
}

const AiAssistant: React.FC = () => {
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<string[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [translatedText, setTranslatedText] = useState("");
  const [translateTo, setTranslateTo] = useState("fr");
  const [loading, setLoading] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const chatRef = useRef<HTMLDivElement>(null);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const SpeechRecognition = (window.SpeechRecognition ||
      (window as any)
        .webkitSpeechRecognition) as typeof window.SpeechRecognition;

    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.lang =
        i18n.language === "ar"
          ? "ar-SA"
          : i18n.language === "fr"
          ? "fr-FR"
          : "en-US";

      recognition.onresult = (event: SpeechRecognitionEvent) => {
        setInput(event.results[0][0].transcript);
      };

      recognitionRef.current = recognition;
    }
  }, [i18n.language]);

  const startListening = () => recognitionRef.current?.start();

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMessage = input.trim();
    setMessages((prev) => [...prev, `🧑: ${userMessage}`]);
    setInput("");
    setSuggestions([]);
    setTranslatedText("");
    setLoading(true);

    try {
      const aiResponse = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage, lang: i18n.language }),
      }).then((res) => res.json());

      const reply = aiResponse.reply || "Sorry, I didn’t get that.";
      setMessages((prev) => [...prev, `🤖: ${reply}`]);

      await speakText(reply, i18n.language);
    } catch {
      setMessages((prev) => [
        ...prev,
        `🤖: ${t("An error occurred. Please try again.")}`,
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleTranslate = async () => {
    if (!input.trim()) return;

    try {
      const res = await axios.post(
        "https://libretranslate.de/translate",
        {
          q: input,
          source: i18n.language,
          target: translateTo,
          format: "text",
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      setTranslatedText(res.data.translatedText);
    } catch (error) {
      console.error("Translation failed:", error);
      setTranslatedText(t("Translation failed. Please try again."));
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setMessages((prev) => [...prev, `🧑: [Uploaded image: ${file.name}]`]);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(async () => {
      if (input.length > 3) {
        try {
          const res = await fetch("/api/suggest", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ partial: input }),
          });
          const data = await res.json();
          setSuggestions(data.suggestions || []);
        } catch {
          setSuggestions([]);
        }
      } else {
        setSuggestions([]);
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [input]);

  useEffect(() => {
    chatRef.current?.scrollTo({
      top: chatRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  return (
    <>
      <div className="fixed bottom-10 right-10 z-50">
      <button
  onClick={() => setIsAiModalOpen(true)}
  className="bouncing-button bg-sky-100 text-white p-4 rounded-full shadow-xl hover:bg-gray-200 hover:text-sky-600 transition-all duration-300 ease-in-out transform hover:scale-105"
  aria-label="Open AI Assistant"
>
  🤖
</button>

      </div>

      {isAiModalOpen && (
        <div className="fixed inset-0 bg-grey bg-opacity-40 backdrop-blur-sm z-50 flex justify-center items-center">
          <div className="bg-white w-full sm:w-[90%] md:w-[600px] rounded-lg p-6 shadow-lg relative max-h-[90vh] overflow-hidden">
            <button
              onClick={() => setIsAiModalOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
            >
              <AiOutlineClose size={24} />
            </button>
            <h2 className="text-xl font-semibold mb-4">AI Assistant</h2>

            <div
              ref={chatRef}
              className="border p-3 h-64 overflow-y-auto bg-gray-50 rounded"
            >
              {messages.map((msg, idx) => (
                <div key={idx} className="mb-2">
                  {msg}
                </div>
              ))}
            </div>

            {translatedText && (
              <p className="italic text-gray-500 mt-2">
                Translation: {translatedText}
              </p>
            )}

            <div className="mt-4">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Ask something..."
                className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              {suggestions.length > 0 && (
                <div className="mt-2 max-h-40 overflow-auto bg-white shadow-lg border rounded">
                  {suggestions.map((suggestion, idx) => (
                    <div
                      key={idx}
                      onClick={() => {
                        setInput(suggestion);
                        setSuggestions([]);
                      }}
                      className="p-2 cursor-pointer hover:bg-gray-100"
                    >
                      💡 {suggestion}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="mt-3 flex gap-3 flex-wrap justify-between">
              <button
                onClick={handleSend}
                disabled={loading}
                className="flex items-center justify-center gap-1 bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition w-full sm:w-auto"
              >
                <AiOutlineSend /> {loading ? "Sending..." : "Send"}
              </button>
              <button
                onClick={startListening}
                className="flex items-center justify-center gap-1 bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition w-full sm:w-auto"
              >
                <AiOutlineAudio /> Speak
              </button>
              <button
                onClick={handleTranslate}
                className="flex items-center justify-center gap-1 bg-purple-500 text-white px-4 py-2 rounded-full hover:bg-purple-600 transition w-full sm:w-auto"
              >
                🌐 Translate
              </button>
              <label className="flex items-center justify-center gap-1 cursor-pointer bg-gray-200 px-4 py-2 rounded-full hover:bg-gray-300 transition w-full sm:w-auto">
                <AiOutlineUpload />
                <input type="file" hidden onChange={handleImageUpload} />
              </label>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AiAssistant;
