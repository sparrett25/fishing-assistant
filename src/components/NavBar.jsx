// src/components/NavBar.jsx
import React from "react";

const pages = [
  { key: "dashboard", label: "Dashboard" },
  { key: "lunar", label: "Lunar" },
  { key: "weather", label: "Weather" },
  { key: "temperature", label: "Temperature" },
  { key: "season", label: "Season" },
  { key: "species", label: "Species" },
  { key: "fishing101", label: "Fishing 101" },
  { key: "glossary", label: "Glossary" },
  { key: "quiz", label: "Quiz" },
  { key: "journal", label: "Fishing Journal" },
  { key: "tacklebox", label: "Tackle Box" } // <-- Add this line
];

export default function NavBar({ currentPage, onNavigate }) {
  return (
    <nav>
      {pages.map(page => (
        <button
          key={page.key}
          aria-current={currentPage === page.key ? "page" : undefined}
          onClick={() => onNavigate(page.key)}
        >
          {page.label}
        </button>
      ))}
    </nav>
  );
}
