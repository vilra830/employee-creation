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

        ModelMapper modelMapper = new ModelMapper();
        modelMapper.map(newEmployeeData, existingEmployee);
        return Optional.of(employeeRepository.save(existingEmployee));
    
       
    }

}
