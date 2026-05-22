package com.hospital.model;

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

    public Long getId()                 { return id; }
    public void setId(Long id)          { this.id = id; }
    public String getName()             { return name; }
    public void setName(String name)    { this.name = name; }
    public String getShift()            { return shift; }
    public void setShift(String shift)  { this.shift = shift; }
    public boolean isAvailable()        { return available; }
    public void setAvailable(boolean a) { this.available = a; }
}
