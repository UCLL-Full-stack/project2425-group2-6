import { orderInput } from "@/types/orderType";

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