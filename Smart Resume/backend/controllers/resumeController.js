import Resume from '../models/resumeModel.js';

export const saveResume = async (req, res) => {
  try {
    const newResume = new Resume(req.body);
    const saved = await newResume.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getResume = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);
    res.status(200).json(resume);
  } catch (err) {
    res.status(404).json({ error: 'Resume not found' });
  }
};
