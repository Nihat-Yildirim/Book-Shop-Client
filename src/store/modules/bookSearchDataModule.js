import BookSearchDataService from "@/services/bookSearchDataService";

const BookSearchDataModule = {
    namespaced : true,

    state : {
        addBookSearchDataSuccessResult : false,
    },

    getters : {
        _getAddBookSearchDataSuccessResult : (state) => state.addBookSearchDataSuccessResult,
    },

    mutations : {
        setAddBookSearchDataSuccessResult : (state,successResult) => state.addBookSearchDataSuccessResult = successResult,
    },

    actions : {
        async add(context,bookId){
            context.commit('setAddBookSearchDataSuccessResult',false);
            await BookSearchDataService.add(bookId)
            .then(response => context.commit('setAddBookSearchDataSuccessResult',response.success))
            .catch(error => console.log(error));
        }
    }
}

export default BookSearchDataModule;