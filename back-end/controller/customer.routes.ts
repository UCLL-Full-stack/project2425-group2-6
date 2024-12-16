import express, { NextFunction, Request, Response } from 'express';
import customerService from "../service/customer.service";

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
 */
customerRouter.get("/", async (req: Request, res: Response) => {
    try {
        res.status(200).json(await customerService.getAllCustomers());
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: "error", errorMessage: error.message });
        }
    }
});

/**
 * @swagger
 * /customers/{id}:
 *   get:
 *     summary: Retrieve a customer by ID
 *     tags: [Customers]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the customer to retrieve
 *     responses:
 *       200:
 *         description: Details of a specific customer
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Customer'
 *       400:
 *         description: Error retrieving customer
 */
// customerRouter.get("/:id", async (req: Request, res: Response) => {
//     try {
//         const id: number = parseInt(req.params.id, 10);      
//         res.status(200).json(await customerService.getCustomerById(id));
//     }
//     catch (error) {
//         if (error instanceof Error) {
//             res.status(400).json({ error: "error", errorMessage: error.message });
//         }
//     }
// });


// customerRouter.get("/orders/:id", async (req: Request, res: Response) => {
//     try {
//         res.status(200).json(await customerService.getCustomerOrderById(parseInt(req.params.id)));
//     }
//     catch (error) {
//         if (error instanceof Error) {
//             res.status(400).json({ error: "error", errorMessage: error.message });
//         }
//     }
// });

/**
 * @swagger
 * /customers/:
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
 */
// customerRouter.post("/", async (req: Request, res: Response) => {
//     try {
//         const customerData: CreateCustomerDto = req.body;
//         const newCustomer = await customerService.createCustomer(customerData);
//         res.status(201).json(newCustomer);
//     } catch (error) {
//         if (error instanceof Error) {
//             res.status(400).json({ error: "error", errorMessage: error.message });
//         }
//     }
// });

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
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: JWT token
 *       400:
 *         description: Invalid email or password
 */
// customerRouter.post("/login", async(req: Request, res: Response) => {
//     try {
//         res.status(200).json(await customerService.attemptSignin(req.body));
//     }
//     catch (error) {
//         if (error instanceof Error && error.message === "Invalid email or password") {
//             res.status(400).json({ error: "error", errorMessage: error.message });
//         }
//     }
// });

/**
 * @swagger
 * /customers/{id}/orders:
 *   get:
 *     summary: Retrieve orders for a specific customer by customer ID
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the customer
 *     responses:
 *       200:
 *         description: Orders of the specified customer
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 *       400:
 *         description: Error retrieving customer orders
 */
// customerRouter.get("/:id/orders", async (req: Request, res: Response) => {
//     try {
//         res.status(200).json(await customerService.getCustomerOrderById(parseInt(req.params.id)));
//     }
//     catch (error) {
//         if (error instanceof Error) {
//             res.status(400).json({ error: "error", errorMessage: error.message });
//         }
//     }
// });

customerRouter.post("/signup", async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.status(200).json(await customerService.createCustomer(req.body));
    } catch (error) {
        if (error instanceof Error) {
                        res.status(400).json({ error: "error", errorMessage: error.message });
                    }
    }
});

customerRouter.post("/login", async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        res.status(200).json(await customerService.authenticate(email, password));
    } catch (error) {
        if (error instanceof Error) {
            if (error.message === "Invalid email or password" || error.message === "Customer does not exist.") {
                res.status(400).json({ error: "error", errorMessage: error.message });
            } else {
                res.status(500).json({ error: "Internal server", errorMessage: error.message });
            }
        } else {
            res.status(500).json({ error: "error", errorMessage: "Unexpected error" });
        }
    }
});


export { customerRouter };
