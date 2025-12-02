import React, { useEffect, useState } from "react";
import { useAuth } from "../../state/AuthContext.jsx";
import { fetchHearingsCalendar } from "../../utils/hearingApi.js";

const groupByDate = (hearings) => {
  const map = {};
  hearings.forEach((h) => {
    const d = new Date(h.scheduledAt);
    const key = d.toISOString().slice(0, 10);
    if (!map[key]) map[key] = [];
    map[key].push(h);
  });
  return map;
};

const HearingCalendarPage = () => {
  const { accessToken } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await fetchHearingsCalendar(accessToken);
        setItems(data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load hearings");
      } finally {
        setLoading(false);
      }
    };
    if (accessToken) load();
  }, [accessToken]);

  const grouped = groupByDate(items);

  return (
    <div className="page">
      <h1 className="page-title">Hearings Calendar</h1>
      <p className="page-subtitle">Upcoming hearings grouped by date.</p>
      {loading && <div className="centered">Loading hearings...</div>}
      {error && <div className="auth-error">{error}</div>}
      {!loading && !error && (
        <div className="cards-grid">
          {Object.keys(grouped).length === 0 && <p>No hearings scheduled.</p>}
          {Object.entries(grouped).map(([date, hs]) => (
            <div key={date} className="card">
              <h2>{new Date(date).toDateString()}</h2>
              <ul className="timeline">
                {hs.map((h) => (
                  <li key={h._id}>
                    <span className="timeline-date">
                      {new Date(h.scheduledAt).toLocaleTimeString()}
                    </span>
                    <span className="timeline-type">{h.status}</span>
                    <p className="timeline-text">
                      {h.case?.caseNumber} &mdash; {h.case?.title} (Judge:{" "}
                      {h.judge?.name})
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HearingCalendarPage;


