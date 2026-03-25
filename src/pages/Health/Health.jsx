import { useEffect, useState } from "react";
import axios from "axios";
import { Helmet } from "react-helmet-async";
import "./health.css";

const API = "https://ibionoibom-2.onrender.com/api";

const Health = () => {
  const [centers, setCenters] = useState([]);

  const [visiblePrimary, setVisiblePrimary] = useState(4);
  const [visibleGeneral, setVisibleGeneral] = useState(4);
  const [visiblePrivate, setVisiblePrivate] = useState(4);
  const [expandedHealth, setExpandedHealth] = useState(false);

  useEffect(() => {
    const fetchCenters = async () => {
      try {
        const res = await axios.get(`${API}/health`);
        setCenters(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchCenters();
  }, []);

  /* ================= GROUPING ================= */
  const primary = centers.filter(c => c.type === "Primary");
  const general = centers.filter(c => c.type === "General");
  const privateHosp = centers.filter(c => c.type === "Private");

  return (
    <><Helmet>
  <title>Health Centers | Ibiono Ibom</title>
  <meta
    name="description"
    content="Find health centers and medical facilities in Ibiono Ibom Local Government."
  />
</Helmet>

<h1 className="head">Healthcare Services</h1>    <div className="health-page">

  <p className={`par ${expandedHealth ? "expanded" : ""}`}>

  {expandedHealth ? (
    <>
      Ibiono Ibom Local Government is committed to providing accessible and quality healthcare 
      services to its residents. The health sector includes primary healthcare centers, community 
      clinics, and medical outreach programs aimed at improving public health.

      <br /><br />

      These facilities serve as the first point of care for many communities, offering essential 
      services such as immunization, maternal care, and disease prevention.

      <br /><br />

      The local government continues to invest in healthcare infrastructure and services to ensure 
      the well-being of its citizens.
    </>
  ) : (
    <>
      Ibiono Ibom Local Government is committed to providing accessible and quality healthcare 
      services to its residents...
    </>
  )}

  <span
    className="read-toggle"
    onClick={() => setExpandedHealth(!expandedHealth)}
  >
    {expandedHealth ? " Read Less ▲" : " Read More ▼"}
  </span>

</p>
      {/* HERO */}
      <section className="health-hero">
        <h1>Healthcare Services</h1>
        <p>Accessible and quality healthcare for all residents</p>
      </section>

      {/* ABOUT */}
      <section className="health-about">
        <h2>About Healthcare</h2>
        <p>
          Ibiono Ibom Local Government ensures accessible and affordable
          healthcare through well-equipped health centres and hospitals.
        </p>
      </section>

      {/* ================= TOP HOSPITALS ================= */}
<section className="health-featured">

  <h2>Top Health Facilities</h2>

  <div className="featured-grid">

    <div className="featured-card">
      <img src="/src/assets/ibiono logo.jpg" alt="hospital" />
      <h4>Ibiono General Hospital</h4>
    </div>

    <div className="featured-card">
      <img src="/images/hospital2.jpg" alt="hospital" />
      <h4>Primary Health Centre - Ikot Ada</h4>
    </div>

    <div className="featured-card">
      <img src="/images/hospital3.jpg" alt="hospital" />
      <h4>Divine Care Clinic</h4>
    </div>

  </div>

</section>

      {/* PRIMARY */}
      <section className="health-group">
        <h3>Primary Health Centres</h3>

        <div className="health-grid">
          {primary.slice(0, visiblePrimary).map(c => (
            <div className="health-card" key={c._id}>
              <h4>{c.name}</h4>
              <p>{c.location}</p>
              <p>{c.phone}</p>
            </div>
          ))}
        </div>

        <div className="show-controls">
          {visiblePrimary < primary.length && (
            <button onClick={() => setVisiblePrimary(visiblePrimary + 4)}>
              Show More
            </button>
          )}
        </div>
      </section>

      {/* GENERAL */}
      <section className="health-group">
        <h3>General Hospitals</h3>

        <div className="health-grid">
          {general.slice(0, visibleGeneral).map(c => (
            <div className="health-card" key={c._id}>
              <h4>{c.name}</h4>
              <p>{c.location}</p>
              <p>{c.phone}</p>
            </div>
          ))}
        </div>

        <div className="show-controls">
          {visibleGeneral < general.length && (
            <button onClick={() => setVisibleGeneral(visibleGeneral + 4)}>
              Show More
            </button>
          )}
        </div>
      </section>

      {/* PRIVATE */}
      <section className="health-group">
        <h3>Private Clinics</h3>

        <div className="health-grid">
          {privateHosp.slice(0, visiblePrivate).map(c => (
            <div className="health-card" key={c._id}>
              <h4>{c.name}</h4>
              <p>{c.location}</p>
              <p>{c.phone}</p>
            </div>
          ))}
        </div>

        <div className="show-controls">
          {visiblePrivate < privateHosp.length && (
            <button onClick={() => setVisiblePrivate(visiblePrivate + 4)}>
              Show More
            </button>
          )}
        </div>
      </section>

      {/* EMERGENCY */}
      <section className="health-emergency">
        <h2>Emergency Contacts</h2>
        <p>For urgent medical assistance, contact:</p>
        <h3>📞 080-HEALTH-CARE</h3>
      </section>

    </div>
    </>

  );
};

export default Health;