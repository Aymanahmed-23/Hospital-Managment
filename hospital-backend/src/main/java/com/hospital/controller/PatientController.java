package com.hospital.controller;

import com.hospital.model.Patient;
import com.hospital.repository.PatientRepository;
import com.hospital.repository.WardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/patients")
public class PatientController {

    @Autowired
    private PatientRepository patientRepo;

    @Autowired
    private WardRepository wardRepo;

    @GetMapping
    public List<Patient> getAll() {
        return patientRepo.findAll();
    }

    @PostMapping
    public Map<String, Object> add(@RequestBody Patient patient) {
        // save patient first
        Patient saved = patientRepo.save(patient);

        // find matching ward by name and increment occupied
        wardRepo.findAll().stream()
            .filter(w -> w.getName().equals(patient.getWard()))
            .findFirst()
            .ifPresent(ward -> {
                ward.setOccupied(ward.getOccupied() + 1);
                wardRepo.save(ward);
                System.out.println("Ward updated: " + ward.getName() + " occupied: " + ward.getOccupied());
            });

        return Map.of("message", "Patient added successfully", "patientId", saved.getId());
    }

    @PatchMapping("/{id}/discharge")
    public Map<String, Object> discharge(@PathVariable Long id) {
        Patient patient = patientRepo.findById(id).orElseThrow();
        patient.setStatus("discharged");
        patientRepo.save(patient);

        // decrement ward occupancy on discharge
        wardRepo.findAll().stream()
            .filter(w -> w.getName().equals(patient.getWard()))
            .findFirst()
            .ifPresent(ward -> {
                ward.setOccupied(Math.max(0, ward.getOccupied() - 1));
                wardRepo.save(ward);
                System.out.println("Ward updated: " + ward.getName() + " occupied: " + ward.getOccupied());
            });

        return Map.of("message", "Patient discharged successfully");
    }
}