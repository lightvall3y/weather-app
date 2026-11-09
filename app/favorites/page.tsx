import { FavoritesList } from "./favorites-list";

export default function FavoritesPage() {
  return (
    <div className="grid gap-6">
      <h1 className="text-2xl font-bold">Favorites</h1>
      <FavoritesList />
    </div>
  );
}
