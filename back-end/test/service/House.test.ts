import { House } from "../../model/house";
import HouseDb from "../../repository/House.db";
import houseService from "../../service/house.service";

jest.mock("../../repository/House.db"); // Mocking the HouseDb

describe('House Service', () => {
    const mockHouse = new House(1, "123 Main St", "apartment");

    beforeEach(() => {
        jest.clearAllMocks(); // Clear any previous mock calls before each test
    });

    describe('getAllHouses', () => {
        it('should return an array of houses', async () => {
            (HouseDb.getAllHouses as jest.Mock).mockResolvedValue([mockHouse]); // Mocking the resolved value

            const houses = await houseService.getAllHouses();

            expect(houses).toEqual([mockHouse]); // Expect the returned value to equal the mocked value
            expect(HouseDb.getAllHouses).toHaveBeenCalled(); // Verify that the method was called
        });
    });

    describe('getHouseById', () => {
        it('should return a house by id', async () => {
            (HouseDb.getHouseById as jest.Mock).mockResolvedValue(mockHouse); // Mocking the resolved value

            const house = await houseService.getHouseById(1);

            expect(house).toEqual(mockHouse); // Expect the returned value to equal the mocked house
            expect(HouseDb.getHouseById).toHaveBeenCalledWith(1); // Verify that the method was called with the correct id
        });

        it('should return an empty array if house not found', async () => {
            (HouseDb.getHouseById as jest.Mock).mockResolvedValue([]); // Mocking the case of house not found

            const house = await houseService.getHouseById(999); // Use a non-existing id

            expect(house).toEqual([]); // Expect the return value to be an empty array
            expect(HouseDb.getHouseById).toHaveBeenCalledWith(999); // Verify that the method was called with the correct id
        });
    });

    describe('addHouse', () => {
        it('should add a new house and return it', async () => {
            const newHouse = new House(2, "456 Another St", "townhouse");
            (HouseDb.addHouse as jest.Mock).mockResolvedValue(newHouse); // Mocking the resolved value

            const house = await houseService.addHouse("456 Another St", "townhouse");

            expect(house).toEqual(newHouse); // Expect the returned house to equal the new house
            expect(HouseDb.addHouse).toHaveBeenCalledWith("456 Another St", "townhouse"); // Verify method call
        });
    });
});