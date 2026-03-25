import { useState } from "react";
import { Helmet } from "react-helmet-async";

import "./location.css"

const Location = () => {

  const [expandedLocation, setExpandedLocation] = useState(false);

  return (
    <><Helmet>
  <title>Location & Overview | Ibiono Ibom</title>
  <meta
    name="description"
    content="Explore the location, map, landmarks and overview of Ibiono Ibom Local Government."
  />
</Helmet>

<h1>Ibiono Ibom Location & Overview</h1>

<p className={`par ${expandedLocation ? "expanded" : ""}`}>

  {expandedLocation ? (
    <>
      Ibiono Ibom Local Government is located in Akwa Ibom State, Nigeria, and is known for 
      its strategic location and vibrant communities. The area is accessible through major
       road networks connecting it to neighboring regions.

      <br /><br />

      The local government is characterized by its cultural diversity, agricultural strength, 
      and growing infrastructure. It serves as an important hub for economic and social 
      activities within the state.

      <br /><br />

      This page provides an overview of the geographical location, landmarks, and key features 
      of Ibiono Ibom.
    </>
  ) : (
    <>
      Ibiono Ibom Local Government is located in Akwa Ibom State, Nigeria, and is
       known for
      its strategic location and vibrant communities...
    </>
  )}

  <span
    className="read-toggle"
    onClick={() => setExpandedLocation(!expandedLocation)}
  >
    {expandedLocation ? " Read Less ▲" : " Read More ▼"}
  </span>

</p>
    <div className="location-page">

      {/* ================= HERO ================= */}
      <section className="location-hero">
        <h1>Ibiono Ibom Local Government</h1>
        <p>A Gateway to Growth, Culture and Development</p>
        {/* <h3>Population: {count.toLocaleString()}</h3> */}
      </section>

      {/* ================= OVERVIEW ================= */}
      <section className="location-overview">

        <h2>Location Overview</h2>

        <p>
          Ibiono Ibom Local Government Area is located in Akwa Ibom State,
          Nigeria. It is strategically positioned with access to major roads,
          connecting surrounding communities and neighboring local governments.
        </p>

        <p>
          The area is known for its rich cultural heritage, agricultural strength,
          and growing infrastructure development, making it a key part of the
          state's economic activities.
        </p>

      </section>

      {/* ================= MAP ================= */}
      <section className="location-map">

        <h2>Find Us on Map</h2>

        <iframe
          src="https://www.google.com/maps?q=Ibiono+Ibom&output=embed"
          width="100%"
          height="400"
          style={{ border: 0 }}
          loading="lazy"
          title="Ibiono Ibom Map"
        ></iframe>

      </section>

      {/* ================= LANDMARKS ================= */}
      <section className="location-landmarks">

        <h2>Key Landmarks</h2>

        <div className="landmark-grid">

          <div className="landmark-card">
            <img src="/images/secretariat.jpg" alt="Secretariat" />
            <h4>Local Government Secretariat</h4>
            <p>Administrative headquarters of the LGA</p>
          </div>

          <div className="landmark-card">
            <img src="/images/school.jpg" alt="School" />
            <h4>Public Schools</h4>
            <p>Primary and secondary educational institutions</p>
          </div>

          <div className="landmark-card">
            <img src="/images/health.jpg" alt="Health Center" />
            <h4>Health Centers</h4>
            <p>Primary healthcare facilities serving communities</p>
          </div>

          <div className="landmark-card">
            <img src="/images/market.jpg" alt="Market" />
            <h4>Local Markets</h4>
            <p>Centers for trade and commerce</p>
          </div>

        </div>

      </section>

      {/* ================= QUICK FACTS ================= */}
      <section className="location-facts">

        <h2>Quick Facts</h2>

        <ul>
          <li><strong>State:</strong> Akwa Ibom</li>
          <li><strong>Region:</strong> South-South Nigeria</li>
          <li><strong>Main Occupation:</strong> Farming, Trading</li>
          <li><strong>Languages:</strong> Ibibio, English</li>
          <li><strong>Administrative Units:</strong> Multiple wards</li>
        </ul>

      </section>

      {/* ================= LINKS ================= */}
      <section className="location-links">

        <h2>Explore More</h2>

        <div className="links-grid">

          <a href="/education">Education</a>
          <a href="/health">Health</a>
          <a href="/agriculture">Agriculture</a>
          <a href="/tourism">Tourism</a>
          <a href="/bmt">Announcements</a>

        </div>

      </section>

      {/* ================= CTA ================= */}
      <section className="location-cta">

        <h2>Discover Opportunities</h2>
        <p>Explore investment, education, and development opportunities</p>

        <button>Contact Local Government</button>

      </section>

    </div></>
  );
};

export default Location;