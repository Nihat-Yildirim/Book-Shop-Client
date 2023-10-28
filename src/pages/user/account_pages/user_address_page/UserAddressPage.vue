<template>
    <HeaderComponent/>
    <div id="user-address-page-container">
        <div id="user-address-left-container">
            <UserAccountHeader :userAddressButtonSelect="true"/>
        </div>
        <div id="user-address-right-container">
            <div id="user-address-container">
                <div id="user-address-container-title">Adreslerim</div>
                <div id="user-address-content-container">
                    <div @click="addAddressButtonClick" id="user-address-add-button">+</div>
                </div>
            </div>
        </div>
    </div>
    <div v-if="addUpdateAddressPopUpVisibility" id="add-update-address-popup">
        <div id="add-update-address-container">
            <div id="add-update-address-title">
                <div>{{ addUpdateAddressPopUpTitle }}</div>
                <i @click="addUpdateAddressPopUpVisibility = false" class="bi bi-x-lg"></i>
            </div>
            <div id="add-update-address-content">
                <div id="add-update-address-content-top">
                    <div id="address-title-input">
                        <div id="input-title">Başlık</div>
                        <input type="text">
                    </div>
                    <div id="address-province-district-input">
                        <div class="address-dropdown-input" id="address-province-input">

                        </div>
                        <div class="address-dropdown-input" id="address-disctrict-input">

                        </div>
                    </div>
                </div>
                <div id="add-update-address-content-bottom">

                </div>
            </div>
        </div>
    </div>
</template>

<script>
import HeaderComponent from '@/pages/user/components/HeaderComponent';
import UserAccountHeader from '@/pages/user/account_pages/components/UserAccountHeader'

export default{
    data(){
        return{
            addUpdateAddressPopUpVisibility : false,
            addUpdateAddressPopUpTitle : "",
        }
    },
    methods:{
        addAddressButtonClick(){
            this.addUpdateAddressPopUpVisibility = true;
            this.addUpdateAddressPopUpTitle = "Adres Ekle"
        }
    },
    components:{
        HeaderComponent,
        UserAccountHeader,
    }
}
</script>

<style>
    #user-address-page-container{
        width: 100%;
        min-width: 1510px;
        padding: 50px 9% 0 9%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin-bottom: 50px;
        height: auto;
    }

    #user-address-left-container{
        width: 23%;
        margin-right: 20px;
    }

    #user-address-right-container{
        width: 76%;
    }

    #user-address-container{
        display: flex;
        flex-direction: column;
        padding: 10px;
        background-color: #f8f9f9;
        border: 2px solid #D5DBDB;
        box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
        border-radius: 5px;
        height: auto;
    }

    #user-address-container-title{
        padding-left: 2px;
        margin-bottom: 15px;
        height: 30px;
        font-size: 18px;
        color: orange;
        border-bottom: 2px solid #D5DBDB;
    }

    #user-address-content-container{
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
    }

    #user-address-add-button{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 150px;
        height: 150px;
        border: 2px solid #D5DBDB;
        user-select: none;
        border-radius: 10px;
        font-size: 40px;
        font-weight: 200;
        transition: all 500ms;
        cursor: pointer;
        color: #95A5A6;
    }

    #user-address-add-button:hover{
        box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
        color: orange;
        transition: all 500ms;
    }

    /* Add-Update Adress PopUp Start*/
    #add-update-address-popup{
        top: 0;
        position: absolute;
        width: 1535px;
        height: 100%;
        background-color: rgba(213, 213, 213, 0.3);
        display: flex;
        justify-content: center;
        align-items: center;
    }

    #add-update-address-container{
        padding: 10px;
        width: 750px;
        height: 500px;
        background-color: #f8f9f9;
        border: 2px solid #D5DBDB;
        box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
        border-radius: 5px;
    }

    #add-update-address-title{
        display: flex;
        justify-content: space-between;
        border-bottom: 1.6px solid #D5DBDB;
        height: 30px;
    }

    #add-update-address-title div{
        font-size: 19px;
        color: orange;
    }

    #add-update-address-title i{
        font-size: 18px;
        color: grey;
        cursor: pointer;
    }
    /* Add Adress PopUp End*/
</style>