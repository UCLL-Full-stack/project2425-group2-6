import express, { Request, Response } from 'express'
import houseService from '../service/house.service';
import addressService from '../service/address.service';

const addressRouter = express.Router();

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