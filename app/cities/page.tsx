import { CityBrowser } from "./city-browser";

export default function CitiesPage() {
  return (
    <div className="grid gap-6">
      <h1 className="text-2xl font-bold">Cities</h1>
      <CityBrowser />
    </div>
  );
}
