import { useState } from "react";
import { adminLogin, setAuthToken } from "../../../api/adminApi";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaEnvelope, FaLock } from "react-icons/fa";
import "./Admin.css";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await adminLogin({
        email: form.email,
        password: form.password,
      });

      const { token, admin } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("admin", JSON.stringify(admin));

      setAuthToken(token);

      navigate("/admin/dashboard");
    } catch (err) {
      console.error(err);
      alert("Invalid login");
    }
  };

  return (
    <div className="admin-auth">
      <h2>Admin Login</h2>

      <form onSubmit={handleSubmit}>

        {/* EMAIL FIELD */}
        <div className="input-group">
          <FaEnvelope className="input-icon" />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            autoComplete="username"
            value={form.email}
            onChange={handleChange}
          />
        </div>

        {/* PASSWORD FIELD */}
        <div className="input-group">

          <FaLock className="input-icon" />

          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            autoComplete="current-password"
            value={form.password}
            onChange={handleChange}
          />

          <span className="toggle-password" onClick={togglePassword}>
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>

        </div>

        <button type="submit">Login</button>

      </form>
    </div>
  );
};

export default Login;


// import { useState } from "react";
// import { adminLogin, setAuthToken } from "../../../api/adminApi";
// import { useNavigate } from "react-router-dom";
// import "./Admin.css";

// const Login = () => {
//   const [form, setForm] = useState({ email: "", password: "" });
//   const [showPassword, setShowPassword] = useState(false);

//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setForm({
//       ...form,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const togglePassword = () => {
//     setShowPassword(!showPassword);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await adminLogin({
//         email: form.email,
//         password: form.password,
//       });

//       const { token, admin } = res.data;

//       localStorage.setItem("token", token);
//       localStorage.setItem("admin", JSON.stringify(admin));

//       setAuthToken(token);

//       navigate("/admin/dashboard");
//     } catch (err) {
//       console.error(err);
//       alert("Invalid login");
//     }
//   };

//   return (
//     <div className="admin-auth">
//       <h2>Admin Login</h2>

//       <form onSubmit={handleSubmit}>
//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           autoComplete="username"
//           value={form.email}
//           onChange={handleChange}
//         />

//         {/* PASSWORD FIELD */}
//         <div className="password-wrapper">
//           <input
//             type={showPassword ? "text" : "password"}
//             name="password"
//             placeholder="Password"
//             autoComplete="current-password"
//             value={form.password}
//             onChange={handleChange}
//           />

//           <span className="toggle-password" onClick={togglePassword}>
//             {showPassword ? "Hide" : "Show"}
//           </span>
//         </div>

//         <button type="submit">Login</button>
//       </form>
//     </div>
//   );
// };

// export default Login;