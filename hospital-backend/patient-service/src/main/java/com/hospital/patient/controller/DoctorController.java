package com.hospital.patient.controller;

import com.hospital.patient.model.Doctor;
import com.hospital.patient.repository.DoctorRepository;
import com.hospital.patient.security.JwtValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/doctors")
@CrossOrigin(origins = "*")
public class DoctorController {

    @Autowired
    private DoctorRepository repo;

    @Autowired
    private JwtValidator jwtValidator;

    private ResponseEntity<?> validateToken(String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(Map.of("error", "Missing or invalid authorization header"));
        }
        String token = authHeader.substring(7);
        if (!jwtValidator.validateToken(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(Map.of("error", "Invalid or expired token"));
        }
        return null;
    }

    @GetMapping
    public ResponseEntity<?> getAll(@RequestHeader(value = "Authorization", required = false) String authHeader) {
        ResponseEntity<?> validation = validateToken(authHeader);
        if (validation != null) return validation;
        return ResponseEntity.ok(repo.findAll());
    }

    @GetMapping("/available")
    public ResponseEntity<?> getAvailable(@RequestHeader(value = "Authorization", required = false) String authHeader) {
        ResponseEntity<?> validation = validateToken(authHeader);
        if (validation != null) return validation;

        // only return doctors who can still take patients
        return ResponseEntity.ok(repo.findAll().stream()
            .filter(d -> d.isAvailable() && d.canTakePatient())
            .toList());
    }

    @PostMapping
    public ResponseEntity<?> add(@RequestHeader(value = "Authorization", required = false) String authHeader, @RequestBody Doctor doctor) {
        ResponseEntity<?> validation = validateToken(authHeader);
        if (validation != null) return validation;

        Doctor saved = repo.save(doctor);
        return ResponseEntity.ok(Map.of("message", "Doctor added", "doctorId", saved.getId()));
    }

    @PatchMapping("/{id}/toggle")
    public ResponseEntity<?> toggle(@RequestHeader(value = "Authorization", required = false) String authHeader, @PathVariable Long id) {
        ResponseEntity<?> validation = validateToken(authHeader);
        if (validation != null) return validation;

        Doctor doctor = repo.findById(id).orElseThrow();
        doctor.setAvailable(!doctor.isAvailable());
        repo.save(doctor);
        return ResponseEntity.ok(Map.of("message", "Doctor status updated", "available", doctor.isAvailable()));
    }
}