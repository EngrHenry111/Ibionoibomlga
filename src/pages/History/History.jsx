import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./history.css";

const API = "https://ibionoibom-2.onrender.com/api";

const History = () => {

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await axios.get(`${API}/history`);
        setData(res.data || []);
      } catch (err) {
        console.error(err);
      }
    };

    fetchHistory();
  }, []);

  /* ================= FORMAT PARAGRAPH ================= */
  const formatText = (text) => {
    if (!text) return null;

    return text.split("\n").map((para, index) => (
      <p key={index} className="history-paragraph">
        {para}
      </p>
    ));
  };

  /* ================= GROUP ================= */
  const origin = data.filter(i => i.section === "Origin");
  const timeline = data.filter(i => i.section === "Timeline");
  const leadership = data.filter(i => i.section === "Leadership");
  const colonial = data.filter(i => i.section === "Colonial");
  const culture = data.filter(i => i.section === "Culture");
  const personalities = data.filter(i => i.section === "Personalities");

  return (
    <div className="history-page">

      {/* HERO */}
      <section className="history-hero">
        <h1>History of Ibiono Ibom</h1>
        <p>Understanding our roots, heritage, and evolution</p>
      </section>

      {/* ORIGIN */}
      <section className="history-section">
        <h2>Origin & Early Settlement</h2>
        {origin.map(item => (
          <div key={item._id} className="history-card">
            <h4>{item.title}</h4>
            {formatText(item.content)}
          </div>
        ))}
      </section>

      {/* TIMELINE */}
      <section className="history-section">
        <h2>Historical Timeline</h2>

        <div className="timeline">

          {timeline.map(item => (
            <div className="timeline-item" key={item._id}>
              <h4>{item.year}</h4>
              {formatText(item.content)}
            </div>
          ))}

        </div>
      </section>

      {/* LEADERSHIP */}
      <section className="history-section">
        <h2>Traditional Leadership</h2>
        {leadership.map(item => (
          <div key={item._id} className="history-card">
            <h4>{item.title}</h4>
            {formatText(item.content)}
          </div>
        ))}
      </section>

      {/* COLONIAL */}
      <section className="history-section">
        <h2>Colonial & Post-Colonial Era</h2>
        {colonial.map(item => (
          <div key={item._id} className="history-card">
            <h4>{item.title}</h4>
            {formatText(item.content)}
          </div>
        ))}
      </section>

      {/* CULTURE EVOLUTION */}
      <section className="history-section">
        <h2>Cultural Evolution</h2>
        {culture.map(item => (
          <div key={item._id} className="history-card">
            <h4>{item.title}</h4>
            {formatText(item.content)}
          </div>
        ))}
      </section>

      {/* PERSONALITIES */}
      <section className="history-section">
        <h2>Notable Personalities</h2>
        {personalities.map(item => (
          <div key={item._id} className="history-card">
            <h4>{item.title}</h4>
            {formatText(item.content)}
          </div>
        ))}
      </section>

        <Link className="culture" to="/culture">Explore Culture</Link>
    </div>
  );
};

export default History;