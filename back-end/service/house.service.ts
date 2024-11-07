import HouseDb from "../repository/House.db";
import { createHouseDto } from "../types";

const getAllHouses = async () => {
    return HouseDb.getAllHouses();
};

const getHouseById = async (id: number) => {
    return HouseDb.getHouseById(id);
};

const addHouse = async (houseData: createHouseDto) => {
    return HouseDb.addHouse(houseData);
};

export default {
    getAllHouses,
    getHouseById,
    addHouse,
};