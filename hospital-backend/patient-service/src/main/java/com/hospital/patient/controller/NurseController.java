package com.hospital.patient.controller;

import com.hospital.patient.model.Nurse;
import com.hospital.patient.repository.NurseRepository;
import com.hospital.patient.security.JwtValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/nurses")
@CrossOrigin(origins = "*")
public class NurseController {

    @Autowired
    private NurseRepository repo;

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

        // only return nurses who can still take beds
        return ResponseEntity.ok(repo.findAll().stream()
            .filter(n -> n.isAvailable() && n.canTakeBed())
            .toList());
    }

    @PostMapping
    public ResponseEntity<?> add(@RequestHeader(value = "Authorization", required = false) String authHeader, @RequestBody Nurse nurse) {
        ResponseEntity<?> validation = validateToken(authHeader);
        if (validation != null) return validation;

        Nurse saved = repo.save(nurse);
        return ResponseEntity.ok(Map.of("message", "Nurse added", "nurseId", saved.getId()));
    }

    @PatchMapping("/{id}/toggle")
    public ResponseEntity<?> toggle(@RequestHeader(value = "Authorization", required = false) String authHeader, @PathVariable Long id) {
        ResponseEntity<?> validation = validateToken(authHeader);
        if (validation != null) return validation;

        Nurse nurse = repo.findById(id).orElseThrow();
        nurse.setAvailable(!nurse.isAvailable());
        repo.save(nurse);
        return ResponseEntity.ok(Map.of("message", "Nurse status updated", "available", nurse.isAvailable()));
    }
}