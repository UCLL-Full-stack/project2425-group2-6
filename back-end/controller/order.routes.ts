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
 *           type: integer
 *           description: Unique identifier for the order
 *         items:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               productId:
 *                 type: integer
 *                 description: ID of the product in the order
 *               quantity:
 *                 type: integer
 *                 description: Quantity of the product ordered
 *         totalAmount:
 *           type: number
 *           description: Total amount for the order
 *         status:
 *           type: string
 *           description: Status of the order (e.g., pending, completed, shipped)
 */

/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Retrieve a list of all orders
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: List of all orders
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 *       400:
 *         description: Error fetching orders
 */
orderRouter.get("/", async (req: Request, res: Response) => {
    try {
        res.status(200).json(await orderService.getAllOrders());
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: "error", errorMessage: error.message });
        }
    }
});

/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Create a new order
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     productId:
 *                       type: integer
 *                       description: ID of the product being ordered
 *                     quantity:
 *                       type: integer
 *                       description: Quantity of the product being ordered
 *               totalAmount:
 *                 type: number
 *                 description: Total amount for the order
 *               status:
 *                 type: string
 *                 description: Initial status of the order
 *     responses:
 *       201:
 *         description: Order created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       400:
 *         description: Error creating order
 */
orderRouter.post("/", async (req: Request, res: Response) => {
    try {
        const orderData = req.body;
        const newOrder = await orderService.createOrder(orderData);
        res.status(201).json(newOrder);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: "error", errorMessage: error.message });
        }
    }
});

export { orderRouter };
