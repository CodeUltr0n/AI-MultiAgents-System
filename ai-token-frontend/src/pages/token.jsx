import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_BASE_URL } from "../lib/api.js";

export default function tokenDetailsPage() {
  const { id } = useParams();
  const [tokenData, setTokenData] = useState(null);
  const [loading, setLoading] = useState(true);

  const authToken = localStorage.getItem("token");

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const res = await fetch(
          `${API_BASE_URL}/tokens/${id}`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          },
        );
        const data = await res.json();
        if (res.ok) {
          setTokenData(data);
        } else {
          alert(data.message || "Failed to fetch token");
        }
      } catch (err) {
        console.error(err);
        alert("Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchToken();
  }, [authToken, id]);

  if (loading)
    return <div className="text-center mt-10">Loading token details...</div>;
  if (!tokenData) return <div className="text-center mt-10">token not found</div>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">token Details</h2>

      <div className="card bg-gray-800 shadow p-4 space-y-4">
        <h3 className="text-xl font-semibold">{tokenData.title}</h3>
        <p>{tokenData.description}</p>

        {/* Conditionally render extended details */}
        {tokenData.status && (
          <>
            <div className="divider">Metadata</div>
            <p>
              <strong>Status:</strong> {tokenData.status}
            </p>


            {tokenData.priority && (
              <p>
                <strong>Priority:</strong> {tokenData.priority}
              </p>
            )}

            {tokenData.relatedSkills?.length > 0 && (
              <p>
                <strong>Related Skills:</strong>{" "}
                {tokenData.relatedSkills.join(", ")}
              </p>
            )}

            {tokenData.helpfulNotes && (
              <div>
                <strong>Helpful Notes:</strong>
                <p className="mt-2 whitespace-pre-wrap">{tokenData.helpfulNotes}</p>
              </div>
            )}

            {tokenData.assignedTo && (
              <p>
                <strong>Assigned To:</strong> {tokenData.assignedTo?.email}
              </p>
            )}

            {tokenData.createdAt && (
              <p className="text-sm text-gray-500 mt-2">
                Created At: {new Date(tokenData.createdAt).toLocaleString()}
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
}
