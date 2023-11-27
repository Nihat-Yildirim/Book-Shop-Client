<template>
    <div :class="{'admin-navigation-hide' : navigationHide}" id="admin-navigation-container">
        <div id="admin-navigation-top">
            <div :class="{'hide-nav-name' : navigationHide}">Book Shop</div>
            <i @click="navigationHide = !navigationHide" class="bi bi-list"></i>
        </div>
        <div id="admin-navigation-bottom">
            <div :class="{'admin-nav-button-clicked' : adminHomePageNavButtonClicked}" class="admin-navigation-button">
                <i class="bi bi-house-fill"></i>
                <div :class="{'admin-nav-button-text-hide' : navigationHide}">Ana Sayfa</div>
            </div>
            <div :class="{'admin-nav-button-clicked' : adminBooksPageNavButtonClicked}" class="admin-navigation-button">
                <i class="bi bi-book-fill"></i>
                <div :class="{'admin-nav-button-text-hide' : navigationHide}">Kitaplar</div>
            </div>
            <div :class="{'admin-nav-button-clicked' : adminUsersPageNavButtonClicked}" class="admin-navigation-button">
                <i class="bi bi-people-fill"></i>
                <div :class="{'admin-nav-button-text-hide' : navigationHide}">Kullanıcılar</div>
            </div>
            <div :class="{'admin-nav-button-clicked' : adminAuthorsPageNavButtonClicked}" class="admin-navigation-button">
                <i class="bi bi-pen-fill"></i>
                <div :class="{'admin-nav-button-text-hide' : navigationHide}">Yazarlar</div>
            </div>
            <div :class="{'admin-nav-button-clicked' : adminPublishersPageNavButtonClicked}" class="admin-navigation-button">
                <i class="bi bi-building-fill"></i>
                <div :class="{'admin-nav-button-text-hide' : navigationHide}">Yayın Evleri</div>
            </div>
            <div :class="{'admin-nav-button-clicked' : adminOrdersPageNavButtonClicked}" class="admin-navigation-button">
                <i class="bi bi-box-seam-fill"></i>
                <div :class="{'admin-nav-button-text-hide' : navigationHide}">Siparişler</div>
            </div>
            <div :class="{'admin-nav-button-clicked' : adminLogoutNavButtonClicked}" id="admin-logout-button" class="admin-navigation-button">
                <i class="bi bi-box-arrow-right"></i>
                <div :class="{'admin-nav-button-text-hide' : navigationHide}">Çıkış Yap</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            navigationHide : false,
        }
    },

    props:{
        adminHomePageNavButtonClicked : {
            type : Boolean,
            default : false,
        },
        adminBooksPageNavButtonClicked : {
            type : Boolean,
            default  : false,
        },
        adminUsersPageNavButtonClicked:{
            type : Boolean,
            default : false
        },
        adminAuthorsPageNavButtonClicked : {
            type : Boolean,
            default : false
        },
        adminPublishersPageNavButtonClicked : {
            type : Boolean,
            default : false
        },
        adminOrdersPageNavButtonClicked : {
            type : Boolean,
            default : false
        },
        adminLogoutNavButtonClicked : {
            type : Boolean,
            default : false
        }
    },

    methods: {
        
    },

    watch:{
        navigationHide(){
            console.log(this.navigationHide);
        }
    }
}
</script>

<style>
    #admin-navigation-container{
        width: 230px;
        height: 703px;
        background-color: #F8F9F9;
        box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
        transition: all 250ms;
    }

    .admin-navigation-hide{
        width: 50px !important;
        transition: all 250ms;
    }

    #admin-navigation-top{
        height: 50px;
        position: relative;
        padding: 10px;
        background-color: #F5B041;
        font-size: 23px;
        color: #fff;
    }

    .hide-nav-name{
        opacity: 0 !important;
        transition: all 100ms !important;
    }

    #admin-navigation-top div{
        position: absolute;
        opacity: 1;
        user-select: none;
        font-weight: 500;
        transition: all 250ms;
    }

    #admin-navigation-top i{
        position: absolute;
        top: 10px;
        right: 12px;
        font-size: 25px;
        font-weight: 300;
        cursor: pointer;
    }

    #admin-navigation-bottom{
        padding-left: 7px;
        padding-top: 7px;
        padding-right: 7px;
    }

    .hide-nav-button-text{
        display: none;
    }

    .admin-navigation-button{
        width: 100%;
        height: 35px;
        display: flex;
        cursor: pointer;
        margin-bottom: 13px;
        font-size: 17px;
        padding-top: 4px;
        border-radius: 5px;
        padding-left: 3px;
    }

    .admin-navigation-button i{
        font-size: 20px;
        margin-right: 10px;
        margin-left: 2px;
        color: #ABB2B9;
        transition: all 150ms;
        padding-left: 3px;
    }

    .admin-navigation-button div{
        color: #2C3E50;
        min-width: 190px;
        opacity: 1;
        padding-top: 3px;
        user-select: none;
        transition: all 350ms;
    }

    .admin-nav-button-text-hide{
        opacity: 0 !important;
        transition: all 250ms !important;
    }

    .admin-navigation-button:hover i{
        color: orange;
        transition: all 200ms;
    }

    .admin-navigation-button:hover{
        background-color: #FEF9E7;
    }

    #admin-logout-button{
        margin-top: 330px;
    }

    .admin-nav-button-clicked{
        background-color: #F8C471 !important;
    }

    .admin-nav-button-clicked i,
    .admin-nav-button-clicked div{
        color: #fff !important;
    }
</style>