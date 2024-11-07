import { Employee } from "../model/employee";
import EmployeeDb from "../repository/Employee.db"

const getAllEmployees = async () : Promise<Array<Employee>> => {
    return await EmployeeDb.getAllEmployees();
}

// const getEmployeeById = async (id : number) : Promise<Employee | []> => {
//     if (isNaN(id)){
//         throw new Error("invalid format for id");
//     }
//     return await EmployeeDb.getEmployeeById(id);
// }

export default {
    getAllEmployees,
}