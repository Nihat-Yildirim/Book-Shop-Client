import CommentService from "@/services/commentService";

const CommentModule = {
    namespaced : true,

    state :{
        selectedBookCommentCount : 0,
    },

    mutations:{
        setSelectedBookCommentCount : (state , count) => state.selectedBookCommentCount = count,
    },

    getters:{
        _getSelectedBookCommentCount : (state) => state.selectedBookCommentCount,
    },

    actions:{
        async getCommentCountByBookId(context , bookId){
            await CommentService.getCommentCountByBookId(bookId)
            .then(responseCount => context.commit("setSelectedBookCommentCount",responseCount))
            .catch(error => console.log(error));
        }
    }
}

export default CommentModule;