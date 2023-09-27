import CommentService from "@/services/commentService";

const CommentModule = {
    namespaced : true,

    state :{
        selectedBookCommentCount : 0,
        selectedBookUserComment : null,
        selectedBookComments : [],
        selectedCommentRating : null,
    },

    mutations:{
        setSelectedBookCommentCount : (state , count) => state.selectedBookCommentCount = count,
        setSelectedBookUserComment : (state , comment) => state.selectedBookUserComment = comment,
        setSelectedBookComments : (state,comments) => state.selectedBookComments = comments,
        setSelectedCommentRating : (state,commentRating) => state.selectedCommentRating = commentRating,
    },

    getters:{
        _getSelectedBookCommentCount : (state) => state.selectedBookCommentCount,
        _getSelectedBookUserComment : (state) => state.selectedBookUserComment,
        _getSelectedBookComments : (state) => state.selectedBookComments,
        _getSelectedCommentRating : (state) => state.selectedCommentRating,
    },

    actions:{
        async getCommentCountByBookId(context , bookId){
            await CommentService.getCommentCountByBookId(bookId)
            .then(responseCount => context.commit("setSelectedBookCommentCount",responseCount))
            .catch(error => console.log(error));
        },
        async addComment(context,addCommentParams){
            const params = {
                bookId : addCommentParams.bookId,
                userId : addCommentParams.userId};
            await CommentService.addComment(addCommentParams)
            .then(() => context.dispatch('getSelectedBookUserComment',params))
            .catch(error => console.log(error));
        },
        async getSelectedBookUserComment(context,params){
            await CommentService.getSelectedBookUserComment(params)
            .then(response => context.commit('setSelectedBookUserComment',response.data))
            .catch(error => console.log(error));
        },
        async deleteUserComment(context,params){
            const parameter ={
                userId: params.userId,
                bookId: params.bookId}
            await CommentService.deleteComment(params)
            .then(() => context.dispatch('getSelectedBookUserComment',parameter))
            .catch(error => console.log(error));
        },
        async getSelectedBookComments(context,params){
            await CommentService.getCommentsByBookId(params)
            .then(response => context.commit('setSelectedBookComments',response.data))
            .catch(error => console.log(error));
        },
        async addCommentRating(context,params){
            const parameter ={
                userId: params.userId,
                bookId: params.bookId,
                page : 0,
                size : 50}
            await CommentService.addCommentRating(params)
            .then(() => context.dispatch('getSelectedBookComments',parameter))
            .catch(error => console.log(error));
        },
        async deleteCommentRating(context,params){
            const parameter ={
                userId: params.userId,
                bookId: params.bookId,
                page : 0,
                size : 50}
            const commentRatingParameter = {
                commentId : params.commentId,
                userId : params.userId
            };
            await context.dispatch('getSelectedCommentRating',commentRatingParameter);
            await CommentService.deleteCommentRating({
                userId : params.userId,
                commentRatingId : context.state.selectedCommentRating.commentRatingId
            })
            .then(() => context.dispatch('getSelectedBookComments',parameter))
            .catch(error => console.log(error));
        },
        async getSelectedCommentRating(context,params){
            await CommentService.getSelectedCommentRating(params)
            .then(response => context.commit('setSelectedCommentRating',response.data))
            .catch(error => console.log(error));
        },
        async updateCommentRating(context,params){
            const parameter ={
                userId: params.userId,
                bookId: params.bookId,
                page : 0,
                size : 50}
            const commentRatingParameter = {
                commentId : params.commentId,
                userId : params.userId
            };
            await context.dispatch('getSelectedCommentRating',commentRatingParameter);
            await CommentService.updateCommentRating({
                userId : params.userId,
                commentRatingId : context.state.selectedCommentRating.commentRatingId,
                useful : params.useful
            })
            .then(()=>context.dispatch('getSelectedBookComments',parameter))
            .catch(error => console.log(error));
        }
    }
}

export default CommentModule;