import { formatCurrency } from "../utils";
import "./Wards.css";
import "./PageShared.css";

function WardSummaryCard({ type, label, icon, wards }) {
  const beds = wards.reduce((s, w) => s + w.beds, 0);
  const occ  = wards.reduce((s, w) => s + w.occupied, 0);
  const pct  = Math.round((occ / beds) * 100);

  return (
    <div className="ward-summary-card">
      <div className="stat-icon">{icon}</div>
      <div className="stat-value">{occ}/{beds}</div>
      <div className="stat-label">{label} Occupancy</div>
      <div className="ward-summary-bar">
        <div className="progress-bar">
          <div
            className={`progress-fill ${type === "emergency" ? "fill-emergency" : "fill-normal"}`}
            style={{ width: `${pct}%` }}
          />
        </div>
        <div className="ward-summary-pct">{pct}% full</div>
      </div>
    </div>
  );
}

function WardCard({ ward }) {
  const pct = Math.round((ward.occupied / ward.beds) * 100);
  const fillClass =
    ward.type === "emergency" ? "fill-emergency" : pct > 85 ? "fill-full" : "fill-normal";

  return (
    <div className="ward-card">
      <div className="ward-card-header">
        <div>
          <div className="ward-name">{ward.name}</div>
          <span className={`badge badge-${ward.type === "emergency" ? "emergency" : "normal"}`} style={{ marginTop: 4 }}>
            {ward.type === "emergency" ? "Emergency" : "Normal"}
          </span>
        </div>
        <div className="ward-rate">{formatCurrency(ward.ratePerDay)}/day</div>
      </div>
      <div className="progress-bar">
        <div className={`progress-fill ${fillClass}`} style={{ width: `${pct}%` }} />
      </div>
      <div className="ward-stats">
        <span>Occupied: <strong>{ward.occupied}</strong></span>
        <span>Available: <strong>{ward.beds - ward.occupied}</strong></span>
        <span>Total: <strong>{ward.beds}</strong></span>
      </div>
    </div>
  );
}

export default function Wards({ wards }) {
  const normalWards    = wards.filter((w) => w.type === "normal");
  const emergencyWards = wards.filter((w) => w.type === "emergency");

  return (
    <div>
      <div className="page-header">
        <div className="page-title">Ward Management</div>
        <div className="page-sub">Normal and emergency wards overview</div>
      </div>

      <div className="ward-summary-grid">
        <WardSummaryCard type="normal"    label="General Wards"   icon="🏠" wards={normalWards} />
        <WardSummaryCard type="emergency" label="Emergency Wards" icon="🚨" wards={emergencyWards} />
      </div>

      <div className="wards-grid">
        {wards.map((w) => (
          <WardCard key={w.id} ward={w} />
        ))}
      </div>
    </div>
  );
}
