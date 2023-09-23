import appAxios from "@/utils/appAxios";

const BasketService = {
    async addBasket(userId){
        var result = await appAxios.post(`Baskets/AddBasket?UserId=${userId}`);
        return result.data;
    },

    async addBasketItem(addedBasketItem){
        var result = await appAxios.post("Baskets/AddBasketItem",addedBasketItem);
        return result.data;
    },

    async updateBasketItem(updatedBasketItem){
        var result = await appAxios.put("Baskets/UpdateBasketItem",updatedBasketItem);
        return result.data;
    },

    async deleteBasketItem(deletedBasketItem){
        var result = await appAxios.delete("Baskets/DeleteBasketItem",deletedBasketItem);
        return result.data;
    },

    async getAllBasket(){
        var result = await appAxios.get("Baskets/GetAllBasket");
        return result.data;
    },

    async getBasketByUserId(userId){
        var result = await appAxios.get(`Baskets/GetBasketByUserId?UserId=${userId}`);
        return result.data;
    },
    
    async getSelectedBookBasketCount(bookId){
        var result = await appAxios.get(`Baskets/GetSelectedBookBasketCount?BookId=${bookId}`);
        return result.data;
    }
}

export default BasketService;