<template>
    <HeaderComponent/>
    <div id="author-detail-page-container">
        <div :class="{'author-detail-autobiography-height-auto' : authorDetialChangeHeight}" v-if="selectedAuthor" id="author-detail-page-left-container">
            <div id="author-detail-picture">
                <img :src="getPictureUrl(selectedAuthor.pictureUrl)" :alt="selectedAuthor.name + ' Picture'">
            </div>
            <div id="author-detail-author-name">{{ selectedAuthor.name }}</div>
            <div :class="{'author-detail-autobiography-height-auto' : authorDetialChangeHeight}" id="author-detail-autobiography">
                <p id="author-detail-autobiography-content">{{ selectedAuthor.autobiography }}</p>
            </div>
            <button v-if="authorDetialChangeHeight < 296" @click="changeHeight">{{ authorDetialChangeHeight ? 'Gizle' : 'Devamını Oku...' }}</button>
        </div>
        <div id="author-detail-page-right-container">
            <div id="author-detail-books-title" v-if="selectedAuthor">{{ selectedAuthor.name }} - Kitaplar</div>
            <div id="author-detail-books">
                <div @click="navigateBookDetail($event,book)" v-for="book in getAuthorBooks" class="author-book-card" :key="book.id">
                    <div class="author-book-card-content">
                        <div class="author-book-card-content-above">
                            <img class="author-book-card-content-img" :src="getBookPictureUrl(book.pictureUrls)" :alt="(book.bookName + ' Picture')">
                        </div>
                        <div class="author-book-card-content-down">
                            <div class="author-book-card-text-content-container">
                                <h4 class="author-book-card-book-name">{{ book.bookName }}</h4>
                                <span class="author-book-card-book-price">{{ book.price }} TL</span>
                            </div>
                            <div class="author-book-card-button-container">
                                <button @click="addBasketItem(book)" class="author-book-card-button">Sepete Ekle</button>
                            </div>
                        </div>
                        <div class="favorite-button favorite-button-element">
                            <i @click="addFavoriteBook(book.id)" v-if="getFavoriteBooks.findIndex(x => x.bookId == book.id) == -1" class="bi bi-heart favorite-button-element"></i>
                            <i @click="deleteFavoriteBook(book.id)" v-else class="bi bi-heart-fill favorite-button-element"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import HeaderComponent from '@/pages/user/components/HeaderComponent';
import { mapGetters, mapActions } from 'vuex';

