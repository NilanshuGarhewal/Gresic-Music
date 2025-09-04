import React, { useState } from "react";

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

const CreatePage = () => {
  const apiLink = process.env.REACT_APP_API_ADMIN;

  const [beats, setBeats] = useState<Beat[]>([]);
  const [newBeat, setNewBeat] = useState<Partial<Beat>>({});

  // Create / Upload Beat
  const handleCreate = async () => {
    try {
      const res = await fetch(`${apiLink}/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newBeat),
      });

      const data = await res.json();
      setBeats([...beats, data]);
      setNewBeat({});
    } catch (err) {
      console.error("Error creating beat:", err);
    }
  };

  return (
    <div>
      <div className="upload-beat">
        <div className="upload-heading">Upload Beat</div>

        <div style={{ marginTop: "20px", display: "grid", gap: "10px" }}>
          <div>
            <label>Title</label>
            <input
              type="text"
              placeholder="Title"
              value={newBeat.title || ""}
              onChange={(e) =>
                setNewBeat({ ...newBeat, title: e.target.value })
              }
            />
          </div>

          <div>
            <label>Cover Image</label>
            <input
              placeholder="Cover Image URL"
              value={newBeat.coverImage || ""}
              onChange={(e) =>
                setNewBeat({ ...newBeat, coverImage: e.target.value })
              }
            />
          </div>

          <div>
            <label>Audio URL</label>
            <input
              placeholder="Audio URL"
              value={newBeat.audioUrl || ""}
              onChange={(e) =>
                setNewBeat({ ...newBeat, audioUrl: e.target.value })
              }
            />
          </div>

          <div>
            <label>BPM</label>
            <input
              type="number"
              placeholder="BPM"
              value={newBeat.bpm || ""}
              onChange={(e) =>
                setNewBeat({ ...newBeat, bpm: Number(e.target.value) })
              }
            />
          </div>

          <div>
            <label>Genre (comma separated)</label>
            <input
              placeholder="Hip Hop, Trap"
              value={newBeat.genre?.join(", ") || ""}
              onChange={(e) =>
                setNewBeat({
                  ...newBeat,
                  genre: e.target.value.split(",").map((g) => g.trim()),
                })
              }
            />
          </div>

          <div>
            <label>Mood (comma separated)</label>
            <input
              placeholder="Dark, Energetic"
              value={newBeat.mood?.join(", ") || ""}
              onChange={(e) =>
                setNewBeat({
                  ...newBeat,
                  mood: e.target.value.split(",").map((m) => m.trim()),
                })
              }
            />
          </div>

          <div>
            <label>Scale</label>
            <input
              placeholder="C Minor"
              value={newBeat.scale || ""}
              onChange={(e) =>
                setNewBeat({ ...newBeat, scale: e.target.value })
              }
            />
          </div>

          <div>
            <label>Duration</label>
            <input
              placeholder="3:45"
              value={newBeat.duration || ""}
              onChange={(e) =>
                setNewBeat({ ...newBeat, duration: e.target.value })
              }
            />
          </div>

          <div>
            <label>Price</label>
            <input
              placeholder="$50"
              value={newBeat.price || ""}
              onChange={(e) =>
                setNewBeat({ ...newBeat, price: e.target.value })
              }
            />
          </div>

          <div>
            <label>Description</label>
            <textarea
              placeholder="Describe your beat..."
              value={newBeat.description || ""}
              onChange={(e) =>
                setNewBeat({ ...newBeat, description: e.target.value })
              }
            />
          </div>

          <button onClick={handleCreate}>Add Beat</button>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
