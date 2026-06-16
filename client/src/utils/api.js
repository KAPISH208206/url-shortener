import axios from "axios";

const API = axios.create({ baseURL: "/api/url" });

export const shortenUrl = (originalUrl) => API.post("/shorten", { originalUrl });
export const getAllUrls = () => API.get("/all");
