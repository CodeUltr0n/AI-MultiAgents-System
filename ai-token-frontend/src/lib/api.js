const rawBaseUrl = import.meta.env.VITE_SERVER_URL?.trim();

export const API_BASE_URL = rawBaseUrl
  ? rawBaseUrl.replace(/\/$/, "")
  : "http://localhost:3000/api";
