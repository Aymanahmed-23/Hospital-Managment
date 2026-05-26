package com.hospital.patient.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "patients")
public class Patient {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private int age;
    private String gender;
    private String ward;
    private String doctor;
    private String nurse;

    @Column(name = "admit_date")
    private LocalDate admitDate;

    private int days;

    @Column(name = "ward_rate")
    private BigDecimal wardRate;

    @Column(name = "doctor_fee")
    private BigDecimal doctorFee;

    private String status;
    private String diagnosis;

    public Long getId()                    { return id; }
    public void setId(Long id)             { this.id = id; }
    public String getName()                { return name; }
    public void setName(String name)       { this.name = name; }
    public int getAge()                    { return age; }
    public void setAge(int age)            { this.age = age; }
    public String getGender()              { return gender; }
    public void setGender(String gender)   { this.gender = gender; }
    public String getWard()                { return ward; }
    public void setWard(String ward)       { this.ward = ward; }
    public String getDoctor()              { return doctor; }
    public void setDoctor(String doctor)   { this.doctor = doctor; }
    public String getNurse()               { return nurse; }
    public void setNurse(String nurse)     { this.nurse = nurse; }
    public LocalDate getAdmitDate()        { return admitDate; }
    public void setAdmitDate(LocalDate d)  { this.admitDate = d; }
    public int getDays()                   { return days; }
    public void setDays(int days)          { this.days = days; }
    public BigDecimal getWardRate()        { return wardRate; }
    public void setWardRate(BigDecimal r)  { this.wardRate = r; }
    public BigDecimal getDoctorFee()       { return doctorFee; }
    public void setDoctorFee(BigDecimal f) { this.doctorFee = f; }
    public String getStatus()              { return status; }
    public void setStatus(String status)   { this.status = status; }
    public String getDiagnosis()           { return diagnosis; }
    public void setDiagnosis(String d)     { this.diagnosis = d; }
}
