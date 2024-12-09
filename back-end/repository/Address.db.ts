import { add } from "date-fns";
import { Address } from "../model/address";
import { createAddressDto } from "../types";
import { log } from "console";

let currentId : number = 1;

let addresses : Array<Address> = [
    new Address(currentId++, 1, "123 Main St", "Springfield", "IL", "62701"),
    new Address(currentId++, 1, "456 Elm St", "Rochester", "NY", "14607"),
    new Address(currentId++, 1, "789 Oak St", "Austin", "TX", "78701"),
    new Address(currentId++, 1, "101 Pine St", "Portland", "OR", "97201"),
    new Address(currentId++, 1, "202 Cedar St", "Seattle", "WA", "98101"),
];

addresses.forEach(address => {log(`${address.toString()}\n\n`)});

const getAllAddresses = () => {
    return addresses;
}

const getAddressById = (id: number) => {
    const address = addresses.find(address => address.getId() === id);
    
    if (!address) {
        throw new Error("Address not found.");
    }
    
    return address;
}

const addAddress = (address : createAddressDto) => {
    // if (!address.street){
    //     log("STREET IS BLANK : " + address.street);
    // }
    const newAddress = new Address(currentId++, address.houseNumber, address.street, address.city, address.state, address.zip);
    addresses.push(newAddress);
    return newAddress;
}

export default {
    addresses,
    getAllAddresses,
    getAddressById,
    addAddress
}