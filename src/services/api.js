const API_BASE_URL =
  import.meta.env.PROD
    ? "https://bn-store-backend.onrender.com"
    : "http://localhost:3000";

export async function apiFetch(endpoint, options = {}) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Request failed");
  }

  return data;
}

export default API_BASE_URL;