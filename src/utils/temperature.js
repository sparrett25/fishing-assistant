// src/utils/temperature.js

/**
 * Returns temperature analysis and tactics for bass fishing
 * @param {Object} options - { date, waterTemp, airTemp }
 * If date is provided, uses typical seasonal temps for Central FL.
 * If waterTemp is provided, uses that directly.
 */
export function getTemperatureData({ date, waterTemp, airTemp } = {}) {
  let temp = typeof waterTemp === "number" ? waterTemp : null;
  let air = typeof airTemp === "number" ? airTemp : null;
  let month;
  if (!temp && date) {
    const d = typeof date === "string" ? new Date(date) : date;
    month = d.getMonth() + 1;
    if (month >= 3 && month <= 5) temp = 72; // Spring
    else if (month >= 6 && month <= 8) temp = 82; // Summer
    else if (month >= 9 && month <= 11) temp = 75; // Fall
    else temp = 62; // Winter
    if (!air) {
      if (month >= 3 && month <= 5) air = 78;
      else if (month >= 6 && month <= 8) air = 90;
      else if (month >= 9 && month <= 11) air = 82;
      else air = 70;
    }
  }
  if (!temp) temp = 72;
  if (!air) air = 78;

  let analysis = "";
  let tactics = [];

  if (temp < 50) {
    analysis =
      "Very cold water. Bass are lethargic, holding deep and feeding infrequently. Patience and slow presentations are key.";
    tactics = [
      "Fish deep structure with jigs or soft plastics.",
      "Use slow, bottom-contact baits.",
      "Target sunny spots in the afternoon."
    ];
  } else if (temp < 60) {
    analysis =
      "Pre-spawn period. Bass are staging and feeding up, but still sluggish. Look for fish on main-lake and secondary points.";
    tactics = [
      "Use suspending jerkbaits and slow-rolled spinnerbaits.",
      "Fish points, creek mouths, and deeper cover.",
      "Look for warming trends to trigger more activity."
    ];
  } else if (temp < 70) {
    analysis =
      "Bass are moving shallow and feeding actively. This is the prime pre-spawn/spawn window. Look for bedding activity.";
    tactics = [
      "Sight-fish for bedding bass with soft plastics.",
      "Use Texas-rigged lizards, creature baits, and jigs.",
      "Try topwater lures during warm spells."
    ];
  } else if (temp < 80) {
    analysis =
      "Ideal feeding and spawning temperatures. Bass are aggressive and often found shallow, especially early and late.";
    tactics = [
      "Fish shallow flats and spawning beds.",
      "Use soft plastics, jigs, and topwater lures.",
      "Try moving baits like spinnerbaits and chatterbaits."
    ];
  } else if (temp < 88) {
    analysis =
      "Hot water. Bass seek deeper, cooler water or thick shade during midday. Feeding peaks at dawn and dusk.";
    tactics = [
      "Fish deep drop-offs, channels, and shady spots.",
      "Use deep-diving crankbaits, Carolina rigs, or big worms.",
      "Try topwater early and late in the day."
    ];
  } else {
    analysis =
      "Extreme heat. Bass are stressed and very sluggish. Focus on the deepest, coolest water available.";
    tactics = [
      "Fish deep structure with slow baits.",
      "Downsize lures and use finesse tactics.",
      "Consider night fishing for more activity."
    ];
  }

  return {
    currentWater: temp,
    currentAir: air,
    analysis,
    tactics
  };
}
