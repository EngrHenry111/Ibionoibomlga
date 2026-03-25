import { useState } from "react";
import axios from "axios";
import { Helmet } from "react-helmet-async";
import "./diaspora.css";

const API = "https://ibionoibom-2.onrender.com/api";

const Diaspora = () => {

  const [form, setForm] = useState({
    name: "",
    country: "",
    profession: "",
    email: "",
    phone: "",
    interest: "",
    message: ""
  });

  const [loading, setLoading] = useState(false);
  const [expandedDiaspora, setExpandedDiaspora] = useState(false);

  /* ================= INPUT ================= */
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.country || !form.profession || !form.email || !form.interest) {
      alert("Please fill all required fields");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(`${API}/diaspora`, form);

      alert(res.data.message);

      setForm({
        name: "",
        country: "",
        profession: "",
        email: "",
        phone: "",
        interest: "",
        message: ""
      });

    } catch (err) {
      console.error(err.response?.data);
      alert(err.response?.data?.message || "Submission failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <><Helmet>
  <title>Diaspora Connect | Ibiono Ibom</title>
  <meta
    name="description"
    content="Connect with Ibiono Ibom diaspora community and explore investment and development opportunities."
  />
</Helmet>

<h1 className="head">Diaspora Connect</h1>
<p className={`par ${expandedDiaspora ? "expanded" : ""}`}>

  {expandedDiaspora ? (
    <>
      The Ibiono Ibom Diaspora Connect platform aims to engage citizens living outside the
      local government area and across the world. It provides an opportunity for diaspora members
      to stay connected, contribute to development, and explore investment opportunities within Ibiono Ibom.

      <br /><br />

      Through this initiative, the local government fosters collaboration, knowledge sharing,
      and economic growth by leveraging the expertise and resources of its global community.

      <br /><br />

      Diaspora members are encouraged to register and participate in programs that support
      development and innovation.
    </>
  ) : (
    <>
      The Ibiono Ibom Diaspora Connect platform aims to engage citizens living outside the
      local government area and across the world...
    </>
  )}

  <span
    className="read-toggle"
    onClick={() => setExpandedDiaspora(!expandedDiaspora)}
  >
    {expandedDiaspora ? " Read Less ▲" : " Read More ▼"}
  </span>

</p>    <div className="diaspora-page">

      {/* HERO */}
      <section>
        <h1>Diaspora Connect</h1>
        <p>Connecting our people globally</p>
      </section>

      {/* ABOUT */}
      <section>
        <h2>About</h2>
        <p>
          This platform connects diaspora members with development opportunities
          in the Local Government.
        </p>
      </section>

      {/* FORM */}
      <section>
        <h2>Join the Network</h2>

        <form onSubmit={handleSubmit}>

          <input name="name" placeholder="Full Name" value={form.name} onChange={handleChange} required />
          <input name="country" placeholder="Country" value={form.country} onChange={handleChange} required />
          <input name="profession" placeholder="Profession" value={form.profession} onChange={handleChange} required />
          <input name="email" placeholder="Email" value={form.email} onChange={handleChange} required />

          <input name="phone" placeholder="Phone (Optional)" value={form.phone} onChange={handleChange} />

          <select name="interest" value={form.interest} onChange={handleChange} required>
            <option value="">Select Interest</option>
            <option value="Investment">Investment</option>
            <option value="Education">Education</option>
            <option value="Health">Health</option>
            <option value="Agriculture">Agriculture</option>
            <option value="Mentorship">Mentorship</option>
            <option value="Tourism">Tourism</option>
          </select>

          <textarea
            name="message"
            placeholder="How do you want to contribute?"
            value={form.message}
            onChange={handleChange}
          />

          <button type="submit">
            {loading ? "Submitting..." : "Join Now"}
          </button>

        </form>
      </section>

    </div></>
  );
};

export default Diaspora;