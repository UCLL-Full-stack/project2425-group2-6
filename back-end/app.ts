import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import * as bodyParser from 'body-parser';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { customerRouter } from './controller/customer.routes';
import { employeeRouter } from './controller/employee.routes';
import { vehicleRouter } from './controller/vehicle.routes';
import { houseRouter } from './controller/house.routes';
import { roomRouter } from './controller/room.routes';
import { orderRouter } from './controller/order.routes';

const app = express();
dotenv.config();
const port = process.env.APP_PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.get('/status', (req, res) => {
    res.json({ message: 'Back-end is running...' });
});

app.use('/customers', customerRouter);

app.use('/employees', employeeRouter);

app.use('/vehicles', vehicleRouter);

app.use('/houses', houseRouter);

app.use('/rooms', roomRouter);

app.use('/orders', orderRouter);

app.listen(port || 3000, () => {
    console.log(`Back-end is running on port ${port}.`);
});
