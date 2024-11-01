import { orderInput } from "@/types/orderType";
import { create } from "domain";

const createOrder = async (orderInput : orderInput) => {
    return fetch(
        process.env.NEXT_PUBLIC_API_URL + "/orders", {
            method: `POST`,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderInput),
        }
    );
}

const OrderService = {
    createOrder
  };

export default OrderService;