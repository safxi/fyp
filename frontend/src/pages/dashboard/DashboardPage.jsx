import React from "react";
import { useAuth } from "../../state/AuthContext.jsx";
import { useUi } from "../../state/UiContext.jsx";
import { Link } from "react-router-dom";
import { CaseIcon, CalendarIcon, AIDocumentIcon } from "../../components/Icons.jsx";

const DashboardPage = () => {
  const { user } = useAuth();
  const { reopenTutorial } = useUi();

  if (!user) return null;

  return (
    <div className="page fade-in">
      <div className="page-header">
        <div>
          <h1 className="page-title">Welcome, {user.name}</h1>
          <p className="page-subtitle">
            Role: <strong>{user.role}</strong> &mdash; start with one of the quick actions below.
          </p>
        </div>
        <button type="button" className="secondary-button" onClick={reopenTutorial}>
          Show quick tutorial
        </button>
      </div>
      <div className="cards-grid">
        <Link to="/cases" className="card card-hover card-row">
          <CaseIcon />
          <div>
            <h2>My Cases</h2>
            <p>
              View and manage cases assigned to your role, including documents and timelines.
            </p>
          </div>
        </Link>
        <Link to="/hearings" className="card card-hover card-row">
          <CalendarIcon />
          <div>
            <h2>Hearings Calendar</h2>
            <p>See upcoming hearings and avoid scheduling conflicts.</p>
          </div>
        </Link>
        <Link to="/ai/draft" className="card card-hover card-row">
          <AIDocumentIcon />
          <div>
            <h2>AI Legal Drafting</h2>
            <p>Generate first drafts for petitions, notices, complaints, and more.</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default DashboardPage;


