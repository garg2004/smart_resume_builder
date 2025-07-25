import mongoose from 'mongoose';

const resumeSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  phone: String,
  linkedin: String,
  github: String,
  portfolio: String,
  summary: String,
  skills: [String],
  experience: [
    {
      company: String,
      position: String,
      startDate: String,
      endDate: String,
      description: String
    }
  ],
  education: [
    {
      institution: String,
      degree: String,
      startYear: String,
      endYear: String,
      cgpa: String
    }
  ],
  projects: [
    {
      title: String,
      description: String,
      techStack: [String],
      link: String
    }
  ],
  certifications: [
    {
      name: String,
      authority: String,
      year: String
    }
  ],
  achievements: [String],
  interests: [String],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Resume', resumeSchema);
