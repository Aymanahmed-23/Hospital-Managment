package com.hospital.patient.repository;

import com.hospital.patient.model.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PatientRepository extends JpaRepository<Patient, Long> {
    List<Patient> findByStatus(String status);
}