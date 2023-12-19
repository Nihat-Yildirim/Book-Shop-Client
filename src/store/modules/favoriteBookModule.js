import FavoriteBookService from "@/services/favoriteBookService";

const FavoriteBookModule = {
    namespaced : true,

    state : {
        favoriteBooks : [],
        addFavoriteBookSuccesResult : false,
        deleteFavoriteBookSuccessResult : false,
        selectedBookFavoriteDatasForDays : [],
    },

    getters : {
        _getFavoriteBooks : (state) => state.favoriteBooks,
        _getAddFavoriteBookSuccesResult : (state) => state.addFavoriteBookSuccesResult,
        _getDeleteFavoriteBookSuccessResult : (state) => state.deleteFavoriteBookSuccessResult,
        _getSelectedBookFavoriteDatasForDays : (state) => state.selectedBookFavoriteDatasForDays,
    },

    mutations : {
        setSelectedBookFavoriteDatasForDays : (state,selectedBookFavoriteDatasForDays) => state.selectedBookFavoriteDatasForDays = selectedBookFavoriteDatasForDays,
        setAddFavoriteBookSuccesResult : (state,successResult) => state.addFavoriteBookSuccesResult = successResult,
        setDeleteFavoriteBookSuccessResult : (state,successResult) => state.deleteFavoriteBookSuccessResult = successResult,
        setFavoriteBooks : (state,favoriteBooks) => state.favoriteBooks = favoriteBooks,
        addFavoriteBook : (state,favoriteBook) => state.favoriteBooks.push(favoriteBook),
        deleteFavoriteBook : (state,id) => {
            let index = state.favoriteBooks.findIndex(x => x.id == id);
            if(index > -1)
                state.favoriteBooks.splice(index,1);
        }
    },


    actions : {
        async getFavoriteBooks(context,userId){
            await FavoriteBookService.getUserFavoriteBooks(userId)
            .then(response => context.commit('setFavoriteBooks',response.data))
            .catch(error => console.log(error));
        },
        async addFavoriteBook(context,params){
            context.commit('setAddFavoriteBookSuccesResult',false);
            await FavoriteBookService.add(params)
            .then(response => {
                context.commit('setAddFavoriteBookSuccesResult',response.success);
                if(response.success && context.favoriteBooks)
                    context.commit('addFavoriteBook',response.data)
                
                if(!context.favoriteBooks)
                    context.dispatch('getFavoriteBooks',params.userId);
            })
            .catch(error => console.log(error));
        },
        async deleteFavoriteBook(context,params){
            context.commit('setDeleteFavoriteBookSuccessResult',false);
            await FavoriteBookService.delete(params.favoriteBookId)
            .then(response => {
                context.commit('setDeleteFavoriteBookSuccessResult',response.success);
                if(response.success && context.favoriteBooks)
                    context.commit('deleteFavoriteBook',params.favoriteBookId);

                if(!context.favoriteBooks)
                    context.dispatch('getFavoriteBooks',params.userId);
            })
            .catch(error => console.log(error));
        },
        async getSelectedBookFavoriteDatasForDays(context,bookId){
            context.commit('setSelectedBookFavoriteDatasForDays',null);
            await FavoriteBookService.getSelectedBookFavoriteDatasForDays(bookId)
            .then(response => context.commit('setSelectedBookFavoriteDatasForDays',response.data))
            .catch(error => console.log(error));
        }
    }
}

export default FavoriteBookModule;