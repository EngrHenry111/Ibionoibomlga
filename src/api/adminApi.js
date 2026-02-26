import axios from "axios";

const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
});

// ✅ attach token to every request
export const setAuthToken = (token) => {
  
  if (token) {
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    localStorage.removeItem("token");
    delete API.defaults.headers.common["Authorization"];
  }
};

// ✅ CREATE AND LOGIN ADMIN (returns Axios response)
export const adminRegister = (credentials)=>{
  return API.post("/admin/register", credentials)
}

export const adminLogin = (credentials) => {
  return API.post("/admin/login", credentials);
};

API.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.clear();
      window.location.href = "/admin/login";
    }
    return Promise.reject(err);
  }
);


// =======================
// NEWS CRUD (ADMIN)
// =======================
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("adminToken");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

// NEWS
export const getAllNews = () => API.get("/news");
export const getSingleNews = (id) => API.get(`/news/public/${id}`);
export const createNews = (data) => API.post("/news", data);

// UPDATE NEWS (edit)
export const updateNews = (id, data) =>
  API.put(`/news/${id}`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });

// PATCH News status
export const updateNewsStatus = (id, status) =>
  API.patch(`/news/${id}/status`, { status });

export const deleteNews = (id) => API.delete(`/news/${id}`);

export const getNewsById = (id) =>
  API.get(`/news/${id}`); 

export const createDepartment = (data) =>
  API.post("/departments", data);

export const getAllDepartments = () =>
  API.get("/departments");

export const deleteDepartment = (id) =>
  API.delete(`/departments/${id}`);

export const updateDepartmentStatus = (id, status) =>
  API.patch(`/departments/${id}/status`, { status });


/* ================= TENURES ================= */

export const getAllTenures = () =>
  API.get("/tenures");

export const createTenure = (data) =>
  API.post("/tenures", data);

export const deleteTenure = (id) =>
  API.delete(`/tenures/${id}`);


/* ================= LEADERS ================= */

export const getAllLeaders = () =>
  API.get("/leaders");

export const createLeader = (formData) =>
  API.post("/leaders", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const updateLeaderStatus = (id, status) =>
  API.patch(`/leaders/${id}/status`, { status });

export const deleteLeader = (id) =>
  API.delete(`/leaders/${id}`);

export const getLeaderById = (id) =>
  API.get(`/leaders/${id}`);

export const updateLeader = (id, data) =>
  API.put(`/leaders/${id}`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  /* ================= DASHBOARD ================= */

export const getDashboardStats = () =>
  API.get("/dashboard/stats");

export default API;













