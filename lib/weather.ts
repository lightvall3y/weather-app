export type Condition = "sunny" | "cloudy" | "rain" | "snow" | "storm" | "fog";
export type Region = "Europe" | "Asia" | "Americas" | "Africa" | "Oceania";

export type City = {
  slug: string;
  name: string;
  country: string;
  region: Region;
  tempC: number;
  condition: Condition;
  humidity: number;
  windKph: number;
  uvIndex: number;
};

export type ForecastDay = {
  label: string;
  highC: number;
  lowC: number;
  condition: Condition;
  rainChance: number;
};

export const regions: Region[] = ["Europe", "Asia", "Americas", "Africa", "Oceania"];

export const conditionInfo: Record<Condition, { icon: string; label: string }> = {
  sunny: { icon: "☀️", label: "Sunny" },
  cloudy: { icon: "☁️", label: "Cloudy" },
  rain: { icon: "🌧️", label: "Rain" },
  snow: { icon: "❄️", label: "Snow" },
  storm: { icon: "⛈️", label: "Thunderstorm" },
  fog: { icon: "🌫️", label: "Fog" },
};

export const cities: City[] = [
  { slug: "copenhagen", name: "Copenhagen", country: "Denmark", region: "Europe", tempC: 9, condition: "cloudy", humidity: 78, windKph: 22, uvIndex: 2 },
  { slug: "london", name: "London", country: "United Kingdom", region: "Europe", tempC: 11, condition: "rain", humidity: 85, windKph: 18, uvIndex: 1 },
  { slug: "reykjavik", name: "Reykjavik", country: "Iceland", region: "Europe", tempC: -1, condition: "snow", humidity: 80, windKph: 35, uvIndex: 1 },
  { slug: "madrid", name: "Madrid", country: "Spain", region: "Europe", tempC: 19, condition: "sunny", humidity: 40, windKph: 12, uvIndex: 5 },
  { slug: "tokyo", name: "Tokyo", country: "Japan", region: "Asia", tempC: 16, condition: "cloudy", humidity: 65, windKph: 14, uvIndex: 3 },
  { slug: "singapore", name: "Singapore", country: "Singapore", region: "Asia", tempC: 31, condition: "storm", humidity: 88, windKph: 10, uvIndex: 8 },
  { slug: "dubai", name: "Dubai", country: "UAE", region: "Asia", tempC: 36, condition: "sunny", humidity: 30, windKph: 16, uvIndex: 10 },
  { slug: "new-york", name: "New York", country: "USA", region: "Americas", tempC: 8, condition: "fog", humidity: 72, windKph: 20, uvIndex: 2 },
  { slug: "mexico-city", name: "Mexico City", country: "Mexico", region: "Americas", tempC: 22, condition: "sunny", humidity: 45, windKph: 9, uvIndex: 7 },
  { slug: "cairo", name: "Cairo", country: "Egypt", region: "Africa", tempC: 28, condition: "sunny", humidity: 35, windKph: 15, uvIndex: 9 },
  { slug: "cape-town", name: "Cape Town", country: "South Africa", region: "Africa", tempC: 21, condition: "cloudy", humidity: 60, windKph: 28, uvIndex: 6 },
  { slug: "sydney", name: "Sydney", country: "Australia", region: "Oceania", tempC: 24, condition: "rain", humidity: 70, windKph: 19, uvIndex: 6 },
];

export function getCity(slug: string): City | undefined {
  return cities.find((city) => city.slug === slug);
}

const days = ["Today", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const conditions: Condition[] = ["sunny", "cloudy", "rain", "snow", "storm", "fog"];

function hash(input: string): number {
  let h = 2166136261;
  for (const char of input) {
    h ^= char.charCodeAt(0);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h);
}

// Deterministic mock forecast: same city, same numbers, every time.
export function getForecast(city: City): ForecastDay[] {
  return days.map((label, i) => {
    const seed = hash(`${city.slug}-${i}`);
    const swing = (seed % 7) - 3;
    const highC = city.tempC + swing + 2;
    const condition = i === 0 ? city.condition : conditions[seed % conditions.length];
    return {
      label,
      highC,
      lowC: highC - 4 - (seed % 3),
      condition,
      rainChance: condition === "rain" || condition === "storm" ? 60 + (seed % 40) : seed % 30,
    };
  });
}
