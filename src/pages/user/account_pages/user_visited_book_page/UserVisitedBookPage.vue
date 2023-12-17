<template>
    <HeaderComponent/>
    <div id="user-visited-book-page-container">
        <div id="left-container">
            <UserAccountHeader :userVisitedButtonSelect="true"/>
        </div>
        <div id="visited-book-page-right-container">
            <div id="visited-books-container">
                <div id="visited-books-container-title">Önceden Gezdiklerim</div>
                <div id="visited-books-content">
                    <div id="visited-books-values">
                        <div @click="navigateBookDetail($event,visitedBook.visitedBook)" v-for="visitedBook in viewsVisitedBook" class="visited-book-card" :key="visitedBook.visitedBook.id">
                            <div class="visited-book-card-content">
                                <div class="visited-book-card-top-content">
                                    <img :src="getBookPictureUrl(visitedBook.visitedBook.pictureUrls)" alt="">
                                </div>
                                <div class="visited-book-card-bottom-content">
                                    <div class="visited-book-name">{{ visitedBook.visitedBook.bookName }}</div>
                                    <div class="visited-book-price">{{ visitedBook.visitedBook.price }} TL</div>
                                </div>
                                <div class="favorite-button favorite-button-element">
                                    <i @click="addFavoriteBook(visitedBook.visitedBook.id)" v-if="getFavoriteBooks.findIndex(x => x.bookId == visitedBook.visitedBook.id) == -1" class="bi bi-heart favorite-button-element"></i>
                                    <i @click="deleteFavoriteBook(visitedBook.visitedBook.id)" v-else class="bi bi-heart-fill favorite-button-element"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="visited-books-pagination">
                        <div id="visited-book-count">{{ getVisitedBooks.length }}</div>
                        <div id="visited-book-pagination-button">
                            <i @click="previousPage" class="bi bi-chevron-left"></i>
                            <div>{{ visitedBookPage }}/{{ totalVisitedBookPage }}</div>
                            <i @click="nextPage" class="bi bi-chevron-right"></i>
                        </div>
                    </div>
                </div>
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
            visitedBookPage : 0,
            totalVisitedBookPage : 0,
            lastVisitedBookIndex : 0,
            preVisitedBookIndex : 0,
            viewsVisitedBook : [],
        }
    },

    components:{
        HeaderComponent,
        UserAccountHeader,
    },

    computed:{
        ...mapGetters({
            getAddFavoriteBookSuccesResult : "FavoriteBookModule/_getAddFavoriteBookSuccesResult",
            getDeleteFavoriteBookSuccessResult : "FavoriteBookModule/_getDeleteFavoriteBookSuccessResult",
            getFavoriteBooks : "FavoriteBookModule/_getFavoriteBooks",
            getVisitedBooks : "BookModule/_getVisitedBooks",
            getUserId : "AuthModule/_getUserId",
        })
    },

    methods:{
        ...mapActions({
            addFavoriteBookAction : "FavoriteBookModule/addFavoriteBook",
            deleteFavoriteBookAction : "FavoriteBookModule/deleteFavoriteBook",
            getFavoriteBooksAction : "FavoriteBookModule/getFavoriteBooks",
        }),
        getBookPictureUrl(bookPictures){
            if(bookPictures == null)
                return require("@/assets/no-image-available.jpg");
            return bookPictures.find(x => x.showOrder == 1).pictureUrl;
        },
        nextPage(){
            if(this.visitedBookPage == this.totalVisitedBookPage)
                return;
        
            this.visitedBookPage++;
            this.viewsVisitedBook = this.getVisitedBooks.slice(this.lastVisitedBookIndex + 1 , this.lastVisitedBookIndex + 9);
            this.preVisitedBookIndex = this.getVisitedBooks.indexOf(this.viewsVisitedBook[0]);
            this.lastVisitedBookIndex = this.getVisitedBooks.indexOf(this.viewsVisitedBook[this.viewsVisitedBook.length - 1]);
        },
        previousPage(){
            this.visitedBookPage--;
            if(this.visitedBookPage == 0){
                this.viewsVisitedBook = this.getVisitedBooks.slice(0,8);
                this.lastVisitedBookIndex = this.viewsVisitedBook.length - 1;
                this.visitedBookPage = 1;
                return;
            }

            this.viewsVisitedBook = this.getVisitedBooks.slice(this.preVisitedBookIndex - 8, this.preVisitedBookIndex);
            this.preVisitedBookIndex = this.getVisitedBooks.indexOf(this.viewsVisitedBook[0]);
            this.lastVisitedBookIndex = this.getVisitedBooks.indexOf(this.viewsVisitedBook[this.viewsVisitedBook.length - 1]);
        },
        navigateBookDetail(bookData){
            let classNames = event.srcElement.className.split(" ");

            if(classNames.findIndex(x => x == "favorite-button-element") > -1)
                return;

            this.$router.push({
                name : "BookDetailPage",
                params : {
                    bookName : bookData.bookName.toLowerCase().replace(/\s+/g, "-")
                }
            });
            this.$store.state.BookModule.selectedBookId = bookData.id;
        },
        addFavoriteBook(bookId){
            if(this.getUserId != 0 && this.getUserId != null){
                if(this.getFavoriteBooks.findIndex(x => x.bookId == bookId) == -1)
                    this.addFavoriteBookAction({
                        userId : this.getUserId,
                        bookId : bookId    
                    })
            }
        },
        deleteFavoriteBook(bookId){
            if(this.getUserId != 0 && this.getUserId != null){
                let value = this.getFavoriteBooks.find(x => x.bookId == bookId);
                if(value != null)
                    this.deleteFavoriteBookAction({
                        favoriteBookId : value.id,
                        userId : this.getUserId
                    })
            }
        }
    },

    watch:{
        getAddFavoriteBookSuccesResult(){
            if(this.getAddFavoriteBookSuccesResult)
                this.$toastr.success("Ürün Favorilere Eklendi !");
        },
        getDeleteFavoriteBookSuccessResult(){
            if(this.getDeleteFavoriteBookSuccessResult)
                this.$toastr.info("Ürün Favorilerden Silindi !");
        },
    },

    mounted(){
        this.totalVisitedBookPage = Math.ceil(this.getVisitedBooks.length / 8);
        this.viewsVisitedBook = this.getVisitedBooks.slice(0,8);
        this.lastVisitedBookIndex = this.viewsVisitedBook.length - 1;
        this.visitedBookPage = 1;
        if(this.getUserId != null && this.getUserId != 0)
            this.getFavoriteBooksAction(this.getUserId)
    }
}
</script>

