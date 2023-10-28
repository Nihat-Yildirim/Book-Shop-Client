<template>
    <HeaderComponent/>
    <div id="mail-comfirm-page-container">
        <div id="mail-comfirm-container">
            <div id="mail-comfirm-container-name">Mail Doğrulama</div>
            <div id="mail-comfirm-code-content">
                <input v-model="mailComfirmCode" :class="{'mail-comfirm-code-input-error' : invalidMailComfirmCode}" id="mail-comfirm-code-input" type="text"/>
                <div @click="newMailComfirmCode" id="mail-comfirm-code-contant-new-code">{{ newMailComfirmCodeText }}</div>
            </div>
            <div id="mail-comfirm-code-button-container">
                <button @click="verify">Doğrula</button>
            </div>
            <div id="mail-comfirm-code-new-register">
                <span @click="navigateTo('RegisterPage')">Kaydolmayı tekrar dene</span>
            </div>
        </div>
    </div>
</template>

<script>
import HeaderComponent from '@/pages/user/components/HeaderComponent';
import { mapGetters , mapActions } from 'vuex';

export default {
    data(){
        return{
            waitTime : 0,
            invalidMailComfirmCode : false,
            newMailComfirmCodeText : "Yeni Kod",
            mailComfirmCode : "",
            verifyMailComfirmCodeButtonClick : false,
        }
    },

    components:{
        HeaderComponent
    },

    computed:{
        ...mapGetters({
            getRegisteredUserMail : "AuthModule/_getRegisteredUserMail",
            getVerifyMailComfirmCodeSuccessResult : "AuthModule/_getVerifyMailComfirmCodeSuccessResult",
            getUserId : "AuthModule/_getUserId",
        }),
    },

    methods:{
        ...mapActions({
            newMailComfirmCodeAction : "AuthModule/newMailComfirmCode",
            verifyMailComfirmCode : "AuthModule/verifyMailComfirmCode"
        }),
        navigateTo(pageName){
            this.$router.push({
                name : pageName,
            });
        },
        waitNewMailComfirmCodeCreate(){
            if(this.waitTime == 0){
                let waitMailComfirmCode = setInterval(() => {
                this.waitTime++;
                this.newMailComfirmCodeText = this.waitTime.toString();
                if(this.waitTime == 30){
                    this.newMailComfirmCodeText = "Yeni Kod";
                    this.waitTime = 0;
                    clearInterval(waitMailComfirmCode);
                }},1000);
            }
        },
        mailComfirmCodeValidator(){
            if(this.mailComfirmCode.length < 6){
                this.invalidMailComfirmCode= true;
                return;
            }

            if(Number(this.mailComfirmCode) != this.mailComfirmCode){
                this.invalidMailComfirmCode= true;
                return;
            }

            this.invalidMailComfirmCode = false;
        },
        newMailComfirmCode(){
            this.waitNewMailComfirmCodeCreate();
            if(this.getRegisteredUserMail != null && this.waitTime == 0)
                this.newMailComfirmCodeAction(this.getRegisteredUserMail);
        },
        verify(){
            this.mailComfirmCodeValidator();
            
            if(!this.verifyMailComfirmCodeButtonClick){
                this.verifyMailComfirmCode({
                    mail : this.getRegisteredUserMail,
                    code : this.mailComfirmCode
                });
                this.verifyMailComfirmCodeButtonClick = true;
            }
        }
    },

    watch:{
        mailComfirmCode(){
            if(this.mailComfirmCode.length > 6)
                this.invalidMailComfirmCode = true;
            if(this.mailComfirmCode.length <= 6)
                this.invalidMailComfirmCode = false;
        },

        getVerifyMailComfirmCodeSuccessResult(){
            if(this.getVerifyMailComfirmCodeSuccessResult)
                this.navigateTo("HomePage");

            if(!this.getVerifyMailComfirmCodeSuccessResult)
                this.verifyMailComfirmCodeButtonClick = false;    
        }
    }
}
</script>

<style>
    #mail-comfirm-page-container{
        height: 100%;
        width: 100%;
        min-width: 1510px;
        padding: 0px 9% 0 9%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    #mail-comfirm-container{
        padding: 35px 70px;
        width:50%;
        height: 420px;
        border: 2px solid #D5DBDB;
        border-radius: 5px;
        background-color: #f8f9f9;
        box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
        display: flex;
        flex-direction: column;
        justify-content: start;
        align-items: start;
    }

    #mail-comfirm-container-name{
        font-size: 35px;
        font-weight: 400;
        height: 60px;
        color: orange;
        width: 100%;
        border-bottom: 1px solid #D5DBDB;
        margin-bottom: 20px;
    }

    #mail-comfirm-code-content{
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        width: 100%;
        height: 150px;
        border-bottom: 1px solid #D5DBDB;
    }

    #mail-comfirm-code-contant-new-code{
        user-select: none;
        padding-top: 1px;
        font-size: 14px;
        border-radius: 5px;
        height: 25px;
        text-align: center;
        width: 80px;
        cursor: pointer;
        position: absolute;
        right: 3px;
        bottom: 6px;
        background-color: #229954;
        border: 2px solid #196F3D ;
        color: #fff;
        opacity: 1;
        transition: all 200ms;
    }

    #mail-comfirm-code-contant-new-code:hover{
        opacity: 0.9;
        transition: all 200ms;
    }

    #mail-comfirm-code-input{
        text-align: center;
        font-size: 25px;
        width: 250px;
        height: 50px;
        border-radius: 4px;
        outline: none;
        border: 1.5px solid #D5DBDB;
        background-color: #F2F3F4;
        color: #273746;
    }

    .mail-comfirm-code-input-error{
        border: 1.5px solid #E74C3C !important;
    }

    #mail-comfirm-code-button-container{
        width: 100%;
        height: 70px;
        display: flex;
        justify-content: center;
        align-items: center;
        padding-top: 10px;
        margin-bottom: 5px;
    }

    #mail-comfirm-code-button-container button{
        width: 100%;
        height: 50px;
        cursor: pointer;
        border-radius: 5px;
        background-color: #2E86C1;
        outline: none;
        border: 2px solid #21618C;
        font-size: 20px;
        color: #fff;
        opacity: 1;
        transition: 200ms all;
    }

    #mail-comfirm-code-button-container button:hover{
        opacity: 0.8;
        transition: all 200ms;
    }

    #mail-comfirm-code-new-register{
        margin-top: 10px;
    }

    #mail-comfirm-code-new-register span{
        cursor: pointer;
        user-select: none;
        font-size: 15px;
        color: orange;
    }

    #mail-comfirm-code-new-register span:hover{
        border-bottom: 2px solid orange;
    }
</style>