package com.hospital.patient.repository;

import com.hospital.patient.model.Nurse;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface NurseRepository extends JpaRepository<Nurse, Long> {
    Optional<Nurse> findByName(String name);
}