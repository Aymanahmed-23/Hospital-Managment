

const API = import.meta.env.VITE_API_URL;

console.log('API URL:', API);

// ── GET ──────────────────────────────────────────────────────

export async function fetchPatients() {
  const r = await fetch(`${API}/patients`);
  const data = await r.json();
  // map snake_case from DB → camelCase for frontend
  return data.map(p => ({
    ...p,
    admitDate: p.admit_date,
    wardRate:  p.ward_rate,
    doctorFee: p.doctor_fee,
  }));
}

export async function fetchDoctors() {
  try {
    const r = await fetch(`${API}/doctors`);
    const data = await r.json();
    console.log('doctors:', data);
    return data;
  } catch (err) {
    console.error('fetchDoctors failed:', err);
    return [];
  }
}

export async function fetchNurses() {
  const r = await fetch(`${API}/nurses`);
  return r.json();
}

export async function fetchWards() {
  const r = await fetch(`${API}/wards`);
  const data = await r.json();
  // map snake_case from DB → camelCase for frontend
  return data.map(w => ({
    ...w,
    ratePerDay: w.rate_per_day,
  }));
}

// ── POST ─────────────────────────────────────────────────────

export async function admitPatient(patient) {
  const r = await fetch(`${API}/patients`, {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name:       patient.name,
      age:        patient.age,
      gender:     patient.gender,
      ward:       patient.ward,
      doctor:     patient.doctor,
      nurse:      patient.nurse,
      admit_date: patient.admitDate,
      days:       patient.days,
      ward_rate:  patient.wardRate,
      doctor_fee: patient.doctorFee,
      status:     patient.status,
      diagnosis:  patient.diagnosis,
    }),
  });
  return r.json();
}

export async function addDoctor(doctor) {
  const r = await fetch(`${API}/doctors`, {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name:      doctor.name,
      specialty: doctor.specialty,
      available: doctor.available,
      fee:       doctor.fee,
    }),
  });
  return r.json();
}

export async function addNurse(nurse) {
  const r = await fetch(`${API}/nurses`, {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name:      nurse.name,
      shift:     nurse.shift,
      available: nurse.available,
    }),
  });
  return r.json();
}

export async function addWard(ward) {
  const r = await fetch(`${API}/wards`, {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      type:         ward.type,
      name:         ward.name,
      beds:         ward.beds,
      occupied:     ward.occupied,
      rate_per_day: ward.ratePerDay,
    }),
  });
  return r.json();
}