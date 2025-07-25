// controllers/suggestController.js
import { getLocalAISuggestion } from '../utils/ai.js';

export const generateSuggestion = async (req, res) => {
  try {
    const {
      name,
      email,
      education,
      experience,
      skills,
      projects,
      certifications,
      achievements,
      linkedin,
      github
    } = req.body;

    const prompt = `Please review and suggest improvements for the following resume:

Name: ${name}
Email: ${email}
LinkedIn: ${linkedin}
GitHub: ${github}

Education: ${education}
Experience: ${experience}
Skills: ${skills}
Projects: ${projects}
Certifications: ${certifications}
Achievements: ${achievements}

Suggest improvements in a clear and structured format.`;

    console.log('📨 Prompt sent to TinyLLaMA:\n', prompt);

    // ✅ Make request to TinyLLaMA (via Ollama)
    const suggestion = await getLocalAISuggestion(prompt);

    res.json({ suggestions: suggestion });

  } catch (error) {
    console.error('TinyLLaMA (Ollama) error:', error.message);
    res.status(500).json({ error: 'Failed to generate suggestions from TinyLLaMA' });
  }
}; 