<template>
    <HeaderComponent/>
    <div id="publisher-detail-page-container">
        <div v-if="selectedPublisher" id="publisher-detail-left-container">
            <div id="publisher-detail-logo">
                <img :src="getPictureUrl(selectedPublisher.pictureUrl)" :alt="selectedPublisher.name + ' Logo'">
            </div>
            <div id="publisher-detail-name">{{ selectedPublisher.name }}</div>
        </div>
        <div v-if="selectedPublisher && selectedPublisherBooks" id="publisher-detail-right-container">
            <div id="publisher-detail-books-title">{{ selectedPublisher.name }} - Kitaplar</div>
            <div v-if="selectedPublisherBooks" id="publisher-detail-books">
                <div @click="navigateBookDetail($event,book)" v-for="book in selectedPublisherBooks" class="publisher-book-card" :key="book.id">
                    <div class="publisher-book-card-content">
                        <div class="publisher-book-card-content-above">
                            <img class="publisher-book-card-content-img" :src="getBookPictureUrl(book.pictureUrls)" :alt="(book.bookName + ' Picture')">
                        </div>
                        <div class="publisher-book-card-content-down">
                            <div class="publisher-book-card-text-content-container">
                                <h4 class="publisher-book-card-book-name">{{ book.bookName }}</h4>
                                <span class="publisher-book-card-book-price">{{ book.price }} TL</span>
                            </div>
                            <div class="publisher-book-card-button-container">
                                <button @click="addBasketItem(book)" class="publisher-book-card-button">Sepete Ekle</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import HeaderComponent from '@/pages/user/components/HeaderComponent';
import { mapGetters,mapActions } from 'vuex';

export default{
    components:{
        HeaderComponent
    },

    computed:{
        ...mapGetters({
            getSelectedBasketItems: "BasketModule/_getSelectedBasketItems",
            selectedPublisher : "PublisherModule/_getSelectedPublisher",
            selectedPublisherId : "PublisherModule/_getSelectedPublisherId",
            selectedPublisherBooks : "BookModule/_getPublisherBooks",
            getBasketId :"BasketModule/_getSelectedBasketId",
            getUserId : "AuthModule/_getUserId",
        })
    },

    methods:{
        ...mapActions({
            getPublisher : "PublisherModule/getPublisherById",
            getBooks : "BookModule/getBooksByPublisherId",
            addBasketItemAction : "BasketModule/addBasketItem",
        }),
        getPictureUrl(url){
            if(url == "")
                return require("@/assets/no-image-available.jpg");
            return url;
        },
        getBookPictureUrl(pictureUrls){
            if(pictureUrls[0]==null)
                return require("@/assets/no-image-available.jpg");
            return pictureUrls[0];
        },
        navigateBookDetail(event,bookData){
            if(event.srcElement.className == "publisher-book-card-button")
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
            let index = 0;
            if(this.getSelectedBasketItems)
                index = this.getSelectedBasketItems.findIndex((basketItem) => {return basketItem.bookId == bookData.id});
            
            if(index == -1 && this.getUserId != 0){
                this.addBasketItemAction({
                    userId : this.getUserId,
                    basketId : this.getBasketId, 
                    bookId : bookData.id,
                    quantity : 1 
                });
            } 
        }
    },

    mounted() {
        this.getPublisher(this.selectedPublisherId);
        this.getBooks({
            page : 0,
            size : 20,
            id : this.selectedPublisherId
        });
    },
}
</script>

<style>
    #publisher-detail-page-container{
        width: 100%;
        min-width: 1510px;
        padding: 50px 9% 0 9%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin-bottom: 50px;
    }

    /*Publisher Detail Left Start*/
    #publisher-detail-left-container{
        padding: 15px;
        width: 20%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: start;
        background-color: #f8f9f9;
        border: 2px solid #D5DBDB;
        box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
        border-radius: 5px;
        height: 300px;
    }

    #publisher-detail-logo{
        width: 180px;
        height: 180px;
        border-radius: 50%;
        background-color: #f8f9f9;
        border: 2.5px solid #D5DBDB;
        margin-bottom: 10px;
    }

    #publisher-detail-logo img{
        width: 100%;
        height: 100%;
        border-radius: 50%;
        object-fit: cover;
    }

    #publisher-detail-name{
        width: 100%;
        font-size: 21px;
        text-align: center;
        color: orange;
        font-weight: 500;
    }

    /*Publisher Detail Left End*/

    #publisher-detail-right-container{
        width: 78.3%;
        display: flex;
        flex-direction: column;
        justify-content: start;
        background-color: #f8f9f9;
        border: 2px solid #D5DBDB;
        box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
        border-radius: 5px;
        height: auto;
        padding: 15px;
    }

    #publisher-detail-books-title{
        display: flex;
        font-size: 25px;
        color: orange;
        height: 40px;
        border-bottom: 1.5px solid #D5DBDB;
        margin-bottom: 25px;
    }

    #publisher-detail-books{
        display: flex;
        flex-wrap: wrap;
        width: 100%;
        justify-content: center;
    }

    .publisher-book-card{
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

    .publisher-book-card:hover{
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
        transition: all 500ms;
    }

    .publisher-book-card-content{
        width: 100%;
        height: 100%;
        padding: 15px 10px 8px 10px;
        display:flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        user-select: none;
    }

    .publisher-book-card-content-above{
        display: flex;
        align-items: center;
        justify-content: center;
        width: 90%;
        height: 65%;
    }

    .publisher-book-card-content-down{
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        height: 30%;
        width: 100%;
    }

    .publisher-book-card-content-img{
        width: 100%;
        height: 100%;
        object-fit: scale-down;
    }

    .publisher-book-card-text-content-container{
        padding: 8px;
        width: 100%;
        height: 70%;
    }

    .publisher-book-card-button-container{
        padding-top: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 5px;
        width: 100%;
        height: 30%;
    }

    .publisher-book-card:hover .publisher-book-card-button{
        border: 5px;
        opacity: 1;
        visibility: visible;
        transition: all 500ms;
    }

    .publisher-book-card-button{
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

    .publisher-book-card-book-name{
        user-select: none;
        text-align: center;
        font-weight: 500;
        font-size: 15px;
        transition: all 500ms;
        margin-bottom: 4px;
    }

    .publisher-book-card:hover .publisher-book-card-book-name,
    .publisher-book-card:hover .publisher-book-card-author-name,
    .publisher-book-card:hover .publisher-book-card-book-price{
        transition: all 500ms;
        color: orange;
    }

    .publisher-book-card-book-price{
        text-align: center;
        display: block;
        font-size: 17px;
        transition: all 500ms;
    }
</style>