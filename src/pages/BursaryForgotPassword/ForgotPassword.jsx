import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./forgotpassword.css";

const API = "https://ibionoibom-2.onrender.com/api";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [resetLink, setResetLink] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    try {
      const res = await axios.post(
        `${API}/students/forgot-password`,
        { email }
      );

      setMessage(res.data.message || "Reset link sent");
      setResetLink(res.data.resetUrl);

    } catch (err) {
      setError(
        err.response?.data?.message || "Something went wrong"
      );
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Forgot Password</h2>

        {message && <p className="success">{message}</p>}
        {error && <p className="error">{error}</p>}

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button>Send Reset Link</button>
          {resetLink && ( <a href={resetLink} 
          target="_blank"> Click here to reset password </a> )}
        </form>

        <p onClick={() => navigate("/bursary")} className="back-link">
          ← Back to Login
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;