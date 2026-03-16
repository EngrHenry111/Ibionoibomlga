import { useState } from "react";
import { adminRegister } from "../../../api/adminApi";
import { useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import "./Admin.css";

const Register = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await adminRegister(form);
      alert("Admin registered successfully");
      navigate("/admin/login");
    } catch (err) {
      alert("Registration failed");
    }
  };

  return (
    <div className="admin-auth">
      <h2>Admin Register (Temporary)</h2>

      <form onSubmit={handleSubmit}>

        {/* NAME */}
        <div className="input-group">
          <FaUser className="input-icon" />

          <input
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
          />
        </div>

        {/* EMAIL */}
        <div className="input-group">
          <FaEnvelope className="input-icon" />

          <input
            name="email"
            type="email"
            placeholder="Email Address"
            onChange={handleChange}
          />
        </div>

        {/* PASSWORD */}
        <div className="input-group">
          <FaLock className="input-icon" />

          <input
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            autoComplete="new-password"
            onChange={handleChange}
          />

          <span className="toggle-password" onClick={togglePassword}>
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <button type="submit">Create Admin</button>

      </form>
    </div>
  );
};

export default Register;




// import { useState } from "react";
// import { adminRegister } from "../../api/adminApi";
// import "./Admin.css";

// const Register = () => {
//   const [fullName, setFullName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [message, setMessage] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const res = await adminRegister({ fullName, email, password });
//     if (res.success) {
//       setMessage("Admin registered successfully. You can now login.");
//       setFullName("");
//       setEmail("");
//       setPassword("");
//     } else {
//       setMessage(res.error || "Registration failed");
//     }
//   };

//   return (
//     <div className="admin-container">
//       <h2>Temporary Admin Registration</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           placeholder="Full Name"
//           value={fullName}
//           onChange={(e) => setFullName(e.target.value)}
//           required
//         />
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//         <button type="submit">Register</button>
//       </form>
//       {message && <p className="message">{message}</p>}
//     </div>
//   );
// };

// export default Register;
