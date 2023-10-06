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
                            <CircleSlideSlider :datas="allAuthors" name="authors" uiName="Yazarlar"/>
                            <CircleSlideSlider :datas="allPublisher" name="publishers" uiName="Yayıncılar"/>
                        </div>
                    </div>
                    <div id="first-content-bottom">
                        <PopularCategoriesComponent/>
                    </div>
                    
                </div>
                <div id="last-content">
                    <BookCardSliderComponent v-if="booksByCommentCount" :datas="booksByCommentCount" sliderTitle="Çok Yorum Alan Kitaplar"/>
                    <BookCardSliderComponent v-if="booksByBasketCount" :datas="booksByBasketCount" sliderTitle="Sepete En Çok Eklenenler"/>
                    <BookCardSliderComponent :datas="worldClassics" sliderTitle="Dünya Klasikleri"/>
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
import BestsellerComponent from './components/BestsellerComponent';
import { mapActions,mapGetters } from 'vuex';

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
    },

    computed:{
        ...mapGetters({
            allAuthors : "AuthorModule/_getAll",
            allPublisher : "PublisherModule/_getAll",
            worldClassics : "BookModule/_getWorldClassics",
            booksByCommentCount : "BookModule/_getBooksByCommentCount",
            booksByBasketCount : "BookModule/_getBooksByBasketCount",
        }),
    },

    methods:{
        ...mapActions({
            getAllAuthor : "AuthorModule/getAll",
            getAllPublisher : "PublisherModule/getAll",
            getWorldClassics : "BookModule/getWorldClassics",
            getBooksByCommentCount : "BookModule/getBooksByCommentCount",
            getBooksByBasketCount : "BookModule/getBooksByBasketCount",
        })
    },

    mounted(){
        this.getAllPublisher();
        this.getAllAuthor();
        this.getWorldClassics({categoryId : 10,page : 0,size : 20});
        this.getBooksByCommentCount({
            page : 0,
            size : 20
        });
        this.getBooksByBasketCount({
            page : 0,
            size : 30
        });
    }
}
</script>

<style>
    #home-page-container{
        height: 100%;
        width: 100%;
        max-width: 1518px;
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