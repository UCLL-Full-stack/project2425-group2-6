import { Vehicle } from "../model/#vehicle";

let currentId : number = 1;

const vehicles: Array<Vehicle> = [
    new Vehicle(currentId++, "Excavation", "Vehicle One"),
    new Vehicle(currentId++, "Transport", "Vehicle Two"),
    new Vehicle(currentId++, "Paving", "Vehicle Three")
];

const getAllVehicles = () : Array<Vehicle> => {
    return vehicles;
}

const getVehicleById = (id : number) : Vehicle | [] => {
    return vehicles.find(vehicle => vehicle.getId() === id) ?? [];
}

export default {
    getAllVehicles,
    getVehicleById
}