export default {
    data(){
        return{
            autobiographyContentValueHeight : 0,
            authorDetialChangeHeight : false,
            updated : false,
        }
    },

    components:{
        HeaderComponent
    },

    computed:{
        ...mapGetters({
            getAddFavoriteBookSuccesResult : "FavoriteBookModule/_getAddFavoriteBookSuccesResult",
            getDeleteFavoriteBookSuccessResult : "FavoriteBookModule/_getDeleteFavoriteBookSuccessResult",
            getFavoriteBooks : "FavoriteBookModule/_getFavoriteBooks",
            getUpdateBasketItemSuccessResult: "BasketModule/_getUpdateBasketItemSuccessResult",
            getAddedBasketItemSuccessResult : "BasketModule/_getAddedBasketItemSuccessResult",
            getSelectedBasketItems: "BasketModule/_getSelectedBasketItems",
            selectedAuthor : "AuthorModule/_getSelectedAuthor",
            selectedAuthorId :"AuthorModule/_getSelectedAuthorId",
            getAuthorBooks : "BookModule/_getAuthorBooks",
            getBasketId :"BasketModule/_getSelectedBasketId",
            getUserId : "AuthModule/_getUserId",
        }),
    },

    methods:{
        ...mapActions({
            getAuthorById : "AuthorModule/getById",
            getBooksByAuthorId : "BookModule/getBooksByAuthorId",
            addBasketItemAction : "BasketModule/addBasketItem",
            updateBasketItemAction : "BasketModule/updateBasketItem",
            addFavoriteBookAction : "FavoriteBookModule/addFavoriteBook",
            deleteFavoriteBookAction : "FavoriteBookModule/deleteFavoriteBook",
            getFavoriteBooksAction : "FavoriteBookModule/getFavoriteBooks",
        }),
        getPictureUrl(url){
            if(url == "")
                return require("@/assets/no-image-available.jpg");
            return url;
        },
        getBookPictureUrl(bookPictures){
            if(bookPictures == null)
                return require("@/assets/no-image-available.jpg");
            return bookPictures.find(x => x.showOrder == 1).pictureUrl;
        },
        changeHeight(){
            if(this.autobiographyContentValueHeight > 296)
                this.authorDetialChangeHeight = !this.authorDetialChangeHeight;
        },
        navigateBookDetail(event,bookData){
            let classNames = event.srcElement.className.split(" ");

            if(event.srcElement.className == "author-book-card-button")
                return;

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
        addBasketItem(bookData){
            let selectedBasketItem = null;
            if(this.getSelectedBasketItems)
                selectedBasketItem = this.getSelectedBasketItems.find(basketItem => basketItem.bookId == bookData.id);
            
            if(selectedBasketItem == null && this.getUserId != 0){
                this.addBasketItemAction({
                    userId : this.getUserId,
                    basketId : this.getBasketId, 
                    bookId : bookData.id,
                    quantity : 1 
                });
            } 

            if(selectedBasketItem != null && this.getUserId != 0 && selectedBasketItem.quantity != 10){
                this.updateBasketItemAction({
                    userId : this.getUserId,
                    basketId : this.getBasketId,
                    basketItemId : selectedBasketItem.basketItemId,
                    quantity : selectedBasketItem.quantity + 1,
                });
            }
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
        getAddedBasketItemSuccessResult(){
            if(this.getAddedBasketItemSuccessResult){
                this.$toastr.success("Ürün Sepete Eklendi !");
            }
        },
        getUpdateBasketItemSuccessResult(){
            if(this.getUpdateBasketItemSuccessResult){
                this.$toastr.info("Ürün Miktarı Artırıldı !");
            }
        }
    },

    created(){
        this.getAuthorById(this.selectedAuthorId);
        this.getBooksByAuthorId({
            authorId : this.selectedAuthorId,
            page : 0,
            size : 50
        });
        if(this.getUserId != null && this.getUserId != 0)
            this.getFavoriteBooksAction(this.getUserId)
    },

    unmounted(){
        this.updated = false;
    },

    updated(){
        if(!this.updated)
            this.autobiographyContentValueHeight = document.querySelector("#author-detail-autobiography-content").offsetHeight;
    }
}
</script>

<style>
    #author-detail-page-container{
        width: 100%;
        min-width: 1510px;
        padding: 50px 9% 0 9%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin-bottom: 50px;
    }

    /* Left Container Start */
    #author-detail-page-left-container{
        padding: 15px 15px 5px 15px;
        width: 20%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: start;
        background-color: #f8f9f9;
        border: 2px solid #D5DBDB;
        box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
        border-radius: 5px;
        overflow-y: hidden;
        height: 580px;
    }

    #author-detail-picture{
        width: 180px;
        height: 180px;
        border-radius: 50%;
        background-color: #f8f9f9;
        border: 2.5px solid #D5DBDB;
        margin-bottom: 5px;
    }

    #author-detail-picture img{
        width: 100%;
        height: 100%;
        border-radius: 50%;
        object-fit: cover;
    }

    #author-detail-author-name{
        text-align: center;
        color: orange;
        font-size: 21px;
        margin-bottom: 4px;
    }

    #author-detail-autobiography{
        height: 296px;
        overflow-y: hidden;
    }

    #author-detail-autobiography p{
        display: block;
        height: auto;
        text-align: center;
    }

    .author-detail-autobiography-height-auto{
        height: auto !important;
    }

    #author-detail-page-left-container button{
        margin-top: 10px;
        margin-bottom: 7px;
        width: 150px;
        padding: 0  10px 0 10px;
        color:#99A3A4 ;
        cursor: pointer;
        width: fit-content;
        height: 27px;
        border-radius: 5px;
        border-style: none;
        box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
        transition: 250ms all;
    }

    #author-detail-page-left-container button:hover{
        color: orange;
        transition: 250ms all;
    }
    /* Left Container End */

    #author-detail-page-right-container{
        width: 78.3%;
        display: flex;
        flex-direction: column;
        justify-content: start;
        background-color: #f8f9f9;
        border: 2px solid #D5DBDB;
        box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
        border-radius: 5px;
        padding: 15px;
        height: max-content;
    }

    #author-detail-books-title{
        display: flex;
        font-size: 25px;
        color: orange;
        height: 40px;
        border-bottom: 1.5px solid #D5DBDB;
        margin-bottom: 25px;
    }

    #author-detail-books{
        display: flex;
        flex-wrap: wrap;
        width: 100%;
        justify-content: center;
    }

    .author-book-card{
        cursor: pointer;
        background-color: #FBFCFC;
        border : 2px solid #D5DBDB;
        border-radius: 7px;
        width: 220px;
        height: 350px;
        transition: all 500ms;
        margin-right: 10px;
        margin-bottom: 10px;
    }

    .author-book-card:hover{
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
        transition: all 500ms;
    }

    .author-book-card-content{
        position: relative;
        width: 100%;
        height: 100%;
        padding: 15px 10px 8px 10px;
        display:flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        user-select: none;
    }

    .author-book-card-content-above{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 65%;
    }

    .author-book-card-content-down{
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        height: 30%;
        width: 100%;
    }

    .author-book-card-content-img{
        width: 90%;
        height: 100%;
        object-fit: scale-down;
    }

    .author-book-card-text-content-container{
        padding: 8px;
        width: 100%;
        height: 70%;
    }

    .author-book-card-button-container{
        padding-top: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 5px;
        width: 100%;
        height: 30%;
    }

    .author-book-card:hover .author-book-card-button{
        border: 5px;
        opacity: 1;
        visibility: visible;
        transition: all 500ms;
    }

    .author-book-card-button{
        width: 100px;
        height: 30px;
        border-radius: 3px;
        cursor: pointer;
        color: #fff;
        background-color: #27AE60;
        border: 2px solid #F8F9F9;
        visibility: hidden;
        opacity: 0;
        transition: all 500ms;
    }

    .author-book-card-book-name{
        user-select: none;
        text-align: center;
        font-weight: 500;
        font-size: 15px;
        transition: all 500ms;
        margin-bottom: 4px;
    }

    .author-book-card:hover .author-book-card-book-name,
    .author-book-card:hover .author-book-card-author-name,
    .author-book-card:hover .author-book-card-book-price{
        transition: all 500ms;
        color: orange;
    }

    .author-book-card-book-price{
        text-align: center;
        display: block;
        font-size: 17px;
        transition: all 500ms;
    }

    .favorite-button{
        top: 3px;
        right:3px;
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
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
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