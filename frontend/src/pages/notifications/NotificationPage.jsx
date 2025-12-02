import React, { useEffect, useState } from "react";
import { useAuth } from "../../state/AuthContext.jsx";
import {
  fetchNotifications,
  markNotificationRead,
} from "../../utils/notificationApi.js";

const NotificationPage = () => {
  const { accessToken } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await fetchNotifications(accessToken);
      setItems(data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load notifications");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (accessToken) load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken]);

  const handleMarkRead = async (id) => {
    try {
      await markNotificationRead(accessToken, id);
      await load();
    } catch (err) {
      // eslint-disable-next-line no-alert
      alert(err.response?.data?.message || "Failed to mark as read");
    }
  };

  return (
    <div className="page">
      <h1 className="page-title">Notifications</h1>
      <p className="page-subtitle">System updates related to your cases and hearings.</p>
      {loading && <div className="centered">Loading...</div>}
      {error && <div className="auth-error">{error}</div>}
      {!loading && !error && (
        <ul className="timeline">
          {items.length === 0 && <p>No notifications.</p>}
          {items.map((n) => (
            <li key={n._id} style={{ opacity: n.isRead ? 0.6 : 1 }}>
              <span className="timeline-date">
                {new Date(n.createdAt).toLocaleString()}
              </span>
              <span className="timeline-type">{n.type}</span>
              <p className="timeline-text">
                <strong>{n.title}</strong>
                <br />
                {n.message}
              </p>
              {!n.isRead && (
                <button
                  type="button"
                  className="secondary-button"
                  onClick={() => handleMarkRead(n._id)}
                >
                  Mark as read
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NotificationPage;


