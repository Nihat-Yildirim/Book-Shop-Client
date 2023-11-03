<template>
    <HeaderComponent/>
    <div id="basket-detail-page-container">
        <div id="basket-detail-page-left">
            <div id="basket-detail-page-left-top">
                <div class="basket-publishers-item">
                    <div class="basket-publishers-item-title">
                        <input class="basket-item-checkbox" type="checkbox">
                        <div class="basket-detail-item-publisher-name">
                            Tetsett
                        </div>
                    </div>
                    <div class="basket-item"></div>
                </div>
            </div>
            <div id="basket-detail-page-left-bottom">
                <div id="visited-book-slider-container">
                    <div id="visited-book-slider-title">Önceden Gezdiklerim</div>
                    <div @mousemove="sliderWrapperHover = true" @mouseleave="sliderWrapperHover = false" id="visited-book-slider-content">
                        <i :class="{'visited-book-buttons-visible' : sliderWrapperHover}" @click="prevSlide" id="visited-book-wrapper-prev" class="bi bi-chevron-left"></i>
                        <Swiper
                        :modules="modules"
                        :slides-per-view="4"
                        :space-between="-30"
                        :centeredSlidesBounds= "true"
                        :pagination="{clickable : true}"
                        :autoplay="{
                            delay:1550,
                            disableOnInteraction:false,
                            pauseOnMouseEnter : true
                        }" id="visited-book-card-wrapper">
                            <SwiperSlide @click="navigateBookDetail(visitedBook.visitedBook)" v-for="visitedBook in getVisitedBooks" :key="visitedBook.id">
                                <div id="visited-book-wrapper-card">
                                    <img :src="getBookPictureUrl(visitedBook.visitedBook.pictureUrls)">
                                    <div>{{ visitedBook.visitedBook.bookName }}</div>
                                </div>
                            </SwiperSlide>
                        </Swiper>
                        <i :class="{'visited-book-buttons-visible' : sliderWrapperHover}" @click="nextSlide" id="visited-book-wrapper-next" class="bi bi-chevron-right"></i>
                    </div>
                </div>
            </div>
        </div>
        <div id="basket-detail-page-right">           
        </div>
    </div>
</template>

<script>
import HeaderComponent from '../../components/HeaderComponent.vue';
import { mapGetters,mapActions } from 'vuex';
import { Swiper,SwiperSlide } from 'swiper/vue';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

export default{

    data(){
        return{
            sliderWrapper : null,
            sliderWrapperHover : false,
        }
    },

    components:{
        HeaderComponent,
        Swiper,
        SwiperSlide
    },

    computed:{
        ...mapGetters({
            getVisitedBooks : "BookModule/_getVisitedBooks",
        })
    },

    methods:{
        nextSlide(){
            this.sliderWrapper.slideNext();
        },
        prevSlide(){
            this.sliderWrapper.slidePrev();
        },
        getBookPictureUrl(pictureUrls){
            if(pictureUrls==null)
                return require("@/assets/no-image-available.jpg");
            return pictureUrls[0];
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

    setup(){
        return{
            modules:[Autoplay]
        } 
    },

    mounted(){
        this.sliderWrapper = document.querySelector("#visited-book-card-wrapper").swiper;
    }
}

</script>

<style>
    #basket-detail-page-container{
        display: flex;
        min-width: 1510px;
        padding: 50px 9% 0 9%;
    }

    #basket-detail-page-left{
        display: flex;
        flex-direction: column;
        width: 895px;
        margin-right: 20px;
    }

    #basket-detail-page-left-top{
        margin-bottom: 20px;
    }

    #basket-detail-page-right{
        display: flex;
        flex-direction: column;
        width: 350px;
    }

    .basket-publishers-item{
        display: flex;
        flex-direction: column;
        height: 150px;
        background-color: #FBFCFC;
        border: 2px solid #D5DBDB;
        border-radius: 5px;
        box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    }

    .basket-publishers-item-title{
        display: flex;
        align-items: center;
        border-top-left-radius: 3px;
        border-top-right-radius: 3px;
        border-bottom: 2px solid #D5DBDB;
        background-color: #EAEDED;
        height: 35px;
    }

    .basket-item-checkbox{
        margin-left: 5px;
        width: 18px;
        height: 18px;
        cursor: pointer;
    }

    .basket-item-checkbox:after {
      content: " ";
      background-color: orange;
      display: inline-block;
      visibility: visible;
    }
    
    .basket-item-checkbox:checked:after {
      text-align: center;
      content: "\2714";
      font-size: 12px;
      display: block;
      border-radius: 2px;
      height: 18px;
      width: 18px;
      color: white;
    }

    .basket-detail-item-publisher-name {
        margin-left: 7px;
        font-size: 18px;
        color: black;
        padding-bottom: 3px;
    }

    #visited-book-slider-container{
        background-color: #FBFCFC;
        border: 2px solid #D5DBDB;
        border-radius: 5px;
        box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
        height: 320px;
        border-radius: 5px;
    }

    #visited-book-slider-title{
        font-size: 18px;
        color: orange;
        padding-left: 10px;
        display: flex;
        align-items: center;
        border-top-left-radius: 3px;
        border-top-right-radius: 3px;
        border-bottom: 2px solid #D5DBDB;
        height: 35px;
        background-color: #EAEDED;
    }

    #visited-book-slider-content{
        position: relative;
        padding-left: 5px;
        padding-right: 5px;
        display: flex;
        align-items: center;
        width: 100%;
        height: 280px;
    }

    #visited-book-wrapper-prev,
    #visited-book-wrapper-next{
        visibility: hidden;
        opacity: 0;
        cursor: pointer;
        padding-top: 4px;
        font-size: 23px;
        color: #fff;
        text-align: center;
        z-index: 200;
        position: absolute;
        background-color: orange;
        height: 40px;
        width: 40px;
        border-radius: 50%;
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
        transition: all 750ms;
    }

    .visited-book-buttons-visible{
        visibility: visible !important;
        opacity: 1 !important;
        transition: all 750ms;
    }

    #visited-book-wrapper-next{
        right: -10px;
    }

    #visited-book-wrapper-prev{
        left: -10px;
    }

    #visited-book-card-wrapper{
        width: 100%;
        height: 270px;
        padding-top: 10px;
        padding-left: 5px;
        padding-right: 5px;
    }

    #visited-book-wrapper-card{
        padding-top: 10px;
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 250px;
        width: 190px;
        cursor: pointer;
        background-color: #F8F9F9;
        border: 2px solid #F8F9F9;
        border: 2px solid #D5DBDB;
        border-radius: 7px;
        transition: 250ms all;
    }

    #visited-book-wrapper-card img{
        width: 157px;
        height: 180px;
        margin-bottom: 10px;
        object-fit: scale-down;
    }

    #visited-book-wrapper-card div{
        width: 170px;
        font-size: 14px;
        text-align: center;
    }

    #visited-book-wrapper-card:hover{
        color: orange;
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
        transition: 250ms all;
    }
</style>