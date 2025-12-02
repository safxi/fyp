import React, { useEffect, useState } from "react";
import { useAuth } from "../../state/AuthContext.jsx";
import { fetchPendingUsers, updateUserStatusApi } from "../../utils/userApi.js";

const UserApprovalPage = () => {
  const { accessToken } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await fetchPendingUsers(accessToken);
      setItems(data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (accessToken) load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken]);

  const handleAction = async (id, status) => {
    try {
      await updateUserStatusApi(accessToken, id, status);
      await load();
    } catch (err) {
      // eslint-disable-next-line no-alert
      alert(err.response?.data?.message || "Failed to update user");
    }
  };

  return (
    <div className="page">
      <h1 className="page-title">Pending User Approvals</h1>
      <p className="page-subtitle">
        Approve or reject newly registered users before they can log in.
      </p>
      {loading && <div className="centered">Loading...</div>}
      {error && <div className="auth-error">{error}</div>}
      {!loading && !error && (
        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((u) => (
                <tr key={u._id}>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>{u.role}</td>
                  <td>
                    <button
                      type="button"
                      className="primary-button"
                      onClick={() => handleAction(u._id, "APPROVED")}
                    >
                      Approve
                    </button>{" "}
                    <button
                      type="button"
                      className="secondary-button"
                      onClick={() => handleAction(u._id, "REJECTED")}
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
              {items.length === 0 && (
                <tr>
                  <td colSpan={4}>No pending users.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserApprovalPage;


