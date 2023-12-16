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
        relatedBooks : [],
        bookDataForAdmin : [],
        updatedBookId : 0,
        updatedBook : null,
        updateBookInformationSuccessResult : false,
        updateBookAuthorsSuccessResult : false,
        recommendBooks : [],
        updateBookCategoriesSuccessResult : false
    },

    mutations:{
        setUpdateBookCategoriesSuccessResult : (state,successResult) => state.updateBookCategoriesSuccessResult = successResult,
        setRecommendBooks : (state,recommendBooks) => state.recommendBooks = recommendBooks,
        setUpdateBookInformationSuccessResult : (state,successResult) => state.updateBookInformationSuccessResult = successResult,
        setUpdateBookAuthorsSuccessResult : (state,successResult) => state.updateBookAuthorsSuccessResult = successResult,
        setUpdatedBook : (state,book) => state.updatedBook = book,
        setBookDataForAdmin : (state,books) => state.bookDataForAdmin = books,
        setWordClassics : (state,books) => state.worldClassics = books,
        setRelatedBooks : (state,books) => state.relatedBooks = books,
        setSelectedBook : (state,book) => state.selectedBook = book,
        setSearchBooks : (state,books) => state.searchBooks = books,
        setBooksByCommentCount : (state,books) => state.booksByCommentCount = books,
        setBooksByBasketCount : (state,books) => state.booksByBasketCount = books,
        setPublisherBooks : (state,books) => state.publisherBooks = books,
        setAuthorBooks : (state,books) => state.authorBooks = books,
        addVisitedBook : (state,book) => state.visitedBooks.push(book),
        deleteLastVisitedBook : (state) => state.visitedBooks.splice(state.visitedBooks.lenght,1),
        updateVisitedBookViewsCount : (state,bookId) => {
            const updatedBookIndex = state.visitedBooks.findIndex(book => {
                return book.visitedBook.id == bookId;
            });
            state.visitedBooks[updatedBookIndex].viewsCount++;
            state.visitedBooks.sort((value1 , value2) => value1.viewsCount - value2.viewsCount).reverse();
        },
        clearUserAccountDatas(state){
            state.visitedBooks = [];
        }
    },

    getters :{
        _getUpdateBookCategoriesSuccessResult : (state) => state.updateBookCategoriesSuccessResult,
        _getRecommendBooks : (state) => state.recommendBooks,
        _getUpdateBookInformationSuccessResult : (state) => state.updateBookInformationSuccessResult,
        _getUpdateBookAuthorsSuccessResult : (state) => state.updateBookAuthorsSuccessResult,
        _getUpdatedBook : (state) => state.updatedBook,
        _getUpdatedBookId : (state) => state.updatedBookId,
        _getBookDataForAdmin : (state) => state.bookDataForAdmin,
        _getRelatedBooks : (state) => state.relatedBooks,
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
            context.commit('setSelectedBook',null);
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
        },
        async getRelatedBooks(context,params){
            context.commit('setRelatedBooks',null)
            await BookService.getBooksByCategoryAndAuthorId(params)
            .then(response => context.commit('setRelatedBooks',response.data))
            .catch(error => console.log(error));
        }, 
        async getAllBookForAdmin(context,params){
            await BookService.getAllBookForAdmin(params)
            .then(response => context.commit('setBookDataForAdmin',response.data))
            .catch(error => console.log(error));
        },
        async getUpdatedBook(context,id){
            context.commit('setUpdatedBook',null)
            await BookService.getById(id)
            .then(response => context.commit('setUpdatedBook',response.data))
            .catch(error => console.log(error));
        },
        async updateBookInformations(context,params){
            context.commit('setUpdateBookInformationSuccessResult',false);
            await BookService.updateBook(params)
            .then(response => {
                context.commit('setUpdateBookInformationSuccessResult',response.success);
                if(response.success)    
                    context.dispatch('getUpdatedBook',params.bookId)
            })
            .catch(error => console.log(error));
        },
        async updateBookAuthors(context,params){
            context.commit('setUpdateBookAuthorsSuccessResult',false);
            await BookService.updateBookAuthors(params)
            .then(response => {
                context.commit('setUpdateBookAuthorsSuccessResult',response.success);
                if(response.success)    
                    context.dispatch('getUpdatedBook',params.bookId)
            })
            .catch(error => console.log(error));
        },
        async getRecommendBooksForSearch(context){
            await BookService.getRecommendBooksForSearch()
            .then(response => context.commit('setRecommendBooks',response.data) )
            .catch(error => console.log(error));
        },
        async updateBookCategories(context,params){
            context.commit('setUpdateBookCategoriesSuccessResult',false);
            await BookService.updateBookCategories(params)
            .then(response => context.commit('setUpdateBookCategoriesSuccessResult',response.success))
            .catch(error => console.log(error));
        }
    }
}

export default BookModule;