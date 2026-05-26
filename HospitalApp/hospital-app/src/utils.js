export const formatCurrency = (n) =>
  `₹${Number(n).toLocaleString("en-IN")}`;

export const today = () =>
  new Date().toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

export const calcTotal = (patient) =>
  patient.days * patient.wardRate + patient.doctorFee + 400;
