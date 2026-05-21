import { useState } from "react";
import { ActionBar, Button, Modal, FormGrid, FormGroup, Input, Select, EmptyState } from "../components/UI";
import "./PageShared.css";

function AddNurseModal({ onClose, onSave }) {
  const [form, setForm] = useState({ name: "", shift: "Morning" });
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const handleSave = () => {
    if (!form.name) return;
    onSave({ ...form, available: true });
    onClose();
  };

  return (
    <Modal
      title="Add Nurse"
      onClose={onClose}
      maxWidth={400}
      footer={
        <>
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          <Button variant="primary" onClick={handleSave}>Add Nurse</Button>
        </>
      }
    >
      <FormGrid>
        <FormGroup label="Name" full>
          <Input placeholder="Nurse name" value={form.name} onChange={(e) => set("name", e.target.value)} />
        </FormGroup>
        <FormGroup label="Shift" full>
          <Select value={form.shift} onChange={(e) => set("shift", e.target.value)}>
            <option>Morning</option>
            <option>Evening</option>
            <option>Night</option>
          </Select>
        </FormGroup>
      </FormGrid>
    </Modal>
  );
}

export default function Nurses({ nurses, setNurses }) {
  const [showAdd, setShowAdd] = useState(false);

  const toggle = (id) =>
    setNurses((prev) =>
      prev.map((n) => (n.id === id ? { ...n, available: !n.available } : n))
    );
  const add = (data) =>
    setNurses((prev) => [...prev, { ...data, id: Date.now() }]);

  return (
    <div>
      <div className="page-header">
        <div className="page-title">Medical Staff — Nurses</div>
        <div className="page-sub">Manage nursing staff and shift assignments</div>
      </div>

      <ActionBar
        left={
          <div style={{ fontSize: 13, color: "var(--text-muted)" }}>
            {nurses.filter((n) => n.available).length} of {nurses.length} on duty
          </div>
        }
        right={<Button variant="primary" onClick={() => setShowAdd(true)}>+ Add Nurse</Button>}
      />

      <div className="card">
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Shift</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {nurses.map((n) => (
                <tr key={n.id}>
                  <td>{n.name}</td>
                  <td><span className="badge badge-normal">{n.shift}</span></td>
                  <td>
                    <span className={`badge badge-${n.available ? "available" : "unavailable"}`}>
                      {n.available ? "● On Duty" : "● Off Duty"}
                    </span>
                  </td>
                  <td>
                    <Button
                      variant={n.available ? "danger" : "ghost"}
                      size="sm"
                      onClick={() => toggle(n.id)}
                    >
                      {n.available ? "Mark Off" : "Mark On"}
                    </Button>
                  </td>
                </tr>
              ))}
              {nurses.length === 0 && (
                <tr><td colSpan={4}><EmptyState icon="💉" text="No nurses added" /></td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showAdd && <AddNurseModal onClose={() => setShowAdd(false)} onSave={add} />}
    </div>
  );
}
