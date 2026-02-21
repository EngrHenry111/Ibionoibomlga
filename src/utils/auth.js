export const saveAdmin = (admin) => {
  localStorage.setItem("admin", JSON.stringify(admin));
};

export const getAdmin = () => {
  return JSON.parse(localStorage.getItem("admin"));
};

// export const logoutAdmin = () => {
//   localStorage.removeItem("admin");
//   localStorage.removeItem("token");
// };
export const logoutAdmin = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("admin");
};



// export const saveAdmin = (data) => {
//   localStorage.setItem("adminToken", data.token);
//   localStorage.setItem("adminUser", JSON.stringify(data.admin));
// };

// export const getAdminToken = () =>
//   localStorage.getItem("adminToken");

// export const logoutAdmin = () => {
//   localStorage.removeItem("adminToken");
//   localStorage.removeItem("adminUser");
// };
