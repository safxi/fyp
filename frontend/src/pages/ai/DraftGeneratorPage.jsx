import React, { useState } from "react";
import { useAuth } from "../../state/AuthContext.jsx";
import { generateDraftApi } from "../../utils/aiApi.js";

const TYPES = ["PETITION", "LEGAL_NOTICE", "COMPLAINT", "CONTRACT_CLAUSE"];

const DraftGeneratorPage = () => {
  const { accessToken } = useAuth();
  const [form, setForm] = useState({
    type: "PETITION",
    caseId: "",
    parties: "",
    facts: "",
    relief: "",
    court: "",
  });
  const [draft, setDraft] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    setDraft("");
    try {
      const payload = {
        type: form.type,
        caseId: form.caseId || undefined,
        inputs: {
          parties: form.parties,
          facts: form.facts,
          relief: form.relief,
          court: form.court,
        },
      };
      const res = await generateDraftApi(accessToken, payload);
      setDraft(res.draft || "");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to generate draft");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <h1 className="page-title">AI Legal Drafting</h1>
      <p className="page-subtitle">
        Choose a draft type, provide structured inputs, and let the AI generate a first version.
      </p>
      <div className="detail-grid">
        <form onSubmit={handleSubmit} className="auth-form card">
          {error && <div className="auth-error">{error}</div>}
          <label>
            Draft Type
            <select name="type" value={form.type} onChange={handleChange}>
              {TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </label>
          <label>
            Case ID (optional)
            <input
              name="caseId"
              value={form.caseId}
              onChange={handleChange}
              placeholder="Link to existing case (Mongo ObjectId)"
            />
          </label>
          <label>
            Parties
            <textarea
              name="parties"
              value={form.parties}
              onChange={handleChange}
              rows={2}
            />
          </label>
          <label>
            Facts
            <textarea
              name="facts"
              value={form.facts}
              onChange={handleChange}
              rows={4}
            />
          </label>
          <label>
            Relief Sought
            <textarea
              name="relief"
              value={form.relief}
              onChange={handleChange}
              rows={3}
            />
          </label>
          <label>
            Court / Jurisdiction
            <input name="court" value={form.court} onChange={handleChange} />
          </label>
          <button type="submit" disabled={loading}>
            {loading ? "Generating..." : "Generate Draft"}
          </button>
        </form>
        <div className="card">
          <h2>Generated Draft</h2>
          {draft ? (
            <textarea
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              rows={20}
              style={{ width: "100%" }}
            />
          ) : (
            <p>No draft generated yet. Fill in the form and click Generate.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DraftGeneratorPage;


