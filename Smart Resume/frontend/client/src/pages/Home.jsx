// 📁 src/pages/Home.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/home.css';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-200 to-indigo-300 px-4 text-center">
      <h1 className="text-5xl font-extrabold text-gray-900 mb-4 drop-shadow">Smart Resume Builder</h1>
      <p className="text-lg text-gray-800 max-w-xl mb-8">
        Craft a professional resume with the help of AI. Get smart suggestions, real-time preview, and one-click PDF export.
      </p>
      <div className="flex gap-6 flex-wrap justify-center">
        <button
          onClick={() => navigate('/Builder')}
          className="bg-blue-600 text-white px-6 py-3 text-lg rounded-xl shadow hover:bg-blue-700 transition"
        >
          Build Resume
        </button>
        <button
          onClick={() => navigate('/preview', { state: { formData: demoData } })}
          className="bg-white border border-blue-600 text-blue-600 px-6 py-3 text-lg rounded-xl shadow hover:bg-blue-50 transition"
        >
          Preview Sample
        </button>
      </div>
    </div>
  );
}

const demoData = {
  name: 'Arpita Garg',
  email: 'gargarpita59@gmail.com',
  linkedin: 'https://linkedin.com/in/arpita-garg-9b3673247',
  github: 'https://github.com/garg2004',
  education: 'B.Tech CSE, Manipal University Jaipur (2022–2026)',
  experience: 'Software Intern at Excel Geomatics Pvt. Ltd. (July 2025–present)',
  skills: 'HTML, CSS, JS, React, Node.js, MongoDB, Python, Java',
  projects: 'E-Commerce Web App, Women Health Tracker, Smart Resume Builder',
  certifications: 'CCNA (2 modules), Coursera (C for Everyone), Udemy (DAA)',
  achievements: 'Selected for Deloitte US Capstone Program',
};
