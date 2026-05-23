
package com.hospital;

import com.hospital.model.Patient;
import com.hospital.repository.PatientRepository;
import com.hospital.repository.WardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.List;

@Component
public class DischargeScheduler {

    @Autowired
    private PatientRepository patientRepo;

    @Autowired
    private WardRepository wardRepo;

    // runs every minute to check for patients whose stay is over
    @Scheduled(fixedRate = 60000)
    public void autoDischarge() {
        List<Patient> admitted = patientRepo.findByStatus("admitted");

        for (Patient patient : admitted) {
            LocalDate dischargeDate = patient.getAdmitDate().plusDays(patient.getDays());

            if (!LocalDate.now().isBefore(dischargeDate)) {
                // discharge patient
                patient.setStatus("discharged");
                patientRepo.save(patient);

                // decrement ward occupancy
                wardRepo.findAll().stream()
                    .filter(w -> w.getName().equals(patient.getWard()))
                    .findFirst()
                    .ifPresent(ward -> {
                        ward.setOccupied(Math.max(0, ward.getOccupied() - 1));
                        wardRepo.save(ward);
                    });

                System.out.println("Auto-discharged: " + patient.getName());
            }
        }
    }
}


