import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import "./bursaryApply.css";

const API = "https://ibionoibom-2.onrender.com/api";

const BursaryApply = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({});
  const [files, setFiles] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [expandedBursary, setExpandedBursary] = useState(false);

  /* ================= AUTH CHECK ================= */
  useEffect(() => {
    const token = localStorage.getItem("studentToken");
    if (!token) navigate("/bursary");
  }, [navigate]);

  /* ================= HANDLE INPUT ================= */
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  /* ================= HANDLE FILE ================= */
  const handleFile = (e) => {
    setFiles({
      ...files,
      [e.target.name]: e.target.files[0],
    });
  };

  /* ================= VALIDATION ================= */
  const validate = () => {
    if (!form.bvn || form.bvn.length !== 11) {
      return "BVN must be exactly 11 digits";
    }
    if (!form.nin || form.nin.length !== 11) {
      return "NIN must be exactly 11 digits";
    }
    if (!form.accountNumber || form.accountNumber.length < 10) {
      return "Invalid account number";
    }
    return null;
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    const validationError = validate();
    if (validationError) return setError(validationError);

    try {
      setLoading(true);

      const token = localStorage.getItem("studentToken");
      const formData = new FormData();

      Object.keys(form).forEach((key) => {
        formData.append(key, form[key]);
      });

      Object.keys(files).forEach((key) => {
        formData.append(key, files[key]);
      });

      await axios.post(`${API}/bursary/apply`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setSuccess("Application submitted successfully ✅");

      setTimeout(() => {
        navigate("/bursary/dashboard");
      }, 1500);

    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Submission failed");
    } finally {
      setLoading(false);
    }
  };

  /* ================= UI ================= */

  return (

    <>
    <Helmet>
  <title>Bursary Program | Ibiono Ibom</title>
  <meta
    name="description"
    content="Apply for bursary and student support programs in Ibiono Ibom Local Government."
  />
</Helmet>

<h1>Bursary Application</h1>

    <p className={`par ${expandedBursary ? "expanded" : ""}`}>

  {expandedBursary ? (
    <>
      The Ibiono Ibom Bursary Program is designed to support students from the local government
      area in achieving their educational goals. This initiative provides financial assistance to
      eligible students in tertiary institutions, helping to reduce the burden of tuition and academic expenses.

      <br /><br />

      Through the bursary scheme, Ibiono Ibom Local Government demonstrates its commitment to 
      education, youth empowerment, and human capital development.

      <br /><br />

      Students are encouraged to apply and take advantage of this opportunity to further their 
      education and contribute to the development of the community.
    </>
  ) : (
    <>
      The Ibiono Ibom Bursary Program is designed to support students from the local government
      area in achieving their educational goals...
    </>
  )}

  <span
    className="read-toggle"
    onClick={() => setExpandedBursary(!expandedBursary)}
  >
    {expandedBursary ? " Read Less ▲" : " Read More ▼"}
  </span>

</p><div className="bursary-form">

      <h2>Bursary Application Form</h2>

      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}

      <form onSubmit={handleSubmit}>

        {/* ================= PERSONAL ================= */}
        <div className="form-section">
          <h3>Personal Information</h3>

          <div className="form-grid">
            <input name="fullName" placeholder="Full Name" onChange={handleChange} required />
            <input name="email" placeholder="Email" onChange={handleChange} required />
            <input name="phone" placeholder="Phone Number" onChange={handleChange} required />
          </div>
          
        </div>

        {/* ================= ACADEMIC ================= */}
        <div className="form-section">
          <h3>Academic Information</h3>

          <div className="form-grid">
            <input name="matricNumber" placeholder="Matric Number" onChange={handleChange} required />
            <input name="institution" placeholder="Institution" onChange={handleChange} required />
            <input name="course" placeholder="Course of Study" onChange={handleChange} required />
            <input name="level" placeholder="Level (e.g 100, 200)" onChange={handleChange} required />
          </div>
        </div>

        {/* ================= BANK ================= */}
        <div className="form-section">
          <h3>Bank Details</h3>

          <div className="form-grid">
            <input name="accountNumber" placeholder="Account Number" onChange={handleChange} required />
            <input name="bankName" placeholder="Bank Name" onChange={handleChange} required />
          </div>
        </div>

        {/* ================= IDENTITY ================= */}
        <div className="form-section highlight">
          <h3>Identity Verification (BVN & NIN)</h3>

          <div className="form-grid">
            <input name="bvn" placeholder="BVN (11 digits)" onChange={handleChange} required />
            <input name="nin" placeholder="NIN (11 digits)" onChange={handleChange} required />
          </div>
        </div>

        {/* ================= DOCUMENTS ================= */}
        <div className="form-section">
          <h3>Document Uploads</h3>

          <div className="upload-grid">
            <div className="upload-item">
              <label>Passport</label>
              <input type="file" name="passport" onChange={handleFile} required />
            </div>

            <div className="upload-item">
              <label>Admission Letter</label>
              <input type="file" name="admissionLetter" onChange={handleFile} required />
            </div>

            <div className="upload-item">
              <label>Student ID</label>
              <input type="file" name="studentID" onChange={handleFile} required />
            </div>

            <div className="upload-item">
              <label>LGA Certificate</label>
              <input type="file" name="lgaCertificate" onChange={handleFile} required />
            </div>
          </div>
        </div>

        {/* ================= SUBMIT ================= */}
        <button disabled={loading}>
          {loading ? "Submitting..." : "Submit Application"}
        </button>

      </form>

      

      <p className="back-link" onClick={() => navigate("/bursary/dashboard")}>
        ← Back to Dashboard
      </p>

    </div>
    </>
  );
};

export default BursaryApply;