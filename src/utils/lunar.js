// src/utils/lunar.js
import { Moon, LunarPhase } from "lunarphase-js";

// Get the lunar phase name for a given date (or today if no date)
export function getLunarPhase(date = new Date()) {
  return Moon.lunarPhase(date); // e.g., "Waxing Gibbous"
}

// Get the lunar phase emoji for a given date (or today if no date)
export function getLunarPhaseEmoji(date = new Date()) {
  return Moon.lunarPhaseEmoji(date); // e.g., "🌖"
}

// Is the moon waxing for a given date?
export function isWaxing(date = new Date()) {
  return Moon.isWaxing(date);
}

// Is the moon waning for a given date?
export function isWaning(date = new Date()) {
  return Moon.isWaning(date);
}

// Get the lunar age in days since last new moon (0-29.53)
export function getLunarAge(date = new Date()) {
  return Moon.lunarAge(date);
}

// Get the lunar age as percent through the synodic month (0-1)
export function getLunarAgePercent(date = new Date()) {
  return Moon.lunarAgePercent(date);
}

// Get the Brown Lunation Number for a given date
export function getLunationNumber(date = new Date()) {
  return Moon.lunationNumber(date);
}

// Optionally: Get the emoji for a specific phase (e.g., "FULL")
export function getEmojiForPhase(phase, hemisphere = "NORTHERN") {
  return Moon.emojiForLunarPhase(LunarPhase[phase.toUpperCase()], {
    hemisphere: hemisphere.toUpperCase()
  });
}
