<template>
    <div id="bestseller-container">
        <div id="bestseller-title">
            <h4>Çok Satanlar</h4>
        </div>
        <div id="bestseller-content">
            <div v-for="i in 10" :key="i" class="bestseller-card">
                <div class="bestseller-card-img">
                    <img src="@/assets/no-image-available.jpg" alt="">
                </div>
                <div class="bestseller-card-content">
                    <span class="best-seller-book-name">Şeker Portakalı</span>
                    <span class="best-seller-book-author-name">Jose Mauro De Vasconcelos</span>
                    <span class="best-seller-book-number-degree">{{ i }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
</script>

<style>
    #bestseller-container{
        display: flex;
        justify-content: start;
        flex-direction: column;
        padding: 10px 15px 15px 15px;
        width: 100% ;
        height: 100%;
        border-radius: 5px;
        background-color: #EAEDED;
        border: 2px solid #D5DBDB;
        box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    }

    #bestseller-title h4{
        font-size: 22px;
        color: orange;
        margin-bottom: 10px;
    }

    #bestseller-content{
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: start;
        flex-direction: column;
    }

    .bestseller-card{
        width: 100%;
        height: 150px;
        background-color: #f8f9f9 ;
        border-radius: 7px;
        cursor: pointer;
        transition: all 500ms;
        padding: 5px;
        display: flex;
        flex-direction: row;
        margin-bottom: 10px;
    }

    .bestseller-card:hover{
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
        transition: all 500ms;
    }

    .bestseller-card-img{
        width: 65%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 10px;
    }

    .bestseller-card-img img{
        width: 100%;
        height: 90%;
        object-fit: cover;
    }

    .bestseller-card-content{
        padding-top: 10px;
        display: flex;
        align-items: center;
        justify-content: start;
        flex-direction: column;
    }

    .best-seller-book-name{
        font-size: 14.2px;
        margin-bottom: 5px;
    }

    .best-seller-book-author-name{
        font-size: 12px;
        color:#95A5A6 ;
        margin-bottom: 25px;
    }

    .best-seller-book-number-degree{
        text-align: right;
        padding-right: 10px;
        width: 100%;
        font-size: 40px;
        transition: 500ms all;
    }

    .bestseller-card:hover .best-seller-book-number-degree{
        color: orange;
        transition: 500ms all;
    }
</style>