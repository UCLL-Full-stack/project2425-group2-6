import express, { NextFunction, Request, Response } from 'express';
import customerService from "../service/customer.service";

const customerRouter = express.Router();

customerRouter.get("/", async (req: Request, res: Response) => {
    try {
        res.status(200).json(await customerService.getAllCustomers());
    }
    catch (error){
        if (error instanceof Error){
            res.status(400).json({error : "error", errorMessage: error.message});
        }
    }
});

export {
    customerRouter,

}