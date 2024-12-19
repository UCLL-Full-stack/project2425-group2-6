import express, { Request, Response } from 'express';
import orderService from '../service/order.service';

const orderRouter = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Order:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           format: int64
 *           description: Unique identifier for the order.
 *         customer:
 *           $ref: '#/components/schemas/Customer'
 *           description: Customer who placed the order.
 *         house:
 *           $ref: '#/components/schemas/House'
 *           description: House associated with the order.
 *         orderDate:
 *           type: string
 *           format: date-time
 *           description: Date when the order was placed.
 *         startDate:
 *           type: string
 *           format: date-time
 *           description: Date when the work is scheduled to start.
 *         price:
 *           type: number
 *           format: float
 *           description: Price of the order.
 *         status:
 *           type: string
 *           description: Status of the order.
 *         employees:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Employee'
 *           description: List of employees assigned to the order.
 *         rooms:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Room'
 *           description: List of rooms associated with the order.
 *     Customer:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           format: int64
 *           description: Unique identifier for the customer.
 *         firstName:
 *           type: string
 *           description: First name of the customer.
 *         lastName:
 *           type: string
 *           description: Last name of the customer.
 *         email:
 *           type: string
 *           description: Email address of the customer.
 *         birthday:
 *           type: string
 *           format: date
 *           description: Birthday of the customer.
 *         password:
 *           type: string
 *           description: Password of the customer.
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Date when the customer was created.
 *         role:
 *           type: string
 *           description: Role of the customer.
 *     Employee:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           format: int64
 *           description: Unique identifier for the employee.
 *         firstName:
 *           type: string
 *           description: First name of the employee.
 *         lastName:
 *           type: string
 *           description: Last name of the employee.
 *         email:
 *           type: string
 *           description: Email address of the employee.
 *         birthday:
 *           type: string
 *           format: date
 *           description: Birthday of the employee.
 *         password:
 *           type: string
 *           description: Password of the employee.
 *         role:
 *           type: string
 *           description: Role of the employee.
 *         experience:
 *           type: number
 *           description: Experience of the employee in years.
 *         domain:
 *           type: string
 *           description: Domain of expertise of the employee.
 *         licenseType:
 *           type: string
 *           description: License type of the employee.
 *         workPosition:
 *           type: string
 *           description: Work position of the employee.
 *         createdOn:
 *           type: string
 *           format: date-time
 *           description: Date when the employee was created.
 *     House:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           format: int64
 *           description: Unique identifier for the house.
 *         houseNumber:
 *           type: string
 *           description: House number.
 *         street:
 *           type: string
 *           description: Street name.
 *         city:
 *           type: string
 *           description: City name.
 *         zip:
 *           type: string
 *           description: ZIP code.
 *         country:
 *           type: string
 *           description: Country name.
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Date when the house was created.
 *         type:
 *           type: string
 *           description: Type of the house.
 *     Room:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           format: int64
 *           description: Unique identifier for the room.
 *         house:
 *           $ref: '#/components/schemas/House'
 *           description: House to which the room belongs.
 *         name:
 *           type: string
 *           description: Name of the room.
 *         workDescription:
 *           type: string
 *           description: Description of the work to be done in the room.
 *         order:
 *           $ref: '#/components/schemas/Order'
 *           description: Order associated with the room.
 *     PrepOrderDto:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           description: Email of the customer placing the order.
 *         startDate:
 *           type: string
 *           format: date-time
 *           description: Date when the work is scheduled to start.
 *         budget:
 *           type: number
 *           format: float
 *           description: Budget for the order.
 *         houseNumber:
 *           type: string
 *           description: House number.
 *         street:
 *           type: string
 *           description: Street name.
 *         city:
 *           type: string
 *           description: City name.
 *         zip:
 *           type: string
 *           description: ZIP code.
 *         country:
 *           type: string
 *           description: Country name.
 *         type:
 *           type: string
 *           description: Type of the house.
 *         roomName:
 *           type: string
 *           description: Name of the room.
 *         workDescription:
 *           type: string
 *           description: Description of the work to be done in the room.
 */

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: API for managing orders
 */

/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Get all orders
 *     tags: [Orders]
 *     responses:
 *       '200':
 *         description: A list of orders
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 *   post:
 *     summary: Create a new order
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PrepOrderDto'
 *     responses:
 *       '201':
 *         description: The created order
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 */

/**
 * @swagger
 * /orders/{id}:
 *   get:
 *     summary: Get order by ID
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the order
 *     responses:
 *       '200':
 *         description: The order with the specified ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 */

/**
 * @swagger
 * /orders/email/{email}:
 *   get:
 *     summary: Get orders by customer email
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *         description: The email of the customer
 *     responses:
 *       '200':
 *         description: A list of orders associated with the email
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 */

/**
 * @swagger
 * /orders/employee/{email}:
 *   get:
 *     summary: Get orders by employee email
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *         description: The email of the employee
 *     responses:
 *       '200':
 *         description: A list of orders associated with the email
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 */

/**
 * @swagger
 * /orders/employee/toggle/{email}/{orderId}:
 *   put:
 *     summary: Toggle employee assignment to an order
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *         description: The email of the employee
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the order
 *     responses:
 *       '200':
 *         description: The result of the toggle operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 action:
 *                   type: string
 */

/**
 * @swagger
 * /orders/{id}:
 *   delete:
 *     summary: Delete an order by ID
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the order
 *     responses:
 *       '200':
 *         description: The result of the delete operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */

/**
 * @swagger
 * /orders/status/{id}:
 *   put:
 *     summary: Modify the status of an order
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the order
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *     responses:
 *       '200':
 *         description: The updated order
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 */

orderRouter.get("/", async (req: Request, res: Response) => {
    try {
        res.status(200).json(await orderService.getAllOrders());
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).json(error.message);
        }
    }
});

orderRouter.get("/:id", async (req: Request, res: Response) => {
    try {
        res.status(200).json(await orderService.getOrderById(parseInt(req.params.id)));
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).json(error.message);
        }
    }
});

orderRouter.post("/", async (req, res) => {
    try {
        const prepOrderDto = req.body;
        const newOrder = await orderService.createOrder(prepOrderDto);
        res.status(200).json(newOrder);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json(error.message);
        }
    }
});

orderRouter.get("/email/:email", async (req, res) => {
    try {
        const orders = await orderService.getOrderByCustomerEmail(req.params.email);
        res.status(200).json(orders);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json(error.message);
        }
    }
});

orderRouter.get("/employee/:email", async (req, res) => {
    try {
        const orders = await orderService.getOrdersByEmployeeEmail(req.params.email);
        res.status(200).json(orders);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json(error.message);
        }
    }
});

orderRouter.put("/employee/toggle/:email/:orderId", async (req: Request, res: Response) => {
    try {
        const orderId = parseInt(req.params.orderId);
        const email = req.params.email;
        const result = await orderService.toggleEmployeeAssignment(orderId, email);
        res.status(200).json(result);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
});

orderRouter.delete("/:id", async (req, res) => {
    try {
        const orderId = parseInt(req.params.id);
        if (isNaN(orderId)) {
            return res.status(400).json({ error: "Invalid order ID" });
        }
        const result = await orderService.deleteOrder(orderId);
        res.status(200).json(result);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        }
    }
});

orderRouter.put("/status/:id", async (req, res) => {
    try {
        const orderId = parseInt(req.params.id);
        const status = req.body.status;
        const result = await orderService.modifyOrderStatus(orderId, status);
        res.status(200).json(result);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        }
    }
});

export default orderRouter;