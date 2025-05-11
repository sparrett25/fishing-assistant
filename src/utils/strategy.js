// src/utils/strategy.js

/**
 * Returns a list of matching strategies, ranked by match score.
 * @param {Array} strategies - Array of strategy objects from fish JSON.
 * @param {Object} factors - Current conditions (e.g., {season, weather, lunarPhase, temperature, time})
 * @returns {Array} - Array of {strategy, score} objects, sorted best first.
 */
export function findBestStrategies(strategies, factors) {
  // Define which factor keys to match (expand as needed)
  const factorKeys = ["season", "weather", "lunar_phase", "temperature", "time"];

  // Score each strategy
  const scored = strategies.map(strategy => {
    let score = 0;
    let matched = {};
    for (const key of factorKeys) {
      if (
        strategy.conditions &&
        strategy.conditions[key] &&
        factors[key] &&
        isMatch(strategy.conditions[key], factors[key])
      ) {
        score++;
        matched[key] = true;
      }
    }
    return { strategy, score, matched };
  });

  // Sort by score descending, then by number of matched factors
  scored.sort((a, b) => b.score - a.score);

  // Return only those with at least one matching factor
  return scored.filter(s => s.score > 0);
}

/**
 * Helper to check if a strategy condition matches the current factor.
 * Handles strings, arrays, and basic time range logic.
 */
function isMatch(conditionValue, factorValue) {
  if (Array.isArray(conditionValue)) {
    return conditionValue.includes(factorValue);
  }
  if (typeof conditionValue === "string" && typeof factorValue === "string") {
    // Time range (e.g., "05:00-09:00")
    if (/^\d{2}:\d{2}-\d{2}:\d{2}$/.test(conditionValue)) {
      const [start, end] = conditionValue.split("-");
      return isTimeInRange(factorValue, start, end);
    }
    // Case-insensitive string match
    return conditionValue.toLowerCase() === factorValue.toLowerCase();
  }
  // Numeric (e.g., temperature ranges)
  if (typeof conditionValue === "number" && typeof factorValue === "number") {
    return conditionValue === factorValue;
  }
  // Boolean
  if (typeof conditionValue === "boolean") {
    return conditionValue === !!factorValue;
  }
  return false;
}

/**
 * Check if a time string (e.g., "08:30") is within a range ("05:00", "09:00")
 */
function isTimeInRange(time, start, end) {
  // Convert "HH:MM" to minutes since midnight
  const toMinutes = t => {
    const [h, m] = t.split(":").map(Number);
    return h * 60 + m;
  };
  const t = toMinutes(time);
  const s = toMinutes(start);
  const e = toMinutes(end);
  return t >= s && t <= e;
}
