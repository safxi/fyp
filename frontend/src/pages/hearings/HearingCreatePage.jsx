import React, { useState } from "react";
import { useAuth } from "../../state/AuthContext.jsx";
import { createAxiosClient } from "../../utils/axiosClient.js";

const HearingCreatePage = () => {
  const { accessToken } = useAuth();
  const [form, setForm] = useState({
    caseId: "",
    judgeId: "",
    scheduledAt: "",
    remarks: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);
    try {
      const client = createAxiosClient(accessToken);
      await client.post("/hearings", {
        caseId: form.caseId,
        judgeId: form.judgeId,
        scheduledAt: form.scheduledAt,
        remarks: form.remarks,
      });
      setMessage("Hearing scheduled successfully.");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to schedule hearing");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <h1 className="page-title">Schedule Hearing</h1>
      <p className="page-subtitle">
        Provide case ID, judge ID, and time. Conflict detection will warn if the judge is busy.
      </p>
      <form onSubmit={handleSubmit} className="auth-form card">
        {error && <div className="auth-error">{error}</div>}
        {message && <div className="auth-success">{message}</div>}
        <label>
          Case ID
          <input
            name="caseId"
            value={form.caseId}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Judge ID
          <input
            name="judgeId"
            value={form.judgeId}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Scheduled At
          <input
            type="datetime-local"
            name="scheduledAt"
            value={form.scheduledAt}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Remarks
          <textarea
            name="remarks"
            value={form.remarks}
            onChange={handleChange}
            rows={3}
            style={{ width: "100%", marginTop: "0.25rem" }}
          />
        </label>
        <button type="submit" disabled={loading}>
          {loading ? "Scheduling..." : "Schedule Hearing"}
        </button>
      </form>
    </div>
  );
};

export default HearingCreatePage;


