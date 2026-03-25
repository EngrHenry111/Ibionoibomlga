import { useEffect, useState } from "react";
import axios from "axios";
import "./security.css";

const API = "https://ibionoibom-2.onrender.com/api";

const Security = () => {

  const [units, setUnits] = useState([]);

  const [visiblePolice, setVisiblePolice] = useState(4);
  const [visibleCivil, setVisibleCivil] = useState(4);
  const [visibleVigilante, setVisibleVigilante] = useState(4);

  useEffect(() => {
    const fetchUnits = async () => {
      try {
        const res = await axios.get(`${API}/security`);
        setUnits(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUnits();
  }, []);

  /* ================= GROUP ================= */
  const police = units.filter(u => u.type === "Police");
  const civil = units.filter(u => u.type === "Civil Defence");
  const vigilante = units.filter(u => u.type === "Vigilante");

  return (
    <div className="security-page">

      {/* HERO */}
      <section className="security-hero">
        <h1>Security Services</h1>
        <p>Ensuring safety and protection across all communities</p>
      </section>

      {/* ABOUT */}
      <section className="security-about">
        <h2>About Security</h2>
        <p>
          Ibiono Ibom Local Government ensures safety through coordinated
          security agencies working together to protect lives and property.
        </p>
      </section>

      {/* FEATURED */}
      <section className="security-featured">
        <h2>Key Security Units</h2>

        <div className="featured-grid">

          <div className="featured-card">
            <img src="/src/assets/ibiono logo.jpg" alt="police" />
            <h4>Police Headquarters</h4>
          </div>

          <div className="featured-card">
            <img src="/images/nscdc.jpg" alt="civil defence" />
            <h4>NSCDC Unit</h4>
          </div>

          <div className="featured-card">
            <img src="/images/vigilante.jpg" alt="vigilante" />
            <h4>Community Vigilante</h4>
          </div>

        </div>
      </section>

      {/* ================= POLICE ================= */}
      <section className="security-group">
        <h3>Police Stations</h3>

        <div className="security-grid">
          {police.slice(0, visiblePolice).map(u => (
            <div className="security-card" key={u._id}>
              <h4>{u.name}</h4>
              <p>{u.location}</p>
              <p>{u.phone}</p>
            </div>
          ))}
        </div>

        <div className="show-controls">
          {visiblePolice < police.length && (
            <button onClick={() => setVisiblePolice(visiblePolice + 4)}>
              Show More
            </button>
          )}
        </div>
      </section>

      {/* ================= CIVIL DEFENCE ================= */}
      <section className="security-group">
        <h3>Civil Defence</h3>

        <div className="security-grid">
          {civil.slice(0, visibleCivil).map(u => (
            <div className="security-card" key={u._id}>
              <h4>{u.name}</h4>
              <p>{u.location}</p>
              <p>{u.phone}</p>
            </div>
          ))}
        </div>

        <div className="show-controls">
          {visibleCivil < civil.length && (
            <button onClick={() => setVisibleCivil(visibleCivil + 4)}>
              Show More
            </button>
          )}
        </div>
      </section>

      {/* ================= VIGILANTE ================= */}
      <section className="security-group">
        <h3>Vigilante Groups</h3>

        <div className="security-grid">
          {vigilante.slice(0, visibleVigilante).map(u => (
            <div className="security-card" key={u._id}>
              <h4>{u.name}</h4>
              <p>{u.location}</p>
              <p>{u.phone}</p>
            </div>
          ))}
        </div>

        <div className="show-controls">
          {visibleVigilante < vigilante.length && (
            <button onClick={() => setVisibleVigilante(visibleVigilante + 4)}>
              Show More
            </button>
          )}
        </div>
      </section>

      {/* EMERGENCY */}
      <section className="security-emergency">
        <h2>Emergency Contact</h2>
        <h3>📞 112 / Local Security Line</h3>
      </section>

    </div>
  );
};

export default Security;