package io.nology.employee.employee;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.HttpClientErrorException.NotFound;

import io.nology.employee.EmployeeApplication;
import io.nology.employee.common.GlobalExceptionHandler;
import io.nology.employee.common.exceptions.InvalidInputException;
import io.nology.employee.common.exceptions.NotFoundException;
import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.config.Task;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;


@RestController
@RequestMapping("/employees")
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

    

    @PostMapping()
    public ResponseEntity createEmployee(@RequestBody @Valid CreateEmployeeDTO employeeData) throws InvalidInputException, NotFoundException {
        if(employeeData == null){
            throw new InvalidInputException("Required field is missing");
        }

           
        Employee employee = employeeService.createEmployee(employeeData);
        if(employee == null){
            throw new NotFoundException("Employee not Found");
        }
        return new ResponseEntity<>(employee,HttpStatus.CREATED);
    }

    @GetMapping()
    public ResponseEntity<List<Employee>> getAllEmployees() {
        List<Employee> employees = employeeService.getAllEmployees();

        return new ResponseEntity<>(employees, HttpStatus.OK);
    }

    @GetMapping("/{employeeId}")
    public ResponseEntity<Employee> getMethodName(@PathVariable Long employeeId) throws NotFoundException {
        Optional<Employee> employee = employeeService.getEmployeeById(employeeId);
        if(employee.isEmpty()){
            throw new NotFoundException("Cound not find Employee with ID " + employeeId);
        }

        Employee foundEmployee = employee.get();
        return new ResponseEntity<>(foundEmployee, HttpStatus.OK);
    }
    
    @DeleteMapping("/{employeeId}")
    public ResponseEntity<Employee> deleteEmployee(@PathVariable Long employeeId) throws NotFoundException {
        Boolean isDeleted = employeeService.deleteEmployeeById(employeeId);
        if(!isDeleted){
            throw new NotFoundException("Cound not find Employee with ID " + employeeId);
        }

        return ResponseEntity.noContent().build();
    }

        @PatchMapping("/{employeeId}")
    public ResponseEntity<Employee> updateById(@PathVariable Long employeeId, @Valid @RequestBody UpdateEmployeeDTO newEmployeeData) throws NotFoundException{

            Optional<Employee> result = employeeService.updateEmployee(employeeId, newEmployeeData);

            if(result.isEmpty()){
                throw new NotFoundException("Could not update Category with ID " + employeeId + " it does not exist");
            } 
       
            return new ResponseEntity<Employee>(result.get(), HttpStatus.OK);
        }
    
    

}
