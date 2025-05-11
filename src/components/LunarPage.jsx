// src/components/LunarPage.jsx
import React from "react";
import fishData from "../data/fishData.json";
import {
  getLunarPhase,
  getLunarPhaseEmoji,
  getLunarAge,
  isWaxing,
  isWaning,
} from "../utils/lunar";

// Generate a 14-day lunar trend using lunar.js
function getLunarTrend(selectedDate) {
  let trend = [];
  const jsDate = typeof selectedDate === "string" ? new Date(selectedDate) : selectedDate;
  for (let i = 0; i < 14; i++) {
    const d = new Date(jsDate);
    d.setDate(d.getDate() + i);
    trend.push({
      date: d.toISOString().slice(0, 10),
      phase: getLunarPhase(d),
      emoji: getLunarPhaseEmoji(d),
    });
  }
  return trend;
}

export default function LunarPage({
  selectedSpecies = "largemouth_bass",
  selectedDate,
}) {
  // Ensure date is a Date object
  const dateStr = selectedDate || new Date().toISOString().slice(0, 10);
  const jsDate = typeof dateStr === "string" ? new Date(dateStr) : dateStr;
  const phase = getLunarPhase(jsDate);
  const emoji = getLunarPhaseEmoji(jsDate);
  const age = getLunarAge(jsDate).toFixed(1);
  const waxing = isWaxing(jsDate);
  const waning = isWaning(jsDate);
  const trend = getLunarTrend(jsDate);

  // --- Dynamic fishData strategy lookup ---
  const speciesObj = fishData[selectedSpecies];
  const strategies = (speciesObj?.strategies || []).filter(
    strat => strat.conditions && strat.conditions.lunar_phase === phase
  );

  return (
    <div>
      <h2>
        Lunar Fishing Tips for {speciesObj ? speciesObj.name : "Unknown Species"}
      </h2>
      <div style={{ fontSize: "2rem", marginBottom: 8 }}>
        {emoji} <span style={{ fontSize: "1rem" }}>{phase}</span>
      </div>
      <div>
        <strong>Lunar Age:</strong> {age} days &nbsp;
        {waxing && <span>(Waxing)</span>}
        {waning && <span>(Waning)</span>}
      </div>
      <div style={{ margin: "1rem 0" }}>
        {strategies.length > 0 ? (
          <ul>
            {strategies.map((strat, i) => (
              <li key={i}>{strat.description}</li>
            ))}
          </ul>
        ) : (
          <p>
            No special strategies for this lunar phase in the database.<br />
            Try fishing near cover by day during a new moon, or at night with topwater lures during a full moon!
          </p>
        )}
      </div>

      <hr />

      {/* --- KID-FRIENDLY EDUCATIONAL SECTION --- */}
      <div style={{ background: "#f2f8ff", borderRadius: 8, padding: "1rem", marginTop: "1rem" }}>
        <h3>What is a Moon Phase?</h3>
        <p>
          The <strong>moon phase</strong> is how the moon looks in the sky. Sometimes it's a big, bright circle (full moon), and sometimes you can't see it at all (new moon). The moon changes shape a little every night!
        </p>
        <p>
          Fish like bass can see better at night when the moon is bright. During a <strong>full moon</strong>, they might eat more at night. During a <strong>new moon</strong>, it's very dark, so fish might feed more during the day.
        </p>
        <p>
          Some anglers believe the best fishing happens three days before and after a full moon. Try it and see if you notice a difference!
        </p>
      </div>

      {/* --- 14-day lunar trend chart --- */}
      <div style={{ marginTop: "2rem" }}>
        <h4>Next 14 Days of Moon Phases</h4>
        <div style={{ display: "flex", gap: 8, overflowX: "auto" }}>
          {trend.map((item, idx) => (
            <div key={idx} style={{ textAlign: "center", minWidth: 60 }}>
              <div style={{ fontSize: "1.5rem" }}>{item.emoji}</div>
              <div style={{ fontSize: "0.8rem" }}>{item.date.slice(5)}</div>
              <div style={{ fontSize: "0.7rem" }}>{item.phase}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
