<template>
    <div id="new-added-container">
        <Swiper
        :slides-per-view="1"
        :centeredSlidesBounds= "true"
        id="new-added-book-wrapper">
            <SwiperSlide v-for="newAddedBook in newAddedBooks" :key="newAddedBook.id" class="new-added-book-card">
                <div class="new-added-book-card-container">
                    <div class="new-added-book-card-img">
                        <img class="new-added-book-picture" :src="getNewAddedBookPictureUrl" alt="">
                    </div>
                    <div class="new-added-book-card-content">
                        <h5>{{ newAddedBook.bookName }}</h5>
                        <span class="new-added-book-author-name">{{ newAddedBook.authorName }}</span>
                        <span class="new-added-book-author-price">{{ newAddedBook.price }} TL</span>
                    </div>
                </div>
            </SwiperSlide>
        </Swiper>
        <div id="new-added-container-nav">
            <i @click="prevSlide" class="bi bi-chevron-left  prev-button" id="new-added-previous"></i>
            <span id="new-added-pagination">{{ newAddedBookCardIndex}}/{{ newAddedBooks.length }}</span>
            <i @click="nextSlide" class="bi bi-chevron-right next-button" id="new-added-previous"></i>
        </div>
    </div>
</template>

<script>
import { Swiper , SwiperSlide  } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/pagination';
export default{
    data(){
        return{
            newAddedBookSwipper : null,
            newAddedBookCardIndex : 1,
            newAddedBooks :[
                {
                    id : 1,
                    bookName : "Kitap 1",
                    authorName : "Yazar 1",
                    price : 100
                },
                {
                    id : 2,
                    bookName : "Kitap 2",
                    authorName : "Yazar 2",
                    price : 100
                },
                {
                    id : 3,
                    bookName : "Kitap 3",
                    authorName : "Yazar 3",
                    price : 100
                },
                {
                    id : 4,
                    bookName : "Kitap 4",
                    authorName : "Yazar 4",
                    price : 100
                },
                {
                    id : 5,
                    bookName : "Kitap 5",
                    authorName : "Yazar 5",
                    price : 100
                }
            ]
        }
    },

    components:{
        Swiper,SwiperSlide
    },

    methods:{
        nextSlide(){
            if(this.newAddedBookCardIndex != this.newAddedBooks.length)
                this.newAddedBookCardIndex++
            this.newAddedBookSwipper.slideNext();
        },
        prevSlide(){
            if(this.newAddedBookCardIndex != 1)
                this.newAddedBookCardIndex--
            this.newAddedBookSwipper.slidePrev();
        }
    },

    computed:{
        getNewAddedBookPictureUrl(){
            if(this.newAddedBooks.url == null)
                return require("@/assets/no-image-available.jpg");
            return this.bookData.url;
        }
    },

    mounted(){
        this.newAddedBookSwipper = document.querySelector('#new-added-book-wrapper').swiper;
    },
}
</script>

<style>
    #new-added-container{
        padding: 1px;
        width: 100% ;
        height: 400px;
        border-radius: 5px;
        background-color: #EAEDED;
        border: 2px solid #D5DBDB;
        box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    }

    #new-added-book-wrapper{
        width: 100%;
        height: 90%;
    }

    .new-added-card{
        width: 100%;
        height: 100%;
    }

    #new-added-container-nav{
        width:100% ;
        height: 10%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    #new-added-container-nav i{
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        background-color: orange;
        color: #fff;
        cursor: pointer;
        box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
        border-radius: 2px solid #F1C40F ;
        transition: all 500ms;
    }

    #new-added-container-nav i:hover{
        opacity: 0.8;
        transition: all 500ms;
    }

    #new-added-pagination{
        margin-bottom: 5px;
        font-size: 18px;
        text-align: center;
        user-select: none;
        width: 40px ;
        height: 21px ;
        margin-left: 5px;
        margin-right: 5px;
    }

    .new-added-book-card-container{
        background-color: #f8f9f9;
        cursor: pointer;
        padding: 10px 10px 10px 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        width: 100%;
        height: 100%;
    }

    .new-added-book-card-top{
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        width: 100%;
        height: 100%;
    }

    .new-added-book-card-bottom{
        width: 100%;
        height: 10%;
    }

    .new-added-book-card-img{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 80%;
    }

    .new-added-book-picture{
        object-fit: cover;
        width: 90%;
        height: 90%;
    }

    .new-added-book-card-content{
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        width: 100%;   
        height: 20%; 
    }

    .new-added-book-card-content h5{
        font-size: 22px;
        font-weight: 500;
        transition: all 500ms;
    }

    .new-added-book-author-name{
        font-size: 18px;
        font-weight: 400;
        transition: all 500ms;
    }

    .new-added-book-author-price{
        font-size: 17px;
        transition: all 500ms;
    }

    .new-added-book-card:hover h5,
    .new-added-book-card:hover span{
        color: orange;
        transition: all 500ms;

    }
</style>