package com.hospital.controller;

import com.hospital.model.Doctor;
import com.hospital.repository.DoctorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/doctors")

public class DoctorController {

    @Autowired
    private DoctorRepository repo;

    @GetMapping
    public List<Doctor> getAll() {
        return repo.findAll();
    }

    @PostMapping
    public Map<String, Object> add(@RequestBody Doctor doctor) {
        Doctor saved = repo.save(doctor);
        return Map.of("message", "Doctor added successfully", "doctorId", saved.getId());
    }
}
