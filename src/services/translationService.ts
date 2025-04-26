const dummyTranslations: Record<string, Record<string, string>> = {
  en: {
    fr: 'Bonjour! Ceci est une traduction simulée.',
    es: '¡Hola! Esto es una traducción simulada.',
    hi: 'नमस्ते! यह एक नकली अनुवाद है।',
  },
  fr: {
    en: 'Hello! This is a simulated translation.',
  },
};

export async function mockTranslate(input: string, from: string, to: string): Promise<string> {
  await new Promise(resolve => setTimeout(resolve, 500)); // simulate latency
  return dummyTranslations[from]?.[to] || '[Translation not available]';
}
