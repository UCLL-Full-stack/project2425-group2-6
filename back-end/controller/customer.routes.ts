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

customerRouter.get("/:id", async (req: Request, res: Response) => {
    try {
        const id : number = parseInt(req.params.id, 10);      
        res.status(200).json(await customerService.getCustomerById(id));
    }
    catch (error) {
        if (error instanceof Error){
            res.status(400).json({error: "error", errorMessage: error.message});
        }
    }
})

customerRouter.get("/orders/:id", async (req: Request, res: Response) => {
    try {
        res.status(200).json(await customerService.getCustomerOrderById(parseInt(req.params.id)));
    }
    catch (error) {

    }
})

export {
    customerRouter,

}