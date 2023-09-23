<template>
    <HeaderComponent/>
    <div id="book-detail-page-container">
        <div id="book-detail-top">
            <div id="book-detail-img" @mousemove="bookDetailImgNavButton = true" @mouseleave="bookDetailImgNavButton = false">
                <i @click="bookDetailNavButtonPrev" @mousemove="bookDetailImgNavButton = true" :class="{'book-detail-picture-button-visible' : bookDetailImgNavButton}" class="bi bi-chevron-left book-detail-picture-nav-button" id="book-detail-picture-pre"></i>
                <Swiper
                :modules="modules"
                :slides-per-view="1"
                :space-between="10"
                :grab-cursor="true"
                :centeredSlidesBounds= "true"
                :pagination="{clickable : true}"
                :autoplay="{
                    delay:2500,
                    disableOnInteraction:false,
                    pauseOnMouseEnter : true
                }" id="book-detail-card-wrapper">
                    <SwiperSlide class="book-detail-img-card" v-for="(bookPictureUrl,index) in getBookPictureUrls(selectedBook.pictureUrls)" :key="index">
                        <img :src="bookPictureUrl" alt="">
                    </SwiperSlide>
                </Swiper>
                <i @click="bookDetailNavButtonNext" @mousemove="bookDetailImgNavButton = true" :class="{'book-detail-picture-button-visible' : bookDetailImgNavButton}" class="bi bi-chevron-right book-detail-picture-nav-button" id="book-detail-picture-next"></i>
            </div>
            <div id="book-detail-desc">
                <div id="book-detail-desc-titles-content">
                    <h3 id="book-detail-book-name">{{ selectedBook.bookName }}</h3>
                    <div id="author-publisher-name">
                        <span id="book-detail-author-name">{{ selectedBook.authors[0].name  }}</span>
                        <div id="book-detail-bracket"></div>
                        <span id="book-detail-publisher-name">{{ selectedBook.publisher.name }}</span>
                    </div>
                </div>
                <div id="book-detail-bottom-contents">
                    <div :class="{'book-detail-desc-content-height' : bookDetialChangeHeight }" id="book-detail-desc-content">
                        <div :class="{'book-detail-desc-content-height' : bookDetialChangeHeight }" id="book-detail-desc-content-container">
                            <p id="book-detail-desc-content-value">
                                {{ selectedBook.description }}
                            </p>
                        </div>
                        <button @click="bookDetialChangeHeight = !bookDetialChangeHeight" v-if="300<bookDetailDescContentValueHeight" id="book-detail-desc-more-button">{{ bookDetialChangeHeight ? 'Gizle' : 'Devamını Oku..' }}</button>
                    </div>
                    <div id="book-detail-explanation-buying">
                        <div id="book-detail-buying">
                            <div id="book-detail-buying-price-content">
                                <span>{{ selectedBook.price }},00</span>
                                <span>TL</span>
                            </div>
                            <div id="book-detail-buying-button-content">
                                <button id="book-detail-buying-button">Sepete Ekle</button>
                            </div>
                            <div id="book-detail-book-stock-comment-quantity">
                                <div class="book-detail-quantity" id="book-detail-book-stock-quantity">
                                    <i class="bi bi-box2" id="stock-icon"></i>
                                    <span id="stock-quentity-value">{{ selectedBook.stock }}</span>
                                </div>  
                                <div class="book-detail-quantity" id="book-detail-book-comment-quantity">
                                    <i class="bi bi-chat-dots" id="comment-icon"></i>
                                    <span id="comment-quentity-value">{{ selectedBookCommentCount.count == null? '0' : selectedBookCommentCount.count }}</span>
                                </div> 
                            </div>
                            <div id="book-detail-buying-book-totals">
                                <span>Bu üründen {{ selectedBookOrderCountByBookId.count == null ? '0' :selectedBookOrderCountByBookId.count }} adet satılmıştır</span>
                                <span>Bu ürün {{ selectedBookBasketCount.count == null ? '0' :selectedBookBasketCount.count }} kişi sepete eklemiştir</span>
                            </div>
                        </div>
                        <div id="book-detail-explanation">
                            <div class="book-explanation-content">
                                <span class="book-explanation">Yayın Tarihi:</span>
                                <span class="book-explanation-value">{{ selectedBook.releaseDate }}</span>
                            </div>
                            <div class="book-explanation-content">
                                <span class="book-explanation">ISBN:</span>
                                <span class="book-explanation-value">{{ selectedBook.isbn }}</span>
                            </div>
                            <div class="book-explanation-content">
                                <span class="book-explanation">Dil:</span>
                                <span class="book-explanation-value">{{ selectedBook.language.name }}</span>
                            </div>
                            <div class="book-explanation-content">
                                <span class="book-explanation">Sayfa Sayısı:</span>
                                <span class="book-explanation-value">{{ selectedBook.pageOfNumber }}</span>
                            </div>
                            <div class="book-explanation-content">
                                <span class="book-explanation">Cilt Tipi:</span>
                                <span class="book-explanation-value">{{ selectedBook.skinType }}</span>
                            </div>
                            <div class="book-explanation-content">
                                <span class="book-explanation">Kağıt Tipi:</span>
                                <span class="book-explanation-value">{{ selectedBook.paperType }}</span>
                            </div>
                            <div class="book-explanation-content">
                                <span class="book-explanation">Boyut:</span>
                                <span class="book-explanation-value">{{ selectedBook.dimension}} cm</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div id="book-detail-bottom">
            <div id="book-detail-comments">

            </div>
            <div id="book-detail-author-detail">
                <div id="book-detail-author-detail-img">
                    <img :src="getBookPictureUrl(selectedAuthor.pictureUrl)" alt="">
                </div>
                <div id="book-detail-author-detail-name">
                    <span>{{this.selectedAuthor.name}}</span>
                </div>
                <div id="book-detail-author-detail-autobiography">
                    <p id="book-detail-author-detail-autobiography-content">
                        {{ this.selectedAuthor.autobiography }}
                    </p>
                    <button>Devamını Oku...</button>
                </div>
            </div>
        </div>  
    </div>
