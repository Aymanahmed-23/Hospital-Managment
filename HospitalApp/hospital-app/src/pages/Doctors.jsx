import { useState } from "react";
import { ActionBar, Button, Modal, FormGrid, FormGroup, Input, EmptyState } from "../components/UI";

import { formatCurrency } from "../utils";
import "./PageShared.css";
import { addDoctor } from "../data/seedData";


function AddDoctorModal({ onClose, onSave }) {
  const [form, setForm] = useState({ name: "", specialty: "", fee: "" });
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const handleSave = () => {
    if (!form.name || !form.specialty) return;
    onSave({ ...form, fee: Number(form.fee), available: true });
    onClose();
  };

  return (
    <Modal
      title="Add Doctor"
      onClose={onClose}
      maxWidth={440}
      footer={
        <>
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          <Button variant="primary" onClick={handleSave}>Add Doctor</Button>
        </>
      }
    >
      <FormGrid>
        <FormGroup label="Doctor Name" full>
          <Input placeholder="Dr. Full Name" value={form.name} onChange={(e) => set("name", e.target.value)} />
        </FormGroup>
        <FormGroup label="Specialty">
          <Input placeholder="e.g. Cardiology" value={form.specialty} onChange={(e) => set("specialty", e.target.value)} />
        </FormGroup>
        <FormGroup label="Consultation Fee (₹)">
          <Input type="number" placeholder="1000" value={form.fee} onChange={(e) => set("fee", e.target.value)} />
        </FormGroup>
      </FormGrid>
    </Modal>
  );
}

export default function Doctors({ doctors, setDoctors }) {
  const [showAdd, setShowAdd] = useState(false);

  const toggle = (id) =>
    setDoctors((prev) =>
      prev.map((d) => (d.id === id ? { ...d, available: !d.available } : d))
    );
  const add = async (data) => {
    const res = await addDoctor(data);
    setDoctors((prev) => [...prev, { ...data, id: res.doctorId }]);
  };

  
  return (
    <div>
      <div className="page-header">
        <div className="page-title">Medical Staff — Doctors</div>
        <div className="page-sub">Manage doctor profiles and availability</div>
      </div>

      <ActionBar
        left={
          <div style={{ fontSize: 13, color: "var(--text-muted)" }}>
            {doctors.filter((d) => d.available).length} of {doctors.length} available
          </div>
        }
        right={<Button variant="primary" onClick={() => setShowAdd(true)}>+ Add Doctor</Button>}
      />

      <div className="card">
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Specialty</th>
                <th>Consultation Fee</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {doctors.map((d) => (
                <tr key={d.id}>
                  <td>{d.name}</td>
                  <td><span className="badge badge-normal">{d.specialty}</span></td>
                  <td style={{ color: "var(--gold)", fontWeight: 600 }}>{formatCurrency(d.fee)}</td>
                  <td>
                    <span className={`badge badge-${d.available ? "available" : "unavailable"}`}>
                      {d.available ? "● Available" : "● Off Duty"}
                    </span>
                  </td>
                  <td>
                    <Button
                      variant={d.available ? "danger" : "ghost"}
                      size="sm"
                      onClick={() => toggle(d.id)}
                    >
                      {d.available ? "Mark Off Duty" : "Mark Available"}
                    </Button>
                  </td>
                </tr>
              ))}
              {doctors.length === 0 && (
                <tr><td colSpan={5}><EmptyState icon="👨‍⚕️" text="No doctors added" /></td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showAdd && <AddDoctorModal onClose={() => setShowAdd(false)} onSave={add} />}
    </div>
  );
}
