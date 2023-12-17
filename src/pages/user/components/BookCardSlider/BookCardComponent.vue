<template>
    <div @click="navigateBookDetail($event,bookData)" class="book-card">
        <div class="book-card-content">
            <div class="book-card-content-above">
                <img class="book-card-content-img" :src="getBookPictureUrl(bookData.pictureUrls)" :alt="(bookData.bookName + ' Picture')">
            </div>
            <div class="book-card-content-down">
                <div class="book-card-text-content-container">
                    <h4 class="book-card-book-name">{{ bookData.bookName }}</h4>
                    <span class="book-card-book-price">{{ bookData.price }} TL</span>
                </div>
                <div class="book-card-button-container">
                    <button @click="addBasketItem(bookData)" class="book-card-button">Sepete Ekle</button>
                </div>
            </div>
            <div class="favorite-conteiner favorite-conteiner-element">
                <i @click="addFavoriteBook(bookData.id)" v-if="getFavoriteBooks.findIndex(x => x.bookId == bookData.id) == -1" class="bi bi-heart favorite-conteiner-element"></i>
                <i @click="deleteFavoriteBook(bookData.id)" v-else class="bi bi-heart-fill favorite-conteiner-element"></i>
            </div>
        </div>
    </div>  
</template>

<script>
import { mapGetters,mapActions } from 'vuex';

export default{
    props: ["bookData"],

    data(){
        return{
            addBasketItemMethodRun: false,
            updateBasketItemMethodRun: false,
            addFavoriteBookMethodRun : false,
            deleteFavoriteBookMethodRun : false,
        }
    },

    computed:{
        ...mapGetters({
            getAddFavoriteBookSuccesResult : "FavoriteBookModule/_getAddFavoriteBookSuccesResult",
            getDeleteFavoriteBookSuccessResult : "FavoriteBookModule/_getDeleteFavoriteBookSuccessResult",
            getFavoriteBooks : "FavoriteBookModule/_getFavoriteBooks",
            getUpdateBasketItemSuccessResult: "BasketModule/_getUpdateBasketItemSuccessResult",
            getAddedBasketItemSuccessResult : "BasketModule/_getAddedBasketItemSuccessResult",
            getSelectedBasketItems: "BasketModule/_getSelectedBasketItems",
            getBasketId :"BasketModule/_getSelectedBasketId",
            getUserId : "AuthModule/_getUserId",
        }),
    },

    methods:{
        ...mapActions({
            addBasketItemAction : "BasketModule/addBasketItem",
            getSelectedUserBasket : "BasketModule/getSelectedUserBasket",
            updateBasketItemAction : "BasketModule/updateBasketItem",
            addFavoriteBookAction : "FavoriteBookModule/addFavoriteBook",
            deleteFavoriteBookAction : "FavoriteBookModule/deleteFavoriteBook"
        }),
        getBookPictureUrl(bookPictures){
            if(bookPictures == null)
                return require("@/assets/no-image-available.jpg");
            
            return bookPictures.find(x => x.showOrder == 1).pictureUrl;
        },
        navigateBookDetail(event,bookData){
            let classNames = event.srcElement.className.split(" ");
            if(classNames.findIndex(x =>x == "book-card-button") > -1)
                return;

            if(classNames.findIndex(x =>x == "favorite-conteiner-element") > -1)
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
                this.addBasketItemMethodRun = true;
                this.addBasketItemAction({
                    userId : this.getUserId,
                    basketId : this.getBasketId, 
                    bookId : bookData.id,
                    quantity : 1 
                });
            } 

            if(selectedBasketItem != null && this.getUserId != 0 && selectedBasketItem.quantity != 10){
                this.updateBasketItemMethodRun = true;
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
                if(this.getFavoriteBooks.findIndex(x => x.bookId == bookId) == -1){
                    this.addFavoriteBookMethodRun = true;
                    this.addFavoriteBookAction({
                        userId : this.getUserId,
                        bookId : bookId    
                    })
                }
            }
        },
        deleteFavoriteBook(bookId){
            if(this.getUserId != 0 && this.getUserId != null){
                let value = this.getFavoriteBooks.find(x => x.bookId == bookId);
                if(value != null){
                    this.deleteFavoriteBookMethodRun = true;
                    this.deleteFavoriteBookAction({
                        favoriteBookId : value.id,
                        userId : this.getUserId
                    })
                }
            }
        }
    },

    watch:{
        getAddFavoriteBookSuccesResult(){
            if(this.getAddFavoriteBookSuccesResult && this.addFavoriteBookMethodRun){
                this.addFavoriteBookMethodRun = false;
                this.$toastr.success("Ürün Favorilere Eklendi !");
            }
        },
        getDeleteFavoriteBookSuccessResult(){
            if(this.getDeleteFavoriteBookSuccessResult && this.deleteFavoriteBookMethodRun){
                this.deleteFavoriteBookMethodRun = false;
                this.$toastr.info("Ürün Favorilerden Silindi !");
            }
        },
        getAddedBasketItemSuccessResult(){
            if(this.getAddedBasketItemSuccessResult&& this.addBasketItemMethodRun){
                this.addBasketItemMethodRun = false;
                this.$toastr.success("Ürün Sepete Eklendi !");
            }
        },
        getUpdateBasketItemSuccessResult(){
            if(this.getUpdateBasketItemSuccessResult&& this.updateBasketItemMethodRun){
                this.updateBasketItemMethodRun = false;
                this.$toastr.info("Ürün Miktarı Artırıldı !");
            }
        }
    }
}
</script>

<style scoped>
    .book-card{
        cursor: pointer;
        background-color: #F8F9F9;
        border : 2px solid #F8F9F9;
        border-radius: 7px;
        width: 245px;
        height: 350px;
        transition: all 500ms;
    }

    .book-card:hover{
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
        transition: all 500ms;
    }

    .book-card-content{
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
    
    .book-card-content-above{
        display: flex;
        align-items: center;
        justify-content: center;
        width: 90%;
        height: 65%;
    }

    .book-card-content-down{
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        height: 30%;
        width: 100%;
    }

    .book-card-content-img{
        width: 100%;
        height: 100%;
        object-fit: scale-down;
    }

    .book-card-text-content-container{
        padding: 8px;
        width: 100%;
        height: 70%;
    }

    .book-card-button-container{
        padding-top: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 5px;
        width: 100%;
        height: 30%;
    }

    .book-card:hover .book-card-button{
        border: 5px;
        opacity: 1;
        visibility: visible;
        transition: all 500ms;
    }

    .book-card-button{
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

    .book-card-book-name{
        user-select: none;
        text-align: center;
        font-weight: 500;
        font-size: 16px;
        transition: all 500ms;
        margin-bottom: 4px;
    }

    .book-card:hover .book-card-book-name,
    .book-card:hover .book-card-author-name,
    .book-card:hover .book-card-book-price{
        transition: all 500ms;
        color: orange;
    }

    .book-card-book-price{
        text-align: center;
        display: block;
        font-size: 18px;
        transition: all 500ms;
    }

    .favorite-conteiner{
        display: flex ;
        align-items: center;
        justify-content: center;
        height: 35px;
        width: 35px;
        top: 3px;
        right: 3px;
        position: absolute;
        border-radius: 50%;
        box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
        border: 1px solid #F4F6F6;
        z-index: 150;
    }

    .favorite-conteiner i{
        padding-top: 2px;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        font-size: 18px;
    }

    .favorite-conteiner i:hover{
        color: orange;
    }

    .favorite-conteiner .bi-heart-fill{
        color: orange;
    }
</style>