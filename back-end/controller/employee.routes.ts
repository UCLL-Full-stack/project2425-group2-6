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
 *         workPosition:
 *           type: string
 *           description: Employee's work position.
 *         createdOn:
 *           type: string
 *           format: date-time
 *           description: Date when the employee was created.
 *     CreateEmployeeDto:
 *       type: object
 *       properties:
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
 *         role:
 *           type: string
 *           description: Employee's role.
 *         experience:
 *           type: number
 *           description: Employee's years of experience.
 *         domain:
 *           type: string
 *           description: Employee's domain of expertise.
 *         licenseType:
 *           type: string
 *           description: Employee's license type.
 *     AuthenticationResponse:
 *       type: object
 *       properties:
 *         token:
 *           type: string
 *           description: JWT token.
 *         email:
 *           type: string
 *           description: Employee's email address.
 *         fullname:
 *           type: string
 *           description: Employee's full name.
 *         role:
 *           type: string
 *           description: Employee's role.
 */

/**
 * @swagger
 * tags:
 *   name: Employees
 *   description: API for managing employees
 */

/**
 * @swagger
 * /employees:
 *   get:
 *     summary: Retrieve a list of employees
 *     security:
 *       - bearerAuth: []
 *     tags: [Employees]
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
 *         description: Error retrieving employees
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 */
employeeRouter.get('/', async (req: Request, res: Response) => {
    try {
        const employees = await employeeService.getAllEmployees();
        res.status(200).json(employees);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        }
    }
});

/**
 * @swagger
 * /employees/signup:
 *   post:
 *     summary: Create a new employee
 *     tags: [Employees]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateEmployeeDto'
 *     responses:
 *       201:
 *         description: The created employee
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Employee'
 *       400:
 *         description: Error creating employee
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 */
employeeRouter.post('/signup', async (req: Request, res: Response) => {
    try {
        const employee = await employeeService.createEmployee(req.body);
        res.status(201).json(employee);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        }
    }
});

/**
 * @swagger
 * /employees/login:
 *   post:
 *     summary: Authenticate an employee
 *     tags: [Employees]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Employee's email address
 *               password:
 *                 type: string
 *                 description: Employee's password
 *     responses:
 *       200:
 *         description: Authentication response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthenticationResponse'
 *       400:
 *         description: Error authenticating employee
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 */
employeeRouter.post('/login', async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const authResponse = await employeeService.authenticate(email, password);
        res.status(200).json(authResponse);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        }
    }
});

export {
    employeeRouter,
}