import HouseService from "../../service/house.service";
import HouseDb from "../../repository/House.db";
import { createHouseDto } from "../../types";
import { House } from "../../model/house";
import { Address } from "../../model/address";

jest.mock("../../repository/House.db");

const address = new Address(1, 1, "Rue de la Loi", "Brussels", "Brussels Capital", "1000");
const house = new House(1, address, "detached");

const newHouse: createHouseDto = {
    addressId: 1,
    type: "semi-detached"
};

beforeEach(() => {
    jest.clearAllMocks();
});

test("getAllHouses should return all houses", async () => {
    (HouseDb.getAllHouses as jest.Mock).mockResolvedValue([house]);
    const result = await HouseService.getAllHouses();
    expect(result).toEqual([house]);
    expect(HouseDb.getAllHouses).toHaveBeenCalledTimes(1);
});

test("getHouseById should return the house with the given id", async () => {
    (HouseDb.getHouseById as jest.Mock).mockResolvedValue(house);
    const result = await HouseService.getHouseById(1);
    expect(result).toEqual(house);
    expect(HouseDb.getHouseById).toHaveBeenCalledWith(1);
    expect(HouseDb.getHouseById).toHaveBeenCalledTimes(1);
});

test("addHouse should add a new house", async () => {
    (HouseDb.addHouse as jest.Mock).mockResolvedValue(newHouse);
    const result = await HouseService.addHouse(newHouse);
    expect(result).toEqual(newHouse);
    expect(HouseDb.addHouse).toHaveBeenCalledWith(newHouse);
    expect(HouseDb.addHouse).toHaveBeenCalledTimes(1);
});