import { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./resetpassword.css";

const API = "https://ibionoibom-2.onrender.com/api";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    try {
      const res = await axios.post(
        `${API}/students/reset-password/${token}`,
        { password }
      );

      setMessage("Password reset successful");

      setTimeout(() => {
        navigate("/bursary");
      }, 1500);

    } catch (err) {
      setError(
        err.response?.data?.message || "Reset failed"
      );
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">

        <h2>Reset Password</h2>

        {message && <p className="success">{message}</p>}
        {error && <p className="error">{error}</p>}

        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="Enter new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button>Reset Password</button>
        </form>

      </div>
    </div>
  );
};

export default ResetPassword;