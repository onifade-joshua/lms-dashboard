export async function fetchAiResponse(message: string, lang: string): Promise<string> {
    const res = await fetch('/api/ai', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, lang }),
    });
  
    const data = await res.json();
    return data.reply || 'Sorry, I didn’t get that.';
  }
  
  export async function fetchSuggestion(partial: string): Promise<string> {
    const res = await fetch('/api/suggest', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ partial }),
    });
  
    const data = await res.json();
    return data.suggestion || '';
  }
  