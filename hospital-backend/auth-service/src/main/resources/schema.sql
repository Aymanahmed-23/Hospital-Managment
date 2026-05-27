-- ─────────────────────────────────────────────────────────────
-- Hospital Management System — MySQL Schema
-- Aiven Cloud MySQL
-- ─────────────────────────────────────────────────────────────

-- ── Users (auth-service) ──────────────────────────────────────
CREATE TABLE IF NOT EXISTS users (
    id         BIGINT          NOT NULL AUTO_INCREMENT,
    username   VARCHAR(100)    NOT NULL,
    email      VARCHAR(255)    NOT NULL,
    password   VARCHAR(255)    NOT NULL,
    role       VARCHAR(50)     NOT NULL DEFAULT 'ROLE_USER',

    PRIMARY KEY (id),
    UNIQUE KEY uk_users_username (username),
    UNIQUE KEY uk_users_email    (email)
);

-- ── Wards (ward-service) ──────────────────────────────────────
CREATE TABLE IF NOT EXISTS wards (
    id           BIGINT          NOT NULL AUTO_INCREMENT,
    type         VARCHAR(100)    NOT NULL,
    name         VARCHAR(150)    NOT NULL,
    beds         INT             NOT NULL DEFAULT 0,
    occupied     INT             NOT NULL DEFAULT 0,
    rate_per_day DECIMAL(10, 2)  NOT NULL DEFAULT 0.00,

    PRIMARY KEY (id)
);

-- ── Patients (patient-service) ────────────────────────────────
CREATE TABLE IF NOT EXISTS patients (
    id          BIGINT          NOT NULL AUTO_INCREMENT,
    name        VARCHAR(150)    NOT NULL,
    age         INT             NOT NULL,
    gender      VARCHAR(20)     NOT NULL,
    ward        VARCHAR(150),
    doctor      VARCHAR(150),
    nurse       VARCHAR(150),
    admit_date  DATE,
    days        INT             NOT NULL DEFAULT 0,
    ward_rate   DECIMAL(10, 2)  NOT NULL DEFAULT 0.00,
    doctor_fee  DECIMAL(10, 2)  NOT NULL DEFAULT 0.00,
    status      VARCHAR(50)     NOT NULL DEFAULT 'ADMITTED',
    diagnosis   VARCHAR(500),

    PRIMARY KEY (id)
);
