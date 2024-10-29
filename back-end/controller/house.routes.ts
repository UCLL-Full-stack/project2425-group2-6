import express, { NextFunction, Request, Response } from 'express';
import houseService from '../service/house.service';

const houseRouter = express.Router();

houseRouter.get("/", async (req: Request, res: Response) => {
    try {
        res.status(200).json(await houseService.getAllHouses());
    }
    catch (error){
        if (error instanceof Error){
            res.status(400).json({error : "error", errorMessage : error.message});
        }
    }
});

houseRouter.get("/:id", async (req: Request, res: Response) => {
    try {
        res.status(200).json(await houseService.getHouseById(parseInt(req.params.id)));
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).json({error : "error", errorMessage: error.message});
        }
    }
});

houseRouter.get("/rooms/:id", async (req: Request, res: Response) => {
    try {
        res.status(200).json(await houseService.getHouseRoomsById(parseInt(req.params.id)));
    }
    catch (error){
        if (error instanceof Error){
            res.status(400).json({errpr : "error", errorMessage : error.message});
        }
    }
})

export {
    houseRouter,
}