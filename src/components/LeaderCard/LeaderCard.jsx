import React from "react";
import "./LeaderCard.css";

const LeaderCard = ({ leader }) => {
  return (
    <div className="leader-card">
      <img src={`http://localhost:5000${leader.photoUrl}`} alt={leader.fullName} />
      <h3>{leader.fullName}</h3>
      <p>{leader.office}</p>
      <p>{leader.startDate} - {leader.endDate || "Present"}</p>
    </div>
  );
};

export default LeaderCard;
