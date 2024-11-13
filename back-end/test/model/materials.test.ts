import { Material } from "../../model/material";

const id = 1;
const name = "Wood";
const quantity = 10;

const material = new Material(id, name, quantity);

test("Create a material", () => {
  expect(material.getId()).toBe(id);
  expect(material.getName()).toBe(name);
  expect(material.getQuantity()).toBe(quantity);
});


test('given: valid id, when: setId, then: set id', () => {
    material.setId(2);
    expect(material.getId()).toBe(2);
});

test('given: valid name, when: setName, then: set name', () => {
    material.setName("Steel");
    expect(material.getName()).toBe("Steel");
});

test('given: valid quantity, when: setQuantity, then: set quantity', () => {
    material.setQuantity(20);
    expect(material.getQuantity()).toBe(20);
});