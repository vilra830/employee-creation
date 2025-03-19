package io.nology.employee.address;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name="addresses")
public class Address {

@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private Long id;

private String streetAddress;

private String suburb;

private String city;

private String zipCode;

private State state;

public enum State {
    NSW,
    VIC,
    ACT,
    WA,
    QLD,
    TAS,
    SA,
    NT

}



public Long getId() {
    return id;
}


public void setId(Long id) {
    this.id = id;
}


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

public State getState() {
    return state;
}

public void setState(State state){
    this.state = state;
    
}


}
