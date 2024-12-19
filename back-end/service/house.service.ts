import HouseDb from "../repository/House.db";
import RoomDb from "../repository/Room.db";
import { createHouseDto } from "../types";

const getAllHouses = async ({email, role} : {email : string, role : string}) => {
    if (role === "admin") {
        return HouseDb.getAllHouses();
    }
    throw new Error("Something went wrong");
};

const getHouse = async (houseId: number, {email, role} : {email : string, role:  string}) => {
    if (role === "admin") {
        return HouseDb.getHouseById(houseId);
    }
    throw new Error("Something went wrong");
};


export default {
    getAllHouses,
    getHouse,
};