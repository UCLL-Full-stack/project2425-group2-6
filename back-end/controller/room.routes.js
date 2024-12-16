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
const room_service_1 = __importDefault(require("../service/room.service"));
const roomRouter = express_1.default.Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     Employee:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           format: int64
 *           description: Unique identifier for the employee.
 *         firstName:
 *           type: string
 *           description: Employee's first name.
 *         lastName:
 *           type: string
 *           description: Employee's last name.
 *         email:
 *           type: string
 *           description: Employee's email address.
 *         position:
 *           type: string
 *           description: Employee's position.
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
 *     Tool:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           format: int64
 *           description: Unique identifier for the tool.
 *         name:
 *           type: string
 *           description: Name of the tool.
 *     Material:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           format: int64
 *           description: Unique identifier for the material.
 *         name:
 *           type: string
 *           description: Name of the material.
 *     Room:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           format: int64
 *           description: Unique identifier for the room.
 *         house:
 *           $ref: '#/components/schemas/House'
 *           description: House to which the room belongs.
 *         name:
 *           type: string
 *           description: Name of the room.
 *         workDescription:
 *           type: string
 *           description: Description of the work to be done in the room.
 *         employees:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Employee'
 *           description: List of employees assigned to the room.
 *         tools:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Tool'
 *           description: List of tools used in the room.
 *         materials:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Material'
 *           description: List of materials used in the room.
 *     CreateRoomDto:
 *       type: object
 *       properties:
 *         workDescription:
 *           type: string
 *           description: Description of the work to be done in the room.
 *         name:
 *           type: string
 *           description: Name of the room.
 *         houseId:
 *           type: number
 *           format: int64
 *           description: ID of the house to which the room belongs.
 */
/**
 * @swagger
 * /rooms:
 *   get:
 *     summary: Retrieve a list of rooms
 *     tags: [rooms]
 *     responses:
 *       200:
 *         description: A list of rooms
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Room'
 *       400:
 *         description: Bad request
 */
roomRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const rooms = yield room_service_1.default.getAllRooms();
        res.status(200).json(rooms);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        }
    }
}));
/**
 * @swagger
 * /rooms/{id}:
 *   get:
 *     summary: Retrieve a room by ID
 *     tags: [rooms]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The room ID
 *     responses:
 *       200:
 *         description: A room
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Room'
 *       400:
 *         description: Bad request
 */
// roomRouter.get('/:id', async (req: Request, res: Response) => {
//     try {
//         const id = parseInt(req.params.id);
//         const room = await roomService.getRoomById(id);
//         res.status(200).json(room);
//     }
//     catch (error) {
//         if (error instanceof Error) {
//             res.status(400).json({ error: error.message });
//         }
//     }
// });
/**
 * @swagger
 * /rooms:
 *   post:
 *     summary: Create a new room
 *     tags: [rooms]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateRoomDto'
 *     responses:
 *       201:
 *         description: The created room
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Room'
 *       400:
 *         description: Bad request
 */
// roomRouter.post('/', async (req: Request, res: Response) => {
//     try {
//         const room = await roomService.addRoom(req.body);
//         res.status(201).json(room);
//     }
//     catch (error) {
//         if (error instanceof Error) {
//             res.status(400).json({ error: error.message });
//         }
//     }
// });
exports.default = roomRouter;
