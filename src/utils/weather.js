// src/utils/weather.js

/**
 * Returns weather analysis and tactics for bass fishing.
 * @param {Object} options - { date, weather, temp }
 * If date is provided, uses typical seasonal weather for Central FL.
 * If weather/temp are provided, uses those directly.
 */
export function getWeatherData({ date, weather, temp } = {}) {
  // If explicit weather is given, use it; else, infer from date/season
  let current, forecast, temperature, analysis, tactics;
  const now = typeof date === "string" ? new Date(date) : date || new Date();
  const month = now.getMonth() + 1;

  // Seasonal mapping for Central Florida (expand as needed)
  if (month >= 3 && month <= 5) {
    // Spring
    current = weather || "Partly Cloudy";
    forecast = "Mild, chance of light rain";
    temperature = temp || 78;
    analysis =
      "Spring brings warming weather and increased fish activity. Overcast skies and mild fronts encourage shallow feeding. Bass are aggressive post-spawn and often found near structure or vegetation.";
    tactics = [
      "Use spinnerbaits or chatterbaits near vegetation.",
      "Try topwater lures at dawn/dusk.",
      "Fish shallow flats and cover, especially after a warm front."
    ];
  } else if (month >= 6 && month <= 8) {
    // Summer
    current = weather || "Hot & Sunny";
    forecast = "Afternoon thunderstorms possible";
    temperature = temp || 90;
    analysis =
      "Summer heat pushes bass to deeper, cooler water or thick cover during midday. Early mornings and late evenings are prime times. Afternoon storms can trigger a feeding frenzy.";
    tactics = [
      "Fish deep structure or shaded areas midday.",
      "Use topwater early and late.",
      "Try big worms, deep-diving crankbaits, or jigs."
    ];
  } else if (month >= 9 && month <= 11) {
    // Fall
    current = weather || "Cloudy";
    forecast = "Cooler temps, scattered showers";
    temperature = temp || 82;
    analysis =
      "Fall cooling and cloud cover bring bass shallow to chase baitfish. Wind can concentrate fish on points and banks. Feeding activity is high as fish prepare for winter.";
    tactics = [
      "Use moving baits like spinnerbaits and jerkbaits.",
      "Fish wind-blown points and banks.",
      "Follow bait schools and fish near structure."
    ];
  } else {
    // Winter
    current = weather || "Cool & Clear";
    forecast = "Stable, light breeze";
    temperature = temp || 68;
    analysis =
      "Cool, clear weather slows bass activity. Look for the warmest water and fish slow. Afternoon sun can bring fish shallow.";
    tactics = [
      "Fish deep holes and ledges.",
      "Use jigs or slow soft plastics.",
      "Target sunny banks in afternoons."
    ];
  }

  return {
    current,
    forecast,
    temp: temperature,
    analysis,
    tactics
  };
}
