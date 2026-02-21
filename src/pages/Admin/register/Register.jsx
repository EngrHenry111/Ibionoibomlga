import { useState } from "react";
import { adminRegister } from "../../../api/adminApi";
import "./Admin.css";
import { Navigate, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await adminRegister(form);
      alert("Admin registered successfully");
      navigate("/admin/login")
    } catch (err) {
      alert("Registration failed", err);
    }
  };

  return (
    <div className="admin-auth">
      <h2>Admin Register (Temporary)</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" onChange={handleChange} />
        <input name="email" placeholder="Email" onChange={handleChange} />
        <input
          name="password"
          type="password"
          placeholder="Password"
          autoComplete="new-password"
          onChange={handleChange}
        />
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
