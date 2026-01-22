import React from "react";

export default function Categories({ categories, activeId, onSelect }) {
  return (
    <div className="tabsWrap">
      <div className="tabs">
        {categories.map((c) => {
          const isActive = c.id === activeId;
          return (
            <button
              key={c.id}
              className={`tabBtn ${isActive ? "tabBtnActive" : ""}`}
              onClick={() => onSelect(c.id)}
              type="button"
            >
              {c.label}
              <span className={`tabUnderline ${isActive ? "on" : ""}`} />
            </button>
          );
        })}
      </div>
    </div>
  );
}
