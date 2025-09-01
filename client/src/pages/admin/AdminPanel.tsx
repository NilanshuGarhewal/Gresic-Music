import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type Beat = {
  _id: string;
  title: string;
  bpm?: number;
  audioUrl: string;
  genre?: string[];
  mood?: string[];
  scale?: string;
  duration?: string;
  price?: string;
  description?: string;
  coverImage?: string;
};

const AdminPanel = () => {
  // Base URL for admin routes
  const apiLink = process.env.REACT_APP_API_ADMIN;

  const [beats, setBeats] = useState<Beat[]>([]);
  const [search, setSearch] = useState("");

  // Fetch beats
  useEffect(() => {
    fetch(`${apiLink}`) // backend GET / → returns all beats
      .then((res) => res.json())
      .then((data) => setBeats(data))
      .catch((err) => console.error(err));
  }, [apiLink]);

  // Delete Beat
  const handleDelete = (id: string) => {
    fetch(`${apiLink}/${id}`, { method: "DELETE" }).then(() =>
      setBeats(beats.filter((b) => b._id !== id))
    );
  };

  // Filter beats by search
  const filteredBeats = beats.filter((b) =>
    b.title?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="admin-panel">
      <div className="admin-search">
        <p className="admin-heading">Admin Panel</p>

        {/* Search */}
        <input
          type="text"
          placeholder="Search by title"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <Link to="/create">
        <button>Upload New</button>
      </Link>

      {/* Beats Table */}
      <table border={1} style={{ marginTop: "20px", width: "100%" }}>
        <thead>
          <tr>
            <th>Title</th>
            <th>BPM</th>
            <th>Genre</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredBeats.map((beat) => (
            <tr key={beat._id}>
              <td>{beat.title}</td>
              <td>{beat.bpm}</td>
              <td>{beat.genre?.join(", ")}</td>
              <td>
                <button onClick={() => handleDelete(beat._id)}>Delete</button>
                <a href={`/edit/${beat._id}`}>
                  <button>Edit</button>
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPanel;
