require('dotenv').config();

const express = require('express');
const mysql   = require('mysql2');
const cors    = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host:     process.env.DB_HOST,
  user:     process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect(err => {
  if (err) { console.error('DB connection failed:', err); return; }
  console.log('MySQL connected');
});

app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));

// ── Routes ──────────────────────────────────────────

app.get('/api/patients', (req, res) => {
  db.query('SELECT * FROM patients', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

app.get('/api/doctors', (req, res) => {
  db.query('SELECT * FROM doctors', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

app.get('/api/nurses', (req, res) => {
  db.query('SELECT * FROM nurses', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

app.get('/api/wards', (req, res) => {
  db.query('SELECT * FROM wards', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

app.post('/api/patients', (req, res) => {

  const {
    name,
    age,
    gender,
    ward,
    doctor,
    nurse,
    admit_date,
    days,
    ward_rate,
    doctor_fee,
    status,
    diagnosis
  } = req.body;

  const sql = `
    INSERT INTO patients
    (name, age, gender, ward, doctor, nurse,
     admit_date, days, ward_rate, doctor_fee,
     status, diagnosis)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      name,
      age,
      gender,
      ward,
      doctor,
      nurse,
      admit_date,
      days,
      ward_rate,
      doctor_fee,
      status,
      diagnosis
    ],
    (err, result) => {
      if (err)
        return res.status(500).json({ error: err.message });

      res.json({
        message: 'Patient added successfully',
        patientId: result.insertId
      });
    }
  );
});


app.post('/api/doctors', (req, res) => {

  const { name, specialty, available, fee } = req.body;

  const sql = `
    INSERT INTO doctors
    (name, specialty, available, fee)
    VALUES (?, ?, ?, ?)
  `;

  db.query(
    sql,
    [name, specialty, available, fee],
    (err, result) => {
      if (err)
        return res.status(500).json({ error: err.message });

      res.json({
        message: 'Doctor added successfully',
        doctorId: result.insertId
      });
    }
  );
});




app.post('/api/nurses', (req, res) => {

  const { name, shift, available } = req.body;

  const sql = `
    INSERT INTO nurses
    (name, shift, available)
    VALUES (?, ?, ?)
  `;

  db.query(
    sql,
    [name, shift, available],
    (err, result) => {
      if (err)
        return res.status(500).json({ error: err.message });

      res.json({
        message: 'Nurse added successfully',
        nurseId: result.insertId
      });
    }
  );
});




app.post('/api/wards', (req, res) => {

  const {
    type,
    name,
    beds,
    occupied,
    rate_per_day
  } = req.body;

  const sql = `
    INSERT INTO wards
    (type, name, beds, occupied, rate_per_day)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [type, name, beds, occupied, rate_per_day],
    (err, result) => {
      if (err)
        return res.status(500).json({ error: err.message });

      res.json({
        message: 'Ward added successfully',
        wardId: result.insertId
      });
    }
  );
});

app.listen(5000, () => console.log('Server running on http://localhost:5000'));