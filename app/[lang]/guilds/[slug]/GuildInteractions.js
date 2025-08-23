"use client";

import { useState } from "react";

export default function GuildInteractions({ guildId, initialAverage, initialComments }) {
  const [average, setAverage] = useState(initialAverage);
  const [comments, setComments] = useState(initialComments);
  const [page, setPage] = useState(1);

  async function submitVote(rating) {
    const res = await fetch(`/api/guilds/${guildId}/vote`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ rating }),
    });
    const data = await res.json();
    setAverage(data.average);
  }

  async function submitComment(e) {
    e.preventDefault();
    const form = e.target;
    const content = form.content.value.trim();
    if (!content) return;
    const optimistic = { id: Math.random().toString(36).slice(2), content };
    setComments([optimistic, ...comments]);
    form.reset();
    const res = await fetch(`/api/guilds/${guildId}/comments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content }),
    });
    const saved = await res.json();
    setComments((prev) => [saved, ...prev.filter((c) => c.id !== optimistic.id)]);
  }

  async function loadMore() {
    const nextPage = page + 1;
    const res = await fetch(`/api/guilds/${guildId}/comments?page=${nextPage}`);
    const data = await res.json();
    setComments((prev) => [...prev, ...data.comments]);
    setPage(nextPage);
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="font-semibold">Average rating: {average.toFixed(1)}</p>
        <div className="flex gap-2 mt-2">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              className="border px-2 py-1"
              onClick={() => submitVote(n)}
            >
              {n}
            </button>
          ))}
        </div>
      </div>

      <div>
        <form onSubmit={submitComment} className="flex gap-2 mb-4">
          <input
            type="text"
            name="content"
            className="border flex-1 p-1"
            placeholder="Add a comment"
          />
          <button type="submit" className="border px-2 py-1">
            Send
          </button>
        </form>
        <ul className="space-y-2">
          {comments.map((c) => (
            <li key={c.id} className="border p-2">
              {c.content}
            </li>
          ))}
        </ul>
        <button onClick={loadMore} className="mt-4 border px-2 py-1">
          Load more
        </button>
      </div>
    </div>
  );
}