</template>

<script>
import { Swiper , SwiperSlide  } from 'swiper/vue';
import {Autoplay,Pagination} from 'swiper/modules';
import { mapActions, mapGetters } from 'vuex';
import HeaderComponent from '../components/HeaderComponent.vue';
import 'swiper/css';
import 'swiper/css/pagination';

export default{
    data(){
        return{
            bookDetailDescContentValueHeight : 0,
            bookDetailImgNavButton : false,
            bookDetailCardWrapper : null,
            bookDetialChangeHeight : false,
            updated : false,
        }
    },

    components:{
        HeaderComponent,
        Swiper,
        SwiperSlide
    },

    setup(){
        return{
            modules:[Autoplay,Pagination]
        } 
    },

    computed:{
        ...mapGetters({
            selectedBook : "BookModule/_getSelectedBook",
            selectedBookCommentCount : "CommentModule/_getSelectedBookCommentCount",
            selectedBookBasketCount : "BasketModule/_getSelectedBookBasketCount",
            selectedBookOrderCountByBookId : "OrderModule/_getSelectedBookOrderCount",
            selectedAuthor : "AuthorModule/_getSelectedAuthor"
        }),
    },

    methods:{
        ...mapActions({
            getBookById : "BookModule/getBookById",
            getCommentCountByBookId : "CommentModule/getCommentCountByBookId",
            getSelectedBookBasketCount : "BasketModule/getSelectedBookBasketCount",
            getOrderCountByBookId : "OrderModule/getOrderCountByBookId",
            getAuthorById : "AuthorModule/getById"
        }),
        bookDetailNavButtonNext(){
            this.bookDetailCardWrapper.slideNext();
        },
        bookDetailNavButtonPrev(){
            this.bookDetailCardWrapper.slidePrev();
        },
        getBookPictureUrls(pictureUrls){
            if(pictureUrls[0]==null)
                return require("@/assets/no-image-available.jpg");
            return pictureUrls;
        },
        getBookPictureUrl(pictureUrl){
            if(pictureUrl==null)
                return require("@/assets/no-image-available.jpg");
            return pictureUrl;
        },
    },

    watch:{
        selectedBook(){
            this.bookDetailCardWrapper = document.querySelector("#book-detail-card-wrapper").swiper;
            this.getAuthorById(this.selectedBook.authors[0].id);
        },
    },

    created(){
        this.getBookById(this.$store.state.BookModule.selectedBookId);
        this.getCommentCountByBookId(this.$store.state.BookModule.selectedBookId);
        this.getSelectedBookBasketCount(this.$store.state.BookModule.selectedBookId);
        this.getOrderCountByBookId(this.$store.state.BookModule.selectedBookId);
    },

    unmounted(){
        this.updated = false;
    },

    updated(){
        if(!this.updated)
            this.bookDetailDescContentValueHeight = document.querySelector("#book-detail-desc-content-value").offsetHeight;
    }
}
</script>

