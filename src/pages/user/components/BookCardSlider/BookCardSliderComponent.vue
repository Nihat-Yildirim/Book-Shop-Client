<template>
    <div class="book-card-slider-container">
        <div class="book-card-slider-titles-container">
            <h5>{{ sliderTitle== null ? "Slider Title" : sliderTitle }}</h5>
            <span>Tümünü Göster</span>
        </div>
        <Swiper
        :modules="modules"
        :slides-per-view="3.5"
        :space-between="40"
        :centeredSlidesBounds= "true"
        :pagination="{clickable : true}"
        :autoplay="{
            delay:1750,
            disableOnInteraction:false,
            pauseOnMouseEnter : true
        }" class="book-card-wrapper">
        <SwiperSlide v-for="book in books" :key="book.id">
            <BookCardComponent :key="book.id" :bookData="book"/>
        </SwiperSlide>
        </Swiper>
    </div>
</template>

<script>
import { Swiper , SwiperSlide  } from 'swiper/vue';
import BookCardComponent from './BookCardComponent.vue';
import {Autoplay,Pagination} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

export default{
    data(){
        return{
            books:[
                {
                    id:1,
                    name :"Kitap 1",
                    authorName : "Yazar 1",
                    price : "123 TL"
                },
                {
                    id:2,
                    name :"Kitap 2",
                    authorName : "Yazar 2",
                    price : "123 TL"
                },
                {
                    id:3,
                    name :"Kitap 3",
                    authorName : "Yazar 3",
                    price : "123 TL"
                },
                {
                    id:4,
                    name :"Kitap 4",
                    authorName : "Yazar 4",
                    price : "123 TL"
                },
                {
                    id:6,
                    name :"Kitap 6",
                    authorName : "Yazar 6",
                    price : "123 TL"
                },
                {
                    id:7,
                    name :"Kitap 7",
                    authorName : "Yazar 7",
                    price : "123 TL"
                },
                {
                    id:8,
                    name :"Kitap 8",
                    authorName : "Yazar 8",
                    price : "123 TL"
                },
                {
                    id:9,
                    name :"Kitap 9",
                    authorName : "Yazar 9",
                    price : "123 TL"
                },
                {
                    id:10,
                    name :"Kitap 10",
                    authorName : "Yazar 10",
                    price : "123 TL"
                },
                {
                    id:11,
                    name :"Kitap 11",
                    authorName : "Yazar 11",
                    price : "123 TL"
                },
            ]
        }
    },
    components: { 
        BookCardComponent ,
        Swiper,
        SwiperSlide,
    },
    setup(){
        return{
            modules:[Autoplay,Pagination]
        } 
    },
    props:["sliderTitle"],
}
</script>

<style>
    .book-card-slider-container{
        border: 2px solid #D5DBDB;
        border-radius: 5px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-direction: column;
        padding: 0 25px 0 25px;
        width: 100% ;
        height: 430px;
        background-color: #EAEDED;
        padding-bottom: 5px;
        box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
        margin-top: 20px;
        margin-bottom: 20px;
    }

    .card-slider{
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: green;
    }

    .book-card-wrapper{
        width: 100%;
        height: 100%;
    }

    .book-card-slider-titles-container{
        width: 100%;
        display: flex;
        justify-content:space-between ;
        align-items: center;
        height: 55px;
    }

    .book-card-slider-titles-container h5{
        font-size: 20px;
        font-weight: 500;
        color: orange;
    }

    .book-card-slider-titles-container span{
        color: orange;
        cursor: pointer;
        font-size: 14px;
        font-weight: 500px;
    }

    .book-card-slider-titles-container span:hover{
        border-bottom: 2px solid orange;
    }
</style>