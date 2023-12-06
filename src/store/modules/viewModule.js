import ViewService from "@/services/viewService";

const ViewModule = {
    namespaced : true,

    state : {
        addViewSuccessResult : false
    },

    getters : {
        _getAddViewSuccessResult : (state) => state.addViewSuccessResult, 
    },

    mutations : {
        setAddViewSuccessResult : (state,successResult) => state.addViewSuccessResult = successResult
    },

    actions : {
        async addView(context,params){
            await ViewService.addView(params)
            .then(response => context.commit('setAddViewSuccessResult',response.success))
            .catch(error => console.log(error));
        }
    }
};

export default ViewModule;