import PublisherService from "@/services/publisherService";
const PublisherModule = {
    namespaced : true,

    state:{
        publishers : [],
        selectedPublisherId : 0,
        selectedPublisher : null,
        publisherNames : [],
    },

    mutations:{
        setPublishers : (state,publishers) => state.publishers = publishers,
        setSelectedPublisher : (state,publisher) => state.selectedPublisher = publisher,
        setPublisherNames : (state,publisherNames) => state.publisherNames = publisherNames,
    },

    getters:{
        _getAll : (state) => state.publishers,
        _getSelectedPublisherId : (state) => state.selectedPublisherId,
        _getSelectedPublisher : (state) => state.selectedPublisher,
        _getPublisherNames : (state) => state.publisherNames,
    },

    actions:{
        async getAll(context){
            await PublisherService.getAllPublisher()
            .then(responsePublishers => context.commit('setPublishers',responsePublishers.data))
            .catch(error => console.log(error));
        },
        async getPublisherById(context,publisherId){
            await PublisherService.getPublisherById(publisherId)
            .then(responsePublisher => context.commit('setSelectedPublisher',responsePublisher.data))
            .catch(error => console.log(error));
        },
        async getAllPublisherName(context){
            await PublisherService.getAllPublisherName()
            .then(response => context.commit('setPublisherNames',response.data))
            .catch(error => console.log(error));
        }
    }
}

export default PublisherModule;