<template>
    <div v-if="getCommentsForAdmin.commentsCount > 0" id="admin-update-book-page-bottom-container">
        <div id="updated-book-comment-table-container">
            <div id="updated-book-comment-table-header">
                <div style="width: 220px;" class="updated-book-comment-header-column" id="updated-book-comment-table-user-name">Kullanıcı İsmi</div>
                <div style="width: 700px;" class="updated-book-comment-header-column" id="updated-book-comment-table-comment">Yorum</div>
                <div style="width: 50px;" class="updated-book-comment-header-column" id="updated-book-comment-table-like">Like</div>
                <div style="width: 75px;" class="updated-book-comment-header-column" id="updated-book-comment-table-dislike">Dislike</div>
                <div style="width: 160px;" class="updated-book-comment-header-column" id="updated-book-comment-table-created-date">Oluşturulma Tarihi</div>
            </div>
            <div id="updated-book-comment-table-content">
                <div v-for="(value,index) in getCommentsForAdmin.commentForAdminDtos" :key="index" :class="{'updated-book-comment-table-row-bacgound-color' : index%2 != 0}" class="updated-book-comment-table-row">
                    <div style="width: 220px;" class="updated-book-comment-table-value" id="updated-book-comment-table-user-name-value">
                        <img :src="getUserPictureUrl(value.pictureUrl)" alt="">
                        <div class="comment-writer-name">{{ value.userFirstName + " " + value.userLastName }}</div>
                    </div>
                    <div style="width: 700px;" class="updated-book-comment-table-value" id="updated-book-comment-table-comment-value">{{ value.comment }}</div>
                    <div style="width: 50px;" class="updated-book-comment-table-value" id="updated-book-comment-table-like-value">{{ value.usefulRating }}</div>
                    <div style="width: 75px;" class="updated-book-comment-table-value" id="updated-book-comment-table-dislike-value">{{ value.notUsefulRating }}</div>
                    <div style="width: 160px;" class="updated-book-comment-table-value" id="updated-book-comment-table-created-date-value">{{ new Date(value.createdDate).toLocaleDateString() }}</div>
                </div>
            </div>
            <div id="updated-book-comment-table-pagination">
                <div id="page-size">{{ Math.ceil(this.getCommentsForAdmin.commentsCount / this.size) }} Sayfa</div>
                <div id="pagination-container">
                    <div @click="page != 0 ? page-- : page = 0" class="pagination-button">
                        <i class="bi bi-chevron-left"></i>
                    </div>
                    <div class="pagination-pages">
                        <div @click="page = pageValue - 1" :class="{'pagination-page-clicked' : page+1==pageValue}" v-for="pageValue in pageNumbers" class="pagination-page">{{ pageValue }}</div>
                    </div>
                    <div @click="page+1 < Math.ceil(this.getCommentsForAdmin.commentsCount / this.size) ? page++ : page " class="pagination-button">
                        <i class="bi bi-chevron-right"></i>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions,mapGetters } from 'vuex';

export default{
    data(){
        return{
            page : 0,
            size : 15,
            pageNumbers : []
        }
    },

    computed:{
        ...mapGetters({
            getCommentsForAdmin : "CommentModule/_getCommentsForAdmin",
            getUpdatedBookId : "BookModule/_getUpdatedBookId",
        })
    },

    methods:{
        ...mapActions({
            getCommentsByBookIdForAdmin : "CommentModule/getCommentsByBookIdForAdmin",
        }),
        getUserPictureUrl(pictureUrl){
            if(pictureUrl=="")
                return require("@/assets/no-user-image.jpg");
            return pictureUrl;
        },
        getPageNumbers(){
            if(this.getCommentsForAdmin != null){
                this.pageNumbers = [];
                let pageValue = this.page + 1;
                let maxPageNumber = Math.ceil(this.getCommentsForAdmin.commentsCount / this.size);
                let minValue = pageValue - 2;

                for(minValue; minValue <= maxPageNumber; minValue++){
                    if(minValue > 0 && this.pageNumbers.length != 5)
                        this.pageNumbers.push(minValue);

                    if(this.pageNumbers.length == 5)
                        break;
                }
            }

            return null;
        },
    },

    watch:{
        getCommentsForAdmin(){
            if(this.getCommentsForAdmin)
                this.getPageNumbers();
        },
        page(){
            this.getCommentsByBookIdForAdmin({
                bookId : this.getUpdatedBookId,
                page : this.page,
                size : this.size
            });
        }
    },

    mounted() {
        this.getCommentsByBookIdForAdmin({
            bookId : this.getUpdatedBookId,
            page : this.page,
            size : this.size
        });
    },
}
</script>

