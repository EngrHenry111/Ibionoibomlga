import { useEffect, useState } from "react";
import axios from "axios";
import "./culture..css";

const API = "https://ibionoibom-2.onrender.com/api";

const Culture = () => {

  const [items, setItems] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState(null);

  const [visibleTraditional, setVisibleTraditional] = useState(4);
  const [visibleReligious, setVisibleReligious] = useState(4);
  const [visibleSocial, setVisibleSocial] = useState(4);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${API}/culture`);
        setItems(res.data || []);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  const toggleReadMore = (index) => {
    setExpandedIndex(prev => (prev === index ? null : index));
  };

  /* ================= GROUP ================= */
  const traditional = items.filter(i => i.type === "Traditional");
  const religious = items.filter(i => i.type === "Religious");
  const social = items.filter(i => i.type === "Social");

  /* ================= CARD ================= */
  const renderCard = (item, index) => {
    const text = item.description || "";
    const isExpanded = expandedIndex === index;

    return (
      <div className="culture-card" key={index}>
        <h4>{item.name}</h4>

        <p>
          {isExpanded ? text : text.slice(0, 120)}
          {text.length > 120 && !isExpanded && "..."}
        </p>

        {text.length > 120 && (
          <button
            className="read-btn"
            onClick={() => toggleReadMore(index)}
          >
            {isExpanded ? "Read Less" : "Read More"}
          </button>
        )}

        {item.location && <span>{item.location}</span>}
      </div>
    );
  };

  return (
    <div className="culture-page">

      {/* HERO */}
      <section className="culture-hero">
        <h1>Cultural Festivals & Heritage</h1>
        <p>Celebrating our traditions, identity, and community spirit</p>
      </section>

      {/* ABOUT */}
      <section className="culture-about">
        <h2>Our Culture</h2>
        <p>
          Cultural festivals preserve heritage, promote unity,
          and attract tourism through music, dance, and traditional rituals.
        </p>
      </section>

      {/* FEATURED */}
      <section className="culture-featured">
        <h2>Featured Festivals</h2>

        <div className="featured-grid">
          <div className="featured-card">
            <img src="/images/culture1.jpg" alt="" />
            <h4>Masquerade Festival</h4>
          </div>

          <div className="featured-card">
            <img src="/src/assets/images/yamfestival.jpeg" alt="" />
            <h4>New Yam Festival</h4>
          </div>

          <div className="featured-card">
            <img src="/src/assets/images/culturedance.jpeg" alt="" />
            <h4>Traditional Dance</h4>
          </div>
        </div>
      </section>

      {/* TRADITIONAL */}
      <section className="culture-group">
        <h3>Traditional Festivals</h3>
        <div className="culture-grid">
          {traditional.slice(0, visibleTraditional).map(renderCard)}
        </div>
      </section>

      {/* RELIGIOUS */}
      <section className="culture-group">
        <h3>Religious Festivals</h3>
        <div className="culture-grid">
          {religious.slice(0, visibleReligious).map(renderCard)}
        </div>
      </section>

      {/* SOCIAL */}
      <section className="culture-group">
        <h3>Social Cultural Groups</h3>
        <div className="culture-grid">
          {social.slice(0, visibleSocial).map(renderCard)}
        </div>
      </section>

      {/* CTA */}
      <section className="culture-cta">
        <h2>Preserve Our Culture</h2>
        <p>Join and support cultural heritage in our community</p>
        <button>Explore Festivals</button>
      </section>

    </div>
  );
};

export default Culture;