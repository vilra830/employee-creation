package io.nology.employee.common;

import io.nology.employee.EmployeeApplication;
import io.nology.employee.common.exceptions.InvalidInputException;
import io.nology.employee.common.exceptions.NotFoundException;
import io.nology.employee.employee.EmployeeController;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {



    @ExceptionHandler(NotFoundException.class)
    public ResponseEntity<String> handleNotFoundException(NotFoundException ex){
                return new ResponseEntity<String>(ex.getMessage(), HttpStatus.NOT_FOUND);


    }

    @ExceptionHandler(InvalidInputException.class)
    public ResponseEntity<String> handleInvalidInputException(InvalidInputException ex){
                return new ResponseEntity<String>(ex.getMessage(), HttpStatus.BAD_REQUEST);


    }

}
