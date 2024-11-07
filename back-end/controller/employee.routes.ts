import express, { NextFunction, Request, Response } from 'express';
import employeeService from '../service/employee.service';

const employeeRouter = express.Router();

employeeRouter.get("/", async (req: Request, res: Response) => {
    try {
        return res.status(200).json(await employeeService.getAllEmployees());
    }
    catch (error) {
        if (error instanceof Error){
            res.status(400).json({error : "error", errorMessage : error.message});
        }
    }
});



// employeeRouter.get("/:id", async (req: Request, res: Response) => {
//     try {
//         const id = parseInt(req.params.id, 10);
//         const employee = await employeeService.getEmployeeById(id);
//         return res.status(200).json(employee);
//     }
//     catch (error) {
//         if (error instanceof Error){
//             res.status(400).json({error : "error", errorMessage : error.message});
//         }
//     }
// });

export {
    employeeRouter,
}