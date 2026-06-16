import axios from "axios";

const API = axios.create({ 
  baseURL: process.env.REACT_APP_API_URL || "/api/url" 
});

export const shortenUrl = (originalUrl) => API.post("/shorten", { originalUrl });

// Get urls from localStorage instead of DB
export const getAllUrls = () => {
  const urls = JSON.parse(localStorage.getItem("myUrls") || "[]");
  return Promise.resolve({ data: urls });
};

// Save to localStorage
export const saveUrlLocally = (data) => {
  const urls = JSON.parse(localStorage.getItem("myUrls") || "[]");
  // avoid duplicates
  const exists = urls.find(u => u.shortCode === data.shortCode);
  if (!exists) urls.unshift(data);
  localStorage.setItem("myUrls", JSON.stringify(urls));
};