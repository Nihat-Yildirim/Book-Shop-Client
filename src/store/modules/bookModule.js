import BookService from "@/services/bookService";
import createPersistedState from "vuex-persistedstate";

const BookModule = {

    plugins : [createPersistedState({
        key : "BookModuleKey",
        paths : ["selectedBookId"],
    })],

    namespaced : true,

    state:{
        worldClassics : [],
        selectedBook : null,
        selectedBookId : 0
    },

    mutations:{
        setWordClassics(state,books){
            state.worldClassics = books;
        },
        setSelectedBook(state,book){
            state.selectedBook = book;
        }
    },

    getters :{
        _getWorldClassics : (state) => state.worldClassics,
        _getSelectedBook : (state) => state.selectedBook,
    },

    actions:{
        async getWorldClassics(context,params){
            await BookService.GetBooksByCategoryId(params)
            .then(responseBooks => context.commit('setWordClassics',responseBooks.data))
            .catch(error => console.log(error));
        },
        async getBookById(context,id){
            await BookService.getById(id)
            .then(responeBook => context.commit('setSelectedBook',responeBook.data))
            .catch(error => console.log(error));
        }
    }
}

export default BookModule;