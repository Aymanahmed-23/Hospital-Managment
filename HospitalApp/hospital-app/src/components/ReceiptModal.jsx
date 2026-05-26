import { Modal, Button } from "../components/UI";
import { formatCurrency, calcTotal, today } from "../utils";
import "./ReceiptModal.css";

export default function ReceiptModal({ patient, onClose }) {
  const total     = calcTotal(patient);
  const receiptId = `RCP-${patient.id}-${Date.now().toString().slice(-5)}`;

  return (
    <Modal
      title="Payment Receipt"
      onClose={onClose}
      maxWidth={480}
      footer={
        <>
          <Button variant="ghost" size="sm" onClick={onClose}>Close</Button>
          <Button variant="primary" size="sm" onClick={() => window.print()}>🖨 Print</Button>
        </>
      }
    >
      <div className="receipt">
        <div className="receipt-header">
          <div className="receipt-title">MediCare Hospital</div>
          <div className="receipt-subtitle">Official Payment Receipt</div>
          <div className="receipt-id">Receipt ID: {receiptId} · {today()}</div>
        </div>

        <div className="receipt-section">
          <div className="receipt-section-title">Patient Information</div>
          {[
            ["Name",          patient.name],
            ["Age / Gender",  `${patient.age} yrs / ${patient.gender}`],
            ["Diagnosis",     patient.diagnosis || "—"],
            ["Ward",          patient.ward],
            ["Doctor",        patient.doctor],
            ["Nurse",         patient.nurse || "—"],
          ].map(([k, v]) => (
            <div className="receipt-row" key={k}>
              <span className="receipt-key">{k}</span>
              <span className="receipt-val">{v}</span>
            </div>
          ))}
        </div>

        <div className="receipt-section">
          <div className="receipt-section-title">Billing Breakdown</div>
          {[
            ["Admission Date",   patient.admitDate],
            ["Duration of Stay", `${patient.days} day${patient.days > 1 ? "s" : ""}`],
            [`Ward Charges (${formatCurrency(patient.wardRate)}/day × ${patient.days})`,
              formatCurrency(patient.days * patient.wardRate)],
            ["Doctor Consultation Fee", formatCurrency(patient.doctorFee)],
            ["Miscellaneous Charges",   "₹400"],
          ].map(([k, v]) => (
            <div className="receipt-row" key={k}>
              <span className="receipt-key">{k}</span>
              <span className="receipt-val">{v}</span>
            </div>
          ))}
        </div>

        <div className="receipt-total">
          <span className="receipt-total-label">Grand Total</span>
          <span className="receipt-total-amount">{formatCurrency(total)}</span>
        </div>
      </div>
    </Modal>
  );
}
