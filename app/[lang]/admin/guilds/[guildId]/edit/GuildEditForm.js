"use client";

import { useState } from "react";

export default function GuildEditForm({ guild }) {
  const [description, setDescription] = useState(guild.description);
  const [banner, setBanner] = useState(guild.banner);
  const [videos, setVideos] = useState(guild.videos);
  const [newUrl, setNewUrl] = useState("");
  const [newType, setNewType] = useState("youtube");

  const addVideo = () => {
    if (!newUrl) return;
    setVideos([...videos, { url: newUrl, type: newType }]);
    setNewUrl("");
  };

  const removeVideo = (index) => {
    setVideos(videos.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(`/api/guilds/${guild.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ description, banner, videos }),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block mb-1">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 w-full"
        />
      </div>
      <div>
        <label className="block mb-1">Banner URL</label>
        <input
          type="text"
          value={banner}
          onChange={(e) => setBanner(e.target.value)}
          className="border p-2 w-full"
        />
      </div>
      <div>
        <label className="block mb-1">Videos</label>
        <ul className="space-y-2">
          {videos.map((v, idx) => (
            <li key={idx} className="flex items-center gap-2">
              <span className="flex-1">{v.type}: {v.url}</span>
              <button type="button" onClick={() => removeVideo(idx)} className="text-red-500">
                Remove
              </button>
            </li>
          ))}
        </ul>
        <div className="flex gap-2 mt-2">
          <input
            type="text"
            placeholder="Video URL"
            value={newUrl}
            onChange={(e) => setNewUrl(e.target.value)}
            className="border p-2 flex-1"
          />
          <select
            value={newType}
            onChange={(e) => setNewType(e.target.value)}
            className="border p-2"
          >
            <option value="youtube">YouTube</option>
            <option value="twitch">Twitch</option>
          </select>
          <button type="button" onClick={addVideo} className="border px-2">
            Add
          </button>
        </div>
      </div>
      <button type="submit" className="border px-4 py-2">Save</button>
    </form>
  );
}
