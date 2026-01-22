import React, { useEffect, useMemo, useRef, useState } from "react";
import menuData from "../data/data.json";

import Hero from "../components/Hero";
import Categories from "../components/Categories";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";
import "../styles/landing.css";

// --- helpers ---
const titleCase = (str) =>
  String(str || "")
    .replace(/([A-Z])/g, " $1")
    .replace(/_/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/^./, (c) => c.toUpperCase());

const slugify = (str) =>
  String(str || "")
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

function normalizeMenu(raw) {
  // Accepts:
  // {
  //   appetizers: [{...}],
  //   classics: { gyro: [{...}], souvlaki: [{...}] },
  //   drinks: { tea: [{...}] }
  // }
  // Output:
  // [{ id, label, items: [...] }, ...]
  const result = [];

  Object.entries(raw || {}).forEach(([topKey, value]) => {
    if (Array.isArray(value)) {
      result.push({
        id: slugify(topKey),
        label: titleCase(topKey),
        items: value,
      });
      return;
    }

    // nested object => flatten as "Top - Sub"
    if (value && typeof value === "object") {
      Object.entries(value).forEach(([subKey, subValue]) => {
        if (!Array.isArray(subValue)) return;
        const label = `${titleCase(topKey)} • ${titleCase(subKey)}`;
        result.push({
          id: slugify(`${topKey}-${subKey}`),
          label,
          items: subValue,
        });
      });
    }
  });

  // Remove empty categories
  return result.filter((c) => c.items && c.items.length > 0);
}

export default function LandingPage() {
  const [query, setQuery] = useState("");
  const categories = useMemo(() => normalizeMenu(menuData), []);

  // refs for each section
  const sectionRefs = useRef({});
  const [activeId, setActiveId] = useState(categories[0]?.id || "");

  const filteredCategories = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return categories;

    return categories
      .map((cat) => {
        const items = cat.items.filter((it) => {
          const name = (it.name || "").toLowerCase();
          const desc = (it.description || "").toLowerCase();
          return name.includes(q) || desc.includes(q);
        });
        return { ...cat, items };
      })
      .filter((cat) => cat.items.length > 0);
  }, [categories, query]);

  // If search shrinks list, keep activeId valid
  useEffect(() => {
    if (!filteredCategories.length) return;
    const stillExists = filteredCategories.some((c) => c.id === activeId);
    if (!stillExists) setActiveId(filteredCategories[0].id);
  }, [filteredCategories, activeId]);

  // Scroll spy
  useEffect(() => {
    const ids = filteredCategories.map((c) => c.id);
    const nodes = ids.map((id) => sectionRefs.current[id]).filter(Boolean);

    if (!nodes.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // pick the most visible entry
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) => (b.intersectionRatio || 0) - (a.intersectionRatio || 0),
          );

        if (visible[0]?.target?.dataset?.id) {
          setActiveId(visible[0].target.dataset.id);
        }
      },
      {
        root: null,
        // This makes it switch while you scroll past section headers
        rootMargin: "-35% 0px -55% 0px",
        threshold: [0.1, 0.2, 0.35, 0.5, 0.65],
      },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [filteredCategories]);

  const onSelectCategory = (id) => {
    const node = sectionRefs.current[id];
    if (!node) return;

    setActiveId(id);
    node.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="page">
      <Hero />

      {/* sticky search + categories */}
      <div className="stickyHeader">
        <div className="searchRow">
          <div className="searchWrap">
            <input
              className="searchInput"
              placeholder="Search menu..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <span className="searchIcon" aria-hidden="true">
              ⌕
            </span>
          </div>
        </div>

        <Categories
          categories={filteredCategories}
          activeId={activeId}
          onSelect={onSelectCategory}
        />
      </div>

      <main className="content">
        {filteredCategories.length === 0 ? (
          <div className="empty">
            <div className="emptyTitle">No matches</div>
            <div className="emptySub">Try a different search term.</div>
          </div>
        ) : (
          filteredCategories.map((cat) => (
            <section
              key={cat.id}
              data-id={cat.id}
              ref={(el) => (sectionRefs.current[cat.id] = el)}
              className="section"
            >
              <h2 className="sectionTitle">{cat.label}</h2>

              <div className="grid">
                {cat.items.map((item, idx) => (
                  <ProductCard
                    key={`${cat.id}-${slugify(item.name)}-${idx}`}
                    item={item}
                  />
                ))}
              </div>
            </section>
          ))
        )}
      </main>
      <Footer />
    </div>
  );
}
