import { House } from "../../model/house";

const houseId = 1;
const houseNumber = "1";
const street = "Rue de la Loi";
const city = "Brussels";
const zip = "1000";
const country = "Belgium";
const type = "detached";
const createdAt = new Date();

const house = new House(houseId, houseNumber, street, city, zip, type, country, createdAt);

test("Create a house", () => {
  expect(house.getId()).toBe(houseId);
  expect(house.getHouseNumber()).toBe(houseNumber);
  expect(house.getStreet()).toBe(street);
  expect(house.getCity()).toBe(city);
  expect(house.getZip()).toBe(zip);
  expect(house.getCountry()).toBe(country);
  expect(house.getType()).toBe(type);
});

test("Set and get house properties", () => {
  house.setHouseNumber("2");
  expect(house.getHouseNumber()).toBe("2");

  house.setStreet("New Street");
  expect(house.getStreet()).toBe("New Street");

  house.setCity("Antwerp");
  expect(house.getCity()).toBe("Antwerp");

  house.setZip("2000");
  expect(house.getZip()).toBe("2000");

  house.setCountry("Netherlands");
  expect(house.getCountry()).toBe("Netherlands");

  house.setType("apartment");
  expect(house.getType()).toBe("apartment");
});

test("Create a house from plain data", () => {
  const houseData = {
    id: 2,
    houseNumber: "3",
    street: "Another Street",
    city: "Ghent",
    zip: "9000",
    country: "Belgium",
    createdAt: new Date(),
    type: "semi-detached",
  };

  const newHouse = House.from(houseData);
  expect(newHouse.getId()).toBe(houseData.id);
  expect(newHouse.getHouseNumber()).toBe(houseData.houseNumber);
  expect(newHouse.getStreet()).toBe(houseData.street);
  expect(newHouse.getCity()).toBe(houseData.city);
  expect(newHouse.getZip()).toBe(houseData.zip);
  expect(newHouse.getCountry()).toBe(houseData.country);
  expect(newHouse.getType()).toBe(houseData.type);
});