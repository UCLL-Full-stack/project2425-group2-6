"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const employee_1 = require("../../model/employee");
const employee_service_1 = __importDefault(require("../../service/employee.service"));
const employee = new employee_1.Employee(1, "John", "Doe", "john.doe@example.com", "password123", 5, "Engineering", "B");
const employeeToAdd = new employee_1.Employee(2, "Jane", "Doe", "jane.doe@example.com", "password123", 3, "Marketing", "C");
let mockEmployeeGetAllEmployees;
beforeEach(() => {
    mockEmployeeGetAllEmployees = jest.fn().mockReturnValue([employee]);
    employee_service_1.default.getAllEmployees = mockEmployeeGetAllEmployees;
});
afterEach(() => {
    jest.clearAllMocks();
});
test("given: valid Employee, when: getAllEmployees, then: return all employees", () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield employee_service_1.default.getAllEmployees();
    expect(result).toEqual([employee]);
    expect(mockEmployeeGetAllEmployees).toHaveBeenCalledTimes(1);
}));
