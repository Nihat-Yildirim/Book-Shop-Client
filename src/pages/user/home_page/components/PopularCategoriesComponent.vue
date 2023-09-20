<template>
    <div id="populer-categories-container">
        <div id="populer-categories-title">
            <h3>Öne Çıkan Kategoriler</h3>
        </div>
        <div id="populer-categories-content">
            <div v-for="i in 6" :key="i" class="popular-category-card">
                <div class="popular-category-book-img">
                    <img class="popular-category-book-img-content" src="@/assets/no-image-available.jpg" alt="">
                </div>
                <span>Kategori</span>
            </div>
        </div>
    </div>
</template>

<script>
export default{
    data(){
        return {

        }
    },


}
</script>

<style>
    #populer-categories-container{
        display: flex;
        flex-direction: column;
        padding: 10px 20px;
        width: 100%;
        height: 230px;
        border-radius: 5px;
        background-color: #EAEDED;
        border: 2px solid #D5DBDB;
        box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    }

    #populer-categories-title{
        height: 25px;
        width: 100%;
    }

    #populer-categories-title h3{
        font-size: 20px;
        font-weight: 500;
        color: orange;
    }

    #populer-categories-content{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

    .popular-category-card{
        height: 175px;
        width: 155px;
        background-color: transparent;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    }

    .popular-category-book-img{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 125px;
        height: 125px;
        border-radius: 50%;
        background-color: #f8f9f9;
        cursor: pointer;
        margin-bottom: 7px;
        box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    }

    .popular-category-book-img-content{
        width: 70px;
        height: 90px;
        object-fit: cover;
    }

    .popular-category-card span{
        font-size: 18px;
        color: orange;
    }
</style>