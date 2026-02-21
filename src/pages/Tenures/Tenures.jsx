import { useEffect, useState } from "react";
import { getTenures } from "../../api/publicApi";
import "./Tenures.css";

const Tenures = () => {
  const [tenures, setTenures] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTenures = async () => {
      try {
        const res = await getTenures();
        setTenures(Array.isArray(res?.data) ? res.data : []);
      } catch (error) {
        console.error("Failed to load tenures:", error);
        setTenures([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTenures();
  }, []);

  if (loading) return <p className="tenure-loading">Loading tenures...</p>;

  return (
    <section className="tenures-page">
      <h1>Leadership Tenures</h1>

      {tenures.length === 0 ? (
        <p>No tenure records available.</p>
      ) : (
        <div className="tenure-grid">
          {tenures.map((tenure) => {
            const isCurrent = !tenure.endYear;

            return (
              <div className="tenure-card" key={tenure._id}>
                <img
                  src={tenure.leader?.image || "/placeholder-user.png"}
                  alt={tenure.leader?.name || "Leader"}
                />

                <div className="tenure-info">
                  <h3>{tenure.leader?.name}</h3>
                  <span className="office">{tenure.office}</span>

                  <span className="years">
                    {tenure.startYear} – {tenure.endYear || "Present"}
                  </span>

                  <span
                    className={`badge ${isCurrent ? "current" : "past"}`}
                  >
                    {isCurrent ? "Current" : "Past"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default Tenures;
