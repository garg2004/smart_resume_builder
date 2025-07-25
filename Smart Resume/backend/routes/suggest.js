// routes/suggest.js
import express from 'express';
import { getLocalAISuggestion } from '../utils/ai.js';

const router = express.Router();

router.post('/suggestions', async (req, res) => {
  const { section, userInput } = req.body;

  if (!section || !userInput) {
    return res.status(400).json({ error: 'Missing section or userInput' });
  }

  try {
    const prompt = `Suggest improvements for the "${section}" section of a resume. User input: ${userInput}`;
    const suggestion = await getLocalAISuggestion(prompt);
    res.json({ suggestion });
  } catch (err) {
    console.error('❌ AI Suggestion Error:', err);
    res.status(500).json({ error: 'Failed to generate suggestion' });
  }
});

export default router;
