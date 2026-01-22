import React from "react";

export default function ProductCard({ item }) {
  return (
    <div className="card">
      <div className="cardBody">
        <div className="cardHeaderRow">
          <h3 className="cardTitle">{item.name}</h3>
          <div className="cardPrice">${Number(item.price).toFixed(2)}</div>
        </div>

        {item.description ? (
          <p className="cardDesc">{item.description}</p>
        ) : (
          <p className="cardDesc cardDescMuted">No description.</p>
        )}
      </div>
    </div>
  );
}
