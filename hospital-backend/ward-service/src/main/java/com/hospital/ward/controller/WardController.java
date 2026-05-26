package com.hospital.ward.controller;

import com.hospital.ward.model.Ward;
import com.hospital.ward.repository.WardRepository;
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
        return Map.of("message", "Ward added", "wardId", saved.getId());
    }

    @PatchMapping("/{id}/occupancy")
    public Map<String, Object> updateOccupancy(
            @PathVariable Long id,
            @RequestBody Map<String, Integer> body) {
        Ward ward = repo.findById(id).orElseThrow();
        ward.setOccupied(body.get("occupied"));
        repo.save(ward);
        return Map.of("message", "Ward occupancy updated");
    }

    // called by patient-service when patient is admitted/discharged
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