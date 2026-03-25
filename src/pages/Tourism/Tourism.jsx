import { useEffect, useState } from "react";
import axios from "axios";
import { Helmet } from "react-helmet-async";
import "./tourism.css";

const API = "https://ibionoibom-2.onrender.com/api";

const Tourism = () => {

  const [places, setPlaces] = useState([]);

  const [visibleNature, setVisibleNature] = useState(4);
  const [visibleCulture, setVisibleCulture] = useState(4);
  const [visibleRecreation, setVisibleRecreation] = useState(4);
  const [expandedTourism, setExpandedTourism] = useState(false);

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const res = await axios.get(`${API}/tourism`);
        setPlaces(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchPlaces();
  }, []);

  /* ================= GROUP ================= */
  const nature = places.filter(p => p.type === "Nature");
  const culture = places.filter(p => p.type === "Culture");
  const recreation = places.filter(p => p.type === "Recreation");

  return (
    <><Helmet>
  <title>Tourism | Ibiono Ibom</title>
  <meta
    name="description"
    content="Discover tourist attractions, culture and heritage in Ibiono Ibom Local Government."
  />
</Helmet>

<h1 className="head">Tourism & Attractions</h1>    

<p className={`par ${expandedTourism ? "expanded" : ""}`}>

  {expandedTourism ? (
    <>
      Ibiono Ibom Local Government is rich in culture, heritage, and natural attractions that make it a unique destination for tourism. From cultural festivals to scenic landscapes, the area offers experiences that reflect its traditions and history.

      <br /><br />

      Tourism development helps promote cultural identity, create employment, and attract visitors to the local government area.

      <br /><br />

      Explore the beauty and heritage of Ibiono Ibom and discover what makes it a remarkable place to visit.
    </>
  ) : (
    <>
      Ibiono Ibom Local Government is rich in culture, heritage, and natural attractions that make it a unique destination for tourism...
    </>
  )}

  <span
    className="read-toggle"
    onClick={() => setExpandedTourism(!expandedTourism)}
  >
    {expandedTourism ? " Read Less ▲" : " Read More ▼"}
  </span>

</p>


<div className="tourism-page">

      {/* HERO */}
      <section className="tourism-hero">
        <h1>Tourism & Attractions</h1>
        <p>Discover the beauty and culture of Ibiono Ibom</p>
      </section>

      {/* ABOUT */}
      <section className="tourism-about">
        <h2>About Tourism</h2>
        <p>
          Ibiono Ibom is rich in natural beauty and cultural heritage,
          offering visitors unique experiences and relaxation.
        </p>
      </section>

      {/* FEATURED */}
      <section className="tourism-featured">
        <h2>Top Attractions</h2>

        <div className="featured-grid">

          <div className="featured-card">
            <img src="/src/assets/ibiono logo.jpg" alt="tourism" />
            <h4>Natural Waterfall</h4>
          </div>

          <div className="featured-card">
            <img src="/images/tour2.jpg" alt="culture" />
            <h4>Cultural Festival</h4>
          </div>

          <div className="featured-card">
            <img src="/images/tour3.jpg" alt="resort" />
            <h4>Relaxation Resort</h4>
          </div>

        </div>
      </section>

      {/* ================= NATURE ================= */}
      <section className="tour-group">
        <h3>Natural Attractions</h3>

        <div className="tour-grid">
          {nature.slice(0, visibleNature).map(p => (
            <div className="tour-card" key={p._id}>
              <h4>{p.name}</h4>
              <p>{p.location}</p>
              <p>{p.description}</p>
            </div>
          ))}
        </div>

        <div className="show-controls">
          {visibleNature < nature.length && (
            <button onClick={() => setVisibleNature(visibleNature + 4)}>
              Show More
            </button>
          )}
        </div>
      </section>

      {/* ================= CULTURE ================= */}
      <section className="tour-group">
        <h3>Cultural & Heritage</h3>

        <div className="tour-grid">
          {culture.slice(0, visibleCulture).map(p => (
            <div className="tour-card" key={p._id}>
              <h4>{p.name}</h4>
              <p>{p.location}</p>
              <p>{p.description}</p>
            </div>
          ))}
        </div>

        <div className="show-controls">
          {visibleCulture < culture.length && (
            <button onClick={() => setVisibleCulture(visibleCulture + 4)}>
              Show More
            </button>
          )}
        </div>
      </section>

      {/* ================= RECREATION ================= */}
      <section className="tour-group">
        <h3>Recreation Spots</h3>

        <div className="tour-grid">
          {recreation.slice(0, visibleRecreation).map(p => (
            <div className="tour-card" key={p._id}>
              <h4>{p.name}</h4>
              <p>{p.location}</p>
              <p>{p.description}</p>
            </div>
          ))}
        </div>

        <div className="show-controls">
          {visibleRecreation < recreation.length && (
            <button onClick={() => setVisibleRecreation(visibleRecreation + 4)}>
              Show More
            </button>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="tour-cta">
        <h2>Explore Ibiono Ibom</h2>
        <p>Visit and experience our rich culture and beautiful environment</p>
        <button className="tour-btn">Plan Your Visit</button>
      </section>

    </div></>

  );
};

export default Tourism;