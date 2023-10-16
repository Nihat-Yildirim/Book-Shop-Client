import BookService from "@/services/bookService";

const BookModule = {
    namespaced : true,

    state:{
        worldClassics : [],
        selectedBook : null,
        selectedBookId : 0,
        searchBooks : [],
        booksByCommentCount : [],
        booksByBasketCount : [],
        publisherBooks : [],
        authorBooks : [],
        visitedBooks : [],
    },

    mutations:{
        setWordClassics : (state,books) => state.worldClassics = books,
        setSelectedBook : (state,book) => state.selectedBook = book,
        setSearchBooks : (state,books) => state.searchBooks = books,
        setBooksByCommentCount : (state,books) => state.booksByCommentCount = books,
        setBooksByBasketCount : (state,books) => state.booksByBasketCount = books,
        setPublisherBooks : (state,books) => state.publisherBooks = books,
        setAuthorBooks : (state,books) => state.authorBooks = books,
        addVisitedBook : (state,book) => state.visitedBooks.push(book),
        deleteLastVisitedBook : (state) => {
            state.visitedBooks.splice(state.visitedBooks.lenght,1);
        },
        updateVisitedBookViewsCount : (state,bookId) => {
            const updatedBookIndex = state.visitedBooks.findIndex(book => {
                return book.visitedBook.id == bookId;
            });
            state.visitedBooks[updatedBookIndex].viewsCount++;
            state.visitedBooks.sort((value1 , value2) => value1.viewsCount - value2.viewsCount).reverse();
        }
    },

    getters :{
        _getWorldClassics : (state) => state.worldClassics,
        _getSelectedBook : (state) => state.selectedBook,
        _getSearchBooks : (state) => state.searchBooks,
        _getSelectedBookId : (state) => state.selectedBookId,
        _getBooksByCommentCount : (state) => state.booksByCommentCount,
        _getBooksByBasketCount : (state) => state.booksByBasketCount,
        _getPublisherBooks : (state) => state.publisherBooks,
        _getAuthorBooks : (state) => state.authorBooks,
        _getVisitedBooks : (state) => state.visitedBooks,
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
        },
        async getBooksByPublisherId(context,params){
            await BookService.getBooksByPublisherId(params)
            .then(response => context.commit('setPublisherBooks',response.data))
            .catch(error => console.log(error));
        },
        async getBooksByAuthorId(context,params){
            await BookService.getBooksByAuthorId(params)
            .then(response => context.commit('setAuthorBooks',response.data))
            .catch(error => console.log(error));
        }
    }
}

export default BookModule;