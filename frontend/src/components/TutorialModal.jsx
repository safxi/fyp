import React from "react";
import { useUi } from "../state/UiContext.jsx";
import { useAuth } from "../state/AuthContext.jsx";

const TutorialModal = () => {
  const { showTutorial, dismissTutorial } = useUi();
  const { user } = useAuth();

  if (!showTutorial || !user) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-card slide-up">
        <h2>Welcome to AI Judiciary CMS</h2>
        <p className="modal-text">
          This system helps automate court case management with role-based dashboards and AI
          assistance.
        </p>
        <ul className="modal-list">
          <li>
            <strong>Dashboard</strong>: Overview tailored to your role ({user.role}).
          </li>
          <li>
            <strong>Cases</strong>: View and manage case details, documents, and timelines.
          </li>
          <li>
            <strong>Hearings</strong>: Check the hearings calendar and schedule new hearings.
          </li>
          <li>
            <strong>AI Drafting</strong>: Generate first drafts of petitions, notices, and more.
          </li>
          <li>
            <strong>Notifications</strong>: Stay updated on case changes and hearing reminders.
          </li>
        </ul>
        <p className="modal-text">
          You can reopen this quick tour anytime from the Dashboard using the{" "}
          <strong>"Show quick tutorial"</strong> button.
        </p>
        <button type="button" className="primary-button" onClick={dismissTutorial}>
          Get started
        </button>
      </div>
    </div>
  );
};

export default TutorialModal;


