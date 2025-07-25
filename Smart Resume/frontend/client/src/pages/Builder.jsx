// 📁 src/pages/Builder.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAISuggestions } from "../api";
import '../styles/builder.css';

export default function Builder() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    linkedin: '',
    github: '',
    education: '',
    experience: '',
    skills: '',
    projects: '',
    certifications: '',
    achievements: ''
  });

  const [suggestions, setSuggestions] = useState('');
  const navigate = useNavigate();

  const goToPreview = () => {
    navigate('/preview', { state: { formData } });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const getSuggestions = async () => {
  const sectionsToSuggest = ['skills', 'education', 'experience', 'projects', 'certifications', 'achievements'];
  let suggestionText = '';

  for (const section of sectionsToSuggest) {
    const userInput = formData[section];

    if (!userInput.trim()) continue; // skip empty

    try {
      const res = await fetch('http://localhost:5000/api/suggest/suggestions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ section, userInput })
      });

      const data = await res.json();
      suggestionText += `\n🔹 Suggestions for ${section.toUpperCase()}:\n${data.suggestion}\n\n`;
    } catch (err) {
      console.error(`❌ Failed suggestion for ${section}:`, err);
    }
  }

  setSuggestions(suggestionText || 'No suggestions generated.');
 navigate('/suggestions', { state: { suggestionText } });
// 👈 This will redirect

};


  const saveResume = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/resume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      alert('Resume saved! ID: ' + data._id);
    } catch (error) {
      console.error('Error saving resume:', error);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Smart Resume Builder</h1>
      <p className="text-center text-gray-500 mb-8">Fill in your resume details below</p>

      <div className="grid grid-cols-1 gap-4">
        {Object.keys(formData).map((field) => (
          <div key={field}>
            {['education','experience','skills','projects','certifications','achievements'].includes(field) ? (
              <textarea
                name={field}
                value={formData[field]}
                onChange={handleChange}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                className="block w-full p-3 border rounded shadow-sm"
              />
            ) : (
              <input
                type="text"
                name={field}
                value={formData[field]}
                onChange={handleChange}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                className="block w-full p-3 border rounded shadow-sm"
              />
            )}
          </div>
        ))}
      </div>

      <div className="flex flex-wrap justify-center gap-4 mt-6">
        <button
          onClick={getSuggestions}
          className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 shadow"
        >
          Generate AI Suggestions
        </button>

        <button
          onClick={goToPreview}
          className="bg-purple-600 text-white px-5 py-2 rounded hover:bg-purple-700 shadow"
        >
          Preview Resume
        </button>

        <button
          onClick={saveResume}
          className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700 shadow"
        >
          Save Resume
        </button>
      </div>

      {suggestions && (
        <div className="mt-8 p-5 bg-gray-100 border rounded shadow">
          <h2 className="font-semibold text-xl mb-2 text-blue-700">AI Suggestions:</h2>
          <pre className="whitespace-pre-wrap text-sm text-gray-800">{suggestions}</pre>
        </div>
      )}
    </div>
  );
}

// ✅ Next: Home.jsx and Preview.jsx styling upgrades & responsiveness
