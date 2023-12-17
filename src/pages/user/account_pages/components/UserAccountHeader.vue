<template>
    <div id="user-account-header-container">
        <div class="user-account-header-component" id="user-name">
            {{ getUserProfile.firstName+ ' ' + getUserProfile.lastName }}
        </div>
        <div class="user-account-header-component" id="user-information">
            <div class="header-component-title">
                Hesabım
            </div>
            <div @click="navigateTo('UserInformationPage')" :class="{'header-component-button-select' : userInformationButtonSelect}" class="header-component-button">
                <i class="bi bi-person"></i>
                <div>Kullanıcı Bilgilerim</div>
            </div>
            <div @click="navigateTo('UserAddressPage')" :class="{'header-component-button-select' : userAddressButtonSelect}" class="header-component-button">
                <i class="bi bi-pin-map"></i>
                <div>Adreslerim</div>
            </div>
            <div @click="navigateTo('UserFavoriteBookPage')" :class="{'header-component-button-select' : userFavoriteBookButtonSelect}" class="header-component-button">
                <i class="bi bi-heart"></i>
                <div>Favorilerim</div>
            </div>
        </div>
        <div class="user-account-header-component" id="user-order">
            <div class="header-component-title">
                Siparişlerim
            </div>
            <div  @click="navigateTo('UserOrderPage')" :class="{'header-component-button-select' : userAllOrderButtonSelect}" class="header-component-button">
                <i class="bi bi-box2"></i>
                <div>Tüm Siparişlerim</div>
            </div>
            <div @click="navigateTo('UserMessagePage')" :class="{'header-component-button-select' : userAllMessageButtonSelect}" class="header-component-button">
                <i class="bi bi-envelope"></i>
                <div>Mesajlarım</div>
            </div>
            <div @click="navigateTo('UserCommentPage')" :class="{'header-component-button-select' : userAllCommentButtonSelect}" class="header-component-button">
                <i class="bi bi-chat-dots"></i>
                <div>Değerlendirmelerim</div>
            </div>
        </div>
        <div class="user-account-header-component" id="user-order">
            <div class="header-component-title">
                Bana Özel
            </div>
            <div @click="navigateTo('UserVisitedBookPage')" :class="{'header-component-button-select' : userVisitedButtonSelect}" class="header-component-button">
                <i class="bi bi-clock"></i>
                <div>Önceden Gezdiklerim</div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default{
    props:{
        userInformationButtonSelect :{
            type : Boolean,
            default : false,
        },
        userAddressButtonSelect :{
            type : Boolean,
            default : false,
        },
        userAllOrderButtonSelect:{
            type : Boolean,
            default : false,
        },
        userAllMessageButtonSelect:{
            type : Boolean,
            default : false,
        },
        userAllCommentButtonSelect:{
            type : Boolean,
            default : false,
        },
        userVisitedButtonSelect:{
            type : Boolean,
            default : false,
        },
        userFavoriteBookButtonSelect:{
            type : Boolean,
            default : false,
        }
    },

    computed:{
        ...mapGetters({
            getUserProfile : "AuthModule/_getUserProfile"
        })
    },

    methods:{
        navigateTo(pageName){
            this.$router.push({
                name : pageName,
            });
        }
    }
}
</script>

<style>
    #user-account-header-container{
        display: flex;
        justify-content: flex-start;
        flex-direction: column;
    }

    .user-account-header-component{
        padding: 5px;
        width: 100%;
        background-color: #f8f9f9;
        border: 2px solid #D5DBDB;
        box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
        border-radius: 5px;
        margin-bottom: 15px;
    }

    /*Header Component Button Start*/
    .header-component-button{
        user-select: none;
        cursor: pointer;
        display: flex;
        padding-left: 3px;
        height: 30px;
        margin-bottom: 5px;
        align-items: center;
        border-radius: 3px;
        transition: all 150ms;
    }

    .header-component-button i{
        margin-right: 10px;
        font-size: 18px;
    }

    .header-component-button div{
        font-size: 15px;
    }

    .header-component-button .bi-person{
        margin-right: 7px;
        font-size: 22px;
    }

    .header-component-button:hover{
        background-color: #FAD7A0;
        transition: all 150ms;
    }

    .header-component-button-select{
        background-color: #F8C471 !important;
        color: #FFF !important;
    }
    /*Header Component Button End*/

    .header-component-title{
        display: flex;
        align-items: center;
        padding-left: 3px;
        color: orange;
        font-size: 19px;
        border-bottom: 1.5px solid #D5DBDB ;
        margin-bottom: 5px;
        height: 30px;
    }

    #user-name{
        padding-left: 10px;
        font-size: 20px;
        color: orange;
    }

    .bi-heart{
        margin-top: 2.5px;
    }
</style>