// src/components/SpeciesSelector.jsx
import React, { useState, useEffect } from "react";
import fishData from "../data/fishData.json";

export default function SpeciesSelector({
  selectedSpecies,
  selectedDate,
  selectedLocation,
  onApply,
}) {
  // Set initial values
  const [species, setSpecies] = useState(selectedSpecies || "largemouth_bass");
  const [date, setDate] = useState(selectedDate || new Date().toISOString().slice(0, 10));
  const [location, setLocation] = useState(selectedLocation || "river");

  // Update location when species changes
  useEffect(() => {
    if (species && fishData[species]) {
      const locs = Object.keys(fishData[species].locations);
      if (!locs.includes(location)) {
        setLocation(locs[0]);
      }
    }
  }, [species]);

  // Get species and location options
  const speciesOptions = Object.keys(fishData);
  const locationOptions = species ? Object.keys(fishData[species]?.locations || {}) : [];

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        onApply(species, date, location);
      }}
      style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
    >
      <label>
        Fish Species:
        <select
          value={species}
          onChange={e => setSpecies(e.target.value)}
        >
          {speciesOptions.map(key => (
            <option key={key} value={key}>
              {fishData[key].name}
            </option>
          ))}
        </select>
      </label>
      <label>
        Location:
        <select
          value={location}
          onChange={e => setLocation(e.target.value)}
        >
          {locationOptions.map(loc => (
            <option key={loc} value={loc}>
              {loc.charAt(0).toUpperCase() + loc.slice(1)}
            </option>
          ))}
        </select>
      </label>
      <label>
        Date:
        <input
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
        />
      </label>
      <button type="submit" style={{ width: "fit-content" }}>
        Apply
      </button>
    </form>
  );
}
