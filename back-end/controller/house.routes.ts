import express, { Request, Response } from 'express';
import houseService from '../service/house.service';

const houseRouter = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     House:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Unique identifier for the house
 *         address:
 *           type: string
 *           description: Address of the house
 *         type:
 *           type: string
 *           description: Type of house (e.g., apartment, villa, etc.)
 *     Room:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Unique identifier for the room
 *         name:
 *           type: string
 *           description: Name of the room (e.g., bedroom, kitchen)
 *         houseId:
 *           type: integer
 *           description: ID of the house this room belongs to
 */

/**
 * @swagger
 * /houses:
 *   get:
 *     summary: Retrieve a list of all houses
 *     tags: [Houses]
 *     responses:
 *       200:
 *         description: List of all houses
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/House'
 *       400:
 *         description: Error fetching houses
 */
houseRouter.get("/", async (req: Request, res: Response) => {
    try {
        res.status(200).json(await houseService.getAllHouses());
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: "error", errorMessage: error.message });
        }
    }
});

/**
 * @swagger
 * /houses/{id}:
 *   get:
 *     summary: Retrieve a house by ID
 *     tags: [Houses]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the house to retrieve
 *     responses:
 *       200:
 *         description: Details of a specific house
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/House'
 *       400:
 *         description: Error retrieving house
 */
houseRouter.get("/:id", async (req: Request, res: Response) => {
    try {
        res.status(200).json(await houseService.getHouseById(parseInt(req.params.id)));
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: "error", errorMessage: error.message });
        }
    }
});

// /**
//  * @swagger
//  * /houses/rooms/{id}:
//  *   get:
//  *     summary: Retrieve all rooms for a specific house by house ID
//  *     tags: [Rooms]
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         schema:
//  *           type: integer
//  *         required: true
//  *         description: Numeric ID of the house
//  *     responses:
//  *       200:
//  *         description: Rooms of the specified house
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: array
//  *               items:
//  *                 $ref: '#/components/schemas/Room'
//  *       400:
//  *         description: Error retrieving house rooms
//  */
// houseRouter.get("/rooms/:id", async (req: Request, res: Response) => {
//     try {
//         res.status(200).json(await houseService.getHouseRoomsById(parseInt(req.params.id)));
//     }
//     catch (error) {
//         if (error instanceof Error) {
//             res.status(400).json({ error: "error", errorMessage: error.message });
//         }
//     }
// });

/**
 * @swagger
 * /houses:
 *   post:
 *     summary: Create a new house
 *     tags: [Houses]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               address:
 *                 type: string
 *                 description: Address of the new house
 *               type:
 *                 type: string
 *                 description: Type of the new house
 *     responses:
 *       201:
 *         description: House created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/House'
 *       400:
 *         description: Error creating house
 */
houseRouter.post("/", async (req: Request, res: Response) => {
    try {
        const houseData = req.body;
        const newHouse = await houseService.addHouse(houseData.address, houseData.type);
        res.status(201).json(newHouse);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: "error", errorMessage: error.message });
        }
    }
});

export { houseRouter };
