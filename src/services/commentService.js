import appAxios from "@/utils/appAxios";

const CommentService = {
    async addComment(addedComment){
        var result = await appAxios.post("Comments/AddComment",null,{
            params:{
                BookId : addedComment.bookId,
                UserId : addedComment.userId,
                parentCommandId : 0,
                Comment : addedComment.comment
            }
        });
        return result.data;
    },

    async addCommentRating(addedCommentRating){
        var result = await appAxios.post("Comments/AddCommentRating",null,{
            params:{
                UserId : addedCommentRating.userId,
                CommentId : addedCommentRating.commentId,
                Useful : addedCommentRating.useful,
            }
        });
        return result.data;
    },

    async updateCommentRating(updatedCommentRating){
        var result = await appAxios.put(`Comments/UpdateCommentRating?UserId=${updatedCommentRating.userId}&CommentRatingId=${updatedCommentRating.commentRatingId}&Useful=${updatedCommentRating.useful}`);
        return result.data;
    },

    async deleteComment(deletCommentParameter){
        var result = await appAxios.delete(`Comments/DeleteComment?UserId=${deletCommentParameter.userId}&CommentId=${deletCommentParameter.commentId}`);
        return result.data;
    },

    async deleteCommentRating(deletCommentRatingParameter){
        var result = await appAxios.delete(`Comments/DeleteCommentRating?UserId=${deletCommentRatingParameter.userId}&CommentRatingId=${deletCommentRatingParameter.commentRatingId}`);
        return result.data;
    },

    async getSelectedBookUserComment(params){
        var result = await appAxios.get(`Comments/GetSelectedBookUserComment?BookId=${params.bookId}&UserId=${params.userId}`);
        return result.data;
    },

    async getCommentsByBookId(params){
        var result = await appAxios.get(`Comments/GetCommentsByBookId`,{
            params:{
                BookId: params.bookId,
                UserId: params.userId,
                Page: params.page,
                Size:  params.size
            }
        });
        return result.data;
    },

    async getAllComment(pagination){
        var result = await appAxios.get(`Comments/GetAllComment?Page=${pagination.page}&Size=${pagination.size}`);
        return result.data;
    },

    async getChildComments(parentCommandId){
        var result = await appAxios.get(`GetChildComments?ParentCommentId=${parentCommandId}`);
        return result.data;
    },

    async getCommentsByUserId(pagination,userId){
        var result = await appAxios.get(`Comments/GetCommentsByUserId?Page=${pagination.page}&Size=${pagination.size}&UserId=${userId}`);
        return result.data;
    },

    async getCommentCountByBookId(bookId){
        var result = await appAxios.get(`Comments/GetCommentCountByBookId?BookId=${bookId}`);
        return result.data;
    },

    async getSelectedCommentRating(params){
        var result = await appAxios.get(`Comments/GetSelectedCommentRating?CommentId=${params.commentId}&UserId=${params.userId}`);
        return result.data;
    }
}

export default CommentService;