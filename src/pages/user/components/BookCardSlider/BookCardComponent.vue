<template>
    <div class="book-card">
        <div class="book-card-content">
            <div class="book-card-content-above">
                <img class="book-card-content-img" :src="getBookPictureUrl" alt="">
            </div>
            <div class="book-card-content-down">
                <div class="book-card-text-content-container">
                    <h4 class="book-card-book-name">{{ bookData.name }}</h4>
                    <span class="book-card-book-price">{{ bookData.price }}</span>
                </div>
                <div class="book-card-button-container">
                    <button class="book-card-button">Sepete Ekle</button>
                </div>
            </div>
        </div>
    </div>  
</template>

<script>

export default{
    props: ["bookData"],

    computed:{
        getBookPictureUrl(){
            if(this.bookData.url == null)
                return require("@/assets/no-image-available.jpg");
            return this.bookData.url;
        }
    }
}
</script>

<style>
    .book-card{
        cursor: pointer;
        background-color: #F8F9F9;
        border : 2px solid #F8F9F9;
        border-radius: 7px;
        width: 235px;
        height: 330px;
        transition: all 500ms;
    }

    .book-card:hover{
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
        transition: all 500ms;
    }

    .book-card-content{
        width: 100%;
        height: 100%;
        padding: 15px 10px 8px 10px;
        display:flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }

    .book-card-content-above{
        width: 90%;
        height: 65%;
    }

    .book-card-content-down{
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        height: 30%;
        width: 100%;
    }

    .book-card-content-img{
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .book-card-text-content-container{
        padding: 8px;
        width: 100%;
        height: 70%;
    }

    .book-card-button-container{
        padding-top: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 5px;
        width: 100%;
        height: 30%;
    }

    .book-card:hover .book-card-button{
        border: 5px;
        opacity: 1;
        visibility: visible;
        transition: all 500ms;
    }

    .book-card-button{
        width: 100px;
        height: 30px;
        border-radius: 3px;
        cursor: pointer;
        color: #fff;
        background-color: #27AE60;
        border: 2px solid #F8F9F9;
        visibility: hidden;
        opacity: 0;
        transition: all 500ms;
    }

    .book-card-book-name{
        text-align: center;
        font-weight: 500;
        font-size: 20px;
        transition: all 500ms;
        margin-bottom: 6px;
    }

    .book-card:hover .book-card-book-name,
    .book-card:hover .book-card-author-name,
    .book-card:hover .book-card-book-price{
        transition: all 500ms;
        color: orange;
    }

    .book-card-book-price{
        text-align: center;
        display: block;
        font-size: 18px;
        transition: all 500ms;
    }
</style>