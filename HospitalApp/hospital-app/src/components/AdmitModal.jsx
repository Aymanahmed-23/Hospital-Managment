import { useState } from "react";
import { Modal, FormGrid, FormGroup, Input, Select, Button } from "../components/UI";
import { formatCurrency } from "../utils";

export default function AdmitModal({ doctors, nurses, wards, onClose, onAdmit }) {
  const [form, setForm] = useState({
    name: "", age: "", gender: "Male", diagnosis: "",
    wardId: "", doctorId: "", nurseId: "", days: 1,
  });

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const selWard = wards.find((w) => w.id === Number(form.wardId));
  const selDoc  = doctors.find((d) => d.id === Number(form.doctorId));
  const wardCost = selWard ? selWard.ratePerDay * Number(form.days) : 0;
  const docFee   = selDoc ? selDoc.fee : 0;
  const total    = wardCost + docFee + 400;

  const handleSubmit = () => {
    if (!form.name || !form.age || !form.wardId || !form.doctorId) return;
    onAdmit({
      name: form.name,
      age: form.age,
      gender: form.gender,
      diagnosis: form.diagnosis,
      ward: selWard?.name,
      doctor: selDoc?.name,
      nurse: nurses.find((n) => n.id === Number(form.nurseId))?.name || "—",
      admitDate: new Date().toISOString().split("T")[0],
      days: Number(form.days),
      wardRate: selWard?.ratePerDay || 0,
      doctorFee: docFee,
      status: "admitted",
    });
    onClose();
  };

  return (
    <Modal
      title="Admit New Patient"
      onClose={onClose}
      footer={
        <>
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          <Button variant="primary" onClick={handleSubmit}>Admit Patient</Button>
        </>
      }
    >
      <FormGrid>
        <FormGroup label="Full Name" full>
          <Input placeholder="Patient name" value={form.name} onChange={(e) => set("name", e.target.value)} />
        </FormGroup>
        <FormGroup label="Age">
          <Input type="number" placeholder="Age" value={form.age} onChange={(e) => set("age", e.target.value)} />
        </FormGroup>
        <FormGroup label="Gender">
          <Select value={form.gender} onChange={(e) => set("gender", e.target.value)}>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </Select>
        </FormGroup>
        <FormGroup label="Diagnosis" full>
          <Input placeholder="Primary diagnosis" value={form.diagnosis} onChange={(e) => set("diagnosis", e.target.value)} />
        </FormGroup>
        <FormGroup label="Ward">
          <Select value={form.wardId} onChange={(e) => set("wardId", e.target.value)}>
            <option value="">Select ward</option>
            {wards.map((w) => (
              <option key={w.id} value={w.id}>
                {w.name} — {formatCurrency(w.ratePerDay)}/day
              </option>
            ))}
          </Select>
        </FormGroup>
        <FormGroup label="Doctor">
          <Select value={form.doctorId} onChange={(e) => set("doctorId", e.target.value)}>
            <option value="">Select doctor</option>
            {doctors.filter((d) => d.available).map((d) => (
              <option key={d.id} value={d.id}>{d.name}</option>
            ))}
          </Select>
        </FormGroup>
        <FormGroup label="Nurse">
          <Select value={form.nurseId} onChange={(e) => set("nurseId", e.target.value)}>
            <option value="">Select nurse</option>
            {nurses.filter((n) => n.available).map((n) => (
              <option key={n.id} value={n.id}>{n.name} ({n.shift})</option>
            ))}
          </Select>
        </FormGroup>
        <FormGroup label="Stay (Days)">
          <Input type="number" min="1" value={form.days} onChange={(e) => set("days", e.target.value)} />
        </FormGroup>
      </FormGrid>

      {selWard && selDoc && (
        <div className="bill-estimate">
          <div className="bill-label">Estimated Bill</div>
          <div className="bill-row"><span>Ward ({form.days}d)</span><span>{formatCurrency(wardCost)}</span></div>
          <div className="bill-row"><span>Doctor Fee</span><span>{formatCurrency(docFee)}</span></div>
          <div className="bill-row"><span>Misc Charges</span><span>₹400</span></div>
          <div className="bill-total">
            <span>Total</span>
            <span style={{ color: "var(--accent)" }}>{formatCurrency(total)}</span>
          </div>
        </div>
      )}
    </Modal>
  );
}
