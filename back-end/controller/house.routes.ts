import express, { Request, Response } from 'express';
import houseService from '../service/house.service';

const houseRouter = express.Router();

houseRouter.get("/", async (req: Request, res: Response) => {
    try {
        res.status(200).json(await houseService.getAllHouses());
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).json(error.message);
        }
    }
});

houseRouter.get("/:id", async (req: Request, res: Response) => {
    try {
        res.status(200).json(await houseService.getHouseById(parseInt(req.params.id)));
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).json(error.message);
        }
    }
});

houseRouter.post("/", async (req: Request, res: Response) => {
    try {
        const houseData = req.body;
        const newHouse = await houseService.addHouse(houseData);
        res.status(201).json(newHouse);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json(error.message);
        }
    }
});

export default houseRouter;