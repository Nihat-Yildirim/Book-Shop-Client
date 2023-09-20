<template>
    <div id="home-page-container">
        <HeaderComponent/>
        <div id="home-page-content">
            <div id="home-page-left">
                <div id="first-content">
                    <div id="first-content-top">
                        <div id="first-content-left">
                            <NewAddedComponent/>
                        </div>
                        <div id="first-content-right">
                            <CircleSlideSlider name="authors"/>
                            <CircleSlideSlider name="publishers"/>
                        </div>
                    </div>
                    <div id="first-content-bottom">
                        <PopularCategoriesComponent/>
                    </div>
                    
                </div>
                <div id="last-content">
                    <BookCardSliderComponent sliderTitle="Öne Çıkanlar"/>
                    <BookCardSliderComponent sliderTitle="Çok Yorum Alan Kitaplar"/>
                    <BookCardSliderComponent sliderTitle="Sepete En Çok Eklenenler"/>
                </div>
            </div>
            <div id="home-page-right">
                <BestsellerComponent/>
            </div>
        </div>
    </div>
</template>

<script>
import HeaderComponent from '../components/HeaderComponent.vue';
import BookCardSliderComponent from '../components/BookCardSlider/BookCardSliderComponent.vue';
import NewAddedComponent from './components/NewAddedComponent';
import CircleSlideSlider from '@/pages/user/components/CircleSlideSlider';
import PopularCategoriesComponent from './components/PopularCategoriesComponent';
import BestsellerComponent from './components/BestsellerComponent'

export default {
    data(){
        return{
        }
    },
    components : {
        HeaderComponent,
        BookCardSliderComponent,
        CircleSlideSlider,
        NewAddedComponent,
        PopularCategoriesComponent,
        BestsellerComponent
    }
}
</script>

<style>
    #home-page-container{
        height: 100%;
        width: 100%;
        min-width: 1510px;
        max-width: 1510px;
    }

    #home-page-content{
        display: flex;
        flex-direction: row;
        padding: 50px 9% 0 9%;
    }

    #home-page-right{
        width: 22%;
        height: 1660px;
        padding-left: 20px;
        position: relative;
    }

    #home-page-left{
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        height: auto;
        width: 78%;
    }

    #first-content{
        width: 100%;
        height: 650px;
    }

    #first-content-top{
        width: 100%;
        height: 400px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
    }

    #first-content-left{
        width: 30%;
        height: 100%;
        margin-right: 20px;
    }

    #first-content-right{
        display: flex;
        align-items: start;
        justify-content: space-between;
        flex-direction: column;
        width: 100%;
        height: 100%;
    }

    #last-content{
        width: 100%;
        height: auto;
    }
</style>