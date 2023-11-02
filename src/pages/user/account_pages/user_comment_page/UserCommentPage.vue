<template>
    <HeaderComponent/>
    <div id="user-comment-page-container">
        <div id="user-comment-page-left-container">
            <UserAccountHeader :userAllCommentButtonSelect="true"/>
        </div>
        <div id="user-comment-page-right-container">
            <div id="user-comment-container">
                <div id="user-comment-container-title">
                    Değerlendirmelerim
                </div>
                <div id="user-comment-container-content">
                    <div v-for="comment in getComments.comments" class="user-comment" :key="comment.commentId">
                        <div @click="navigateBookDetail(comment)" class="user-comment-left-container">
                            <img :src="getBookPictureUrl(comment.bookPictureUrl)" alt="">
                        </div>
                        <div class="user-comment-right-container">
                            <div class="user-comment-right-container-left">
                                <div class="user-comment-book-name">{{ comment.bookName }}</div>
                                <div class="user-comment-book-comment">{{ comment.comment }}</div>
                            </div>
                            <div class="user-comment-right-container-right">
                                <div class="user-comment-delete-container">
                                    <i @click="deleteCommentButton(comment)" class="bi bi-trash"></i>
                                </div>
                                <div class="user-comment-comment-ratings-container">
                                    <div class="user-comment-ratings-usefull">
                                        <i class="bi bi-hand-thumbs-up-fill"></i>
                                        <span>{{ comment.totalUsefulRating }}</span>
                                    </div>
                                    <div class="user-comment-ratings-not-usefull">
                                        <i class="bi bi-hand-thumbs-down-fill"></i>
                                        <span>{{ comment.totalNotUsefulRating }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="user-comment-container-pagination">
                    <div id="user-total-comment">{{ getComments.commentsCount }}</div>
                    <div id="user-comment-pagination-buttons">
                        <i class="bi bi-chevron-left" @click="previousPage"></i>
                        <div id="pagination-page">{{ page + 1 }}/{{ totalPage }}</div>
                        <i class="bi bi-chevron-right" @click="nextPage"></i>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div v-if="deleteCommentPopUpVisibility" id="delete-comment-popup">
        <div id="delete-comment-container">
            <div id="delete-comment-container-top">
                <i @click="hideDeleteCommentPopUp" class="bi bi-x-lg"></i>
            </div>
            <div id="delete-comment-container-bottom">
                <div>Silmek İstediğinize Eminmisiniz ?</div>
                <button @click="deleteComment">Sil</button>
            </div>
        </div>
    </div>
</template>

<script>
import HeaderComponent from '@/pages/user/components/HeaderComponent';
import UserAccountHeader from '@/pages/user/account_pages/components/UserAccountHeader';
import { mapGetters,mapActions } from 'vuex';

export default{
    data(){
        return{
            page : 0,
            totalPage : 0,
            deleteCommentPopUpVisibility : false,
            deletedComment : null,
        }
    },
    computed:{
        ...mapGetters({
            getComments : "CommentModule/_getUserComments",
            getUserId : "AuthModule/_getUserId",
            getDeleteCommentSuccessResult : "CommentModule/_getDeleteCommentSuccessResult",
        }),
    },
    methods:{
        ...mapActions({
            getCommentsByUserIdAction : "CommentModule/getCommentsByUserId",
            deleteCommentAction : "CommentModule/deleteComment",
        }),
        getBookPictureUrl(pictureUrl){
            if(pictureUrl==null)
                return require("@/assets/no-image-available.jpg");
            return pictureUrl;
        },
        commentTotalPage(){
            if(this.getComments != null)
                this.totalPage = Math.ceil(this.getComments.commentsCount / 5);
        },
        navigateBookDetail(comment){
            this.$router.push({
                name : "BookDetailPage",
                params : {
                    bookName : comment.bookName.toLowerCase().replace(/\s+/g, "-")
                }
            });
            this.$store.state.BookModule.selectedBookId = comment.bookId;
        },
        nextPage(){
            if(this.page + 1 == this.totalPage)
                return;

            if(this.page < this.totalPage){
                this.page++;
                this.getCommentsByUserIdAction({
                    userId : this.getUserId,
                    page : this.page,
                    size : 5
                });
            }
        },
        previousPage(){
            if(this.page == 0)
                return;

            if(this.page <= this.totalPage ){
                this.page--;
                this.getCommentsByUserIdAction({
                    userId : this.getUserId,
                    page : this.page,
                    size : 5
                });
            }
        },
        deleteComment(){
            if(this.deletedComment != null && this.getUserId != 0){
                this.deleteCommentAction({
                    userId : this.getUserId,
                    commentId : this.deletedComment.commentId,
                })
            }
        },
        deleteCommentButton(comment){
            this.deleteCommentPopUpVisibility = true;
            this.deletedComment = comment;
        },
        hideDeleteCommentPopUp(){
            this.deletedComment = null;
            this.deleteCommentPopUpVisibility = false;
        }
    },
    components:{
        HeaderComponent,
        UserAccountHeader,
    },
    watch:{
        getComments(){
            if(this.getComments)
                this.commentTotalPage();
        },
        getDeleteCommentSuccessResult(){
            if(this.getDeleteCommentSuccessResult){
                if(this.getComments.comments.length == 1){
                    this.previousPage();
                    this.hideDeleteCommentPopUp();
                }

                if(this.getComments.comments.length > 1){
                    this.getCommentsByUserIdAction({
                        userId : this.getUserId,
                        page : this.page,
                        size : 5
                    });

                    this.hideDeleteCommentPopUp();
                }
            }
        }
    },
    mounted(){
        if(this.getUserId != null && this.getUserId != 0)
            this.getCommentsByUserIdAction({
                userId : this.getUserId,
                page : this.page,
                size : 5
            });
    }
}
</script>

<style>
    #user-comment-page-container{
        width: 100%;
        min-width: 1510px;
        padding: 50px 9% 0 9%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin-bottom: 50px;
        height: auto;
    }

    #user-comment-page-left-container{
        width: 23%;
        margin-right: 20px;
    }

    #user-comment-page-right-container{
        width: 76%;
    }

    #user-comment-container{
        display: flex;
        flex-direction: column;
        padding: 10px;
        background-color: #f8f9f9;
        border: 2px solid #D5DBDB;
        box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
        border-radius: 5px;
        height: auto;
    }

    #user-comment-container-title{
        padding-left: 2px;
        margin-bottom: 15px;
        height: 30px;
        font-size: 18px;
        color: orange;
        border-bottom: 2px solid #D5DBDB;
    }

    #user-comment-container-content{
        display: flex;
        flex-direction: column;
    }

    .user-comment{
        display: flex;
        padding: 5px;
        height: 110px;
        margin-bottom: 10px;
        background-color: #FBFCFC;
        border: 2px solid #D5DBDB;
        border-radius: 7px;
    }

    .user-comment-left-container{
        cursor: pointer;
        width: 70px;
        height: 97px;
        border-radius: 3px;
        border: 1px solid #D5DBDB;
        margin-right: 10px;
    }

    .user-comment-left-container img{
        height: 100%;
        width: 100%;
        object-fit: scale-down;
    }

    .user-comment-right-container{
        display: flex;
        justify-content: space-between;
    }

    .user-comment-right-container-left{
        width: 745px;
        padding-right: 10px;
        display: flex;
        flex-direction: column;
    }

    .user-comment-right-container-right{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 80px;
    }

    .user-comment-delete-container{
        display: flex;
        justify-content: flex-end;
    }

    .user-comment-delete-container i{
        color: red;
        cursor: pointer;
        font-size: 18px;
    }

    .user-comment-comment-ratings-container{
        display: flex;
        padding-left: 15px;
    }

    .user-comment-ratings-usefull{
        color: green;
        margin-right: 7px;
    }

    .user-comment-ratings-usefull i{
        margin-right: 2px;
    }

    .user-comment-ratings-not-usefull{
        color: red;
    }

    .user-comment-ratings-not-usefull i{
        margin-right: 2px;
    }

    .user-comment-book-name{
        color: orange;
        font-size: 17px;
        margin-bottom: 2px;
    }

    .user-comment-book-comment{
        font-size: 14px;
    }

    #user-comment-container-pagination{
        display: flex;
        justify-content: space-between;
        color: orange;
        margin-top: 5px;
    }

    #user-comment-pagination-buttons{
        display: flex;
    }

    #user-comment-pagination-buttons i{
        cursor: pointer;
        transition: all 250ms;
        font-weight: 600;
    }

    #user-comment-pagination-buttons i:hover{
        color: #F4D03F;
        transition: all 250ms;
    }

    #pagination-page{
        margin-left: 3px;
        margin-right: 3px;
        user-select: none;
    }

    /* Delete PopUp Start */
    #delete-comment-popup{
        top: 0;
        position: absolute;
        width: 1519px;
        min-height: 920px;
        background-color: rgba(213, 213, 213, 0.3);
        display: flex;
        justify-content: center;
        padding-top: 230px;
    }

    #delete-comment-container{
        background-color: #f8f9f9;
        border: 2px solid #D5DBDB;
        box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
        border-radius: 5px;
        width: 500px;
        height: 230px;
        padding: 10px;
    }

    #delete-comment-container-top{
        display: flex;
        justify-content: right;
        margin-bottom: 30px;
    }

    #delete-comment-container-top i{
        font-size: 18px;
        font-weight: bold;
        cursor: pointer;
        color: grey;
    }

    #delete-comment-container-bottom{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    #delete-comment-container-bottom div{
        font-size: 20px;
        margin-bottom: 50px;
    }

    #delete-comment-container-bottom button{
        width: 125px;
        height: 30px;
        cursor: pointer;
        border-radius: 5px;
        background-color: #E74C3C;
        color: #fff;
        border: 1.6px solid #C0392B;
        transition: all 250ms;
    }

    #delete-comment-container-bottom button:hover{
        opacity: 0.8;
        transition: all 250ms;
    }
     /* Delete PopUp End */
</style>