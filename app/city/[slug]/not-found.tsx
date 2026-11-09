import Link from "next/link";

export default function CityNotFound() {
  return (
    <div className="grid gap-4 text-center">
      <h1 className="text-2xl font-bold">City not found</h1>
      <p className="text-slate-500">We don&apos;t have weather data for that place.</p>
      <Link href="/cities" className="text-sky-600 hover:underline">
        Browse all cities
      </Link>
    </div>
  );
}
