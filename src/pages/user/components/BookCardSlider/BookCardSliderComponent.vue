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
            <SwiperSlide v-for="data in datas" :key="data.id">
                <BookCardComponent :key="data.id" :bookData="data"/>
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
    props:["sliderTitle","datas"],
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
        height: 450px;
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