<style scoped>
    #admin-update-book-page-bottom-container{
        background-color: #f8f9f9;
        width: 100%;
        border-radius: 7px;
        border: 1px solid #F2F3F4;
        box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 2px 0px;
        padding: 10px;
        margin-bottom: 15px;
    }

    #updated-book-comment-table-container{
        display: flex;
        flex-direction: column;
    }

    #updated-book-comment-table-header{
        display: flex;
        height: 40px;
    }

    #updated-book-comment-table-header .updated-book-comment-header-column:first-child{
        border-left: 1.5px solid #F2F3F4;
    }

    .updated-book-comment-header-column{
        user-select: none;
        padding-left: 5px;
        height: 40px;
        display: flex;
        align-items: center;
        color: orange;
        background-color: #fdfefe;
        border: 1.5px solid #f0f2f2;
        border-left: none;
    }

    #updated-book-comment-table-content{
        display: flex;
        flex-direction: column;
        overflow-y: auto;
    }
    
    .updated-book-comment-table-row{
        display: flex;
        background-color: #fbfcfc;
    }
    
    .updated-book-comment-table-row:hover{
        background-color: #F2F4F4 !important;
    }

    .updated-book-comment-table-row-bacgound-color{
        background-color: #f7f9f9;
    }

    .updated-book-comment-table-row .updated-book-comment-table-value:first-child{
        border-left: 1.5px solid #f0f2f2;
    }

    #updated-book-comment-table-user-name-value{
        font-size: 14px !important;
    }

    #updated-book-comment-table-user-name-value img{
        width: 24px;
        height: 24px;
        background-color: green;
        border-radius: 50%;
        object-fit: cover;
        border: 1.5px solid #f1f3f3;
        margin-right: 3px;
    }

    .updated-book-comment-table-value{
        font-size: 15px;
        display: flex;
        align-items: center;
        padding-left: 5px;
        height: 30px;
        border: 1.5px solid #f0f2f2;
        border-left: none;
        border-top: none;
        color: #d98e47;
    }

    #updated-book-comment-table-pagination{
        margin-top: 10px;
        display: flex;
        justify-content: space-between;
    }

    #pagination-container{
        display: flex;
    }

    .pagination-button{
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 19px;
        color: #fff;
        cursor: pointer;
        user-select: none;
        height: 30px;
        width: 30px;
        background-color: #2E86C1;
        border: 1px solid #1F618D;
        border-radius: 3px;
    }

    .pagination-button:hover{
        opacity: 0.9;
    }

    .pagination-pages{
        height: 30px;
        margin-left: 2px;
    }

    .pagination-page{
        font-size: 16px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        height: 30px;
        width: 30px;
        background-color: #E5E8E8;
        border: 1px solid #CCD1D1;
        border-radius: 3px;
        margin-right: 2px;
        user-select: none;
    }

    .pagination-page:hover{
        opacity: 0.7;
    }

    .pagination-page-clicked{
        background-color: #3498DB;
        border: 1px solid #1F618D;
        color: #fff;
    }

    #page-size{
        font-size: 15px;
        padding-left: 5px;
        padding-right: 5px;
        display: flex;
        align-items: center;
        color: #fff;
        background-color: #2E86C1;
        border: 1px solid #1F618D;
        border-radius: 3px;
    }
</style>