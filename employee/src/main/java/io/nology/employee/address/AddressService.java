package io.nology.employee.address;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AddressService {


@Autowired
private AddressRepository addressRepository;

public Address createAddress(CreateAddressDTO addressData){

    Address address = new Address();
    address.setStreetAddress(addressData.getStreetAddress());
    address.setSuburb(addressData.getSuburb());
    address.setCity(addressData.getCity());
    address.setState(addressData.getState());

    return addressRepository.save(address);

}




}
