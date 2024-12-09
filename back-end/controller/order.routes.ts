import express, { Request, Response } from 'express';
import orderService from '../service/order.service';
import { log } from 'console';

const orderRouter = express.Router();



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


/**
 * @swagger
 * /customers/orders/{id}:
 *   get:
 *     summary: Retrieve all orders for a specific customer by customer ID
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
 *                 $ref: '#/components/schemas/Customer'  # Define an Order schema if needed
 *       400:
 *         description: Error retrieving customer orders
 */
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
        const { order, address, house, rooms } = req.body; 

        const newOrder = await orderService.addOrder(address, rooms, house, order);

       
        res.status(201).json(newOrder);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json(error.message);
        }
    }
});

export default orderRouter;