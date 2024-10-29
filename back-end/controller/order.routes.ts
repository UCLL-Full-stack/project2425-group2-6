import express, { NextFunction, Request, Response } from 'express';
import orderService from '../service/order.service';


const orderRouter = express.Router();

orderRouter.get("/", async (req: Request, res: Response) => {
    try {
        res.status(200).json(await orderService.getAllOrders());
    }
    catch (error){
        if (error instanceof Error) {
            res.status(400).json({error : "error", errorMessage : error.message});
        }
    }
})

export {
    orderRouter,
}