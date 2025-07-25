import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SuggestionForm = () => {
  const location = useLocation();
  const [section, setSection] = useState('skills');
  const [education, setEducation] = useState('');
  const [experience, setExperience] = useState('');
  const [summary, setSummary] = useState('');
  const [achievements, setAchievements] = useState('');
  const [projects, setProjects] = useState('');
  const [certifications, setCertifications] = useState('');
  const [skills, setSkills] = useState('');
  const [userInput, setUserInput] = useState('');
  const [suggestions, setSuggestions] = useState('');

  // 🔽 Load suggestionText passed via navigate
  useEffect(() => {
  switch (section) {
    case 'education': setUserInput(education); break;
    case 'experience': setUserInput(experience); break;
    case 'summary': setUserInput(summary); break;
    case 'achievements': setUserInput(achievements); break;
    case 'projects': setUserInput(projects); break;
    case 'certifications': setUserInput(certifications); break;
    case 'skills': setUserInput(skills); break;
    default: break;
  }
}, [section]);


  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    console.log("Sending:", { section, userInput }); // debug log

    const res = await fetch('http://localhost:5000/api/suggest/suggestions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ section, userInput })
    });

    if (!res.ok) {
      const errorData = await res.json();
      console.error('Error response:', errorData);
      alert(`Error: ${errorData.detail || 'Something went wrong.'}`);
      return;
    }

    const data = await res.json();
    setSuggestions(data.suggestion || 'No suggestions returned');
  } catch (error) {
    console.error('Error fetching suggestions:', error);
    alert('Failed to get suggestions from the server.');
  }
};

  return (
    <div className="p-4 max-w-xl mx-auto bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">AI Resume Suggestion Generator</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold">Section</label>
          <select
            value={section}
            onChange={(e) => setSection(e.target.value)}
            className="w-full border p-2 rounded"
          >
            <option value="skills">Skills</option>
            <option value="experience">Experience</option>
            <option value="summary">Summary</option>
            <option value="education">Education</option>
            <option value="achievements">Achievements</option>
            <option value="projects">Projects</option>
            <option value="certifications">Certifications</option>
          </select>
        </div>
        <div>
          <label className="block font-semibold">Your Input</label>
          <textarea
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            className="w-full border p-2 rounded"
            rows={3}
            placeholder="e.g., java, python, c"
          />
        </div>
        
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Get Suggestions
        </button>
      </form>

      {suggestions && (
        <div className="mt-6">
          <h3 className="font-bold mb-2">AI Suggestions:</h3>
          <pre className="bg-gray-100 p-3 rounded whitespace-pre-wrap">{suggestions}</pre>
        </div>
      )}
    </div>
  );
};

export default SuggestionForm;
