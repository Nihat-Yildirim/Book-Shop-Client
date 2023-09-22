import BookService from "@/services/bookService";

const BookModule = {
    namespaced : true,

    state:{
        worldClassics : [],
    },

    mutations:{
        setWordClassics(state,books){
            state.worldClassics = books
        }
    },

    getters :{
        _getWorldClassics : (state) => state.worldClassics,
    },

    actions:{
        async getWorldClassics(context,params){
            await BookService.GetBooksByCategoryId(params)
            .then(responseBooks => context.commit('setWordClassics',responseBooks.data))
            .catch(error => console.log(error));
        },
    }
}

export default BookModule;