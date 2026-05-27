package com.hospital.ward.controller;

import com.hospital.ward.model.Ward;
import com.hospital.ward.repository.WardRepository;
import com.hospital.ward.security.JwtValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/wards")
@CrossOrigin(origins = "*")
public class WardController {

    @Autowired
    private WardRepository repo;

    @Autowired
    private JwtValidator jwtValidator;

    private ResponseEntity<?> validateToken(String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Missing or invalid authorization header"));
        }
        String token = authHeader.substring(7);
        if (!jwtValidator.validateToken(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Invalid or expired token"));
        }
        return null;
    }

    @GetMapping
    public ResponseEntity<?> getAll(@RequestHeader(value = "Authorization", required = false) String authHeader) {
        ResponseEntity<?> validation = validateToken(authHeader);
        if (validation != null) return validation;
        return ResponseEntity.ok(repo.findAll());
    }

    @PostMapping
    public ResponseEntity<?> add(@RequestHeader(value = "Authorization", required = false) String authHeader, @RequestBody Ward ward) {
        ResponseEntity<?> validation = validateToken(authHeader);
        if (validation != null) return validation;

        Ward saved = repo.save(ward);
        return ResponseEntity.ok(Map.of("message", "Ward added", "wardId", saved.getId()));
    }

    @PatchMapping("/{id}/occupancy")
    public ResponseEntity<?> updateOccupancy(
            @RequestHeader(value = "Authorization", required = false) String authHeader,
            @PathVariable Long id,
            @RequestBody Map<String, Integer> body) {
        ResponseEntity<?> validation = validateToken(authHeader);
        if (validation != null) return validation;

        Ward ward = repo.findById(id).orElseThrow();
        ward.setOccupied(body.get("occupied"));
        repo.save(ward);
        return ResponseEntity.ok(Map.of("message", "Ward occupancy updated"));
    }

    // called by patient-service when patient is admitted/discharged (no token required for internal service)
    @PatchMapping("/name/{wardName}/increment")
    public Map<String, Object> increment(@PathVariable String wardName) {
        repo.findByName(wardName).ifPresent(ward -> {
            ward.setOccupied(ward.getOccupied() + 1);
            repo.save(ward);
        });
        return Map.of("message", "Incremented");
    }

    @PatchMapping("/name/{wardName}/decrement")
    public Map<String, Object> decrement(@PathVariable String wardName) {
        repo.findByName(wardName).ifPresent(ward -> {
            ward.setOccupied(Math.max(0, ward.getOccupied() - 1));
            repo.save(ward);
        });
        return Map.of("message", "Decremented");
    }
}