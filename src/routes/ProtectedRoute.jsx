//  import { Navigate } from "react-router-dom";

// const ProtectedRoute = ({ children, roles }) => {
//   const token = JSON.parse(localStorage.getItem("token"));

//   if (!token) return <Navigate to="/admin/login" />;

//   if (roles && !roles.includes(token.role)) {
//     return <Navigate to="/admin/dashboard" />;
//   }

//   return children;
// };

// export default ProtectedRoute



const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
