import { useState } from "react";
import { ActionBar, SearchInput, Button, EmptyState } from "../components/UI";
import AdmitModal   from "../components/AdmitModal";
import ReceiptModal from "../components/ReceiptModal";
import { formatCurrency, calcTotal } from "../utils";
import "./PageShared.css";

export default function Patients({ patients, setPatients, doctors, nurses, wards }) {
  const [showAdmit, setShowAdmit] = useState(false);
  const [receipt,   setReceipt]   = useState(null);
  const [search,    setSearch]    = useState("");

  const filtered = patients.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const admit    = (data) => setPatients((prev) => [...prev, { ...data, id: Date.now() }]);
  const discharge = (id) =>
    setPatients((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: "discharged" } : p))
    );

  return (
    <div>
      <div className="page-header">
        <div className="page-title">Patient Management</div>
        <div className="page-sub">Admissions, assignments and billing</div>
      </div>

      <ActionBar
        left={<SearchInput value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search patients…" />}
        right={<Button variant="primary" onClick={() => setShowAdmit(true)}>+ Admit Patient</Button>}
      />

      <div className="card">
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Patient</th>
                <th>Ward</th>
                <th>Doctor</th>
                <th>Nurse</th>
                <th>Days</th>
                <th>Total Bill</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr key={p.id}>
                  <td>
                    <div>{p.name}</div>
                    <div style={{ fontSize: 11, color: "var(--text-muted)" }}>
                      {p.age}y · {p.gender} · {p.diagnosis || "—"}
                    </div>
                  </td>
                  <td style={{ fontSize: 13 }}>{p.ward}</td>
                  <td style={{ fontSize: 13 }}>{p.doctor}</td>
                  <td style={{ fontSize: 13 }}>{p.nurse}</td>
                  <td style={{ fontSize: 13 }}>{p.days}d</td>
                  <td style={{ fontWeight: 600, color: "var(--gold)" }}>
                    {formatCurrency(calcTotal(p))}
                  </td>
                  <td>
                    <span className={`badge badge-${p.status}`}>{p.status}</span>
                  </td>
                  <td>
                    <div style={{ display: "flex", gap: 6 }}>
                      <Button variant="ghost" size="sm" onClick={() => setReceipt(p)}>🧾</Button>
                      {p.status === "admitted" && (
                        <Button variant="danger" size="sm" onClick={() => discharge(p.id)}>
                          Discharge
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={8}>
                    <EmptyState icon="🏥" text="No patients found" />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showAdmit && (
        <AdmitModal
          doctors={doctors}
          nurses={nurses}
          wards={wards}
          onClose={() => setShowAdmit(false)}
          onAdmit={admit}
        />
      )}
      {receipt && <ReceiptModal patient={receipt} onClose={() => setReceipt(null)} />}
    </div>
  );
}
