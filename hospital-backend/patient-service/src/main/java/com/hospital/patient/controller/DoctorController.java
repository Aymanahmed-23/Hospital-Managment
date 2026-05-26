package com.hospital.patient.controller;

import com.hospital.patient.model.Doctor;
import com.hospital.patient.repository.DoctorRepository;
import org.springframework.beans.factory.annotation.Autowired;
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

    @GetMapping
    public List<Doctor> getAll() {
        return repo.findAll();
    }

    @GetMapping("/available")
    public List<Doctor> getAvailable() {
        // only return doctors who can still take patients
        return repo.findAll().stream()
            .filter(d -> d.isAvailable() && d.canTakePatient())
            .toList();
    }

    @PostMapping
    public Map<String, Object> add(@RequestBody Doctor doctor) {
        Doctor saved = repo.save(doctor);
        return Map.of("message", "Doctor added", "doctorId", saved.getId());
    }

    @PatchMapping("/{id}/toggle")
    public Map<String, Object> toggle(@PathVariable Long id) {
        Doctor doctor = repo.findById(id).orElseThrow();
        doctor.setAvailable(!doctor.isAvailable());
        repo.save(doctor);
        return Map.of("message", "Doctor status updated", "available", doctor.isAvailable());
    }
}