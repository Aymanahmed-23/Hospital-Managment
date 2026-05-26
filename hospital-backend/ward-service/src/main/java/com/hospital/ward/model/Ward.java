package com.hospital.ward.model;

import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "wards")
public class Ward {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String type;
    private String name;
    private int beds;
    private int occupied;

    @Column(name = "rate_per_day")
    private BigDecimal ratePerDay;

    public Long getId()                     { return id; }
    public void setId(Long id)              { this.id = id; }
    public String getType()                 { return type; }
    public void setType(String type)        { this.type = type; }
    public String getName()                 { return name; }
    public void setName(String name)        { this.name = name; }
    public int getBeds()                    { return beds; }
    public void setBeds(int beds)           { this.beds = beds; }
    public int getOccupied()                { return occupied; }
    public void setOccupied(int occupied)   { this.occupied = occupied; }
    public BigDecimal getRatePerDay()       { return ratePerDay; }
    public void setRatePerDay(BigDecimal r) { this.ratePerDay = r; }
}