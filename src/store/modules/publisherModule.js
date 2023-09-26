import PublisherService from "@/services/publisherService";
const PublisherModule = {
    namespaced : true,

    state:{
        publishers : [],
    },

    mutations:{
        setPublishers(state,publishers){
            state.publishers = publishers;
        }
    },

    getters:{
        _getAll : (state) => state.publishers,
    },

    actions:{
        async getAll(context){
            await PublisherService.getAllPublisher()
            .then(responsePublishers => context.commit('setPublishers',responsePublishers.data))
            .catch(error => console.log(error));
        },
    }
}

export default PublisherModule;