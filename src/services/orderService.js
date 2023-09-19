import appAxios from "@/utils/appAxios";

const OrderService = {
    async addOrder(addedOrder){
        const result = await appAxios.post("Orders/AddOrder",addedOrder);
        return result.data;
    },

    async updateOrder(updatedOrder){
        const result = await appAxios.put("Orders/UpdateOrder" , updatedOrder);
        return result.data;
    },

    async getAllOrder(){
        const result = await appAxios.get("Orders/GetAllOrder");
        return result.data;
    },

    async getOrdersByUserId(userId){
        const result = await appAxios.get(`Orders/GetOrdersByUserId?UserId=${userId}`);
        return result.data;
    }
}

export default OrderService;