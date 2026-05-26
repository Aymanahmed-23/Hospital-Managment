package com.hospital.ward.repository;

import com.hospital.ward.model.Ward;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface WardRepository extends JpaRepository<Ward, Long> {
    Optional<Ward> findByName(String name);  // find ward by name
}