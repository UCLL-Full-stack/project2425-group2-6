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
const order_service_1 = __importDefault(require("../service/order.service"));
const orderRouter = express_1.default.Router();
orderRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.status(200).json(yield order_service_1.default.getAllOrders());
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).json(error.message);
        }
    }
}));
/**
 * @swagger
 * /customers/orders/{id}:
 *   get:
 *     summary: Retrieve all orders for a specific customer by customer ID
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the customer
 *     responses:
 *       200:
 *         description: Orders of the specified customer
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Customer'  # Define an Order schema if needed
 *       400:
 *         description: Error retrieving customer orders
 */
orderRouter.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.status(200).json(yield order_service_1.default.getOrderById(parseInt(req.params.id)));
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).json(error.message);
        }
    }
}));
orderRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const prepOrderDto = req.body;
        const newOrder = yield order_service_1.default.createOrder(prepOrderDto);
        res.status(200).json(newOrder);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).json(error.message);
        }
    }
}));
orderRouter.get("/email/:email", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("Fetching orders for email:", req.params.email);
        const orders = yield order_service_1.default.getOrderByCustomerEmail(req.params.email);
        console.log("Orders fetched:", orders);
        res.status(200).json(orders);
    }
    catch (error) {
        console.error("Error fetching orders:", error);
        if (error instanceof Error) {
            res.status(400).json(error.message);
        }
    }
}));
exports.default = orderRouter;
