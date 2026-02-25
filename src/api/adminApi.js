import axios from "axios";


const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
});



// const API = axios.create({
//   baseURL: "https://ibionoibom-2.onrender.com/api",
// });


// const API = axios.create({
//   baseURL: "http://localhost:5000/api",
// });

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

/* ---------- ADMIN CRUD ---------- */


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

// export const getNewsById = (id) =>
//   API.get(`/news/public/${id}`)
export const getNewsById = (id) =>
  API.get(`/news/${id}`); 


// // ADMIN
// export const getAllLeaders = () =>
//   API.get("/leaders");

// export const createLeader = (formData) =>
//   API.post("/leaders", formData, {
//     headers: { "Content-Type": "multipart/form-data" },
//   });

// export const updateLeaderStatus = (id, status) =>
//   API.patch(`/leaders/${id}/status`, { status });

// export const deleteLeader = (id) =>
//   API.delete(`/leaders/${id}`);

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


// import axios from "axios";

// const API = axios.create({
//   baseURL: "http://localhost:5000/api",
// });

// /* ================================
//    AUTH TOKEN
// ================================ */
// export const setAuthToken = (token) => {
//   if (token) {
//     API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
//   } else {
//     delete API.defaults.headers.common["Authorization"];
//   }
// };

// /* ================================
//    AUTH
// ================================ */
// export const adminLogin = async (data) => {
//   const res = await API.post("/admin/login", data);
//   return res.data;
// };

// /* ================================
//    NEWS
// ================================ */
// export const createNews = async (formData) => {
//   const res = await API.post("/admin/news", formData);
//   return res.data;
// };

// export const getAllNews = async () => {
//   const res = await API.get("/admin/news");
//   return res.data;
// };

// export const deleteNews = async (id) => {
//   const res = await API.delete(`/admin/news/${id}`);
//   return res.data;
// };

// /* ================================
//    LEADERS
// ================================ */
// export const createLeader = async (formData) => {
//   const res = await API.post("/admin/leaders", formData);
//   return res.data;
// };

// export const getAllLeaders = async () => {
//   const res = await API.get("/admin/leaders");
//   return res.data;
// };

// export const deleteLeader = async (id) => {
//   const res = await API.delete(`/admin/leaders/${id}`);
//   return res.data;
// };

// /* ================================
//    DEPARTMENTS
// ================================ */
// export const createDepartment = async (data) => {
//   const res = await API.post("/admin/departments", data);
//   return res.data;
// };

// export const getAllDepartments = async () => {
//   const res = await API.get("/admin/departments");
//   return res.data;
// };

// export const deleteDepartment = async (id) => {
//   const res = await API.delete(`/admin/departments/${id}`);
//   return res.data;
// };

// export default API;


// import axios from "axios";

// /* ===============================
//    AXIOS INSTANCE
// ================================ */
// const API = axios.create({
//   baseURL: "http://localhost:5000/api/admin",
// });

// /* ===============================
//    AUTH
// ================================ */

// export const adminLogin = async (credentials) => {
//   const res = await API.post("/login", credentials);
//   return res.data;
// };

// export const adminRegister = async (payload) => {
//   const res = await API.post("/register", payload);
//   return res.data;
// };

// /* ===============================
//    NEWS
// ================================ */

// export const createNews = async (formData, token) => {
//   const res = await API.post("/news", formData, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//       "Content-Type": "multipart/form-data",
//     },
//   });
//   return res.data;
// };

// export const getAdminNews = async (token) => {
//   const res = await API.get("/news", {
//     headers: { Authorization: `Bearer ${token}` },
//   });
//   return Array.isArray(res.data) ? res.data : [];
// };

// /* ===============================
//    LEADERS
// ================================ */

// export const createLeader = async (formData, token) => {
//   const res = await API.post("/leaders", formData, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//       "Content-Type": "multipart/form-data",
//     },
//   });
//   return res.data;
// };

// /* ===============================
//    DEPARTMENTS
// ================================ */

// export const createDepartment = async (data, token) => {
//   const res = await API.post("/departments", data, {
//     headers: { Authorization: `Bearer ${token}` },
//   });
//   return res.data;
// };







// import axios from "axios";

// const API = axios.create({
//   baseURL: "http://localhost:5000/api/admin",
// });

// // REGISTER
// export const adminRegister = (data) =>
//   API.post("/register", data);

// // LOGIN
// export const adminLogin = (data) =>
//   API.post("/login", data);

// // SET TOKEN
// export const setAuthToken = (token) => {
//   if (token) {
//     API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
//   } else {
//     delete API.defaults.headers.common["Authorization"];
//   }
// };





// import axios from "axios";

// const API_URL = "http://localhost:5000/api"; // adjust backend URL

// /* TEMP ADMIN REGISTER (DELETE AFTER FIRST ADMIN) */
// export const adminRegister = async (data) => {
//   try {
//     const res = await axios.post(`${API_URL}/auth/register`, data);
//     return res.data;
//   } catch (err) {
//     return { success: false, error: err.response?.data?.message };
//   }
// };

// /* ADMIN LOGIN */
// export const adminLogin = async (data) => {
//   try {
//     const res = await axios.post(`${API_URL}/auth/login`, data);
//     return res.data;
//   } catch (err) {
//     return { success: false, error: err.response?.data?.message };
//   }
// };







// import axios from "axios";


// const API = axios.create({
//   baseURL: "http://localhost:5000/api", // change if needed
// });

// /* ================= AUTH ================= */

// export const adminLogin = async (credentials) => {
//   const res = await API.post("/auth/login", credentials);
//   return res.data;
// };


// const API_BASE_URL = "http://localhost:5000/api/admin";

// // export const adminLogin = async (credentials) => {
// //   const response = await axios.post(
// //     `${API_BASE_URL}/login`,
// //     credentials,
// //     { withCredentials: true }
// //   );
// //   return response.data;
// // };

// export const adminRegister = async (data) => {
//   const response = await axios.post(
//     `${API_BASE_URL}/register`,
//     data,
//     { withCredentials: true }
//   );
//   return response.data;
// };

// // future examples
// export const createNews = async (formData, token) => {
//   const response = await axios.post(
//     "http://localhost:5000/api/news",
//     formData,
//     {
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "multipart/form-data",
//       },
//     }
//   );
//   return response.data;
// };



// import axios from "axios";

// const API = axios.create({ baseURL: "http://localhost:5000/api" });

// API.interceptors.request.use((config) => {
//   const token = localStorage.getItem("adminToken");
//   if (token) config.headers.Authorization = `Bearer ${token}`;
//   return config;
// });

// export const loginAdmin = (data) => API.post("/auth/login", data);
// export const getLeaders = () => API.get("/leaders");
// export const createLeader = (data) => API.post("/leaders", data);
// export const createTenure = (data) => API.post("/tenures", data);
// export const getTenures = () => API.get("/tenures");
// export const createDepartment = (data) => API.post("/departments", data);
// export const getDepartments = () => API.get("/departments");
// export const createNews = (data) => API.post("/news", data);
// export const getNews = () => API.get("/news");
// export const uploadLeaderImage = (formData) =>
//   API.post("/media/leaders", formData, { headers: { "Content-Type": "multipart/form-data" } });
// export const uploadNewsImage = (formData) =>
//   API.post("/media/news", formData, { headers: { "Content-Type": "multipart/form-data" } });
