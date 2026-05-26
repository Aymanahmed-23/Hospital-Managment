package com.hospital.patient.controller;

import com.hospital.patient.model.Doctor;
import com.hospital.patient.model.Nurse;
import com.hospital.patient.model.Patient;
import com.hospital.patient.repository.DoctorRepository;
import com.hospital.patient.repository.NurseRepository;
import com.hospital.patient.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/patients")
@CrossOrigin(origins = "*")
public class PatientController {

    @Autowired
    private PatientRepository patientRepo;

    @Autowired
    private DoctorRepository doctorRepo;

    @Autowired
    private NurseRepository nurseRepo;

    @Autowired
    private RestTemplate restTemplate;

    @Value("${ward.service.url}")
    private String wardServiceUrl;

    @GetMapping
    public List<Patient> getAll() {
        return patientRepo.findAll();
    }

    @PostMapping
    public ResponseEntity<?> add(@RequestBody Patient patient) {

        // check doctor exists and has capacity
        Doctor doctor = doctorRepo.findByName(patient.getDoctor()).orElse(null);
        if (doctor == null) {
            return ResponseEntity.badRequest().body(Map.of("error", "Doctor not found"));
        }
        if (!doctor.canTakePatient()) {
            return ResponseEntity.badRequest().body(
                Map.of("error", doctor.getSpecialty().equalsIgnoreCase("Surgeon")
                    ? "Surgeon already has a patient"
                    : "Doctor has reached maximum of " + doctor.getMaxPatients() + " patients")
            );
        }

        // check nurse exists and has capacity
        Nurse nurse = nurseRepo.findByName(patient.getNurse()).orElse(null);
        if (nurse == null) {
            return ResponseEntity.badRequest().body(Map.of("error", "Nurse not found"));
        }
        if (!nurse.canTakeBed()) {
            return ResponseEntity.badRequest().body(
                Map.of("error", "Nurse has reached maximum of 10 beds")
            );
        }

        // save patient
        Patient saved = patientRepo.save(patient);

        // increment doctor patient count
        doctor.setCurrentPatients(doctor.getCurrentPatients() + 1);
        doctorRepo.save(doctor);

        // increment nurse bed count
        nurse.setCurrentBeds(nurse.getCurrentBeds() + 1);
        nurseRepo.save(nurse);

        // call ward-service to increment bed occupancy
        try {
            restTemplate.patchForObject(
                wardServiceUrl + "/api/wards/name/" + patient.getWard() + "/increment",
                null, Map.class
            );
        } catch (Exception e) {
            System.out.println("Ward service call failed: " + e.getMessage());
        }

        return ResponseEntity.ok(Map.of("message", "Patient admitted", "patientId", saved.getId()));
    }

    @PatchMapping("/{id}/discharge")
    public Map<String, Object> discharge(@PathVariable Long id) {
        Patient patient = patientRepo.findById(id).orElseThrow();
        patient.setStatus("discharged");
        patientRepo.save(patient);

        // decrement doctor patient count
        doctorRepo.findByName(patient.getDoctor()).ifPresent(doctor -> {
            doctor.setCurrentPatients(Math.max(0, doctor.getCurrentPatients() - 1));
            doctorRepo.save(doctor);
        });

        // decrement nurse bed count
        nurseRepo.findByName(patient.getNurse()).ifPresent(nurse -> {
            nurse.setCurrentBeds(Math.max(0, nurse.getCurrentBeds() - 1));
            nurseRepo.save(nurse);
        });

        // call ward-service to decrement bed occupancy
        try {
            restTemplate.patchForObject(
                wardServiceUrl + "/api/wards/name/" + patient.getWard() + "/decrement",
                null, Map.class
            );
        } catch (Exception e) {
            System.out.println("Ward service call failed: " + e.getMessage());
        }

        return Map.of("message", "Patient discharged");
    }
}