import express, { NextFunction, Request, Response } from 'express';
import roomService from '../service/#room.service';

const roomRouter = express.Router();

roomRouter.get("/", async (req: Request, res: Response) => {
    try {
        res.status(200).json(await roomService.getAllRooms());
    }
    catch (error) {
        if (error instanceof Error){
            res.status(400).json({error : "error", errorMessage : error.message});
        }
    }
}

)

export {roomRouter}