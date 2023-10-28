<template>
    <HeaderComponent/>
    <div id="register-page-container">
        <div id="register-container">
            <div id="register-container-name">Book Shop'a Kaydol</div>
            <div id="register">
                <div id="register-inputs">
                    <div :class="{'register-input-error' : invalidUserName}" class="register-input-container" id="register-input-user-name">
                        <span>Adı</span>
                        <input  v-model="userName" class="input" type="text">
                    </div>
                    <div :class="{'register-input-error' : invalidUserLastName}" class="register-input-container" id="register-input-user-lastname">
                        <span>Soyadı</span>
                        <input v-model="userLastName" type="text">
                    </div>
                    <div :class="{'register-input-error' : invalidUserMail}"  class="register-input-container" id="register-input-user-mail">
                        <span>E-Posta Adresi</span> 
                        <input v-model="userMail" type="email">   
                    </div>
                    <div :class="{'register-input-error' : invalidUserPassword}" class="register-input-container" id="register-input-user-password">
                        <span>Şifre</span>
                        <input v-model="userPassword" type="password">
                    </div>
                    <div :class="{'register-input-error' : invalidUserPasswordRepeat}" class="register-input-container" id="register-input-user-password-repeat">
                        <span>Şifre (Tekrar)</span>
                        <input v-model="userPasswordRepeat" type="password">
                    </div>  
                </div>
                <div id="register-button">
                    <button @click="register">Kaydol</button>
                </div>
                <div id="have-any-account">
                    <span>Hesabınız var mı ?</span>
                    <span @click="navigateTo('LoginPage')">Giriş Yapın</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions , mapGetters } from 'vuex';
import HeaderComponent from '@/pages/user/components/HeaderComponent';
export default{

    data(){
        return{
            userName : "",
            userLastName : "",
            userMail : "",
            userPassword : "",
            userPasswordRepeat: "",
            invalidUserName : false,
            invalidUserLastName : false,
            invalidUserMail : false,
            invalidUserPassword : false,
            invalidUserPasswordRepeat : false,
            registerButtonClicked : false,
        }
    },

    components:{
        HeaderComponent
    },

    methods:{
        ...mapActions({
            userRegister : "AuthModule/userRegister",  
        }),
        navigateTo(pageName){
            this.$router.push({
                name : pageName,
            });
        },
        userNameValidator(){
            if(this.userName.length < 3 || this.userName.length > 25 || this.userName == null){
                this.invalidUserName= true
                return;
            }
            this.invalidUserName = false
        },
        userLastNameValidator(){
            if(this.userLastName.length < 3 || this.userLastName.length > 50 || this.userLastName == null){
                this.invalidUserLastName= true
                return;
            }
            this.invalidUserLastName = false;
        },
        userMailValidator(){
            if(this.userMail.length < 15 || this.userMail.length > 100 || this.userMail == null){
                this.invalidUserMail= true;
                return;
            }

            if(!this.userMail.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)){
                this.invalidUserMail = true;
                return;
            }

            this.invalidUserMail = false;
        },
        userPasswordValidator(){
            if(this.userPassword.length < 6 || this.userPassword.length > 15 || this.userPassword == null){
                this.invalidUserPassword = true;
                return;
            }

            this.invalidUserPassword = false;
        },
        userPasswordRepeatValidator(){
            if(this.userPassword != this.userPasswordRepeat){
                this.invalidUserPasswordRepeat = true;
                return;
            }

            this.invalidUserPasswordRepeat = false;
        },
        register(){
            this.userNameValidator();
            this.userLastNameValidator();
            this.userMailValidator();
            this.userPasswordValidator();
            this.userPasswordRepeatValidator();

            if(this.invalidUserName || 
            this.invalidUserLastName ||
            this.invalidUserMail ||
            this.invalidUserPassword ||
            this.invalidUserPasswordRepeat)
                return;

            if(!this.registerButtonClicked){
                this.userRegister({
                firstName : this.userName,
                lastName : this.userLastName,
                email : this.userMail,
                password : this.userPassword,
                });

                this.registerButtonClicked = true;
            }
        }   
    },

    watch:{
        getUserRegisterSuccessResult(){
            if(this.getUserRegisterSuccessResult){
                this.$store.commit('AuthModule/setRegisteredUserEmail',this.userMail);
                this.navigateTo("MailComfirmPage");
            }

            if(!this.getUserRegisterSuccessResult){
                this.registerButtonClicked = false
            }
        },
    },

    computed:{
        ...mapGetters({
            getUserRegisterSuccessResult : "AuthModule/_getUserRegisterSuccesResult",
            getUserRegisterMessageResult : "AuthModule/_getUserRegisterMessageResult"
        })
    },
}
</script>

<style>
    #register-page-container{
        height: 100%;
        width: 100%;
        min-width: 1510px;
        padding: 0px 9% 0 9%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    #register-container{
        padding: 35px 70px;
        width:50%;
        height: 630px;
        border: 2px solid #D5DBDB;
        border-radius: 5px;
        background-color: #f8f9f9;
        box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
        display: flex;
        flex-direction: column;
        justify-content: start;
        align-items: start;
    }

    #register-container-name{
        font-size: 35px;
        font-weight: 400;
        height: 60px;
        color: orange;
        width: 100%;
        border-bottom: 1px solid #D5DBDB;
        margin-bottom: 20px;
    }

    #register{
        width: 100%;
        height: 69%;
    }

    #register-inputs{
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
        border-bottom: 1px solid #D5DBDB;
    }

    .register-input-container{
        position: relative;
        border-radius: 4px;
        border: 1.5px solid #D5DBDB;
        background-color: #F2F3F4;
        width: 100%;
        height: 47px;
        margin-bottom: 25px;
    }

    .register-input-container span{
        position: absolute;
        display: block;
        top: -10px;
        left: 15px;
        background-color: #f8f9f9;
        border-radius: 5px;
        color:#F5B041 ;
        user-select: none;
    }

    .register-input-container input{
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

    #register-button{
        width: 100%;
        height: 70px;
        display: flex;
        justify-content: center;
        align-items: center;
        padding-top: 10px;
        margin-bottom: 5px;
    }

    #register-button button{
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

    #register-button button:hover{
        opacity: 0.8;
        transition: 200ms all;
    }

    #have-any-account{
        display: flex;
        justify-content: left;
        align-items: center;
        width: 100%;
        height: 35px;
    }

    #have-any-account span:first-child{
        margin-right: 8px;
        color:#2C3E50 ;
        font-size: 16px;
    }

    #have-any-account span:last-child{
        cursor: pointer;
        font-weight: 500;
        color: orange;
    }

    #have-any-account span:last-child:hover{
        border-bottom: 2px solid orange;
    }

    .register-input-error{
        border: 2px solid #E74C3C;
    }
</style>