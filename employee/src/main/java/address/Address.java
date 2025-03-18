package address;

import country.Country;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table
public class Address {

@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private Long id;

private String streetAddress;

private String suburb;

private String city;

private String zipCode;


@ManyToOne
@JoinColumn(name = "country_id")
private Country country;


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


public Country getCountry() {
    return country;
}


public void setCountry(Country country) {
    this.country = country;
}


}
