package com.hospital.patient.controller;

import com.hospital.patient.model.Nurse;
import com.hospital.patient.repository.NurseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/nurses")
@CrossOrigin(origins = "*")
public class NurseController {

    @Autowired
    private NurseRepository repo;

    @GetMapping
    public List<Nurse> getAll() {
        return repo.findAll();
    }

    @GetMapping("/available")
    public List<Nurse> getAvailable() {
        // only return nurses who can still take beds
        return repo.findAll().stream()
            .filter(n -> n.isAvailable() && n.canTakeBed())
            .toList();
    }

    @PostMapping
    public Map<String, Object> add(@RequestBody Nurse nurse) {
        Nurse saved = repo.save(nurse);
        return Map.of("message", "Nurse added", "nurseId", saved.getId());
    }

    @PatchMapping("/{id}/toggle")
    public Map<String, Object> toggle(@PathVariable Long id) {
        Nurse nurse = repo.findById(id).orElseThrow();
        nurse.setAvailable(!nurse.isAvailable());
        repo.save(nurse);
        return Map.of("message", "Nurse status updated", "available", nurse.isAvailable());
    }
}