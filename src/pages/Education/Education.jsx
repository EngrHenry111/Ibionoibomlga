import { useEffect, useState } from "react";
import axios from "axios";
import { Helmet } from "react-helmet-async";
import "./Education.css";

const API = "https://ibionoibom-2.onrender.com/api";

const Education = () => {
  const [schools, setSchools] = useState([]);
  const [visibleCount, setVisibleCount] = useState(6);
  const [visiblePrimary, setVisiblePrimary] = useState(4);
const [visibleSecondary, setVisibleSecondary] = useState(4);
const [visibleTertiary, setVisibleTertiary] = useState(4);
const [expandedEducation, setExpandedEducation] = useState(false);

  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const res = await axios.get(`${API}/schools`);
        setSchools(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchSchools();
  }, []);

  const primarySchools = schools.filter(s => s.type === "Primary");
  const secondarySchools = schools.filter(s => s.type === "Secondary");
  const tertiarySchools = schools.filter(s => s.type === "Tertiary");

  return (
    <><Helmet>
  <title>Education | Ibiono Ibom</title>
  <meta
    name="description"
    content="Explore schools and educational institutions in Ibiono Ibom Local Government."
  />
</Helmet>

<h1 className="head">Education in Ibiono Ibom</h1>
<p className={`par ${expandedEducation ? "expanded" : ""}`}>

  {expandedEducation ? (
    <>
      Education in Ibiono Ibom Local Government is a key priority, with a focus on providing quality learning 
      opportunities for children and young adults. The local government supports primary, 
      secondary, and tertiary education through various initiatives and programs.

      <br /><br />

      Schools within Ibiono Ibom are equipped to nurture academic excellence and personal
      development, preparing students for future opportunities.

      <br /><br />

      The education sector continues to grow, contributing to the development of skilled 
      individuals and a stronger community.
    </>
  ) : (
    <>
      Education in Ibiono Ibom Local Government is a key priority, with a focus on providing quality learning 
      opportunities for children and young adults...
    </>
  )}

  <span
    className="read-toggle"
    onClick={() => setExpandedEducation(!expandedEducation)}
  >
    {expandedEducation ? " Read Less ▲" : " Read More ▼"}
  </span>

</p>
    <div className="education-page">

      {/* ================= HERO ================= */}
      <section className="edu-hero">
        <h1>Education in Ibiono Ibom</h1>
        <p>Empowering the next generation through quality education</p>
      </section>

      {/* ================= ABOUT ================= */}
      <section className="edu-about">
        <h2>About Education</h2>
        <p>
          Ibiono Ibom Local Government is committed to providing access to quality
          education across all communities. Schools are equipped to nurture academic
          excellence and character development.
        </p>
      </section>

      {/* ================= FEATURED (STATIC) ================= */}
      <section className="edu-featured">
        <h2>Top Schools</h2>

        <div className="featured-grid">
          <div className="featured-card">
            <img src="/src/assets/ibiono logo.jpg" alt="school" />
            <h4>Community Secondary School</h4>
          </div>

          <div className="featured-card">
            <img src="/images/school2.jpg" alt="school" />
            <h4>Model Primary School</h4>
          </div>

          <div className="featured-card">
            <img src="/images/school3.jpg" alt="school" />
            <h4>Technical College</h4>
          </div>
        </div>
      </section>

      {/* ================= DYNAMIC LIST ================= */}

      <section className="edu-list">

  <h2>All Schools</h2>

  {/* ================= PRIMARY ================= */}
  <div className="school-group">
    <h3>Primary Schools</h3>

    <div className="school-grid">
      {primarySchools.slice(0, visiblePrimary).map((school) => (
        <div className="school-card" key={school._id}>
          <h4>{school.name}</h4>
          <p>{school.location}</p>
        </div>
      ))}
    </div>

    <div className="show-controls">
      {visiblePrimary < primarySchools.length && (
        <button onClick={() => setVisiblePrimary(visiblePrimary + 4)}>
          Show More
        </button>
      )}

      {visiblePrimary > 4 && (
        <button onClick={() => setVisiblePrimary(4)}>
          Show Less
        </button>
      )}
    </div>
  </div>

  {/* ================= SECONDARY ================= */}
  <div className="school-group">
    <h3>Secondary Schools</h3>

    <div className="school-grid">
      {secondarySchools.slice(0, visibleSecondary).map((school) => (
        <div className="school-card" key={school._id}>
          <h4>{school.name}</h4>
          <p>{school.location}</p>
        </div>
      ))}
    </div>

    <div className="show-controls">
      {visibleSecondary < secondarySchools.length && (
        <button onClick={() => setVisibleSecondary(visibleSecondary + 4)}>
          Show More
        </button>
      )}

      {visibleSecondary > 4 && (
        <button onClick={() => setVisibleSecondary(4)}>
          Show Less
        </button>
      )}
    </div>
  </div>

  {/* ================= TERTIARY ================= */}
  <div className="school-group">
    <h3>Tertiary Institutions</h3>

    <div className="school-grid">
      {tertiarySchools.slice(0, visibleTertiary).map((school) => (
        <div className="school-card" key={school._id}>
          <h4>{school.name}</h4>
          <p>{school.location}</p>
        </div>
      ))}
    </div>

    <div className="show-controls">
      {visibleTertiary < tertiarySchools.length && (
        <button onClick={() => setVisibleTertiary(visibleTertiary + 4)}>
          Show More
        </button>
      )}

      {visibleTertiary > 4 && (
        <button onClick={() => setVisibleTertiary(4)}>
          Show Less
        </button>
      )}
    </div>
  </div>

</section>
      
      {/* <section className="edu-list">
        <h2>All Schools</h2>

        <div className="school-grid">
         {schools.slice(0, visibleCount).map((school) => (
            <div className="school-card" key={school._id}>
              <h3>{school.name}</h3>
              <p>{school.location}</p>
              <p>{school.type}</p>
            </div>
          ))} */}

          {/* ================= SHOW MORE / LESS ================= */}

        {/* <div className="show-controls">

        {visibleCount < schools.length && (
            <button onClick={() => setVisibleCount(visibleCount + 6)}>
            Show More
            </button>
        )}

        {visibleCount > 6 && (
            <button onClick={() => setVisibleCount(6)}>
            Show Less
            </button>
        )}

        </div>
        </div>
      </section> */}

      {/* ================= BURSARY CTA ================= */}
      <section className="edu-bursary">
        <h2>Apply for Bursary</h2>
        <p>
          Eligible students can apply for bursary support from the Local Government.
        </p>

        <a href="/bursary/apply" className="bursary-btn">
          Apply Now
        </a>
      </section>

    </div>
    </>
  );
};

export default Education;