import { useEffect, useState } from "react";
import axios from "axios";
import { Helmet } from "react-helmet-async";
import "./BMT.css"

const API = "https://ibionoibom-2.onrender.com/api";

const BMT = () => {

  const [items, setItems] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  const [expandedId, setExpandedId] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [expandedBMT, setExpandedBMT] = useState(false);
  const perPage = 6;

  /* ================= FETCH ================= */
  const fetchData = async () => {
    try {
      const res = await axios.get(`${API}/bmt`);
      setItems(res.data || []);
      setFiltered(res.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  /* ================= FILTER ================= */
  useEffect(() => {
    let temp = [...items];

    if (search) {
      temp = temp.filter(item =>
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.content.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category !== "all") {
      temp = temp.filter(item => item.category === category);
    }

    setFiltered(temp);
    setCurrentPage(1);

  }, [search, category, items]);

  /* ================= PAGINATION ================= */
  const start = (currentPage - 1) * perPage;
  const paginated = filtered.slice(start, start + perPage);
  const totalPages = Math.ceil(filtered.length / perPage);

  /* ================= READ ================= */
  const toggleRead = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  /* ================= SHARE ================= */
  const shareWhatsApp = (item) => {
    const text = `📢 ${item.title}\n\n${item.content}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
  };

  /* ================= URGENT ================= */
  const urgentItems = items.filter(i => i.priority === "urgent");

  return (
    <><Helmet>
  <title>Announcements | BMT Gong</title>
  <meta
    name="description"
    content="Official announcements, public notices and urgent updates from Ibiono Ibom Local Government."
  />
      <link rel="canonical" href="https://ibionoibomlga.com/" />
</Helmet>

<h1 className="head">Public Announcements</h1>
<p className={`par ${expandedBMT ? "expanded" : ""}`}>

  {expandedBMT ? (
    <>
      BMT Gong is the official announcement platform of Ibiono Ibom Local Government, designed to
      keep citizens informed about important notices, public alerts, and government programs.

      <br /><br />

      Through this system, residents can access real-time updates on events, opportunities,
      emergency information, and policy changes affecting the local government area.

      <br /><br />

      BMT Gong serves as a digital communication channel that promotes transparency, awareness,
      and active citizen participation in governance.
    </>
  ) : (
    <>
      BMT Gong is the official announcement platform of Ibiono Ibom Local Government, designed to
      keep citizens informed about important notices, public alerts, and government programs...
    </>
  )}

  <span
    className="read-toggle"
    onClick={() => setExpandedBMT(!expandedBMT)}
  >
    {expandedBMT ? " Read Less ▲" : " Read More ▼"}
  </span>

</p>
    <div className="bmt-page">

      {/* HERO */}
      <section>
        <h1>📢 BMT Gong</h1>
        <p>Official Announcements & Public Updates</p>
      </section>

      {/* 🔥 URGENT BANNER */}
      {urgentItems.length > 0 && (
        <div className="urgent-banner">
          🚨 Urgent: {urgentItems[0].title}
        </div>
      )}

      {/* CONTROLS */}
      <div>

        <input
          placeholder="Search announcements..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="all">All</option>
          <option value="Government">Government</option>
          <option value="Alert">Alert</option>
          <option value="Event">Event</option>
          <option value="Opportunity">Opportunity</option>
          <option value="Emergency">Emergency</option>
        </select>

      </div>

      {/* LIST */}
      <div className="bmt-grid">

        {paginated.map((item) => {

          const isExpanded = expandedId === item._id;

          return (
            <div key={item._id} className="bmt-card">

              {/* IMAGE */}
              {item.image && (
                <img src={item.image} alt={item.title} />
              )}

              {/* BADGES */}
              {item.isPinned && <span>📌</span>}
              {item.priority === "urgent" && <span>🚨</span>}

              <h3>{item.title}</h3>

              <p style={{whiteSpace: "pre-line"}}>
                {isExpanded
                  ? item.content
                  : item.content.slice(0, 120) + "..."}
              </p>

              <div>

                <button onClick={() => toggleRead(item._id)}>
                  {isExpanded ? "Read Less" : "Read More"}
                </button>

                <button onClick={() => shareWhatsApp(item)}>
                  Share
                </button>

              </div>

              <small>
                {new Date(item.createdAt).toLocaleDateString()}
              </small>

            </div>
          );
        })}

      </div>

      {/* PAGINATION */}
      <div>

        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}

      </div>

    </div>
    </>
  );
};

export default BMT;