import ViewService from "@/services/viewService";

const ViewModule = {
    namespaced : true,

    state : {
        addViewSuccessResult : false,
        selectedBookViewDatasForDays : [],
    },

    getters : {
        _getSelectedBookViewDatasForDays : (state) => state.selectedBookViewDatasForDays,
        _getAddViewSuccessResult : (state) => state.addViewSuccessResult, 
    },

    mutations : {
        setSelectedBookViewDatasForDays : (state,viewDatas) => state.selectedBookViewDatasForDays = viewDatas,
        setAddViewSuccessResult : (state,successResult) => state.addViewSuccessResult = successResult
    },

    actions : {
        async addView(context,params){
            await ViewService.addView(params)
            .then(response => context.commit('setAddViewSuccessResult',response.success))
            .catch(error => console.log(error));
        },
        async getSelectedBookViewDatasForDays(context,bookId){
            context.commit('setSelectedBookViewDatasForDays',null);
            await ViewService.getSelectedBookViewDatasForDays(bookId)
            .then(response => context.commit('setSelectedBookViewDatasForDays',response.data))
            .catch(error => console.log(error));
        }
    }
};

export default ViewModule;