package com.hospital.patient.model;

import jakarta.persistence.*;

@Entity
@Table(name = "nurses")
public class Nurse {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String shift;
    private boolean available;

    @Column(name = "current_beds", columnDefinition = "int default 0")
    private int currentBeds;

    private static final int MAX_BEDS = 10;

    public boolean canTakeBed() {
        return currentBeds < MAX_BEDS;
    }

    public Long getId()                 { return id; }
    public void setId(Long id)          { this.id = id; }
    public String getName()             { return name; }
    public void setName(String name)    { this.name = name; }
    public String getShift()            { return shift; }
    public void setShift(String shift)  { this.shift = shift; }
    public boolean isAvailable()        { return available; }
    public void setAvailable(boolean a) { this.available = a; }
    public int getCurrentBeds()         { return currentBeds; }
    public void setCurrentBeds(int c)   { this.currentBeds = c; }
}