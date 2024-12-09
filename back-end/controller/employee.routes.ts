import express, { NextFunction, Request, Response } from 'express';
import employeeService from '../service/employee.service';

const employeeRouter = express.Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     Employee:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           format: int64
 *           description: Unique identifier for the employee.
 *         firstName:
 *           type: string
 *           description: Employee's first name.
 *         lastName:
 *           type: string
 *           description: Employee's last name.
 *         email:
 *           type: string
 *           description: Employee's email address.
 *         password:
 *           type: string
 *           description: Employee's password.
 *         experience:
 *           type: number
 *           format: int64
 *           description: Employee's years of experience.
 *         domain:
 *           type: string
 *           description: Employee's domain of expertise.
 *         licenseType:
 *           type: string
 *           description: Employee's license type.
 */

/**
 * @swagger
 * /employees:
 *   get:
 *     summary: Retrieve a list of employees
 *     tags: [Employee]   
 *     responses:
 *       200:
 *         description: A list of employees
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Employee'
 *       400:
 *         description: Bad request
 */
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