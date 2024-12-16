import { House } from "../model/house";
import customerService from "../service/customer.service";
import { createHouseDto } from "../types";
import database from "../util/database";

const getAllHouses = async (): Promise<Array<House>> => {
    const housesPrisma = await database.house.findMany({});
    return housesPrisma.map((housePrisma) => House.from(housePrisma));
};

const createHouse = async (createHouseDto: createHouseDto): Promise<House> => {
    try {
        const housePrisma = await database.house.create({
            data: {
                houseNumber: createHouseDto.houseNumber,
                street: createHouseDto.street,
                city: createHouseDto.city,
                zip: createHouseDto.zip,
                country: createHouseDto.country,
                type: createHouseDto.type,
            },
        });
        return House.from(housePrisma);
    } catch (error) {
        console.error("Error creating house:", error);
        throw new Error("Error creating house: " + error);
    }
};

const getHousesByCustomerId = async (customerId: number) : Promise<Array<House>> => {
    const customerHouses = await customerService.getCustomerHouses(customerId);
    return customerHouses.map((house) => House.from(house));
};

const getHouseById = async (id: number) : Promise<House | null> => {
    const house = await database.house.findUnique({
        where: {
            id: id
        }
    });

    if (!house) {
        return null;
    }

    return House.from(house);
};

export default {
    getAllHouses,
    getHousesByCustomerId,
    createHouse,
    getHouseById
}