package com.hospital.patient.model;

import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "doctors")
public class Doctor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String specialty;
    private boolean available;
    private BigDecimal fee;

    @Column(name = "current_patients", columnDefinition = "int default 0")
    private int currentPatients;

    // max patients based on specialty
    public int getMaxPatients() {
        if (specialty != null && specialty.equalsIgnoreCase("Surgeon")) {
            return 1;   // surgeon handles 1 patient only
        }
        return 4;       // all other doctors max 4 patients
    }

    public boolean canTakePatient() {
        return currentPatients < getMaxPatients();
    }

    public Long getId()                    { return id; }
    public void setId(Long id)             { this.id = id; }
    public String getName()                { return name; }
    public void setName(String name)       { this.name = name; }
    public String getSpecialty()           { return specialty; }
    public void setSpecialty(String s)     { this.specialty = s; }
    public boolean isAvailable()           { return available; }
    public void setAvailable(boolean a)    { this.available = a; }
    public BigDecimal getFee()             { return fee; }
    public void setFee(BigDecimal fee)     { this.fee = fee; }
    public int getCurrentPatients()        { return currentPatients; }
    public void setCurrentPatients(int c)  { this.currentPatients = c; }
}