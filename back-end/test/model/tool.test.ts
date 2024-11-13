import { Tool } from "../../model/tool";

const toolId = 1;
const toolName = "Hammer";
const toolQuantity = 10;

const tool = new Tool(toolId, toolName, toolQuantity);

test("Create a tool", () => {
  expect(tool.getId()).toBe(toolId);
  expect(tool.getName()).toBe(toolName);
  expect(tool.getQuantity()).toBe(toolQuantity);
});

test('given: valid id, when: setId, then: set id', () => {
    tool.setId(2);
    expect(tool.getId()).toBe(2);
});

test('given: valid name, when: setName, then: set name', () => {
    tool.setName("Screwdriver");
    expect(tool.getName()).toBe("Screwdriver");
});

test('given: valid quantity, when: setQuantity, then: set quantity', () => {
    tool.setQuantity(20);
    expect(tool.getQuantity()).toBe(20);
});