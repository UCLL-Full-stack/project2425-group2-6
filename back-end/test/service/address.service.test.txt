import AddressService from "../../service/address.service";
import AddressDb from "../../repository/Address.db";
import { createAddressDto } from "../../types";

jest.mock("../../repository/Address.db");

describe("AddressService", () => {
    const address = {
        id: 1,
        houseNumber: 1,
        street: "Rue de la Loi",
        city: "Brussels",
        state: "Brussels Capital",
        zip: "1000"
    };

    const newAddress: createAddressDto = {
        houseNumber: 2,
        street: "Avenue Louise",
        city: "Brussels",
        state: "Brussels Capital",
        zip: "1050"
     };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("getAllAddresses should return all addresses", async () => {
        (AddressDb.getAllAddresses as jest.Mock).mockResolvedValue([address]);
        const result = await AddressService.getAllAddresses();
        expect(result).toEqual([address]);
        expect(AddressDb.getAllAddresses).toHaveBeenCalledTimes(1);
    });

    test("getAddressById should return the address with the given id", async () => {
        (AddressDb.getAddressById as jest.Mock).mockResolvedValue(address);
        const result = await AddressService.getAddressById(1);
        expect(result).toEqual(address);
        expect(AddressDb.getAddressById).toHaveBeenCalledWith(1);
        expect(AddressDb.getAddressById).toHaveBeenCalledTimes(1);
    });

    test("addAddress should add a new address", async () => {
        (AddressDb.addAddress as jest.Mock).mockResolvedValue(newAddress);
        const result = await AddressService.addAddress(newAddress);
        expect(result).toEqual(newAddress);
        expect(AddressDb.addAddress).toHaveBeenCalledWith(newAddress);
        expect(AddressDb.addAddress).toHaveBeenCalledTimes(1);
    });
});