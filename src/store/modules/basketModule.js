import BasketService from "@/services/basketService";

const BasketModule = {
    namespaced : true,

    state:{
        selectedBookBasketCount : 0,
        selectedBasketItems : [],
        selectedBasketId : 0, 
        addedBasketSuccessResult : false,
        deleteBasketItemSuccessResult : false,
        addedBasketItemSuccessResult : false,
        updateBasketItemSuccessResult : false,
        updateBasketItemSelectedValueSuccessResult : false,
    },

    mutations:{
        setDeleteBasketItemSuccessResult : (state,successResult) => state.deleteBasketItemSuccessResult = successResult,
        setSelectedBookBasketCount : (state,count) => state.selectedBookBasketCount = count,
        setSelectedBasketItems : (state,basket) => state.selectedBasketItems = basket,
        setAddedBasketSuccessResult : (state,successResult) => state.addedBasketSuccessResult = successResult,
        setAddedBasketItemSuccessResult : (state,successResult) => state.addedBasketItemSuccessResult = successResult,
        setSelectedBasketId : (state,basketId) => state.selectedBasketId = basketId,
        setUpdateBasketItemSuccessResult : (state,successResult) => state.updateBasketItemSuccessResult = successResult,
        setUpdateBasketItemSelectedValueSuccessResult : (state,successResult) => state.updateBasketItemSelectedValueSuccessResult = successResult,
        clearUserAccountDatas(state){
            state.selectedBasketId = 0;
            state.selectedBasketItems = [];
            state.addedBasketSuccessResult = false;
            state.addedBasketItemSuccessResult = false;
        }
    },

    getters:{
        _getDeleteBasketItemSuccessResult : (state) => state.deleteBasketItemSuccessResult,
        _getUpdateBasketItemSelectedValueSuccessResult: (state) => state.updateBasketItemSelectedValueSuccessResult,
        _getUpdateBasketItemSuccessResult : (state) => state.updateBasketItemSuccessResult,
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
            context.commit('setAddedBasketItemSuccessResult',false);
            await BasketService.addBasketItem(basketItem)
            .then((response)=>{
                context.commit('setAddedBasketItemSuccessResult',response.success);
                context.dispatch('getSelectedUserBasket',basketItem.userId);
            })
            .catch(error => console.log(error));
        },
        async updateBasketItem(context,basketItem){
            context.commit('setUpdateBasketItemSuccessResult',false);
            await BasketService.updateBasketItem(basketItem)
            .then((response) => {
                context.dispatch('getSelectedUserBasket',basketItem.userId);
                context.commit('setUpdateBasketItemSuccessResult',response.success);
            })
            .catch(error => console.log(error));
        },
        async updateBasketItemSelectedValue(context,basketItem){
            context.commit('setUpdateBasketItemSelectedValueSuccessResult',false);
            await BasketService.updateBasketItemSelectedValue(basketItem)
            .then(response =>{ 
                context.dispatch('getSelectedUserBasket',basketItem.userId);
                context.commit('setUpdateBasketItemSelectedValueSuccessResult',response.success);
            })
            .catch(error => console.log(error));
        },
        async deleteBasketItem(context,deletedBasketItem){
            context.commit('setDeleteBasketItemSuccessResult',false);
            await BasketService.deleteBasketItem(deletedBasketItem)
            .then(response =>{
                context.commit('setDeleteBasketItemSuccessResult',response.success);
                context.dispatch('getSelectedUserBasket',deletedBasketItem.userId)
            })
            .catch(error => console.log(error));
        }
    }
}

export default BasketModule;