import HouseDb from "../repository/House.db";
import RoomDb from "../repository/Room.db";
import { createHouseDto } from "../types";

const getAllHouses = async () => {
    return HouseDb.getAllHouses();
};

const getHouse = async (houseId: number) => {
    return HouseDb.getHouseById(houseId);
};


export default {
    getAllHouses,
    getHouse,
};