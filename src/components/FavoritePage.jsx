import { Link } from "react-router-dom";

export default function FavoritePage() {
  // Placeholder, fetch from GET /api/me/favorites later
  const favorites = []; // [{_id, job:{_id,title,company,location}}]

  return (
    <main className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Saved Jobs</h1>

      {favorites.length === 0 ? (
        <p className="text-gray-600">
          No favorites yet. Browse the <Link to="/home" className="text-blue-600 underline">latest jobs</Link> and tap the ♥ icon to save.
        </p>
      ) : (
        <ul className="divide-y">
          {favorites.map(f => (
            <li key={f._id} className="py-4 flex items-start justify-between">
              <div>
                <Link to={`/post/${f.job._id}`} className="font-semibold hover:underline">
                  {f.job.title}
                </Link>
                <p className="text-sm text-gray-600">
                  {f.job.company} • {f.job.location}
                </p>
              </div>
              <Link to={`/post/${f.job._id}`} className="text-blue-600 hover:underline text-sm">
                View
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
