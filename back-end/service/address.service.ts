import AddressDb from "../repository/Address.db";
import { createAddressDto } from "../types";

const getAllAddresses = async () => {
    return AddressDb.getAllAddresses();
};

const getAddressById = async (id: number) => {
    return AddressDb.getAddressById(id);
};

const addAddress = async (address: createAddressDto) => {
    return AddressDb.addAddress(address);
};

export default {
    getAllAddresses,
    getAddressById,
    addAddress,
};