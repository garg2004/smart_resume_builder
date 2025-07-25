// utils/ai.js
import axios from 'axios';

// utils/ai.js or wherever you're making the AI call

export const getLocalAISuggestion = async (prompt) => {
  const response = await fetch('http://localhost:11434/api/generate', {
    method: 'POST',
    body: JSON.stringify({
      model: 'tinyllama',  // 👈Switch back to tinyllama
      prompt,
      stream: false,
    }),
    headers: { 'Content-Type': 'application/json' },
  });

  const result = await response.json();
  return result.response;
};
