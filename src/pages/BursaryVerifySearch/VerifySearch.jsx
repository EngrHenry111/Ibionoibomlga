import { useState } from "react";
import axios from "axios";
import "./verifySearch.css"
const API = "https://ibionoibom-2.onrender.com/api";

const VerifySearch = () => {
  const [trackingId, setTrackingId] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleVerify = async () => {
    try {
      setError("");
      setResult(null);

      const res = await axios.get(
        `${API}/bursary/verify-tracking/${trackingId}`
      );

      setResult(res.data);

    } catch (err) {
      setError("Invalid Tracking ID");
    }
  };

  return (
    <div className="verify-page">

      <h2>🔍 Verify Bursary</h2>

      {/* ✅ INPUT SECTION */}
      <div className="verify-box">
        <input
          type="text"
          placeholder="Enter Tracking ID (e.g IBB-XXXX)"
          value={trackingId}
          onChange={(e) => setTrackingId(e.target.value)}
        />

        <button onClick={handleVerify}>Verify</button>
      </div>

      {/* ❌ ERROR */}
      {error && (
        <h3 style={{ color: "red" }}>❌ {error}</h3>
      )}

      {/* ✅ RESULT */}
      {result && (
        <div className="verify-card">

          <h3 style={{ color: "green" }}>✅ VERIFIED BURSARY</h3>

          <p><strong>Name:</strong> {result.fullName}</p>
          <p><strong>Institution:</strong> {result.institution}</p>

          {/* STATUS BADGE */}
          <p>
            <strong>Status:</strong>{" "}
            <span className={`status-badge ${result.status}`}>
              {result.status}
            </span>
          </p>

          <p><strong>Tracking ID:</strong> {result.trackingId}</p>

        </div>
      )}

    </div>
  );
};

export default VerifySearch;