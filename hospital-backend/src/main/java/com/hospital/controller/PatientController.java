package com.hospital.controller;

import com.hospital.model.Patient;
import com.hospital.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/patients")
@CrossOrigin(origins = "*")
public class PatientController {

    @Autowired
    private PatientRepository repo;

    @GetMapping
    public List<Patient> getAll() {
        return repo.findAll();
    }

    @PostMapping
    public Map<String, Object> add(@RequestBody Patient patient) {
        Patient saved = repo.save(patient);
        return Map.of("message", "Patient added successfully", "patientId", saved.getId());
    }
}
