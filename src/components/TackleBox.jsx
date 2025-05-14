import React, { useState } from "react";
import fishData from "../data/fishData.json";

// Helper to render star ratings
function renderStars(score) {
  return (
    <span style={{ color: "#f5b301" }}>
      {"★".repeat(score)}
      {"☆".repeat(5 - score)}
    </span>
  );
}

export default function TackleBox({ initialSpecies = "largemouth_bass", initialLocation = "pond" }) {
  // State for dropdowns
  const [species, setSpecies] = useState(initialSpecies);
  const [location, setLocation] = useState(initialLocation);

  // Get available species and locations for dropdowns
  const speciesList = Object.keys(fishData);
  const locationsList = fishData[species] ? Object.keys(fishData[species].locations) : [];

  // Get gear for the current selection
  const gear = fishData[species]?.locations?.[location];

  return (
    <div>
      <h2>🎒 Tackle Box: Build Your Kit!</h2>
      <p>
        Select a fish and location to see the best beginner gear and tips.
      </p>

      {/* Dropdown selectors */}
      <div style={{ marginBottom: "1em" }}>
        <label>
          <b>Fish:</b>{" "}
          <select value={species} onChange={e => {
            setSpecies(e.target.value);
            // Reset location when species changes
            setLocation(Object.keys(fishData[e.target.value].locations)[0]);
          }}>
            {speciesList.map(s => (
              <option key={s} value={s}>{fishData[s].name}</option>
            ))}
          </select>
        </label>
        <label style={{ marginLeft: "1em" }}>
          <b>Location:</b>{" "}
          <select value={location} onChange={e => setLocation(e.target.value)}>
            {locationsList.map(loc => (
              <option key={loc} value={loc}>{loc.charAt(0).toUpperCase() + loc.slice(1)}</option>
            ))}
          </select>
        </label>
      </div>

      {/* Gear Recommendations */}
      {gear ? (
        <div>
          <h3>🧰 Recommended Gear</h3>
          <ul>
            <li>
              <b>Rod:</b> {gear.rod[0].type} {renderStars(gear.rod[0].score)}
              <br /><i>{gear.rod[0].reason}</i>
            </li>
            <li>
              <b>Reel:</b> {gear.reel[0].type} {renderStars(gear.reel[0].score)}
              <br /><i>{gear.reel[0].reason}</i>
            </li>
            <li>
              <b>Line:</b> {gear.line[0].type} {renderStars(gear.line[0].score)}
              <br /><i>{gear.line[0].reason}</i>
            </li>
            <li>
              <b>Lures/Bait:</b>
              <ul>
                {gear.lure.map((l, i) => (
                  <li key={i}>
                    {l.type} {renderStars(l.score)}<br />
                    <i>{l.reason}</i>
                  </li>
                ))}
              </ul>
            </li>
          </ul>
        </div>
      ) : (
        <p>No gear recommendations for this combination.</p>
      )}

      {/* Strategies */}
      {fishData[species].strategies && (
        <div>
          <h3>🎯 Pro Strategies</h3>
          <ul>
            {fishData[species].strategies.map((strat, i) => (
              <li key={i}>{strat.description}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Fun Fact */}
      {fishData[species].fun_fact && (
        <div style={{ marginTop: "1em", background: "#e0f7fa", padding: "1em", borderRadius: "8px" }}>
          <b>🌟 Fun Fact:</b> {fishData[species].fun_fact}
        </div>
      )}

      {/* Safety Tips */}
      <div style={{ marginTop: "1em", background: "#fff8e1", padding: "1em", borderRadius: "8px" }}>
        <b>🦺 Safety Tips for Young Anglers:</b>
        <ul>
          <li>Always fish with an adult.</li>
          <li>Wear a life jacket near water.</li>
          <li>Be careful with hooks and sharp tools.</li>
          <li>Wash your hands after handling bait or fish.</li>
        </ul>
      </div>
    </div>
  );
}
