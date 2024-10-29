import { House } from "../model/house";
import RoomDb from "./Room.db";

let currentId: number = 1;

const houses: Array<House> = [
    new House(currentId++, "123 Main St", "Apartment"),
    new House(currentId++, "456 Elm St", "Complex"),
    new House(currentId++, "789 Oak St", "Townhouse"),
];

const getAllHouses = () => {
    return houses;
}

const getHouseById = (id : number) : House | [] => {
    return houses.find(house => house.getId() === id) || [];
}

export default {
    houses,
    getAllHouses,
    getHouseById
};
