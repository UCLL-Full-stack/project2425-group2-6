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
 *           type: number
 *           format: int64
 *           description: Unique identifier for the house.
 *         houseNumber:
 *           type: string
 *           description: House number.
 *         street:
 *           type: string
 *           description: Street name.
 *         city:
 *           type: string
 *           description: City name.
 *         zip:
 *           type: string
 *           description: ZIP code.
 *         country:
 *           type: string
 *           description: Country name.
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Date when the house was created.
 *         type:
 *           type: string
 *           description: Type of the house.
 */

/**
 * @swagger
 * /houses:
 *   get:
 *     summary: Get all houses
 *     responses:
 *       '200':
 *         description: A list of houses
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/House'
 *       '400':
 *         description: Error retrieving houses
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 */

/**
 * @swagger
 * /houses/{id}:
 *   get:
 *     summary: Get house by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the house
 *     responses:
 *       '200':
 *         description: The house with the specified ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/House'
 *       '400':
 *         description: Error retrieving house
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 */

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
        res.status(200).json(await houseService.getHouse(parseInt(req.params.id)));
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).json(error.message);
        }
    }
});

export default houseRouter;