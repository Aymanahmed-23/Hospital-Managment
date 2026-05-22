package com.hospital.controller;

import com.hospital.model.Ward;
import com.hospital.repository.WardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/wards")
@CrossOrigin(origins = "*")
public class WardController {

    @Autowired
    private WardRepository repo;

    @GetMapping
    public List<Ward> getAll() {
        return repo.findAll();
    }

    @PostMapping
    public Map<String, Object> add(@RequestBody Ward ward) {
        Ward saved = repo.save(ward);
        return Map.of("message", "Ward added successfully", "wardId", saved.getId());
    }

    // ← only this method is new
    @PatchMapping("/{id}/occupancy")
    public Map<String, Object> updateOccupancy(
            @PathVariable Long id,
            @RequestBody Map<String, Integer> body) {
        Ward ward = repo.findById(id).orElseThrow();
        ward.setOccupied(body.get("occupied"));
        repo.save(ward);
        return Map.of("message", "Ward occupancy updated");
    }
}