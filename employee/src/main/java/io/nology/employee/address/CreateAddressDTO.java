package io.nology.employee.address;

import io.nology.employee.address.Address.State;
import jakarta.validation.constraints.NotBlank;

public class CreateAddressDTO {
    
    @NotBlank(message = "Street address is required")
    private String streetAddress;

    @NotBlank(message = "Suburb is required")
    private String suburb;

    @NotBlank(message = "City is required")
    private String city;

    @NotBlank(message = "Zip code is required")
    private String zipCode;

    @NotBlank(message = "State is required")
    private Address.State state;

    // Getters and Setters
    public String getStreetAddress() {
        return streetAddress;
    }

    public void setStreetAddress(String streetAddress) {
        this.streetAddress = streetAddress;
    }

    public String getSuburb() {
        return suburb;
    }

    public void setSuburb(String suburb) {
        this.suburb = suburb;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getZipCode() {
        return zipCode;
    }

    public void setZipCode(String zipCode) {
        this.zipCode = zipCode;
    }

  
    public void setState(State state) {
        this.state = state;
    }

    public Address.State getState() {
        return state;
    }


}



