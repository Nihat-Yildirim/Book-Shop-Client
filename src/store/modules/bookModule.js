import BookService from "@/services/bookService";

const BookModule = {
    namespaced : true,

    state:{
        worldClassics : [],
        selectedBook : null,
        selectedBookId : 0,
        searchBooks : [],
        booksByCommentCount : [],
        booksByBasketCount : []
    },

    mutations:{
        setWordClassics : (state,books) => state.worldClassics = books,
        setSelectedBook : (state,book) => state.selectedBook = book,
        setSearchBooks : (state,books) => state.searchBooks = books,
        setBooksByCommentCount : (state,books) => state.booksByCommentCount = books,
        setBooksByBasketCount : (state,books) => state.booksByBasketCount = books,
    },

    getters :{
        _getWorldClassics : (state) => state.worldClassics,
        _getSelectedBook : (state) => state.selectedBook,
        _getSearchBooks : (state) => state.searchBooks,
        _getSelectedBookId : (state) => state.selectedBookId,
        _getBooksByCommentCount : (state) => state.booksByCommentCount,
        _getBooksByBasketCount : (state) => state.booksByBasketCount,
    },

    actions:{
        async getWorldClassics(context,params){
            await BookService.getBooksByCategoryId(params)
            .then(responseBooks => context.commit('setWordClassics',responseBooks.data))
            .catch(error => console.log(error));
        },
        async getBookById(context,id){
            await BookService.getById(id)
            .then(responeBook => context.commit('setSelectedBook',responeBook.data))
            .catch(error => console.log(error));
        },
        async getBooksByPattern(context,params){
            await BookService.getBooksByNamePattern(params)
            .then(response => context.commit('setSearchBooks',response.data))
            .catch(error => console.log(error));
        },
        async getBooksByCommentCount(context,pagination){
            await BookService.getBooksByCommentCount(pagination)
            .then(response => context.commit('setBooksByCommentCount',response.data))
            .catch(error => console.log(error));
        },
        async getBooksByBasketCount(context,pagination){
            await BookService.getBooksByBasketCount(pagination)
            .then(response => context.commit('setBooksByBasketCount',response.data))
            .catch(error => console.log(error));
        }
    }
}

export default BookModule;