import express, { NextFunction, Request, Response } from 'express';
import customerService from "../service/customer.service";
import { nextDay } from 'date-fns';
import { authenticateDTO, createCustomerDto } from '../types';

const customerRouter = express.Router();

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     Customer:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           format: int64
 *           description: Unique identifier for the customer.
 *         firstName:
 *           type: string
 *           description: Customer's first name.
 *         lastName:
 *           type: string
 *           description: Customer's last name.
 *         email:
 *           type: string
 *           description: Email address of the new customer.
 *         birthDate:
 *           type: string
 *           format: date
 *           description: Customer's birth date.
 *         password:
 *           type: string
 *           description: Customer's password.
 *     CreateCustomerDto:
 *       type: object
 *       properties:
 *         firstName:
 *           type: string
 *           description: Customer's first name.
 *         lastName:
 *           type: string
 *           description: Customer's last name.
 *         email:
 *           type: string
 *           description: Email address of the new customer.
 *         birthDate:
 *           type: string
 *           format: date
 *           description: Customer's birth date.
 *         password:
 *           type: string
 *           description: Customer's password.
 *     AuthenticationResponse:
 *       type: object
 *       properties:
 *         token:
 *           type: string
 *           description: JWT token.
 *         email:
 *           type: string
 *           description: Customer's email address.
 *         fullname:
 *           type: string
 *           description: Customer's full name.
 *         role:
 *           type: string
 *           description: Customer's role.
 */

/**
 * @swagger
 * /customers:
 *   get:
 *     summary: Retrieve a list of all customers
 *     tags: [Customers]
 *     responses:
 *       200:
 *         description: List of all customers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Customer'
 *       400:
 *         description: Error fetching customers
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 */


/**
 * @swagger
 * /customers/signup:
 *   post:
 *     summary: Create a new customer
 *     tags: [Customers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateCustomerDto'
 *     responses:
 *       201:
 *         description: Customer created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Customer'
 *       400:
 *         description: Error creating customer
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 */


/**
 * @swagger
 * /customers/login:
 *   post:
 *     summary: Authenticate a customer
 *     tags: [Customers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               email:
 *                 type: string
 *                 description: Customer's email
 *               password:
 *                 type: string
 *                 description: Customer's password
 *     responses:
 *       200:
 *         description: Authentication successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthenticationResponse'
 *       400:
 *         description: Invalid email or password
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 */
customerRouter.get("/", async (req: Request, res: Response) => {
    try {
        const { email, role } = req.params;
        res.status(200).json(await customerService.getAllCustomers({email, role}));
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: "error", errorMessage: error.message });
        }
    }
});

customerRouter.post("/signup", async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.status(200).json(await customerService.createCustomer(<createCustomerDto>req.body));
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: "error", errorMessage: error.message });
        }
    }
});

customerRouter.post("/login", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const credentials = <authenticateDTO>req.body;
        const response = await customerService.authenticate(credentials);
        res.status(200).json({message: "Authentication successful", ...response});
    } catch (error) {

        next(error);

        // if (error instanceof Error) {
        //     if (error.message === "Invalid email or password" || error.message === "Customer does not exist.") {
        //         res.status(400).json({ error: "error", errorMessage: error.message });
        //     } else {
        //         res.status(500).json({ error: "Internal server", errorMessage: error.message });
        //     }
        // } else {
        //     res.status(500).json({ error: "error", errorMessage: "Unexpected error" });
        // }
    }
});

export { customerRouter };