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