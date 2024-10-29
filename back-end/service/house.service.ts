import { House } from "../model/house";
import HouseDb from "../repository/House.db"
import roomService from "./room.service";

const getAllHouses = async () : Promise <Array<House>> => {
    return await HouseDb.getAllHouses();
}

const getHouseById = async (id : number) : Promise<House | []> => {
    return await HouseDb.getHouseById(id);
}

const getHouseRoomsById = async (id : number) => {
    return await roomService.getHouseRoomsById(id);
}

export default {
    getAllHouses,
    getHouseById,
    getHouseRoomsById,
}