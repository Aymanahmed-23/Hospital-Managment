package com.hospital.model;

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

    public Long getId()                 { return id; }
    public void setId(Long id)          { this.id = id; }
    public String getName()             { return name; }
    public void setName(String name)    { this.name = name; }
    public String getSpecialty()        { return specialty; }
    public void setSpecialty(String s)  { this.specialty = s; }
    public boolean isAvailable()        { return available; }
    public void setAvailable(boolean a) { this.available = a; }
    public BigDecimal getFee()          { return fee; }
    public void setFee(BigDecimal fee)  { this.fee = fee; }
}
