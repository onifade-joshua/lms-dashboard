export const speakText = (
  text: string,
  lang: string = 'en',
  pitch: number = 1,
  rate: number = 1
) => {
  if (!text || typeof window === 'undefined') return;

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang =
    lang === 'ar' ? 'ar-SA' : lang === 'fr' ? 'fr-FR' : 'en-US';
  utterance.pitch = pitch;
  utterance.rate = rate;

  utterance.onerror = (err) => {
    console.error('Speech synthesis error:', err);
  };

  window.speechSynthesis.cancel(); // Stop any ongoing speech first
  window.speechSynthesis.speak(utterance);
};
