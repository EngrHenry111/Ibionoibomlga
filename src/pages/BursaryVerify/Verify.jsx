import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./bursary.css"

const API = "https://ibionoibom-2.onrender.com/api";

const Verify = () => {
  const { code } = useParams();

  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const verify = async () => {
      try {
        const res = await axios.get(`${API}/bursary/verify/${code}`);
        setData(res.data);
      } catch (err) {
        setError("Invalid or expired certificate");
      }
    };

    verify();
  }, [code]);

  return (
    <div className="verify-page">
      <h2>🎓 Bursary Verification</h2>

      {/* ❌ ERROR SECTION */}
      {error && (
        <>
          <h3 style={{ color: "red" }}>❌ INVALID CERTIFICATE</h3>
          <p>{error}</p>
        </>
      )}

      {/* ✅ SUCCESS SECTION */}
      {data && (
        <div className="verify-card">

          {/* ✅ VERIFIED HEADER */}
          <h3 style={{ color: "green" }}>✅ VERIFIED BURSARY</h3>

          <p><strong>Name:</strong> {data.fullName}</p>
          <p><strong>Institution:</strong> {data.institution}</p>

          {/* ✅ STATUS BADGE */}
          <p>
            <strong>Status:</strong>{" "}
            <span className={`status-badge ${data.status}`}>
              {data.status}
            </span>
          </p>

          <p><strong>Tracking ID:</strong> {data.trackingId}</p>

          {/* ✅ COPY LINK BUTTON */}
          <button
            onClick={() =>
              navigator.clipboard.writeText(window.location.href)
            }
          >
            Copy Verification Link
          </button>

          {/* ✅ SECURITY MESSAGE */}
          <p style={{ marginTop: "20px", fontSize: "14px", color: "gray" }}>
            This verification confirms that this bursary record is officially issued
            by Ibiono Ibom Local Government.
          </p>

        </div>
      )}
    </div>
  );
};

export default Verify;