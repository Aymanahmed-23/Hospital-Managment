import { Card, CardHeader, CardBody } from "../components/UI";
import { formatCurrency } from "../utils";
import "./Dashboard.css";

function StatCard({ icon, value, label, sub }) {
  return (
    <div className="stat-card">
      <div className="stat-icon">{icon}</div>
      <div className="stat-value">{value}</div>
      <div className="stat-label">{label}</div>
      <div className="stat-sub">{sub}</div>
    </div>
  );
}

function WardOccupancyBar({ ward }) {
  const pct = Math.round((ward.occupied / ward.beds) * 100);
  const fillClass =
    ward.type === "emergency"
      ? "fill-emergency"
      : pct > 85
      ? "fill-full"
      : "fill-normal";

  return (
    <div className="ward-occ-row">
      <div className="ward-occ-header">
        <div>
          <div className="ward-occ-name">{ward.name}</div>
          <div className="ward-occ-rate">{formatCurrency(ward.ratePerDay)}/day</div>
        </div>
        <div className="ward-occ-right">
          <div
            className="ward-occ-pct"
            style={{ color: pct > 85 ? "var(--danger)" : "var(--text)" }}
          >
            {pct}%
          </div>
          <div className="ward-occ-count">
            {ward.occupied}/{ward.beds}
          </div>
        </div>
      </div>
      <div className="progress-bar">
        <div className={`progress-fill ${fillClass}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

export default function Dashboard({ patients, doctors, nurses, wards }) {
  const totalBeds    = wards.reduce((s, w) => s + w.beds, 0);
  const occupiedBeds = wards.reduce((s, w) => s + w.occupied, 0);
  const availDoctors = doctors.filter((d) => d.available).length;
  const totalRevenue = patients.reduce(
    (s, p) => s + p.days * p.wardRate + p.doctorFee + 400,
    0
  );
  const admitted = patients.filter((p) => p.status === "admitted");

  return (
    <div>
      <div className="page-header">
        <div className="page-title">Command Centre</div>
        <div className="page-sub">Real-time overview of hospital operations</div>
      </div>

      <div className="stats-grid">
        <StatCard icon="🏥" value={admitted.length}              label="Active Patients"   sub={`${patients.length} total admitted`} />
        <StatCard icon="🛏" value={`${occupiedBeds}/${totalBeds}`} label="Beds Occupied"   sub={`${totalBeds - occupiedBeds} available`} />
        <StatCard icon="👨‍⚕️" value={availDoctors}                label="Doctors On Duty"  sub={`${doctors.length} total staff`} />
        <StatCard icon="💰" value={formatCurrency(totalRevenue)} label="Total Revenue"     sub="All admitted patients" />
      </div>

      <div className="dashboard-grid">
        <Card>
          <CardHeader title="Recent Patients" />
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Patient</th>
                  <th>Ward</th>
                  <th>Doctor</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {patients.slice(0, 5).map((p) => (
                  <tr key={p.id}>
                    <td>
                      <div style={{ fontWeight: 600 }}>{p.name}</div>
                      <div style={{ fontSize: 11, color: "var(--text-muted)" }}>
                        {p.diagnosis}
                      </div>
                    </td>
                    <td style={{ fontSize: 13 }}>{p.ward}</td>
                    <td style={{ fontSize: 13 }}>{p.doctor}</td>
                    <td>
                      <span className={`badge badge-${p.status}`}>{p.status}</span>
                    </td>
                  </tr>
                ))}
                {patients.length === 0 && (
                  <tr>
                    <td colSpan={4}>
                      <div className="empty-state">
                        <div className="empty-icon">🏥</div>
                        <div className="empty-text">No patients yet</div>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>

        <Card>
          <CardHeader title="Ward Occupancy" />
          <CardBody>
            <div className="ward-occ-list">
              {wards.map((w) => (
                <WardOccupancyBar key={w.id} ward={w} />
              ))}
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
