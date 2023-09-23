import OrderService from "@/services/orderService";

const OrderModule = {
    namespaced : true,

    state:{
        selectedBookOrderCountByBookId : 0
    },
    
    mutations:{
        setSelectedBookOrderCount : (state,count) => state.selectedBookOrderCountByBookId = count, 
    },

    getters:{
        _getSelectedBookOrderCount : (state) => state.selectedBookOrderCountByBookId,
    },

    actions:{
        async getOrderCountByBookId(context,bookId){
            OrderService.getOrderCountByBookId(bookId)
            .then(responseCount => context.commit('setSelectedBookOrderCount',responseCount))
            .catch(error => console.log(error));
        }
    }
}

export default OrderModule;