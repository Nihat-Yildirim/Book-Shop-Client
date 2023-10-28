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
                        <div @click="navigateBookDetail(visitedBook.visitedBook)" v-for="visitedBook in viewsVisitedBook" class="visited-book-card" :key="visitedBook.visitedBook.id">
                            <div class="visited-book-card-content">
                                <div class="visited-book-card-top-content">
                                    <img :src="getBookPictureUrl(visitedBook.visitedBook.pictureUrls[0])" alt="">
                                </div>
                                <div class="visited-book-card-bottom-content">
                                    <div class="visited-book-name">{{ visitedBook.visitedBook.bookName }}</div>
                                    <div class="visited-book-price">{{ visitedBook.visitedBook.price }} TL</div>
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
import { mapGetters } from 'vuex';

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
            getVisitedBooks : "BookModule/_getVisitedBooks",
        })
    },

    methods:{
        getBookPictureUrl(pictureUrl){
            if(pictureUrl==null)
                return require("@/assets/no-image-available.jpg");
            return pictureUrl;
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
            this.$router.push({
                name : "BookDetailPage",
                params : {
                    bookName : bookData.bookName.toLowerCase().replace(/\s+/g, "-")
                }
            });
            this.$store.state.BookModule.selectedBookId = bookData.id;
        },
    },

    mounted(){
        this.totalVisitedBookPage = Math.ceil(this.getVisitedBooks.length / 8);
        this.viewsVisitedBook = this.getVisitedBooks.slice(0,8);
        this.lastVisitedBookIndex = this.viewsVisitedBook.length - 1;
        this.visitedBookPage = 1;
    }
}
</script>

<style>
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
</style>