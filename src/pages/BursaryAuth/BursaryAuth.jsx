import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./bursaryAuth.css";

const API = "https://ibionoibom-2.onrender.com/api";

const BursaryAuth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  /* ================= HANDLE INPUT ================= */
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);

      const url = isLogin
        ? `${API}/students/login`
        : `${API}/students/register`;

      const res = await axios.post(url, form);

      // ✅ Save token
      localStorage.setItem("studentToken", res.data.token);

      // ✅ Redirect
      navigate("/bursary/dashboard");

    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  /* ================= UI ================= */

  return (
    <div className="auth-container">
      <div className="auth-box">

        <h2>{isLogin ? "Student Login" : "Student Registration"}</h2>

        {error && <p className="error">{error}</p>}

        <form onSubmit={handleSubmit}>

          {/* REGISTER ONLY */}
          {!isLogin && (
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={form.fullName}
              onChange={handleChange}
              required
            />
          )}

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />

          <button disabled={loading}>
            {loading
              ? "Please wait..."
              : isLogin
              ? "Login"
              : "Register"}
          </button>
        </form>

        {/* TOGGLE */}
        <p className="switch">
          {isLogin
            ? "Don't have an account?"
            : "Already have an account?"}
          <span onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? " Register" : " Login"}
          </span>
        </p>

        {/* FORGOT PASSWORD */}
        {isLogin && (
          <p
            className="forgot-link"
            onClick={() => navigate("/bursary/forgot-password")}
          >
            Forgot Password?
          </p>
        )}
      </div>
    </div>
  );
};

export default BursaryAuth;