import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

type Beat = {
  _id: string;
  title?: string;
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

const EditBeat = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const apiLink = process.env.REACT_APP_API_ADMIN;

  const [beat, setBeat] = useState<Beat | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Fetch beat by id
  useEffect(() => {
    if (!id) return;
    fetch(`${apiLink}/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch beat");
        return res.json();
      })
      .then((data) => {
        setBeat(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  // Handle input changes (single fields)
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (!beat) return;
    const { name, value } = e.target;
    setBeat({ ...beat, [name]: value });
  };

  // Handle array fields (genre, mood)
  const handleArrayChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "genre" | "mood"
  ) => {
    if (!beat) return;
    setBeat({
      ...beat,
      [field]: e.target.value.split(",").map((s) => s.trim()),
    });
  };

  // Submit changes
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!id || !beat) return;

    setSaving(true);

    fetch(`${apiLink}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(beat),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to update beat");
        return res.json();
      })
      .then(() => {
        alert("✅ Beat updated successfully!");
        navigate("/admin");
      })
      .catch((err) => {
        console.error(err);
        alert("❌ Failed to update beat");
      })
      .finally(() => setSaving(false));
  };

  if (loading) return <p className="text-center p-6">Loading...</p>;
  if (!beat) return <p className="text-center p-6">Beat not found!</p>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-2xl">
      <h2 className="text-2xl font-bold mb-4">Edit Beat</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <InputField
          label="Title"
          name="title"
          value={beat.title || ""}
          onChange={handleChange}
        />

        {/* BPM */}
        <InputField
          label="BPM"
          name="bpm"
          type="number"
          value={beat.bpm || ""}
          onChange={handleChange}
        />

        {/* Genre */}
        <InputField
          label="Genre (comma separated)"
          value={beat.genre?.join(", ") || ""}
          onChange={(e) => handleArrayChange(e, "genre")}
        />

        {/* Mood */}
        <InputField
          label="Mood (comma separated)"
          value={beat.mood?.join(", ") || ""}
          onChange={(e) => handleArrayChange(e, "mood")}
        />

        {/* Scale */}
        <InputField
          label="Scale"
          name="scale"
          value={beat.scale || ""}
          onChange={handleChange}
        />

        {/* Duration */}
        <InputField
          label="Duration"
          name="duration"
          value={beat.duration || ""}
          onChange={handleChange}
        />

        {/* Price */}
        <InputField
          label="Price ($)"
          name="price"
          value={beat.price || ""}
          onChange={handleChange}
        />

        {/* Cover Image */}
        <InputField
          label="Cover Image URL"
          name="coverImage"
          value={beat.coverImage || ""}
          onChange={handleChange}
        />

        {/* Audio URL */}
        <InputField
          label="Audio URL"
          name="audioUrl"
          value={beat.audioUrl || ""}
          onChange={handleChange}
        />

        {/* Description */}
        <div>
          <label className="block font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={beat.description || ""}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
            rows={4}
          />
        </div>

        <button
          type="submit"
          disabled={saving}
          className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400"
        >
          {saving ? "Updating..." : "Update Beat"}
        </button>
      </form>
    </div>
  );
};

// Reusable input component
const InputField = ({
  label,
  name,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  name?: string;
  value: string | number;
  onChange: (e: any) => void;
  type?: string;
}) => (
  <div>
    <label className="block font-medium mb-1">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full p-2 border rounded-lg"
    />
  </div>
);

export default EditBeat;
