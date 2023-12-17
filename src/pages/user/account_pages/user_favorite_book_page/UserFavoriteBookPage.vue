<template>
    <HeaderComponent/>
    <div id="user-favorite-book-page-container">
        <div id="user-favorite-book-page-container-left">
            <UserAccountHeader :userFavoriteBookButtonSelect="true"/>
        </div>
        <div id="user-favorite-book-page-container-right">
            <div id="user-favorite-book-container">
                <div id="user-favorite-book-container-title">
                    Favorilerim
                </div>
                <div id="user-favorite-book-container-content">
                    <div id="user-favorite-book-container-values">
                        <div @click="navigateBookDetail(favoriteBook)" v-for="favoriteBook in getFavoriteBooks.favoriteBooks" :key="favoriteBook.favoriteId" class="user-favorite-book-card">
                            <div class="user-favorite-book-img-container">
                                <img :src="getBookPictureUrl(favoriteBook.pictureUrl)" alt="">
                            </div>
                            <div class="user-favorite-book-information">
                                <div class="user-favorite-book-name">{{ favoriteBook.bookName }}</div>
                                <div class="user-favorite-book-price">{{ favoriteBook.price }} TL</div>
                            </div>
                        </div>
                    </div>
                    <div id="user-favorite-book-container-pagination">
                        <div id="user-favorite-book-count">{{getFavoriteBooks.favoriteBookCount}}</div>
                        <div id="user-favorite-book-pagination">
                            <div @click="page != 0 ? page-- : page = 0" class="user-favorite-book-pagination-button" id="user-favorite-book-next">
                                <i class="bi bi-chevron-left"></i>
                            </div>
                            <div class="user-favorite-book-pages">
                                <div :class="{'user-favorite-book-page-selected' : pageNumber == page + 1}" v-for="pageNumber in pageNumbers" @click="page = pageNumber - 1" :key="pageNumber" class="user-favorite-book-page">{{ pageNumber }}</div>
                            </div>
                            <div @click="page+1 < Math.ceil(this.getFavoriteBooks.favoriteBookCount / this.size) ? page++ : page " class="user-favorite-book-pagination-button" id="user-favorite-book-pre">
                                <i class="bi bi-chevron-right"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions,mapGetters } from 'vuex';
import HeaderComponent from '@/pages/user/components/HeaderComponent';
import UserAccountHeader from '@/pages/user/account_pages/components/UserAccountHeader';

export default{
    data(){
        return{
            page : 0,
            size : 8,
            pageNumbers : []
        }
    },

    computed : {
        ...mapGetters({
            getUserId : "AuthModule/_getUserId",
            getFavoriteBooks : "BookModule/_getFavoriteBooks",
        }),
    },

    methods : {
        ...mapActions({
            getFavoriteBooksAction : "BookModule/getFavoriteBooks", 
        }),
        getBookPictureUrl(bookPicture){
            if(bookPicture == null)
                return require("@/assets/no-image-available.jpg");
            return bookPicture;
        },
        getPageNumbers(){
            if(this.getFavoriteBooks != null){
                this.pageNumbers = [];
                let pageValue = this.page + 1;
                let maxPageNumber = Math.ceil(this.getFavoriteBooks.favoriteBookCount / this.size);
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
        navigateBookDetail(bookData){
            this.$router.push({
                name : "BookDetailPage",
                params : {
                    bookName : bookData.bookName.toLowerCase().replace(/\s+/g, "-")
                }
            });

            this.$store.state.BookModule.selectedBookId = bookData.bookId;
        },
    },

    watch : {
        page(){
            if(this.getUserId != 0 && this.getUserId != null)
                this.getFavoriteBooksAction({
                    userId : this.getUserId,
                    page : this.page,
                    size : this.size
                })
        },
        getFavoriteBooks(){
            if(this.getFavoriteBooks)
                this.getPageNumbers();
        }
    },

    mounted(){
        if(this.getUserId != 0 && this.getUserId != null)
            this.getFavoriteBooksAction({
                userId : this.getUserId,
                page : this.page,
                size : this.size
            })
    },

    components:{
        HeaderComponent,
        UserAccountHeader,
    },
}
</script>

<style scoped>
    #user-favorite-book-page-container{
        width: 100%;
        min-width: 1510px;
        padding: 50px 9% 0 9%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin-bottom: 50px;
        height: auto;
    } 
    
    #user-favorite-book-page-container-left{
        width: 23%;
        margin-right: 20px;
    }

    #user-favorite-book-page-container-right{
        width: 76%;
    }

    #user-favorite-book-container{
        display: flex;
        flex-direction: column;
        padding: 10px;
        background-color: #f8f9f9;
        border: 2px solid #D5DBDB;
        box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
        border-radius: 5px;
        height: auto;
    }

    #user-favorite-book-container-title{
        padding-left: 2px;
        margin-bottom: 15px;
        height: 30px;
        font-size: 18px;
        color: orange;
        border-bottom: 2px solid #D5DBDB;
    }

    #user-favorite-book-container-content{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 100%;
    }

    #user-favorite-book-container-values{
        display: flex;
        justify-content: center;
        align-items: flex-start;
        height: auto;
        flex-wrap: wrap;     
        padding-left: 10px;   
    }

    .user-favorite-book-card{
        display: flex;
        flex-direction: column;
        padding: 15px 10px 8px 10px;
        cursor: pointer;
        background-color: #fbfcfc;
        border-radius: 7px;
        border: 2px solid #d7dddd;
        width: 210px;
        height: 335px;
        transition: all 250ms;
        margin-right: 10px;
        margin-bottom: 10px;
    }

    .user-favorite-book-card:hover{
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
        color: orange;
        transition: all 250ms;
    }

    .user-favorite-book-img-container{
        display: flex;
        height: 220px;
    }

    .user-favorite-book-img-container img{
        width: 100%;
        height: 100%;
        object-fit: scale-down;
    }

    .user-favorite-book-information{
        margin-top: 10px;
        display: flex;
        justify-content: center;
        text-align: center;
        flex-direction: column;
    }

    #user-favorite-book-container-pagination{
        padding-top: 5px;
        margin-top: 10px;
        display: flex;
        justify-content: space-between;
        border-top: 2px solid #d5dbdb;
        margin-bottom: 5px;
    }

    #user-favorite-book-count{
        display: flex;
        align-items: center;
        font-size: 19px;
        color: orange;
    }

    #user-favorite-book-pagination{
        display: flex;
    }

    .user-favorite-book-pagination-button{
        font-size: 19px;
        cursor: pointer;
        height: 30px;
        width: 30px;
        background-color: #F39C12;
        border: 1.5px solid #E67E22;
        border-radius: 3px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        user-select: none;
    }

    .user-favorite-book-pagination-button:hover{
        opacity: 0.8;
    }

    .user-favorite-book-pages{
        margin-left: 2px;
        display:flex ;
        justify-content: space-between;
        align-items: center;
    }

    .user-favorite-book-page{
        font-size: 18px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        user-select: none;
        height: 28px;
        width: 28px;
        border-radius: 3px;
        background-color: #F2F3F4;
        border: 1.5px solid #D5DBDB;
        margin-right: 2px;
        color: orange;
    }

    .user-favorite-book-page:hover{
        border: 1.5px solid #EB984E;
        background-color: #F5B041 !important;
        color: #ffff !important;
    }

    .user-favorite-book-page-selected{
        border: 1.5px solid #EB984E;
        background-color: #F5B041 !important;
        color: #ffff !important;
    }
</style>