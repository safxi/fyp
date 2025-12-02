import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../state/AuthContext.jsx";
import { createCaseApi } from "../../utils/caseApi.js";

const CaseCreatePage = () => {
  const { accessToken, user } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    caseType: "",
    description: "",
    clientId: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const created = await createCaseApi(accessToken, form);
      navigate(`/cases/${created._id}`);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create case");
    } finally {
      setLoading(false);
    }
  };

  if (!["ADVOCATE", "STAFF", "ADMIN"].includes(user.role)) {
    return (
      <div className="page">
        <p>You do not have permission to create cases.</p>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Create Case</h1>
          <p className="page-subtitle">
            Provide basic information. Client ID can later be improved with a search UI.
          </p>
        </div>
        <Link to="/cases" className="secondary-button">
          Back to Cases
        </Link>
      </div>
      <form onSubmit={handleSubmit} className="auth-form card">
        {error && <div className="auth-error">{error}</div>}
        <label>
          Title
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Case Type
          <input
            name="caseType"
            value={form.caseType}
            onChange={handleChange}
          />
        </label>
        <label>
          Description
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={4}
            style={{ width: "100%", marginTop: "0.25rem" }}
          />
        </label>
        <label>
          Client ID (Mongo ObjectId)
          <input
            name="clientId"
            value={form.clientId}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Case"}
        </button>
      </form>
    </div>
  );
};

export default CaseCreatePage;


