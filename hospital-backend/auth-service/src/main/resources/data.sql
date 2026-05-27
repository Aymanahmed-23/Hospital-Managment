-- ─────────────────────────────────────────────────────────────
-- Hospital Management System — Sample Seed Data
-- Run AFTER schema.sql
-- Passwords are BCrypt hashed — plain text shown in comments
-- ─────────────────────────────────────────────────────────────

-- ── Users ─────────────────────────────────────────────────────
-- plain passwords: admin123, doctor123, nurse123
INSERT INTO users (username, email, password, role) VALUES
('admin',       'admin@hospital.com',   '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'ROLE_ADMIN'),
('dr.smith',    'smith@hospital.com',   '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'ROLE_DOCTOR'),
('dr.jones',    'jones@hospital.com',   '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'ROLE_DOCTOR'),
('nurse.mary',  'mary@hospital.com',    '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'ROLE_NURSE'),
('nurse.john',  'john@hospital.com',    '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'ROLE_NURSE');

-- ── Wards ─────────────────────────────────────────────────────
INSERT INTO wards (type, name, beds, occupied, rate_per_day) VALUES
('GENERAL',     'General Ward A',       20, 14, 500.00),
('GENERAL',     'General Ward B',       20, 10, 500.00),
('ICU',         'Intensive Care Unit',  10,  7, 5000.00),
('PRIVATE',     'Private Room Block A', 15,  9, 2500.00),
('PRIVATE',     'Private Room Block B', 15,  6, 2500.00),
('PAEDIATRIC',  'Children Ward',        12,  5, 750.00),
('MATERNITY',   'Maternity Ward',       10,  4, 1200.00),
('EMERGENCY',   'Emergency Ward',        8,  3, 3000.00);

-- ── Patients ──────────────────────────────────────────────────
INSERT INTO patients (name, age, gender, ward, doctor, nurse, admit_date, days, ward_rate, doctor_fee, status, diagnosis) VALUES
('Rahul Sharma',      34, 'Male',   'General Ward A',       'dr.smith',   'nurse.mary', '2026-05-10', 16, 500.00,  1500.00, 'ADMITTED',   'Typhoid Fever'),
('Priya Patel',       28, 'Female', 'Maternity Ward',       'dr.jones',   'nurse.john', '2026-05-18',  8, 1200.00, 2000.00, 'ADMITTED',   'Prenatal Care'),
('Arjun Mehta',       55, 'Male',   'ICU',                  'dr.smith',   'nurse.mary', '2026-05-20',  6, 5000.00, 5000.00, 'CRITICAL',   'Cardiac Arrest'),
('Sneha Reddy',       42, 'Female', 'Private Room Block A', 'dr.jones',   'nurse.john', '2026-05-22',  4, 2500.00, 3000.00, 'ADMITTED',   'Appendicitis'),
('Mohammed Ali',       8, 'Male',   'Children Ward',        'dr.smith',   'nurse.mary', '2026-05-23',  3, 750.00,  1000.00, 'ADMITTED',   'Pneumonia'),
('Lakshmi Iyer',      67, 'Female', 'General Ward B',       'dr.jones',   'nurse.john', '2026-05-24',  2, 500.00,  1500.00, 'ADMITTED',   'Diabetes Complication'),
('Vikram Singh',      45, 'Male',   'Emergency Ward',       'dr.smith',   'nurse.mary', '2026-05-25',  1, 3000.00, 4000.00, 'CRITICAL',   'Road Accident Trauma'),
('Anjali Desai',      31, 'Female', 'Private Room Block B', 'dr.jones',   'nurse.john', '2026-05-15', 11, 2500.00, 2500.00, 'ADMITTED',   'Migraine'),
('Ravi Kumar',        50, 'Male',   'General Ward A',       'dr.smith',   'nurse.mary', '2026-05-12', 14, 500.00,  1500.00, 'ADMITTED',   'Hypertension'),
('Fatima Shaikh',     23, 'Female', 'General Ward B',       'dr.jones',   'nurse.john', '2026-05-26',  0, 500.00,  1000.00, 'ADMITTED',   'Malaria'),
('Suresh Nair',       60, 'Male',   'ICU',                  'dr.smith',   'nurse.mary', '2026-05-19',  7, 5000.00, 5000.00, 'CRITICAL',   'Stroke'),
('Deepa Pillai',      37, 'Female', 'Maternity Ward',       'dr.jones',   'nurse.john', '2026-05-21',  5, 1200.00, 2000.00, 'ADMITTED',   'Post Delivery Care'),
('Karan Malhotra',    19, 'Male',   'General Ward A',       'dr.smith',   'nurse.mary', '2026-05-24',  2, 500.00,  1000.00, 'DISCHARGED', 'Fracture'),
('Meena Joshi',       48, 'Female', 'Private Room Block A', 'dr.jones',   'nurse.john', '2026-05-17',  9, 2500.00, 3000.00, 'ADMITTED',   'Kidney Stone'),
('Anil Verma',        72, 'Male',   'General Ward B',       'dr.smith',   'nurse.mary', '2026-05-11', 15, 500.00,  1500.00, 'ADMITTED',   'COPD');
