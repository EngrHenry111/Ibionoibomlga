

import { useEffect, useState } from "react";
import axios from "axios";
import { Helmet } from "react-helmet-async";
import farm from "../../assets/images/farm.jpeg";
import livest from "../../assets/images/livestock.jpeg";
import market from "../../assets/images/market.jpeg";
import "./agriculture.css";

const API = "https://ibionoibom-2.onrender.com/api";

const Agriculture = () => {

  const [items, setItems] = useState([]);

  const [visibleCrop, setVisibleCrop] = useState(4);
  const [visibleLivestock, setVisibleLivestock] = useState(4);
  const [visibleMarket, setVisibleMarket] = useState(4);
  const [expandedAgriculture, setExpandedAgriculture] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${API}/agriculture`);
        setItems(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  /* ================= GROUP ================= */
  const crops = items.filter(i => i.type === "Crop");
  const livestock = items.filter(i => i.type === "Livestock");
  const markets = items.filter(i => i.type === "Market");

  return (
    <><Helmet>
  <title>Agriculture | Ibiono Ibom</title>
  <meta
    name="description"
    content="Agricultural opportunities, farming and food production in Ibiono Ibom Local Government."
  />
</Helmet>

<h1 className="head">Agriculture & Food Production</h1>
<p className={`par ${expandedAgriculture ? "expanded" : ""}`}>

  {expandedAgriculture ? (
    <>
      Agriculture is a major economic activity in Ibiono Ibom Local Government, providing food,
      employment, and income for many residents. The area is known for its fertile land and
      favorable conditions for farming.

      <br /><br />

      Farmers engage in crop production, livestock farming, and agro-based activities
      that contribute to food security and economic growth.

      <br /><br />

      The local government supports agricultural development through training, resources,
      and initiatives aimed at improving productivity and sustainability.
    </>
  ) : (
    <>
      Agriculture is a major economic activity in Ibiono Ibom Local Government, providing food,
      employment, and income for many residents...
    </>
  )}

  <span
    className="read-toggle"
    onClick={() => setExpandedAgriculture(!expandedAgriculture)}
  >
    {expandedAgriculture ? " Read Less ▲" : " Read More ▼"}
  </span>

</p>
    <div className="agriculture-page">

      {/* HERO */}
      <section className="agri-hero">
        <h1>Agriculture & Food Production</h1>
        <p>Empowering farmers and ensuring food security</p>
      </section>

      {/* ABOUT */}
      <section className="agri-about">
        <h2>About Agriculture</h2>
        <p>
          Agriculture is the backbone of Ibiono Ibom Local Government,
          supporting food production, employment, and economic growth.
        </p>
      </section>

      {/* FEATURED */}
      <section className="agri-featured">
        <h2>Key Agricultural Activities</h2>

        <div className="featured-grid">
          <div className="featured-card">
            <img src={farm} alt="farm" />
            <h4>Crop Farming</h4>
          </div>

          <div className="featured-card">
            <img src={livest} alt="livestock" />
            <h4>Livestock Production</h4>
          </div>

          <div className="featured-card">
            <img src={market} alt="market" />
            <h4>Agro Markets</h4>
          </div>
        </div>
      </section>

      {/* ================= CROPS ================= */}
      <section className="agri-group">
        <h3>Crop Farming</h3>

        <div className="agri-grid">
          {crops.slice(0, visibleCrop).map(item => (
            <div className="agri-card" key={item._id}>
              <h4>{item.name}</h4>
              <p>{item.location}</p>
            </div>
          ))}
        </div>

        <div className="show-controls">
          {visibleCrop < crops.length && (
            <button onClick={() => setVisibleCrop(visibleCrop + 4)}>
              Show More
            </button>
          )}
        </div>
      </section>

      {/* ================= LIVESTOCK ================= */}
      <section className="agri-group">
        <h3>Livestock</h3>

        <div className="agri-grid">
          {livestock.slice(0, visibleLivestock).map(item => (
            <div className="agri-card" key={item._id}>
              <h4>{item.name}</h4>
              <p>{item.location}</p>
            </div>
          ))}
        </div>

        <div className="show-controls">
          {visibleLivestock < livestock.length && (
            <button onClick={() => setVisibleLivestock(visibleLivestock + 4)}>
              Show More
            </button>
          )}
        </div>
      </section>

      {/* ================= MARKETS ================= */}
      <section className="agri-group">
        <h3>Agro Markets & Processing</h3>

        <div className="agri-grid">
          {markets.slice(0, visibleMarket).map(item => (
            <div className="agri-card" key={item._id}>
              <h4>{item.name}</h4>
              <p>{item.location}</p>
            </div>
          ))}
        </div>

        <div className="show-controls">
          {visibleMarket < markets.length && (
            <button onClick={() => setVisibleMarket(visibleMarket + 4)}>
              Show More
            </button>
          )}
        </div>
      </section>

      {/* GOVERNMENT SUPPORT */}
      <section className="agri-support">
        <h2>Government Support Programs</h2>
        <p>
          Farmers can benefit from government support programs including
          fertilizers, training, and financial assistance.
        </p>
        <button className="agri-btn">Join Agricultural Program</button>
      </section>

    </div>
    </>
  );
};

export default Agriculture; 