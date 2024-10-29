import express, { NextFunction, Request, Response } from 'express';
import vehicleService from '../service/vehicle.service';

const vehicleRouter = express.Router();

vehicleRouter.get("/", async (req: Request, res: Response) => {
    try {
        res.status(200).json(await vehicleService.getAllVehicles());
    }
    catch (error) {
        if (error instanceof Error){
            res.status(400).json({error : "error", errorMessage : error.message});
        }
    }
})

vehicleRouter.get("/:id", async (req: Request, res: Response) => {
    try {
        res.status(200).json(await vehicleService.getVehicleById(parseInt(req.params.id, 10)));
    }
    catch (error){
        if (error instanceof Error) {
            res.status(400).json({error : "error", errorMessage: error.message});
        }
    }
})

export {
    vehicleRouter,
}