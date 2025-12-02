import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useAuth } from "../../state/AuthContext.jsx";
import { fetchCaseById } from "../../utils/caseApi.js";

const CaseDetailPage = () => {
  const { id } = useParams();
  const { accessToken } = useAuth();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await fetchCaseById(accessToken, id);
        setItem(data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load case");
      } finally {
        setLoading(false);
      }
    };
    if (accessToken && id) {
      load();
    }
  }, [accessToken, id]);

  if (loading) return <div className="centered">Loading...</div>;
  if (error) return <div className="auth-error">{error}</div>;
  if (!item) return null;

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1 className="page-title">
            {item.caseNumber} &mdash; {item.title}
          </h1>
          <p className="page-subtitle">
            Status: <strong>{item.status}</strong>
          </p>
        </div>
        <Link to="/cases" className="secondary-button">
          Back to Cases
        </Link>
      </div>
      <div className="detail-grid">
        <div className="card">
          <h2>Parties &amp; Assignment</h2>
          <p>
            <strong>Client:</strong> {item.client?.name}
          </p>
          <p>
            <strong>Advocate:</strong> {item.advocate?.name || "Not assigned"}
          </p>
          <p>
            <strong>Judge:</strong> {item.judge?.name || "Not assigned"}
          </p>
          <p>
            <strong>Filed Date:</strong>{" "}
            {item.filedDate ? new Date(item.filedDate).toLocaleDateString() : "-"}
          </p>
        </div>
        <div className="card">
          <h2>Description</h2>
          <p>{item.description || "No description provided."}</p>
        </div>
        <div className="card">
          <h2>Timeline</h2>
          {item.timeline && item.timeline.length > 0 ? (
            <ul className="timeline">
              {item.timeline
                .slice()
                .reverse()
                .map((t, idx) => (
                  <li key={idx}>
                    <span className="timeline-date">
                      {t.createdAt
                        ? new Date(t.createdAt).toLocaleString()
                        : ""}
                    </span>
                    <span className="timeline-type">{t.eventType}</span>
                    <p className="timeline-text">{t.description}</p>
                  </li>
                ))}
            </ul>
          ) : (
            <p>No timeline events recorded yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CaseDetailPage;


