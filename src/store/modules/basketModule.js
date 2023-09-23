import BasketService from "@/services/basketService";

const BasketModule = {
    namespaced : true,

    state:{
        selectedBookBasketCount : 0,
    },

    mutations:{
        setSelectedBookBasketCount : (state,count) => state.selectedBookBasketCount = count,
    },

    getters:{
        _getSelectedBookBasketCount : (state) => state.selectedBookBasketCount,
    },

    actions:{
        async getSelectedBookBasketCount(context,bookId){
            await BasketService.getSelectedBookBasketCount(bookId)
            .then(responseDataCount => context.commit('setSelectedBookBasketCount',responseDataCount))
            .catch(error => console.log(error));
        }
    }
}

export default BasketModule;