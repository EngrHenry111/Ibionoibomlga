import { useState } from "react";
import { adminLogin, setAuthToken } from "../../../api/adminApi";
import { saveAdmin } from "../../../utils/auth";
import { useNavigate } from "react-router-dom";
import "./Admin.css"

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  // ✅ FIXED handleChange
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await adminLogin({
      email: form.email,
      password: form.password,
    });

    // 🔥 IMPORTANT
    const { token, admin } = res.data;

    console.log("TOKEN:", token);
    console.log("ADMIN:", admin);

    // ✅ Save correctly
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
        <input
          type="email"
          name="email"
          placeholder="Email"
          autoComplete="username"
          value={form.email}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          autoComplete="current-password"
          value={form.password}
          onChange={handleChange}
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
