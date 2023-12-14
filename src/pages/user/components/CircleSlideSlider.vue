<template>
    <div class="circle-slider-container">
        <div class="circle-slider-title">
            <h5>{{ uiName }}</h5>
            <span>Tümünü Göster</span>
        </div>
        <div class="circle-slider-content" @mousemove="navButtonVisibily = true" @mouseleave="navButtonVisibily = false">
            <i @click="prevSlide" :class="{'circle-nav-button-visible' : navButtonVisibily}" class="bi bi-chevron-left cicle-nav-button circle-nav-pre-button"></i>
            <Swiper
            :modules="modules"
            :slides-per-view="4"
            :space-between="-100"
            :centeredSlidesBounds= "true"
            :autoplay="{
                delay:2000,
                disableOnInteraction:false,
                pauseOnMouseEnter : true
            }" class="circle-card-wrapper" :class="('circle-card-wrapper-' + name)">
                <SwiperSlide v-for="data in datas" :key="data.id">
                    <div @click="navigatePublisherDetail(data)" class="circle-card">
                       <img :src="getDataPictureUrl(data.pictureUrl)" :alt="data.name">
                    </div>
                </SwiperSlide>
            </Swiper>
            <i @click="nextSlide" :class="{'circle-nav-button-visible' : navButtonVisibily}" class="bi bi-chevron-right cicle-nav-button circle-nav-next-button"></i>
        </div>
    </div>
</template>

<script>
import { Swiper , SwiperSlide  } from 'swiper/vue';
import {Autoplay} from 'swiper/modules';
import 'swiper/css';
export default{
    props:["name","uiName","urlPath","datas"],

    data(){
        return{
            navButtonVisibily : false,
            circleSliderWrapper : null,
        }
    },

    components:{
        Swiper,
        SwiperSlide
    },

    methods:{
        nextSlide(){
            this.circleSliderWrapper.slideNext();
        },
        prevSlide(){
            this.circleSliderWrapper.slidePrev();
        },
        getDataPictureUrl(pictureUrl){
            if(pictureUrl == null)
                return require("@/assets/no-image-available.jpg");
            return pictureUrl;
        },
        navigatePublisherDetail(data){
            if(this.uiName =="Yayıncılar"){
                this.$store.state.PublisherModule.selectedPublisherId = data.id;
                this.$router.push({
                    name : "PublisherDetailPage",
                    params : {
                        publisherName : data.name.toLowerCase().replace(/\s+/g, "-")
                    }
                });
            }

            if(this.uiName == "Yazarlar"){
                this.$store.state.AuthorModule.selectedAuthorId = data.id,
                this.$router.push({
                    name : "AuthorDetailPage",
                    params : {
                        authorName : data.name.toLowerCase().replace(/\s+/g, "-")
                    }
                });
            }
        }
    },

    setup(){
        return{
            modules:[Autoplay]
        }
    },

    mounted(){
        this.circleSliderWrapper = document.querySelector(".circle-card-wrapper-"+this.name).swiper;
    }
}
</script>

<style>
    .circle-slider-container{
        padding: 15px;
        width: 660px;
        height: 188.5px;
        border-radius: 5px;
        background-color: #EAEDED;
        border: 2px solid #D5DBDB;
        box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
        display: flex;
        flex-direction: column;
        z-index: 10;
    }

    .circle-slider-title{
        display: flex;
        justify-content: space-between;
        width: 100%;
        height: 25px;
    }

    .circle-slider-title h5{
        font-size: 20px;
        color: orange;
    }

    .circle-slider-title span{
        margin-top: 5px;
        color: orange;
        cursor: pointer;
        font-size: 14px;
        font-weight: 500px;
    }

    .circle-slider-title span:hover{
        border-bottom: 2px solid orange;
    }

    .circle-slider-content{
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: row;
        width: 100%;
        height: 100%;
        position: relative;
        cursor: pointer;
    }

    .circle-card-wrapper{
        display: flex;
        justify-content: center;
        width: 100% ;
        height: 100%;
        padding-top: 15px;
        padding-bottom: 10px;
    }

    .cicle-nav-button{
        opacity: 0;
        visibility: hidden;
        position: absolute;
        color: #fff;
        cursor: pointer;
        font-size: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background-color: orange;
        text-align: center;
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
        transition: opacity 750ms;
        z-index: 200;
    }

    .circle-nav-pre-button{
        left: -15px;
    }

    .circle-nav-next-button{
        right: -15px;
    }

    .circle-nav-button-visible{
        opacity: 1;
        visibility: visible;
        transition: opacity 750ms;
    }

    .circle-card{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 110px;
        height: 110px;
        border-radius: 50%;
        background-color: #f8f9f9;
        padding: 2px;
        transition: all 500ms;
    }

    .circle-card:hover{
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
        transition: 500ms all;
    }

    .circle-card img{
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 50%;
    }
</style>