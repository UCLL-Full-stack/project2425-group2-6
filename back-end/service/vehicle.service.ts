import { Vehicle } from "../model/vehicle";
import VehicleDb from "../repository/Vehicle.db"

const getAllVehicles = async () : Promise<Array<Vehicle>> => {
    return await VehicleDb.getAllVehicles();
}

const getVehicleById = async (id: number) : Promise<Vehicle | []> => {
    if (isNaN(id)){
        throw new Error("invalid format for id");
    }
    return await VehicleDb.getVehicleById(id);
}

export default {
    getAllVehicles,
    getVehicleById, 
}