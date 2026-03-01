/* =====================================================
   BASE API URL
   Change only this if backend domain changes
===================================================== */

const BASE_URL = "https://backend.garo2.com/api";

/* =====================================================
   GLOBAL REQUEST HELPER
===================================================== */

const request = async (endpoint, options = {}) => {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  let data = null;

  // try parsing JSON safely
  try {
    data = await res.json();
  } catch (err) {
    console.warn("Response is not JSON");
  }

  // handle API errors
  if (!res.ok) {
    throw new Error(
      data?.message ||
      data?.error ||
      `API Error ${res.status}`
    );
  }

  return data;
};

/* =====================================================
   USERS API
===================================================== */

// GET all users
export const getUsers = () => request("/users");

// ADD user
export const addUser = (data) =>
  request("/users", {
    method: "POST",
    body: JSON.stringify(data),
  });

// DELETE user
export const deleteUser = (id) =>
  request(`/users/${id}`, {
    method: "DELETE",
  });

/* =====================================================
   DICTIONARY API
===================================================== */

// GET words
export const getWords = () => request("/dictionary");

// ADD word
export const addWord = (data) =>
  request("/dictionary", {
    method: "POST",
    body: JSON.stringify(data),
  });

// DELETE word
export const deleteWord = (id) =>
  request(`/dictionary/${id}`, {
    method: "DELETE",
  });

/* =====================================================
   LESSONS API
===================================================== */

// GET lessons
export const getLessons = () => request("/lessons");

// ADD lesson
export const addLesson = (data) =>
  request("/lessons", {
    method: "POST",
    body: JSON.stringify(data),
  });

// DELETE lesson
export const deleteLesson = (id) =>
  request(`/lessons/${id}`, {
    method: "DELETE",
  });

/* =====================================================
   STATS API
===================================================== */

// Dashboard statistics
export const getStats = () => request("/stats");

/* =====================================================
   CHATBOT API
===================================================== */

// Send message to chatbot
export const sendMessage = (message) =>
  request("/chatbot", {
    method: "POST",
    body: JSON.stringify({ message }),
  });

// Get chatbot history (admin panel)
export const getChats = () => request("/chatbot");

// Delete chat message
export const deleteChat = (id) =>
  request(`/chatbot/${id}`, {
    method: "DELETE",
  });

/* =====================================================
   EXPORT DEFAULT (optional)
===================================================== */

export default {
  getUsers,
  addUser,
  deleteUser,
  getWords,
  addWord,
  deleteWord,
  getLessons,
  addLesson,
  deleteLesson,
  getStats,
  sendMessage,
  getChats,
  deleteChat,
};