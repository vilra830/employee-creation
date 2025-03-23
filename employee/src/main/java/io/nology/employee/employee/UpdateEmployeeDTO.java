package io.nology.employee.employee;

import java.time.LocalDate;

import io.nology.employee.address.Address;
import io.nology.employee.employee.Employee.ContractType;
import io.nology.employee.employee.Employee.WorkSchedule;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class UpdateEmployeeDTO {
    
    private String firstName;

    private String lastName;

    private String email;

    private String phoneNumber;

    @ManyToOne
    @JoinColumn(name = "address_id")
    private Address address;

    private LocalDate startDate;

    private LocalDate endDate;
    
    private Employee.WorkSchedule workSchedule;

    private Employee.ContractType contracType;
    
    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public Address getAddress() {
        return address;
    }

    public void setAddress(Address address) {
        this.address = address;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

    public WorkSchedule getWorkSchedule() {
        return workSchedule;
    }

    public void setWorkSchedule(WorkSchedule workSchedule) {
        this.workSchedule = workSchedule;
    }

    public ContractType getContracType() {
        return contracType;
    }

    public void setContracType(ContractType contracType) {
        this.contracType = contracType;
    }

}
