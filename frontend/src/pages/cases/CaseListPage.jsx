import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../state/AuthContext.jsx";
import { fetchCases } from "../../utils/caseApi.js";

const CaseListPage = () => {
  const { accessToken, user } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await fetchCases(accessToken);
        setItems(data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load cases");
      } finally {
        setLoading(false);
      }
    };
    if (accessToken) {
      load();
    }
  }, [accessToken]);

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Cases</h1>
          <p className="page-subtitle">
            Showing cases relevant to your role ({user.role}).
          </p>
        </div>
        {["ADVOCATE", "STAFF", "ADMIN"].includes(user.role) && (
          <Link to="/cases/new" className="primary-button">
            + Create Case
          </Link>
        )}
      </div>
      {loading && <div className="centered">Loading cases...</div>}
      {error && <div className="auth-error">{error}</div>}
      {!loading && !error && (
        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th>Case No.</th>
                <th>Title</th>
                <th>Status</th>
                <th>Client</th>
                <th>Advocate</th>
                <th>Judge</th>
              </tr>
            </thead>
            <tbody>
              {items.map((c) => (
                <tr key={c._id}>
                  <td>
                    <Link to={`/cases/${c._id}`}>{c.caseNumber}</Link>
                  </td>
                  <td>{c.title}</td>
                  <td>{c.status}</td>
                  <td>{c.client?.name}</td>
                  <td>{c.advocate?.name}</td>
                  <td>{c.judge?.name}</td>
                </tr>
              ))}
              {items.length === 0 && (
                <tr>
                  <td colSpan={6}>No cases found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CaseListPage;


