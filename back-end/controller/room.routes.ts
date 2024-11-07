import express, { Request, Response } from 'express';
import roomService from '../service/room.service';

const roomRouter = express.Router();

roomRouter.get('/', async (req: Request, res: Response) => {
    try {
        const rooms = await roomService.getAllRooms();
        res.status(200).json(rooms);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        }
    }
});

roomRouter.get('/:id', async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const room = await roomService.getRoomById(id);
        res.status(200).json(room);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        }
    }
});

roomRouter.post('/', async (req: Request, res: Response) => {
    try {
        const room = await roomService.addRoom(req.body);
        res.status(201).json(room);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        }
    }
});

export default roomRouter;