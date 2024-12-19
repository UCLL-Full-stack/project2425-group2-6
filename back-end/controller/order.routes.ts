import express, { NextFunction, Request, Response } from 'express';
import orderService from '../service/order.service';
import { log } from 'console';

const orderRouter = express.Router();



orderRouter.get("/", async (req: Request, res: Response) => {
    try {
        res.status(200).json(await orderService.getAllOrders());
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).json(error.message);
        }
    }
});


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
orderRouter.get("/:id", async (req: Request, res: Response) => {
    try {
        res.status(200).json(await orderService.getOrderById(parseInt(req.params.id)));
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).json(error.message);
        }
    }
});


orderRouter.post("/", async (req, res) => {
    try {

        const prepOrderDto = req.body;
        const newOrder = await orderService.createOrder(prepOrderDto)
       
        res.status(200).json(newOrder);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json(error.message);
        }
    }
});

orderRouter.get("/email/:email", async (req : Request, res: Response, next: NextFunction) => {
    try {
        //console.log("Fetching orders for email:", req.params.email);
        const orders = await orderService.getOrderByCustomerEmail(req.params.email);
        //console.log("Orders fetched:", orders);
        res.status(200).json(orders);
    } catch (error) {
        next(error)
      
        //console.error("Error fetching orders:", error);
        // if (error instanceof Error) {
        //     res.status(400).json(error.message);
        // }
    }
});

orderRouter.get("/employee/:email", async (req, res) => {
    try {
        const orders = await orderService.getOrdersByEmployeeEmail(req.params.email);
        // //console.log("Orders fetched:", orders);
        res.status(200).json(orders);
    } catch (error) {
        // //console.error("Error fetching orders:", error);
        if (error instanceof Error) {
            res.status(400).json(error.message);
        }
    }
}
);

orderRouter.put("/employee/toggle/:email/:orderId", async (req: Request, res: Response) => {
    try {
      const orderId = parseInt(req.params.orderId);
      const email = req.params.email;
  
      const result = await orderService.toggleEmployeeAssignment(orderId, email);
      res.status(200).json(result);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  orderRouter.delete("/:id", async (req, res) => {
    try {
    //   console.log("Received DELETE request for order ID:", req.params.id);
      const orderId = parseInt(req.params.id);
      if (isNaN(orderId)) {
        console.error("Invalid order ID:", req.params.id);
        return res.status(400).json({ error: "Invalid order ID" });
      }
      const result = await orderService.deleteOrder(orderId);
      res.status(200).json(result);
    } catch (error) {
      console.error("Error in deleteOrder handler:", error);
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      }
    }
  });

  orderRouter.put("/status/:id", async (req, res) => {
    try {
      const orderId = parseInt(req.params.id);
      const status = req.body.status;
      const result = await orderService.modifyOrderStatus(orderId, status);
      res.status(200).json(result);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      }
    }
  });
  
  

export default orderRouter;