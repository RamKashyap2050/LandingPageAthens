import React from "react";

export default function ProductModal({ item, onClose }) {
  if (!item) return null;

  return (
    <div className="modalOverlay" onClick={onClose}>
      <div
        className="modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <button className="modalClose" onClick={onClose}>
          ×
        </button>

        {item.image && (
          <div className="modalImageWrap">
            <img
              src={item.image}
              alt={item.name}
              className="modalImage"
            />
          </div>
        )}

        <div className="modalBody">
          <h2 className="modalTitle">{item.name}</h2>

          {item.description && (
            <p className="modalDesc">{item.description}</p>
          )}

          <div className="modalPrice">
            ${Number(item.price).toFixed(2)}
          </div>
        </div>
      </div>
    </div>
  );
}
