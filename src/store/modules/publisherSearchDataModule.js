import PublisherSearchDataService from "@/services/publisherSearchDataService";

const PublisherSearchDataModule = {
    namespaced : true,

    state : {
        addPublisherSearchDataSuccessResult : false,
    },

    getters : {
        _getAddPublisherSearchDataSuccessResult : (state) => state.addPublisherSearchDataSuccessResult
    },

    mutations : {
        setAddPublisherSearchDataSuccessResult : (state,successResult) => state.addPublisherSearchDataSuccessResult = successResult
    },  

    actions : {
        async add(context,publisherId){
            context.commit('setAddPublisherSearchDataSuccessResult',false);
            PublisherSearchDataService.add(publisherId)
            .then(response => context.commit('setAddPublisherSearchDataSuccessResult',response.success))
            .catch(error => console.log(error));
        }
    }
}

export default PublisherSearchDataModule;