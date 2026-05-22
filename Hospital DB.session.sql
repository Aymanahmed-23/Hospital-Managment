CREATE TABLE patients (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    age INT,
    gender VARCHAR(20),

    ward VARCHAR(100),
    doctor VARCHAR(100),
    nurse VARCHAR(100),

    admit_date DATE,
    days INT,

    ward_rate DECIMAL(10,2),
    doctor_fee DECIMAL(10,2),
INSERT INTO wards (id, type, name, beds, occupied, rate_per_day)
VALUES (
    id:int,
    'type:varchar',
    'name:varchar',
    beds:int,
    occupied:int,
    'rate_per_day:decimal'
  );
    status VARCHAR(50),
    diagnosis VARCHAR(255)
);

INSERT INTO wards (type, name, beds, occupied, rate_per_day)
VALUES ('normal', 'General Ward A', 20, 14, 800);