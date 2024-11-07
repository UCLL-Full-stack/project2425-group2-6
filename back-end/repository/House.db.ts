import { House } from "../model/house";
import { createHouseDto } from "../types";
import AddressDb from "./Address.db";

let currentId : number = 1;

let houses : House[] = [
    new House (currentId++, AddressDb.getAllAddresses()[0], "apartment"),
    new House (currentId++, AddressDb.getAllAddresses()[1], "detached"),
    new House (currentId++, AddressDb.getAllAddresses()[2], "semi-detached"),
    new House (currentId++, AddressDb.getAllAddresses()[3], "terraced"),
    new House (currentId++, AddressDb.getAllAddresses()[4], "bungalow"),
];

houses.forEach(house => {console.log(`${house.toString()}\n\n`)});

const getAllHouses = () => {
    return houses;
}

const getHouseById = (id : number) : House | Error => {
    return houses.find(house => house.getId() === id) || new Error("House not found.");
}

const addHouse = (house : createHouseDto) => {
    const address = AddressDb.getAddressById(house.addressId);
    if (address instanceof Error) {
        throw address;
    }
    const newHouse = new House(currentId++, address, house.type);
    houses.push(newHouse);
    return newHouse;
}


export default {
    houses,
    addHouse,
    getAllHouses,
    getHouseById,
}