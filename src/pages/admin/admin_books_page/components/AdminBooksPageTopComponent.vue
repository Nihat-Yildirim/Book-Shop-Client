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
        <div v-if="_getBookDataForAdmin != null" id="admin-books-page-middle-books-content">
            <div v-for="book in _getBookDataForAdmin.books" :key="i" class="admin-books-page-book-card">
                <div class="admin-books-page-book-card-image-container">
                    <img :src="getBookPictureUrl(book.pictureUrls)">
                </div>
                <div class="admin-books-page-book-card-content-container">
                    <div>{{ book.bookName }}</div>
                    <div>{{ book.price }} TL</div>
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
                <div @click="page != 0 ? page-- : page = 0" class="admin-books-page-bottom-pagination-button">
                    <i class="bi bi-chevron-left"></i>
                </div>
                <div id="admin-books-page-bottom-pagination-pages">
                    <div @click="page = pageNumber - 1" v-for="pageNumber in pageNumbers" :class="{'selected-page-bacground-color' : pageNumber == page + 1}" :key="pageNumber" class="admin-books-page-bottom-pagination-page"> {{ pageNumber }}</div>
                </div>
                <div @click="page+1 < Math.ceil(this._getBookDataForAdmin.bookCount / this.size) ? page++ : page " class="admin-books-page-bottom-pagination-button">
                    <i class="bi bi-chevron-right"></i>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions,mapGetters } from 'vuex';

export default{
    data(){
        return{
            page : 0,
            size : 15,
            pageNumbers : [],
        }
    },

    computed:{
        ...mapGetters({
            _getBookDataForAdmin : 'BookModule/_getBookDataForAdmin',
        })
    },

    methods:{
        ...mapActions({ 
            getAllBookForAdminAction : 'BookModule/getAllBookForAdmin',
        }),
        getBookPictureUrl(bookPictures){
            if(bookPictures == null)
                return require("@/assets/no-image-available.jpg");
            
            return bookPictures.find(x => x.showOrder == 1).pictureUrl;
        },
        getPageNumbers(){
            if(this._getBookDataForAdmin != null){
                this.pageNumbers = [];
                let pageValue = this.page + 1;
                let maxPageNumber = Math.ceil(this._getBookDataForAdmin.bookCount / this.size);
                let minValue = pageValue - 2;

                for(minValue; minValue <= maxPageNumber; minValue++){
                    if(minValue > 0 && this.pageNumbers.length != 5)
                        this.pageNumbers.push(minValue);
                }
            }

            return null;
        }
    },

    watch:{
        page(){
            this.getAllBookForAdminAction({
                page : this.page,
                size : this.size
            });
        },
        _getBookDataForAdmin(){
            if(this._getBookDataForAdmin != null){
                this.getPageNumbers();
            }
        }
    },
    
    mounted(){
        this.getAllBookForAdminAction({
            page : this.page,
            size : this.size
        });
    }
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
        position: relative;
    }

    .admin-books-page-book-card-image-container{
        width: 180px;
        min-height: 195px;
        margin-left: 14px;
        margin-right: 5px;
        margin-top: 5px;
        margin-bottom: 7px;
    }

    .admin-books-page-book-card-image-container img{
        object-fit: scale-down;
        width: 180px;
        height: 195px;
    }

    .admin-books-page-book-card-content-container{
        padding-left: 7px;
    }

    .admin-books-page-book-card-content-container div:first-child{
        font-size: 15px;
        margin-bottom: 2px;
        color: #F39C12;
    }

    .admin-books-page-book-card-content-container div:last-child{
        font-size: 15px;
        margin-bottom: 2px;
    }

    .admin-books-page-book-card-button-container{
        position: absolute;
        bottom: -2px;
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
        margin-right: 75px;
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

    .selected-page-bacground-color{
        color: #fff !important;
        background-color: #3498DB !important;
    }
</style>