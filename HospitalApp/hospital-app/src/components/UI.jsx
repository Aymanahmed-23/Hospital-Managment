import "./UI.css";

/* ── Badge ─────────────────────────────────────────── */
export function Badge({ variant = "available", children }) {
  return <span className={`badge badge-${variant}`}>{children}</span>;
}

/* ── Button ────────────────────────────────────────── */
export function Button({ variant = "primary", size, onClick, children }) {
  return (
    <button
      className={`btn btn-${variant}${size ? ` btn-${size}` : ""}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

/* ── Card ──────────────────────────────────────────── */
export function Card({ children }) {
  return <div className="card">{children}</div>;
}

export function CardHeader({ title, action }) {
  return (
    <div className="card-header">
      <div className="card-title">{title}</div>
      {action}
    </div>
  );
}

export function CardBody({ children }) {
  return <div className="card-body">{children}</div>;
}

/* ── Modal ─────────────────────────────────────────── */
export function Modal({ title, onClose, footer, children, maxWidth = 560 }) {
  return (
    <div
      className="modal-overlay"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="modal" style={{ maxWidth }}>
        <div className="modal-header">
          <div className="modal-title">{title}</div>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        <div className="modal-body">{children}</div>
        {footer && <div className="modal-footer">{footer}</div>}
      </div>
    </div>
  );
}

/* ── Form primitives ───────────────────────────────── */
export function FormGrid({ children }) {
  return <div className="form-grid">{children}</div>;
}

export function FormGroup({ label, full, children }) {
  return (
    <div className={`form-group${full ? " full" : ""}`}>
      <label className="form-label">{label}</label>
      {children}
    </div>
  );
}

export function Input({ ...props }) {
  return <input className="form-input" {...props} />;
}

export function Select({ children, ...props }) {
  return (
    <select className="form-select" {...props}>
      {children}
    </select>
  );
}

/* ── Empty State ───────────────────────────────────── */
export function EmptyState({ icon = "📭", text = "Nothing here yet" }) {
  return (
    <div className="empty-state">
      <div className="empty-icon">{icon}</div>
      <div className="empty-text">{text}</div>
    </div>
  );
}

/* ── Action Bar ────────────────────────────────────── */
export function ActionBar({ left, right }) {
  return (
    <div className="action-bar">
      <div>{left}</div>
      <div>{right}</div>
    </div>
  );
}

/* ── Search Input ──────────────────────────────────── */
export function SearchInput({ value, onChange, placeholder }) {
  return (
    <div className="search-wrap">
      <span className="search-icon">🔍</span>
      <input
        className="search-input"
        placeholder={placeholder || "Search…"}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
