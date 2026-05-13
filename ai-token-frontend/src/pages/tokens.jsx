import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "../lib/api.js";

export default function tokens() {
  const [form, setForm] = useState({ title: "", description: "" });
  const [tokens, setTokens] = useState([]);
  const [loading, setLoading] = useState(false);

  const authToken = localStorage.getItem("token");

  const fetchTokens = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/tokens`, {
        headers: { Authorization: `Bearer ${authToken}` },
        method: "GET",
      });
      const data = await res.json();
      setTokens(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to fetch tokens :", err);
    }
  };

  useEffect(() => {
    fetchTokens();
  }, [authToken]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/tokens`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        setForm({ title: "", description: "" });
        fetchTokens();
      } else {
        alert(data.message || "token creation failed");
      }
    } catch (err) {
      alert("Error creating token");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Create token</h2>

      <form onSubmit={handleSubmit} className="space-y-3 mb-8">
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="token Title"
          className="input input-bordered w-full"
          required
        />
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="token Description"
          className="textarea textarea-bordered w-full"
          required
        ></textarea>
        <button className="btn btn-primary" type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit token"}
        </button>
      </form>

      <h2 className="text-xl font-semibold mb-2">All tokens </h2>
      <div className="space-y-3">
        {tokens.map((token) => (
          <Link
            key={token._id}
            className="card shadow-md p-4 bg-gray-800"
            to={`/tokens/${token._id}`}
          >
            <h3 className="font-bold text-lg">{token.title}</h3>
            <p className="text-sm">{token.description}</p>
            <p className="text-sm text-gray-500">
              Created At: {new Date(token.createdAt).toLocaleString()}
            </p>
          </Link>
        ))}
        {tokens.length === 0 && <p>No tokens submitted yet.</p>}
      </div>
    </div>
  );
}
