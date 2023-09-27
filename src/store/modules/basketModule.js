import BasketService from "@/services/basketService";

const BasketModule = {
    namespaced : true,

    state:{
        selectedBookBasketCount : 0,
        selectedBasketItems : [],
        selectedBasketId : 0, 
        addedBasketSuccessResult : false,
        addedBasketItemSuccessResult : false,
    },

    mutations:{
        setSelectedBookBasketCount : (state,count) => state.selectedBookBasketCount = count,
        setSelectedBasketItems : (state,basket) => state.selectedBasketItems = basket,
        setAddedBasketSuccessResult : (state,successResult) => state.addedBasketSuccessResult = successResult,
        setAddedBasketItemSuccessResult : (state,successResult) => state.addedBasketItemSuccessResult = successResult,
        setSelectedBasketId : (state,basketId) => state.selectedBasketId = basketId,
    },

    getters:{
        _getSelectedBookBasketCount : (state) => state.selectedBookBasketCount,
        _getSelectedBasketItems : (state) => state.selectedBasketItems,
        _getSelectedBasketId :(state) => state.selectedBasketId,
        _getAddedBasketSuccessResult : (state) => state.addedBasketSuccessResult,
        _getAddedBasketItemSuccessResult : (state) => state.addedBasketItemSuccessResult,
    },

    actions:{
        async getSelectedBookBasketCount(context,bookId){
            await BasketService.getSelectedBookBasketCount(bookId)
            .then(responseDataCount => context.commit('setSelectedBookBasketCount',responseDataCount.data.count))
            .catch(error => console.log(error));
        },
        async getSelectedUserBasket(context,selectedUserId){
            await BasketService.getBasketByUserId(selectedUserId)
            .then(response => {
                context.commit('setSelectedBasketItems',response.data.basketItems);
                context.commit('setSelectedBasketId',response.data.basketId);
            })
            .catch(error=> console.log(error));
        },
        async addBasket(context,userId){
            await BasketService.addBasket(userId)
            .then(respone => context.commit('setAddedBasketSuccessResult',respone.success))
            .catch(error => console.log(error));
        },
        async addBasketItem(context,basketItem){
            await BasketService.addBasketItem(basketItem)
            .then((response)=>{
                context.commit('setAddedBasketItemSuccessResult',response.success);
                context.dispatch('getSelectedUserBasket',basketItem.userId);
            })
            .catch(error => console.log(error));
        },
        async updateBasketItem(context,basketItem){
            await BasketService.updateBasketItem(basketItem)
            .then(() => context.dispatch('getSelectedUserBasket',basketItem.userId))
            .catch(error => console.log(error));
        },
        async deleteBasketItem(context,deletedBasketItem){
            await BasketService.deleteBasketItem(deletedBasketItem)
            .then(() => context.dispatch('getSelectedUserBasket',deletedBasketItem.userId))
            .catch(error => console.log(error));
        }
    }
}

export default BasketModule;