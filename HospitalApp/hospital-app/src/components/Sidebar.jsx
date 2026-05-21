import "./Sidebar.css";

const NAV_ITEMS = [
  { id: "dashboard", icon: "📊", label: "Dashboard" },
  { id: "patients",  icon: "🧑‍⚕️", label: "Patients" },
  { id: "doctors",   icon: "👨‍⚕️", label: "Doctors" },
  { id: "nurses",    icon: "💉",  label: "Nurses" },
  { id: "wards",     icon: "🏥",  label: "Wards" },
];

export default function Sidebar({ activePage, onNavigate, admittedCount }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-mark">
          <div className="logo-icon">⚕️</div>
          <div>
            <div className="logo-text">MediCare</div>
            <div className="logo-sub">Hospital System</div>
          </div>
        </div>
      </div>

      <nav className="nav">
        <div className="nav-section">
          <div className="nav-label">Navigation</div>
          {NAV_ITEMS.map((item) => (
            <div
              key={item.id}
              className={`nav-item ${activePage === item.id ? "active" : ""}`}
              onClick={() => onNavigate(item.id)}
            >
              <span className="nav-icon">{item.icon}</span>
              {item.label}
              {item.id === "patients" && admittedCount > 0 && (
                <span className="nav-badge">{admittedCount}</span>
              )}
            </div>
          ))}
        </div>
      </nav>

      <div className="sidebar-footer">
        <div className="status-pill">
          <div className="status-dot" />
          <div className="status-text">System Operational</div>
        </div>
      </div>
    </aside>
  );
}
