import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL + "/api", // adjust if needed
});

export const getAISuggestions = (resumeText) =>
  API.post("/suggestions", { resumeText });

export const saveResume = (data) => API.post("/resume", data);
