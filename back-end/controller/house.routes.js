"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const house_service_1 = __importDefault(require("../service/house.service"));
const houseRouter = express_1.default.Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     Address:
 *       type: object
 *       properties:
 *         street:
 *           type: string
 *           description: Street name and number.
 *         city:
 *           type: string
 *           description: City name.
 *         state:
 *           type: string
 *           description: State name.
 *         zip:
 *           type: string
 *           description: ZIP code.
 *     Room:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Name of the room.
 *         size:
 *           type: number
 *           description: Size of the room in square meters.
 *     House:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           format: int64
 *           description: Unique identifier for the house.
 *         address:
 *           $ref: '#/components/schemas/Address'
 *           description: Address of the house.
 *         type:
 *           type: string
 *           description: Type of the house.
 *         rooms:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Room'
 *           description: List of rooms in the house.
 *     CreateHouseDto:
 *       type: object
 *       properties:
 *         type:
 *           type: string
 *           description: Type of the house.
 *         addressId:
 *           type: number
 *           description: ID of the address.
 */
/**
 * @swagger
 * /houses:
 *   get:
 *     summary: Retrieve a list of houses
 *     tags: [House]
 *     responses:
 *       200:
 *         description: A list of houses
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/House'
 *       400:
 *         description: Bad request
 */
houseRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.status(200).json(yield house_service_1.default.getAllHouses());
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).json(error.message);
        }
    }
}));
/**
 * @swagger
 * /houses/{id}:
 *   get:
 *     summary: Retrieve a house by ID
 *     tags: [House]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The house ID
 *     responses:
 *       200:
 *         description: A house
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/House'
 *       400:
 *         description: Bad request
 */
// houseRouter.get("/:id", async (req: Request, res: Response) => {
//     try {
//         res.status(200).json(await houseService.getHouseById(parseInt(req.params.id)));
//     }
//     catch (error) {
//         if (error instanceof Error) {
//             res.status(400).json(error.message);
//         }
//     }
// });
/**
 * @swagger
 * /houses:
 *   post:
 *     summary: Create a new house
 *     tags: [House]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateHouseDto'
 *     responses:
 *       201:
 *         description: The created house
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/House'
 *       400:
 *         description: Bad request
 */
// houseRouter.post("/", async (req: Request, res: Response) => {
//     try {
//         const houseData = req.body;
//         const newHouse = await houseService.addHouse(houseData);
//         res.status(201).json(newHouse);
//     } catch (error) {
//         if (error instanceof Error) {
//             res.status(400).json(error.message);
//         }
//     }
// });
houseRouter.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.status(200).json(yield house_service_1.default.getHouse(parseInt(req.params.id)));
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).json(error.message);
        }
    }
}));
exports.default = houseRouter;
