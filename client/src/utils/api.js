import axios from "axios";

const API = axios.create({ 
  baseURL: process.env.REACT_APP_API_URL || "/api/url" 
});

export const shortenUrl = (originalUrl) => API.post("/shorten", { originalUrl });
export const getAllUrls = () => API.get("/all");