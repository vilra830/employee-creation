package io.nology.employee.employee;

import java.util.List;
import java.util.Locale.Category;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.config.Task;
import org.springframework.stereotype.Service;

import io.nology.employee.common.exceptions.NotFoundException;
import jakarta.validation.Valid;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    public Employee createEmployee(CreateEmployeeDTO employeeDTO) {
        ModelMapper modelMapper = new ModelMapper();
        Employee employee = modelMapper.map(employeeDTO, Employee.class);
        return employeeRepository.save(employee);
        
    }

    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
 
    }

    public Optional<Employee> getEmployeeById(Long id) throws NotFoundException {

     Optional<Employee> result = employeeRepository.findById(id);
     
     if(result.isEmpty()){
        throw new NotFoundException("No Employee with such ID " + id);
     }

     return result;

    }

    public boolean deleteEmployeeById(Long employeeId) throws NotFoundException {
        Optional<Employee> result = employeeRepository.findById(employeeId);
     
        if(result.isEmpty()){
           throw new NotFoundException("No Employee with such ID " + employeeId);
        }
   
         employeeRepository.deleteById(employeeId);
        return true;
        
    }

    public Optional<Employee> updateEmployee(Long employeeId, UpdateEmployeeDTO newEmployeeData) throws NotFoundException {

        Optional<Employee> result = this.getEmployeeById(employeeId);

        if(result.isEmpty()){

            throw new NotFoundException("No Task with such ID" + employeeId);
        }

        Employee existingEmployee = result.get();

        // ModelMapper modelMapper = new ModelMapper();
        if (newEmployeeData.getFirstName() != null) {
            existingEmployee.setFirstName(newEmployeeData.getFirstName());
        }
        if (newEmployeeData.getLastName() != null) {
            existingEmployee.setLastName(newEmployeeData.getLastName());
        }
        if (newEmployeeData.getEmail() != null) {
            existingEmployee.setEmail(newEmployeeData.getEmail());
        }
        if (newEmployeeData.getPhoneNumber() != null) {
            existingEmployee.setPhoneNumber(newEmployeeData.getPhoneNumber());
        }
        if (newEmployeeData.getAddress() != null) {
            existingEmployee.setAddress(newEmployeeData.getAddress());
        }
        if (newEmployeeData.getStartDate() != null) {
            existingEmployee.setStartDate(newEmployeeData.getStartDate());
        }
        if (newEmployeeData.getEndDate() != null) {
            existingEmployee.setEndDate(newEmployeeData.getEndDate());
        }
        if (newEmployeeData.getWorkSchedule() != null) {
            existingEmployee.setWorkSchedule(newEmployeeData.getWorkSchedule());
        }
        if (newEmployeeData.getContracType() != null) {
            existingEmployee.setContracType(newEmployeeData.getContracType());
        }

        // modelMapper.map(newEmployeeData, existingEmployee);
        return Optional.of(employeeRepository.save(existingEmployee));
    }

}
