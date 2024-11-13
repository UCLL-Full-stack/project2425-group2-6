import express, { Request, Response } from 'express'
import addressService from '../service/address.service';

const addressRouter = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Address:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           format: int64
 *           description: Unique identifier for the address.
 *         houseNumber:
 *           type: number
 *           format: int64
 *           description: Customer's full house number.
 *         street:
 *           type: string
 *           description: Address's street detail.
 *         city:
 *           type: string
 *           description: Address's city detail.
 *         state:
 *           type: string
 *           description: Address's state detail.
 *         zip:
 *           type: string
 *           description: Address's zip number detail.
 *     CreateAddressDto:
 *       type: object
 *       properties:
 *         city:
 *           type: string
 *           description: Address's city detail.
 *         houseNumber:
 *           type: number
 *           format: int64
 *           description: Customer's full house number.
 *         street:
 *           type: string
 *           description: Address's street detail.
 *         state:
 *           type: string
 *           description: Address's state detail.
 *         zip:
 *           type: string
 *           description: Address's zip number detail.
 */

/**
 * @swagger
 * /addresses:
 *   get:
 *     summary: Retrieve a list of addresses
 *     tags: [Address]
 *     responses:
 *       200:
 *         description: A list of addresses
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Address'
 *       400:
 *         description: Bad request
 */
addressRouter.get('/', async (req: Request, res: Response) => {
    try {
        const address = await addressService.getAllAddresses();
        res.status(200).json(address);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        }
    }
});

/**
 * @swagger
 * /addresses/{id}:
 *   get:
 *     summary: Retrieve an address by ID
 *     tags: [Address]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The address ID
 *     responses:
 *       200:
 *         description: An address
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Address'
 *       400:
 *         description: Bad request
 */
addressRouter.get('/:id', async (req: Request, res: Response) => {
    try {
        const address = await addressService.getAddressById(Number(req.params.id));
        res.status(200).json(address);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        }
    }
});

/**
 * @swagger
 * /addresses:
 *   post:
 *     summary: Create a new address
 *     tags: [Address]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateAddressDto'
 *     responses:
 *       200:
 *         description: The created address
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Address'
 *       400:
 *         description: Bad request
 */
addressRouter.post('/', async (req: Request, res: Response) => {
    try {
        const address = await addressService.addAddress(req.body);
        res.status(200).json(address);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        }
    }
});

export default addressRouter;