<style scoped>
    #user-visited-book-page-container{
        width: 100%;
        min-width: 1510px;
        padding: 50px 9% 0 9%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin-bottom: 50px;
        height: auto;
    }

    #left-container{
        width: 23%;
        margin-right: 20px;
    }

    #visited-book-page-right-container{
        width: 76%;
    }

    #visited-books-container{
        display: flex;
        flex-direction: column;
        padding: 10px;
        background-color: #f8f9f9;
        border: 2px solid #D5DBDB;
        box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
        border-radius: 5px;
        height: auto;
    }

    #visited-books-container-title{
        padding-left: 2px;
        margin-bottom: 15px;
        height: 30px;
        font-size: 18px;
        color: orange;
        border-bottom: 2px solid #D5DBDB;
    }

    #visited-books-content{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 100%;
    }

    #visited-books-values{
        display: flex;
        justify-content: center;
        align-items: flex-start;
        height: auto;
        flex-wrap: wrap;     
        padding-left: 10px;   
    }

    #visited-books-pagination{
        color: orange;
        padding-left: 5px;
        padding-right: 5px;
        display: flex;
        justify-content: space-between;
        padding-top: 4px;
        border-top: 2px solid #D5DBDB;
    }

    #visited-book-pagination-button{
        display: flex;
    }

    #visited-book-pagination-button div{
        margin-left: 5px;
        margin-right: 5px;
        user-select: none;
    }

    #visited-book-pagination-button i{
        font-size: 17px;
        cursor: pointer;
        color: orange;
    }

    #visited-book-pagination-button i:hover{
        color: #F8C471;
    }

    .visited-book-card{
        cursor: pointer;
        background-color: #FBFCFC;
        border: 2px solid #D5DBDB;
        border-radius: 7px;
        width: 210px;
        height: 340px;
        padding: 15px 10px 8px 10px;
        transition: all 500ms;
        margin-right: 10px;
        margin-bottom: 10px;
    }

    .visited-book-card:hover{
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
        transition: all 500ms;
    }

    .visited-book-card:hover .visited-book-card-bottom-content{
        transition: all 500ms;
        color: orange;
    }

    .visited-book-card-content{
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .visited-book-card-top-content{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 90%;
        height: 210px;
        margin-bottom: 15px;
    }

    .visited-book-card-top-content img{
        object-fit: scale-down;
        width: 100%;
        height: 100%;
    }

    .visited-book-card-bottom-content{
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .visited-book-name{
        font-size: 16px;
        margin-bottom: 7px;
    }

    .visited-book-price{
        font-size: 16px;
    }

    .visited-book-card-bottom-content div{
        text-align: center;
    }  
    
    .favorite-button{
        top: -12px;
        right: -5px;
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        width: 38px;
        height: 38px;
        border-radius: 50%;
        background-color: #F8F9F9;
        border: 1px solid #F2F3F4;
        box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    }

    .favorite-button i{
        padding-top: 1px;
        font-size: 17px;
    }

    .favorite-button i:hover{
        color: orange;
    }

    .favorite-button .bi-heart-fill{
        color: orange;
    }
</style>