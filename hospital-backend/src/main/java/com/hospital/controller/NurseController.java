package com.hospital.controller;

import com.hospital.model.Nurse;
import com.hospital.repository.NurseRepository;
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

    @PostMapping
    public Map<String, Object> add(@RequestBody Nurse nurse) {
        Nurse saved = repo.save(nurse);
        return Map.of("message", "Nurse added successfully", "nurseId", saved.getId());
    }
}
