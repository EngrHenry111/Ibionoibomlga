import { useState } from "react";
import { Helmet } from "react-helmet-async";
import "./feedback.css"
const Feedback = () => {
  const [expandedFeedback, setExpandedFeedback] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    type: "",
    message: ""
  });

  const [success, setSuccess] = useState(false);

  const ADMIN_PHONE = "09016299730"; // 🔥 replace

  /* ================= INPUT ================= */
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.type || !form.message) {
      alert("Please fill required fields");
      return;
    }

    /* ================= CLEAN MESSAGE ================= */
    const formattedMessage = form.message
      .trim()
      .replace(/\n/g, "%0A"); // preserve ENTER spacing

    /* ================= BUILD MESSAGE ================= */
    const text =
`*FEEDBACK MESSAGE*

*Name:* ${form.name}
*Email:* ${form.email || "N/A"}
*Phone:* ${form.phone || "N/A"}
*Type:* ${form.type}

*Message:*
${formattedMessage}`;

    /* ================= ENCODE ================= */
    const encoded = encodeURIComponent(text);

    /* ================= WHATSAPP LINK ================= */
    const url = `https://wa.me/${ADMIN_PHONE}?text=${encoded}`;

    /* ================= AUTO RESPONSE ================= */
    setSuccess(true);

    /* ================= OPEN WHATSAPP ================= */
    window.open(url, "_blank");

    /* ================= RESET ================= */
    setForm({
      name: "",
      email: "",
      phone: "",
      type: "",
      message: ""
    });
  };

  return (
    <><Helmet>
  <title>Feedback | Ibiono Ibom LGA</title>
  <meta
    name="description"
    content="Send feedback, complaints or suggestions directly to Ibiono Ibom Local Government."
  />
</Helmet>

<h1 className="head">Feedback & Support</h1>

<p className={`par ${expandedFeedback ? "expanded" : ""}`}>

  {expandedFeedback ? (
    <>
      Ibiono Ibom Local Government values the opinions and feedback of its citizens. This platform allows residents to share their suggestions, complaints, and inquiries directly with the administration.

      <br /><br />

      Feedback helps improve service delivery, strengthen communication, and promote transparency in governance.

      <br /><br />

      Citizens are encouraged to use this channel to actively participate in the development and progress of the local government.
    </>
  ) : (
    <>
      Ibiono Ibom Local Government values the opinions and feedback of its citizens. This platform allows residents to share their suggestions, complaints, and inquiries directly with the administration...
    </>
  )}

  <span
    className="read-toggle"
    onClick={() => setExpandedFeedback(!expandedFeedback)}
  >
    {expandedFeedback ? " Read Less ▲" : " Read More ▼"}
  </span>

</p>
    <div className="feedback-page">

      {/* HERO */}
      <section>
        <h1>Feedback & Support</h1>
        <p>Your voice matters — help us improve</p>
      </section>

      {/* SUCCESS MESSAGE */}
      {success && (
        <div>
          <p>✅ Message ready for WhatsApp</p>
          <p>📱 Please click send in WhatsApp</p>
        </div>
      )}

      {/* FORM */}
      <section>

        <h2>Send Feedback</h2>

        <form onSubmit={handleSubmit}>

          <input
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <input
            name="email"
            placeholder="Email (optional)"
            value={form.email}
            onChange={handleChange}
          />

          <input
            name="phone"
            placeholder="Phone (optional)"
            value={form.phone}
            onChange={handleChange}
          />

          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            required
          >
            <option value="">Select Feedback Type</option>
            <option value="Complaint">Complaint</option>
            <option value="Suggestion">Suggestion</option>
            <option value="Inquiry">Inquiry</option>
            <option value="Appreciation">Appreciation</option>
          </select>

          {/* 🔥 TEXTAREA WITH PARAGRAPH SUPPORT */}
          <textarea
            name="message"
            placeholder={`Write your message...

Press ENTER for new paragraph`}
            value={form.message}
            onChange={handleChange}
            rows="6"
            required
          />

          <button type="submit">
            Send via WhatsApp
          </button>

        </form>

      </section>

      {/* TRUST */}
      <section>
        <h3>We Value Your Feedback</h3>
        <p>
          All feedback is treated confidentially and helps improve governance
          and service delivery.
        </p>
      </section>

    </div></>
  );
};

export default Feedback;