const BASE_URL = "https://backend.garo2.com//api";

/* ---------- USERS ---------- */

export const getUsers = async () => {
  const res = await fetch(`${BASE_URL}/users`);
  return res.json();
};

export const addUser = async (data) => {
  await fetch(`${BASE_URL}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
};

export const deleteUser = async (id) => {
  await fetch(`${BASE_URL}/users/${id}`, {
    method: "DELETE",
  });
};


/* ---------- DICTIONARY ---------- */

export const getWords = async () => {
  const res = await fetch(`${BASE_URL}/dictionary`);
  return res.json();
};

export const addWord = async (data) => {
  await fetch(`${BASE_URL}/dictionary`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
};

export const deleteWord = async (id) => {
  await fetch(`${BASE_URL}/dictionary/${id}`, {
    method: "DELETE",
  });
};


/* ---------- LESSONS ---------- */

export const getLessons = async () => {
  const res = await fetch(`${BASE_URL}/lessons`);
  return res.json();
};

export const addLesson = async (data) => {
  await fetch(`${BASE_URL}/lessons`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
};

export const deleteLesson = async (id) => {
  await fetch(`${BASE_URL}/lessons/${id}`, {
    method: "DELETE",
  });
};


/* ---------- DASHBOARD STATS ---------- */

export const getStats = async () => {
  const res = await fetch(`${BASE_URL}/stats`);
  return res.json();
};


/* ---------- CHATBOT ---------- */

export const getChats = async () => {
  const res = await fetch("https://backend.garo2.com//api/chatbot");
  return res.json();
};

export const addChat = async (data) => {
  await fetch("https://backend.garo2.com//api/chatbot", {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify(data)
  });
};

export const deleteChat = async (id) => {
  await fetch(`https://backend.garo2.com//api/chatbot/${id}`, {
    method: "DELETE"
  });
};