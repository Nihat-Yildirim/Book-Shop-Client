import appAxios from "@/utils/appAxios";

const CommentService = {
    async addComment(addedComment){
        var result = await appAxios.post("Comments/AddComment",addedComment);
        return result.data;
    },

    async addCommentRating(addedCommentRating){
        var result = await appAxios.post("Comments/AddCommentRating",addedCommentRating);
        return result.data;
    },

    async updateCommentRating(updatedCommentRating){
        var result = await appAxios.put("Comments/UpdateCommentRating",updatedCommentRating);
        return result.data;
    },

    async deleteComment(deletCommentParameter){
        var result = await appAxios.delete(`Comments/DeleteComment?UserId=${deletCommentParameter.userId}&CommentId=${deletCommentParameter.commentId}`);
        return result.data;
    },

    async deleteCommentRating(deletCommentRatingParameter){
        var result = await appAxios.delete(`Comments/DeleteCommentRating?UserId=${deletCommentRatingParameter.userId}&CommentRatingId=${deletCommentRatingParameter.deleteCommentRatingId}`);
        return result.data;
    },

    async getCommentsByBookId(bookId){
        var result = await appAxios.get(`GetCommentsByBookId?BookId=${bookId}`);
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
    }
}

export default CommentService;