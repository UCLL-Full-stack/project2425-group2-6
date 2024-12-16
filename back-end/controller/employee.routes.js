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
exports.employeeRouter = void 0;
const express_1 = __importDefault(require("express"));
const employee_service_1 = __importDefault(require("../service/employee.service"));
const employeeRouter = express_1.default.Router();
exports.employeeRouter = employeeRouter;
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
 *         password:
 *           type: string
 *           description: Employee's password.
 *         experience:
 *           type: number
 *           format: int64
 *           description: Employee's years of experience.
 *         domain:
 *           type: string
 *           description: Employee's domain of expertise.
 *         licenseType:
 *           type: string
 *           description: Employee's license type.
 */
/**
 * @swagger
 * /employees:
 *   get:
 *     summary: Retrieve a list of employees
 *     tags: [Employee]
 *     responses:
 *       200:
 *         description: A list of employees
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Employee'
 *       400:
 *         description: Bad request
 */
employeeRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return res.status(200).json(yield employee_service_1.default.getAllEmployees());
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: "error", errorMessage: error.message });
        }
    }
}));
