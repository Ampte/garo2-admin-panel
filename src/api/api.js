const BASE_URL = "https://backend.garo2.com/api";

/* ---------- REQUEST HELPER ---------- */

const request = async (endpoint, options = {}) => {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  });

  if (!res.ok) {
    throw new Error(`API Error: ${res.status}`);
  }

  return res.json();
};




export const getUsers = () => request("/users");

export const addUser = async (data) => {
  const res = await fetch(`${BASE_URL}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.error || "Server error");
  }

  return result;
};

export const deleteUser = (id) =>
  request(`/users/${id}`, { method: "DELETE" });




export const getWords = () => request("/dictionary");

export const addWord = (data) =>
  request("/dictionary", {
    method: "POST",
    body: JSON.stringify(data),
  });

export const deleteWord = (id) =>
  request(`/dictionary/${id}`, { method: "DELETE" });




export const getLessons = () => request("/lessons");

export const addLesson = (data) =>
  request("/lessons", {
    method: "POST",
    body: JSON.stringify(data),
  });

export const deleteLesson = (id) =>
  request(`/lessons/${id}`, { method: "DELETE" });




export const getStats = () => request("/stats");




export const getChats = () => request("/chatbot");

export const addChat = (data) =>
  request("/chatbot", {
    method: "POST",
    body: JSON.stringify(data),
  });

export const deleteChat = (id) =>
  request(`/chatbot/${id}`, { method: "DELETE" });