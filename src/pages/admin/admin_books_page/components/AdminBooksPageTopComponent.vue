<template>
    <div id="admin-books-page-top-container">
        <div id="admin-books-page-top-header">
            <div id="admin-books-page-top-title-left">
                <div id="admin-books-page-search-container">
                    <input type="text" placeholder="Ara...">
                </div>
            </div>
            <div id="admin-books-page-top-title-right">
                <button>Ekle</button>
                <div class="admin-books-page-top-title-right-button">
                    <span>Kategori</span>
                    <i class="bi bi-chevron-down"></i>
                </div>
                <div class="admin-books-page-top-title-right-button">
                    <span>Yeni Eklenenler</span>
                    <i class="bi bi-arrow-down-up"></i>
                </div>
            </div>
        </div>
        <div id="admin-books-page-middle-books-content">
            <div v-for="i in 15" :key="i" class="admin-books-page-book-card">
                <div class="admin-books-page-book-card-image-container">
                    <img src="@\assets\no-image-available.jpg">
                </div>
                <div class="admin-books-page-book-card-content-container">
                    <div>Kitap İsmi</div>
                    <div>150 TL</div>
                </div>
                <div class="admin-books-page-book-card-button-container">
                    <div class="admin-books-page-book-card-button-update">
                        <i class="bi bi-pencil-fill"></i>
                        <div>Güncelle</div>
                    </div>
                    <div class="admin-books-page-book-card-button-remove">
                        <i class="bi bi-trash-fill"></i>
                        <div>Sil</div>
                    </div>
                </div>
            </div>
        </div>
        <div id="admin-books-page-bottom">
            <div id="admin-books-page-bottom-pagination-container">
                <div class="admin-books-page-bottom-pagination-button">
                    <i class="bi bi-chevron-left"></i>
                </div>
                <div id="admin-books-page-bottom-pagination-pages">
                    <div v-for="i in 5" :key="i" class="admin-books-page-bottom-pagination-page"> {{ i }}</div>
                </div>
                <div class="admin-books-page-bottom-pagination-button">
                    <i class="bi bi-chevron-right"></i>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default{
    
}
</script>

<style>
    #admin-books-page-top-container{
        border-radius: 7px;
        box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 2px 0px;
        border: 1px solid #F2F3F4;
        background-color: #F8F9F9;
        height: auto;
    }

    #admin-books-page-top-title{
        display: flex;
    }

    #admin-books-page-top-header{
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1.5px solid #ebeeee;
        padding: 0px 10px 0px 10px;
        margin-bottom: 15px;
    }

    #admin-books-page-search-container{
        display: flex;
        height: 32px;
        width: 350px;
        border: 1.5px solid orange;
        border-radius: 3px;
    }

    #admin-books-page-search-container input{
        font-size: 15px;
        border-radius: 3px;
        padding-left: 5px;
        width: 100%;
        outline: none;
        border: none;
    }

    #admin-books-page-top-title-right{
        display: flex;
    }

    #admin-books-page-top-title-right button{
        cursor: pointer;
        height: 32px;
        width: 90px;
        font-size: 15px !important;
        border-radius: 3px;
        background-color: #27AE60;
        border: 1px solid #196F3D;
        color: #fff;
        transition: all 250ms;
        box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px;
    }

    #admin-books-page-top-title-right button:hover{
        background-color: #2ECC71;
        transition: all 250ms;
    }

    .admin-books-page-top-title-right-button{
        cursor: pointer;
        user-select: none;
        display: flex;
        height: 32px;
        align-items: center;
        margin-left: 15px;
        border-radius: 3px;
        font-size: 15px;
        color: #7F8C8D;
        font-weight: 400;
        border: 1px solid #99A3A4;
        padding-left: 5px;
        padding-right: 5px;
        box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px;
    }

    .admin-books-page-top-title-right-button span{
        margin-right: 5px;
    }

    #admin-books-page-middle-books-content{
        padding: 5px;
        padding-left: 20px;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: flex-start;
        margin-bottom: 2px;
    }

    .admin-books-page-book-card{
        display: flex;
        flex-direction: column;
        padding: 5px;
        margin-right: 20px;
        margin-bottom: 20px;
        width: 220px;
        height: 320px;
        background-color: #fbfcfc;
        border: 1.5px solid #d5dbdb;
        border-radius: 5px;
    }

    .admin-books-page-book-card-image-container{
        width: 180px;
        height: 235px;
        margin-left: 14px;
        margin-right: 5px;
        margin-top: 5px;
        background-color: #27AE60;
        margin-bottom: 7px;
    }

    .admin-books-page-book-card-image-container img{
        object-fit: cover;
        width: 100%;
        height: 100%;
    }

    .admin-books-page-book-card-content-container{
        padding-left: 7px;
    }

    .admin-books-page-book-card-content-container div:first-child{
        font-size: 16px;
        margin-bottom: 2px;
        color: #F39C12;
    }

    .admin-books-page-book-card-content-container div:last-child{
        font-size: 17px;
        margin-bottom: 2px;
    }

    .admin-books-page-book-card-button-container{
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-left: 5px;
        padding-right: 5px;
        height: 48px;
    }

    .admin-books-page-book-card-button-container div{
        font-size: 13px;
        cursor: pointer;
        user-select: none;
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 27px;
        border-radius: 5px;
        padding-left: 3px;
        padding-right: 3px;
        color: #fff;
    }

    .admin-books-page-book-card-button-update{
        background-color: #F39C12;
        border: 1px solid #E67E22;
    }

    .admin-books-page-book-card-button-remove{
        background-color: #CB4335;
        border: 1px solid #A93226;
    }

    .admin-books-page-book-card-button-update:hover,
    .admin-books-page-book-card-button-remove:hover{
        opacity: 0.9;
    }

    #admin-books-page-bottom{
        border-top: 1px solid #ebeeee;
        height: 45px;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        padding-left: 24px;
        padding-right: 24px;
    }

    #admin-books-page-bottom-pagination-container{
        display: flex;
        align-items: center;
        border-radius: 3px;
        border: 1px solid #EAEDED;
        height: 30px;
    }

    .admin-books-page-bottom-pagination-button{
        cursor: pointer;
        width: 28px;
        height: 28px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #2E86C1;
        color: #fff ;
    }

    .admin-books-page-bottom-pagination-button:hover{
        opacity: 0.9;
    }

    #admin-books-page-bottom-pagination-container .admin-books-page-bottom-pagination-button:first-child{
        border-top-left-radius: 2px;
        border-bottom-left-radius: 2px;
        border-right: 1px solid #EAEDED;
        margin-right: 4px;
    }  

    #admin-books-page-bottom-pagination-container .admin-books-page-bottom-pagination-button:last-child{
        border-top-right-radius: 2px;
        border-bottom-right-radius: 2px;
        border-left: 1px solid #EAEDED;
    }

    #admin-books-page-bottom-pagination-pages{
        display: flex;
        justify-content: space-between;
    }

    .admin-books-page-bottom-pagination-page{
        padding-top: 1px;
        user-select: none;
        width: 25px;
        height: 25px;
        text-align: center;
        border: 0.8px solid #EAEDED;
        margin-right: 4px;
        cursor: pointer;
        border-radius: 3px;
    }
</style>