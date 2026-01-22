import React from "react";

export default function ProductCard({ item }) {
  return (
    <div className="card">
      {item.image && (
        <div className="cardImageWrap">
          <img
            src={item.image}
            alt={item.name}
            className="cardImage"
            loading="lazy"
          />
        </div>
      )}

      <div className="cardBody">
        <div className="cardHeaderRow">
          <h3 className="cardTitle">{item.name}</h3>
          <span className="cardPrice">
            ${Number(item.price).toFixed(2)}
          </span>
        </div>

        {item.description && (
          <p className="cardDesc">{item.description}</p>
        )}
      </div>
    </div>
  );
}
