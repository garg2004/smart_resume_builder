// 📁 src/pages/Preview.jsx
import React, { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import html2pdf from 'html2pdf.js';
import '../styles/preview.css';

export default function Preview() {
  const location = useLocation();
  const navigate = useNavigate();
  const formData = location.state?.formData;
  const resumeRef = useRef();

  useEffect(() => {
    if (!formData) {
      navigate('/');
    } else {
    fetch('http://localhost:5000/api/suggest/suggestions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
      .then((res) => res.json())
      .then((data) => setSuggestions(data.suggestions))
      .catch((err) => console.error('Suggestion fetch failed:', err));
  }
}, [formData, navigate]);

  const handleDownload = () => {
    const element = resumeRef.current;
    html2pdf().from(element).save('My_Resume.pdf');
  };

  if (!formData) return null;

  return (
    <div className="p-6 max-w-4xl mx-auto print:p-0 print:m-0">
      {/* Header - hidden in print */}
      <div className="flex justify-between items-center mb-4 no-print">
        <h1 className="text-2xl font-bold">Resume Preview</h1>
        <button
          onClick={handleDownload}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Download PDF
        </button>
      </div>

      {/* Resume Preview Area */}
      <div
        ref={resumeRef}
        className="bg-white p-8 shadow-lg rounded border text-gray-800 print:shadow-none print:border-none print:p-0"
      >
        {/* Header */}
        <div className="text-center mb-8 border-b pb-4">
          <h2 className="text-3xl font-bold text-gray-900">{formData.name}</h2>
          <p className="text-sm text-gray-600">{formData.email}</p>
          {formData.linkedin && <p><a href={formData.linkedin} className="text-sm text-blue-600 hover:underline">{formData.linkedin}</a></p>}
          {formData.github && <p><a href={formData.github} className="text-sm text-blue-600 hover:underline">{formData.github}</a></p>}
        </div>

        <Section title="Education" content={formData.education} />
        <Section title="Experience" content={formData.experience} />
        <Section title="Skills" content={formData.skills} />
        <Section title="Projects" content={formData.projects} />
        <Section title="Certifications" content={formData.certifications} />
        <Section title="Achievements" content={formData.achievements} />
      </div>
    </div>
  );
}

function Section({ title, content }) {
  if (!content) return null;

  return (
    <div className="mb-6">
      <h3 className="text-xl font-semibold text-gray-800 border-b border-gray-300 pb-1 mb-1">{title}</h3>
      <p className="text-sm whitespace-pre-wrap text-gray-700 leading-relaxed">{content}</p>
    </div>
  );
}