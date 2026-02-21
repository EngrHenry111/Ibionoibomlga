import axios from "axios";

/* ===============================
   AXIOS INSTANCE
================================ */
const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

/* ===============================
   NEWS (PUBLIC)
================================ */

/**
 * Fetch all published public news
 */
export const getPublicNews = () =>
  API.get("/news/public");

export const getPublicNewsById = (id) =>
  API.get(`/news/public/${id}`)

/* ===============================
   LEADERS (PUBLIC)
================================ */

/**
 * Fetch current active leaders
 */
export const getCurrentLeaders = async () => {
  const res = await API.get("/leaders/public");
  return Array.isArray(res.data) ? res.data : [];
};

/* Aliases */
export const getLeaders = getCurrentLeaders;

export const getLeadersGroupedByTenure = () =>
  API.get("/leaders/public/grouped");

export const getPublicLeaderById = (id) =>
  API.get(`/leaders/public/${id}`);
/**
 * Fetch leaders by office
 */
export const getLeadersByOffice = async (officeId) => {
  const res = await API.get(`/leaders/public?office=${officeId}`);
  return Array.isArray(res.data) ? res.data : [];
};

export const getPublicLeaders = () =>
  axios.get("http://localhost:5000/api/leaders/public");




/* ===============================
   DEPARTMENTS (PUBLIC)
================================ */

/**
 * Fetch all public departments
 */

export const getPublicDepartments = () =>
  API.get("/departments/public");

// export const getPublicDepartments = async () => {
//   const res = await API.get("/departments/public");
//   return Array.isArray(res.data) ? res.data : [];
// };

// /* Aliases (THIS fixes your error) */
// export const getDepartments = getPublicDepartments;


/* ===============================
   SINGLE ITEM HELPERS (OPTIONAL)
================================ */

/**
 * Fetch single news by slug or ID
 */
export const getSingleNews = async (idOrSlug) => {
  const res = await API.get(`/news/public/${idOrSlug}`);
  return res.data;
};

export const getNewsById = (id) =>
  API.get(`/news/${id}`);


