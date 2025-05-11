// src/components/FishingJournal.jsx
import React, { useState, useEffect } from "react";

const initialEntries = JSON.parse(localStorage.getItem("fishingJournal")) || [];

export default function FishingJournal() {
  const [entries, setEntries] = useState(initialEntries);
  const [species, setSpecies] = useState("");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [location, setLocation] = useState("");
  const [notes, setNotes] = useState("");

  // Save entries to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("fishingJournal", JSON.stringify(entries));
  }, [entries]);

  function handleAddEntry(e) {
    e.preventDefault();
    if (!species.trim()) {
      alert("Please enter the fish species!");
      return;
    }
    const newEntry = {
      id: Date.now(),
      species: species.trim(),
      date,
      location: location.trim(),
      notes: notes.trim()
    };
    setEntries([newEntry, ...entries]);
    // Reset form
    setSpecies("");
    setLocation("");
    setNotes("");
    setDate(new Date().toISOString().slice(0, 10));
  }

  return (
    <div>
      <h2>🎣 Fishing Journal</h2>
      <form onSubmit={handleAddEntry} style={{ background: "#f0f4c3", padding: "1rem", borderRadius: "8px", marginBottom: "1rem" }}>
        <label>
          Fish Species <span style={{color: "red"}}>*</span>:
          <input
            type="text"
            value={species}
            onChange={e => setSpecies(e.target.value)}
            placeholder="e.g., Tilapia"
            required
          />
        </label>
        <label>
          Date of Catch:
          <input
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
            max={new Date().toISOString().slice(0, 10)}
          />
        </label>
        <label>
          Location (optional):
          <input
            type="text"
            value={location}
            onChange={e => setLocation(e.target.value)}
            placeholder="Where did you catch it?"
          />
        </label>
        <label>
          Notes (optional):
          <textarea
            value={notes}
            onChange={e => setNotes(e.target.value)}
            placeholder="What bait did you use? How excited were you?"
            rows={6}
            style={{
              width: "100%",
              minHeight: "120px",
              fontSize: "1rem",
              padding: "0.5rem",
              resize: "vertical"
            }}
          />
        </label>
        <button type="submit" className="primary" style={{ marginTop: "0.5rem" }}>
          Add Catch
        </button>
      </form>

      <h3>Past Catches</h3>
      {entries.length === 0 ? (
        <p>No catches logged yet. Go catch some fish!</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {entries.map(({ id, species, date, location, notes }) => (
            <li key={id} style={{ marginBottom: "1rem", background: "#fffde7", padding: "0.75rem", borderRadius: "6px" }}>
              <strong>{species}</strong> caught on <em>{date}</em>{location ? ` at ${location}` : ""}
              {notes && <p style={{ marginTop: "0.5rem" }}>Notes: {notes}</p>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
