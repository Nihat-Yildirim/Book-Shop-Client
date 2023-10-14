<template>
    <HeaderComponent/>
    <div id="login-page-container">
        <div id="login-container">
            <div id="login-container-name">Giriş Yap</div>
            <div id="login-inputs">
                <div :class="{'login-input-error' : invalidLoginUserMail}"  class="login-input-container" id="login-input-user-mail">
                    <span>E-Posta Adresi</span> 
                    <input v-model="loginUserMail" type="email">   
                </div>
                <div :class="{'login-input-error' : invalidLoginUserPassword}" class="login-input-container" id="login-input-user-password">
                    <span>Şifre</span>
                    <input v-model="loginUserPassword" type="password">
                </div>
            </div>
            <div id="login-button">
                <button @click="login">Giriş Yap</button>
            </div>
            <div id="no-have-any-account">
                <span>Herhangi bir hesabınız yok mu?</span>
                <span @click="navigateTo('RegisterPage')">Kaydol</span>
            </div>
        </div>
    </div>
</template>

<script>
import HeaderComponent from '@/pages/user/components/HeaderComponent';
import { mapActions,mapGetters } from 'vuex';

export default{
    data(){
        return{
            invalidLoginUserMail : false,
            invalidLoginUserPassword : false,
            loginUserMail : "",
            loginUserPassword : "",
        }
    },

    components:{
        HeaderComponent
    },

    computed:{
        ...mapGetters({
            getLoginResult : "AuthModule/_getLoginSuccessResult"
        })        
    },

    methods:{
        ...mapActions({
            loginAction : "AuthModule/login",
        }),
        navigateTo(pageName){
            this.$router.push({
                name : pageName,
            });
        },
        loginUserMailValidator(){
            if(this.loginUserMail == null || this.loginUserMail.length < 15 || this.loginUserMail > 100){
                this.invalidLoginUserMail = true;
                return;
            }

            if(!this.loginUserMail.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)){
                this.invalidUserMail = true;
                return;
            }

            this.invalidLoginUserMail = false;
        },
        loginUserPasswordValidator(){
            if(this.loginUserPassword.length < 6 || this.loginUserPassword.length > 15 || this.loginUserPassword == null){
                this.invalidLoginUserPassword = true;
                return;
            }

            this.invalidLoginUserPassword = false;
        },
        login(){
            this.loginUserMailValidator();
            this.loginUserPasswordValidator();

            if(!this.getLoginResult)
                this.loginAction({
                    mail : this.loginUserMail,
                    password : this.loginUserPassword
                });
        }
    },

    watch:{
        getLoginResult(newValue,oldValue){
            if(newValue == true)
             this.navigateTo("HomePage");

            if(newValue == false){
                this.invalidLoginUserMail = false;
                this.invalidLoginUserPassword = false;
            }
        }
    }
}
</script>

<style>
    #login-page-container{
        height: 100%;
        width: 100%;
        min-width: 1510px;
        padding: 0px 9% 0 9%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    #login-container{
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

    #login-container-name{
        font-size: 35px;
        font-weight: 400;
        height: 60px;
        color: orange;
        width: 100%;
        border-bottom: 1px solid #D5DBDB;
        margin-bottom: 20px;
    }

    #login-inputs{
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 45%;
        border-bottom: 1px solid #D5DBDB;
    }

    .login-input-container{
        position: relative;
        border-radius: 4px;
        border: 1.5px solid #D5DBDB;
        background-color: #F2F3F4;
        width: 100%;
        height: 47px;
        margin-bottom: 25px;
    }

    .login-input-container span{
        position: absolute;
        display: block;
        top: -10px;
        left: 15px;
        background-color: #f8f9f9;
        border-radius: 5px;
        color:#F5B041 ;
        user-select: none;
    }

    .login-input-container input{
        border-radius: 4px;
        outline: none;
        border: none;
        background-color: #F2F3F4;
        height: 100%;
        width: 100%;
        padding: 10px;
        font-size: 18px;
        color: #273746;
    }

    #login-button{
        width: 100%;
        height: 70px;
        display: flex;
        justify-content: center;
        align-items: center;
        padding-top: 10px;
        margin-bottom: 5px;
    }

    #login-button button{
        width: 100%;
        height: 50px;
        cursor: pointer;
        border-radius: 5px;
        background-color: orange;
        outline: none;
        border: 2px solid #E67E22;
        font-size: 20px;
        color: #fff;
        opacity: 1;
        transition: 200ms all;
    }

    #login-button button:hover{
        opacity: 0.8;
        transition: 200ms all;
    }

    #no-have-any-account{
        display: flex;
        justify-content: left;
        align-items: center;
        width: 100%;
        height: 35px;
    }

    #no-have-any-account span:first-child{
        margin-right: 8px;
        color:#2C3E50 ;
        font-size: 16px;
    }

    #no-have-any-account span:last-child{
        cursor: pointer;
        font-weight: 500;
        color: orange;
    }

    #no-have-any-account span:last-child:hover{
        border-bottom: 2px solid orange;
    }

    .login-input-error{
        border: 2px solid #E74C3C;
    }
</style>