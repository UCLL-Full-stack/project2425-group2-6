import express, { Request, Response } from 'express';
import roomService from '../service/room.service';

const roomRouter = express.Router();

/**
 * @swagger
 * /rooms:
 *   get:
 *     summary: Get all rooms
 *     responses:
 *       '200':
 *         description: A list of rooms
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Room'
 *       '400':
 *         description: Error retrieving rooms
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 */

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

export default roomRouter;