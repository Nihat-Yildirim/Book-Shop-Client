import BookSearchDataService from "@/services/bookSearchDataService";

const BookSearchDataModule = {
    namespaced : true,

    state : {
        addBookSearchDataSuccessResult : false,
        selectedBookSearchDatasForDays : [],
    },

    getters : {
        _getSelectedBookSearchDatasForDays : (state) => state.selectedBookSearchDatasForDays,
        _getAddBookSearchDataSuccessResult : (state) => state.addBookSearchDataSuccessResult,
    },

    mutations : {
        setSelectedBookSearchDatasForDays : (state,selectedBookSearchDatasForDays) => state.selectedBookSearchDatasForDays = selectedBookSearchDatasForDays,
        setAddBookSearchDataSuccessResult : (state,successResult) => state.addBookSearchDataSuccessResult = successResult,
    },

    actions : {
        async add(context,bookId){
            context.commit('setAddBookSearchDataSuccessResult',false);
            await BookSearchDataService.add(bookId)
            .then(response => context.commit('setAddBookSearchDataSuccessResult',response.success))
            .catch(error => console.log(error));
        },
        async getSelectedBookSearchDatasForDays(context,bookId){
            context.commit('setSelectedBookSearchDatasForDays',null);
            await BookSearchDataService.getSelectedBookSearchDatasForDays(bookId)
            .then(response => context.commit('setSelectedBookSearchDatasForDays',response.data))
            .catch(error => console.log(error));
        }
    }
}

export default BookSearchDataModule;