<style>
    #book-detail-page-container{
        height: 100%;
        width: 100%;
        min-width: 1510px;
        padding: 50px 9% 0 9%;
    }

    #book-detail-top{
        width: 100%;
        min-height: 650px;
        background-color: #f8f9f9;
        border: 2px solid #D5DBDB;
        border-radius: 5px;
        box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
        margin-bottom: 20px;
        display: flex;
        flex-direction: row;
        padding: 15px;
    }

    #book-detail-img{
        max-width: 400px;
        position: relative;
        width: 33%;
        height: 630px;
        background-color: #EAEDED;
        border: 2px solid #D5DBDB;
        z-index: 100;
        display: flex;
        flex-direction: row;
        align-items:center ;
        border-radius: 7px;
    }

    .book-detail-picture-nav-button{
        position: absolute;
        display: block;
        width: 45px;
        height: 45px;
        font-size: 24px;
        color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        background-color: orange;
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
        cursor: pointer;
        z-index: 200;
        opacity: 0;
        transition: 500ms all;
    }

    .book-detail-picture-button-visible{
        opacity: 1;
        transition: 500ms all;
    }

    #book-detail-picture-pre{
        left: -10px;
    }

    #book-detail-picture-next{
        right: -10px;
    }

    #book-detail-bottom{
        width: 100%;
        display: flex;
        flex-direction: row;
        height: 600px;
    }

    #book-detail-comments{
        width: 75%;
        height: 100%;
        margin-right: 20px;
        background-color: #f8f9f9;
        border: 2px solid #D5DBDB;
        border-radius: 5px;
        box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    }

    /*Book Detail Author*/
    #book-detail-author-detail{
        padding: 30px 15px 0px 15px;
        display: flex;
        flex-direction: column;
        justify-content: start;
        align-items: center;
        min-height: 600px;
        height: auto;
        width: 25%;
        background-color: #f8f9f9;
        border: 2px solid #D5DBDB;
        border-radius: 5px;
        box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    }

    #book-detail-author-detail-img{
        width: 200px;
        height: 200px;
        border: 3px solid #D5DBDB;
        margin-bottom: 7px;
        border-radius: 3px;
    }

    #book-detail-author-detail-img img{
        border-radius: 3px;
        width: 100%;
        height: 100%;
        object-fit: cover;
        margin-bottom: 5px;
    }

    #book-detail-author-detail-name{
        text-align: center;
        width: 100%;
        font-size: 20px;
        color: orange;
        border-bottom: 2px solid #D5DBDB;
        margin-bottom: 5px;
    }

    #book-detail-author-detail-autobiography{
        display: flex;
        justify-content: left;
        flex-direction: column;
        align-items: start;
        height: 330px ;
        width: 270px;
    }

    #book-detail-author-detail-autobiography-content{
        font-size: 16px;
        padding: 2px;
        width: 100%;
        background-color: #229954;
        height: 275px ;
        margin-bottom: 10px;
        overflow: hidden;
        background-color: #EAEDED;
        border: 2px solid #D5DBDB;
        border-radius: 2px;
    }

    #book-detail-author-detail button{
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

    #book-detail-author-detail button:hover{
        color: orange;
        transition: 250ms all;
    }

    /*Book Detail Author End*/

    #book-detail-card-wrapper{
        padding: 10px;
        width: 100%;
        height: 100%;
    }

    .book-detail-img-card{
        width: 100%;
        height: 100%;
        border-radius: 5px;
        padding: 5px;
    }

    .book-detail-img-card{
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .book-detail-img-card img{
        object-fit: fill;
    }

    #book-detail-desc{
        margin-left: 20px;
        width: 67%;
        min-height: 600px;
        height: auto;
        display: flex;
        flex-direction: column;
    }

    #book-detail-desc-titles-content{
        width: 100%;
        height: 80px;
        display: flex;
        flex-direction: column;
        margin-bottom: 10px;
    }

    #book-detail-book-name{
        font-size: 35px;
        color: orange;
        margin-bottom: 5px;
    }

    #author-publisher-name{
        display: flex;
        align-items: center;
        flex-direction: row;
        margin-bottom: 20px;
    }

    #book-detail-author-name,
    #book-detail-publisher-name{
        font-size: 20px;
        margin-right: 10px;
        color: #F5B041;
    }

    #book-detail-bracket{
        height: 18px ;
        width: 2px;
        border-radius: 2px;
        background-color: #F5B041;
        margin-right: 10px;
    }

    #book-detail-bottom-contents{
        width: 100%;
        min-height: 540px ;
        height: auto;
        display: flex;
        flex-direction: row;
        align-items: start;
    }

    /*Book Description Start*/
    #book-detail-desc-content{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 60%;
        height: 350px;
        background-color: #EAEDED;
        border: 2px solid #D5DBDB;
        margin-right: 20px;
        border-radius: 10px;
        padding: 15px 15px 25px 15px;
        transition: all 500ms;
    }

    .book-detail-desc-content-height{
        height: auto !important;
    }

    #book-detail-desc-content-container{
        padding-bottom: 10px;
        overflow-y: hidden;
        margin-bottom: 10px;
        height: 300px;
        transition: all 500ms;
    }

    #book-detail-desc-content-value{

        display: block;
        max-width: 427px;
        height: auto;
        margin-bottom: 10px;
    }
    
    #book-detail-desc-more-button{
        padding: 0  10px 0 10px;
        color:#99A3A4 ;
        cursor: pointer;
        width: fit-content;
        height: 27px;
        border-radius: 5px;
        border-style: none;
        box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
        transition: 250ms all;
        bottom: 10px;
    }

    #book-detail-desc-more-button:hover{
        color: orange;
        transition: 250ms all;
    }

    /*Book Description End*/

    #book-detail-explanation-buying{
        width: 40%;
        height: 540px;
        display: flex;
        flex-direction: column;
    }

    #book-detail-explanation{
        height: 45%;
        width: 100%;
        background-color: #EAEDED;
        border: 2px solid #D5DBDB;
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        padding: 15px;
        justify-content: center;
    }

    #book-detail-buying{
        height: 55%;
        margin-bottom: 20px;
        background-color: #EAEDED;
        border: 2px solid #D5DBDB;
        border-radius: 10px;
        padding: 10px;
        display: flex;
        flex-direction: column;
    }   

    #book-detail-buying-price-content{
        display: flex;
        align-items: center;
        width: 150px;
        height: 50px;
        margin-bottom: 10px;
    }

    #book-detail-buying-price-content span:first-child{
        padding-left: 5px;
        font-size: 40px;
        font-weight: 600;
        margin-right: 5px;
        color: #F5B041;
    }

    #book-detail-buying-price-content span:last-child{
        padding-left: 5px;
        font-size: 25px;
        font-weight: 600;
        margin-right: 5px;
        color: orange;
    }

    .book-explanation-content{
        display: flex;
        flex-direction: row;
        margin-bottom: 3px;
    }

    .book-explanation{
        font-size: 18px;
        color: orange;
        margin-right: 5px;
    }

    .book-explanation-value{
        font-size: 18px;
        color: #F5B041;
    }

    #book-detail-buying-button-content{
        display: flex;
        justify-content: center;
        align-items: center;
    }

    #book-detail-buying-button{
        width: 270px;
        height: 50px;
        cursor: pointer;
        background-color: orange;
        color: #fff;
        font-size: 18px;
        border-radius: 8px;
        outline: none;
        border: 2px solid #D68910 ;
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
        opacity: 1;
        transition: all 500ms;
        margin-bottom: 10px;
    }

    #book-detail-buying-button:hover{
        opacity: 0.8;
        transition: all 500ms;
    }

    #book-detail-book-stock-comment-quantity{
        padding: 0px 9px 0px 9px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin-bottom: 10px;
    }

    .book-detail-quantity{
        padding: 15px;
        width: 48%;
        height: 50px;
        border-radius: 8px;
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
        display: flex;
        align-items: center;
        
    }

    #book-detail-book-stock-quantity{
        background-color: #229954 ;
        border: 2px solid  #1E8449;
    }

    #book-detail-book-comment-quantity {
        background-color: #2E86C1 ;
        border: 2px solid  #2874A6; 
    }

    #book-detail-book-stock-quantity i,
    #book-detail-book-comment-quantity i{
        font-size: 20px;
        margin-right: 7px;
        color: #fff;
    }

    #book-detail-book-stock-quantity span,
    #book-detail-book-comment-quantity span{
        font-size: 20px;
        color: #fff;
    }

    #book-detail-buying-book-totals{
        height: 100%;
        padding: 0 10px 0 10px;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
    }

    #book-detail-buying-book-totals span{
        color: #F5B041;
        margin-bottom: 2px;
        font-size: 14px;
    }
</style>