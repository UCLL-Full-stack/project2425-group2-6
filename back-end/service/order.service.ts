import OrderDb from "../repository/Order.db"

const getAllOrders = () => {
    return OrderDb.getAllOrders();
}

export default {
    getAllOrders,
}