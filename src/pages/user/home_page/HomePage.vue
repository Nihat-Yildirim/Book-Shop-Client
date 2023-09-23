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
                    <BookCardSliderComponent :datas="books" sliderTitle="Çok Yorum Alan Kitaplar"/>
                    <BookCardSliderComponent :datas="books" sliderTitle="Sepete En Çok Eklenenler"/>
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
            books:[
                {
                    id:1,
                    name :"Kitap 1",
                    authorName : "Yazar 1",
                    price : "123 TL",
                    pictureUrls : []
                },
                {
                    id:2,
                    name :"Kitap 2",
                    authorName : "Yazar 2",
                    price : "123 TL",
                    pictureUrls : []
                },
                {
                    id:3,
                    name :"Kitap 3",
                    authorName : "Yazar 3",
                    price : "123 TL",
                    pictureUrls : []
                },
                {
                    id:4,
                    name :"Kitap 4",
                    authorName : "Yazar 4",
                    price : "123 TL",
                    pictureUrls : []
                },
                {
                    id:6,
                    name :"Kitap 6",
                    authorName : "Yazar 6",
                    price : "123 TL",
                    pictureUrls : []
                },
                {
                    id:7,
                    name :"Kitap 7",
                    authorName : "Yazar 7",
                    price : "123 TL",
                    pictureUrls : []
                },
                {
                    id:8,
                    name :"Kitap 8",
                    authorName : "Yazar 8",
                    price : "123 TL",
                    pictureUrls : []
                },
                {
                    id:9,
                    name :"Kitap 9",
                    authorName : "Yazar 9",
                    price : "123 TL",
                    pictureUrls : []
                },
                {
                    id:10,
                    name :"Kitap 10",
                    authorName : "Yazar 10",
                    price : "123 TL",
                    pictureUrls : []
                },
                {
                    id:11,
                    name :"Kitap 11",
                    authorName : "Yazar 11",
                    price : "123 TL",
                    pictureUrls : []
                },
            ]
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
            worldClassics : "BookModule/_getWorldClassics"
        }),
    },

    methods:{
        ...mapActions({
            getAllAuthor : "AuthorModule/getAll",
            getAllPublisher : "PublisherModule/getAll",
            getWorldClassics : "BookModule/getWorldClassics"
        })
    },

    mounted(){
        this.getAllPublisher();
        this.getAllAuthor();
        this.getWorldClassics({categoryId : 10,page : 0,size : 20});
    }
}
</script>

<style>
    #home-page-container{
        height: 100%;
        width: 100%;
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