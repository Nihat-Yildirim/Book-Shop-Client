<template>
    <HeaderComponent/>
    <div id="user-information-page-container">
        <div id="user-information-left-container">
            <UserAccountHeader :userInformationButtonSelect="true"/>
        </div>
        <div id="user-information-right-container">
            <div id="user-information-container">
                <div id="user-information-container-left">
                    <div class="user-information-container-title">Üyelik Bilgilerim</div>
                    <div v-if="getUserProfile" id="information-left-container-content">
                        <div id="information-left-container-top-content">
                            <div id="information-left-container-top-content-left">
                                <img @mouseleave="pictureUpdateVisible = false" @mousemove="pictureUpdateVisible = true" :src="getUserPictureUrl(getUserProfile.pictureUrl)" alt="">
                                <label @mouseleave="pictureUpdateVisible = false" @mousemove="pictureUpdateVisible = true" v-if="pictureUpdateVisible" id="user-information-picture-update">
                                    <i class="bi bi-pencil"></i>
                                    <input @change="changeUserPicture" type="file" accept="image/png, image/jpeg" >
                                </label>
                                <div @click="deleteUserPicturePopUpVisible = true" v-if="getUserProfile.pictureUrl" id="delete-userPicture-container">
                                    <i class="bi bi-trash"></i>
                                </div>
                            </div>
                            <div id="information-left-container-top-content-right">
                                <div class="user-information-input">
                                    <span>Ad</span>
                                    <input :class="updateUserProfileFirstNameInputClassName" v-model="userFirstName" type="text">
                                </div>
                                <div class="user-information-input">
                                    <span>Soyad</span>
                                    <input :class="updateUserProfileLastNameInputClassName" v-model="userLastName" type="text">
                                </div>
                            </div>
                        </div>
                        <div id="information-left-container-bottom-content">
                            <div class="user-information-input">
                                <span>E-Mail</span>
                                <input style="color: black;" disabled v-model="userEmail" type="text">
                            </div>
                            <button :class="updateUserProfileButtonClassName" @click="updateUserProfile">Güncelle</button>
                        </div>
                    </div>
                </div>
                <div id="user-information-container-right">
                    <div class="user-information-container-title">Şifre Güncelleme</div>
                    <div id="information-container-right-content">
                        <div class="update-password-input-container">
                            <span>Eski Şifre</span>
                            <div :class="{'update-password-input-error-border' : oldPasswordInputBorder}" class="update-password-input">
                                <input v-model="oldPassword" :type="visibleOldPasswordValue ? 'text' : 'password'">
                                <i v-if="!visibleOldPasswordValue" @click="visibleOldPasswordValue = true" class="bi bi-eye"></i>
                                <i v-else="visibleOldPasswordValue" @click="visibleOldPasswordValue = false" class="bi bi-eye-slash"></i>
                            </div>
                        </div>
                        <div class="update-password-input-container">
                            <span>Yeni Şifre</span>
                            <div :class="{'update-password-input-error-border' : newPasswordInputBorder}" class="update-password-input">
                                <input v-model="newPassword" :type="visibleNewPasswordValue ? 'text' : 'password'">
                                <i v-if="!visibleNewPasswordValue" @click="visibleNewPasswordValue = true" class="bi bi-eye"></i>
                                <i v-else="visibleNewPasswordValue" @click="visibleNewPasswordValue = false" class="bi bi-eye-slash"></i>
                            </div>
                            <div id="update-password-desc">Şifreniz <span>en az 6 karakter</span> ve <span>en fazla 15 karakter</span> olmalı, harf ve rakam içermelidir.</div>
                        </div>
                        <div class="update-password-input-container">
                            <span>Yeni Şifre Tekrar</span>
                            <div :class="{'update-password-input-error-border' : newPasswordRepeatInputBorder}" class="update-password-input">
                                <input v-model="newPasswordRepeat" :type="visibleNewPasswordRepeatValue ? 'text' : 'password'">
                                <i v-if="!visibleNewPasswordRepeatValue" @click="visibleNewPasswordRepeatValue = true" class="bi bi-eye"></i>
                                <i v-else="visibleNewPasswordRepeatValue" @click="visibleNewPasswordRepeatValue = false" class="bi bi-eye-slash"></i>
                            </div>
                        </div>
                        <button :class="updatePasswordButtonClassName" @click="updatePassword" >Güncelle</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div v-if="updateUserPicturePopUpVisible" class="user-picture-popup">
        <div id="update-user-picture-popup-container">
            <div id="update-user-picture-popup-container-top">
                <i @click="updateUserPicturePopUpVisible = false" class="bi bi-x-lg"></i>
            </div>
            <div id="update-user-picture-popup-container-bottom">
                <div id="update-user-picture-popup-img-container">
                    <img :src="selectedUserPictureUrl" alt="">
                </div>
                <button :class="getButtonStyle()" @click="addUpdatePicture">{{getUserProfile.pictureUrl ? 'Güncelle' : 'Ekle'}}</button>
            </div>
        </div>
    </div>
    <div v-if="deleteUserPicturePopUpVisible" class="user-picture-popup">
        <div id="delete-user-picture-container">
            <div id="delete-user-picture-container-top">
                <i @click="deleteUserPicturePopUpVisible = false" class="bi bi-x-lg"></i>
            </div>
            <div id="delete-user-picture-container-bottom">
                <div>Silmek İstediğinden Eminmisin ?</div>
                <button @click="deleteUserAvatar">Sil</button>
            </div>
        </div>
    </div>
</template>

<script>
import HeaderComponent from '@/pages/user/components/HeaderComponent';
import UserAccountHeader from '@/pages/user/account_pages/components/UserAccountHeader';
import { mapGetters,mapActions } from 'vuex';

export default{
    data(){
        return{
            userFirstName : "",
            userLastName : "",
            userEmail : "",
            oldPassword : "",
            newPassword : "",
            newPasswordRepeat : "",
            selectedUserPictureFile : null,
            selectedUserPictureUrl : "",
            pictureUpdateVisible : false,
            updateUserPicturePopUpVisible : false,
            deleteUserPicturePopUpVisible : false,
            updateUserProfileButtonClassName :"update-user-profile-not-changed",
            updateUserProfileFirstNameInputClassName : "",
            updateUserProfileLastNameInputClassName : "",
            updatePasswordButtonClassName : "update-password-button-not-changed",
            oldPasswordInputBorder : false,
            newPasswordInputBorder : false,
            newPasswordRepeatInputBorder : false,
            visibleOldPasswordValue : false,
            visibleNewPasswordValue : false,
            visibleNewPasswordRepeatValue : false,
        }
    },

    computed:{
        ...mapGetters({
            getUserId : "AuthModule/_getUserId",
            getUserProfile : "AuthModule/_getUserProfile",
            getAddUserAvatarSuccessResult : "UserModule/_getAddUserAvatarSuccessResult",
            getUpdateUserAvatarSuccessResult : "UserModule/_getUpdateUserAvatarSuccessResult",
            getDeleteUserAvatarSuccessResult : "UserModule/_getDeleteUserAvatarSuccessResult",
            getUpdateUserProfileSuccessResult : "UserModule/_getUpdateUserProfileSuccessResult",
            getUpdatePasswordSuccessResult : "AuthModule/_getUpdatePasswordSuccessResult",
        }),
    },

    methods:{
        ...mapActions({
            addUserAvatarAction : "UserModule/addUserAvatar",
            updateUserAvatar : "UserModule/updateUserAvatar",
            deleteUserAvatarAction : "UserModule/deleteUserAvatar",
            getUserProfileAction : "AuthModule/getUserProfile",
            updateUserProfileAction : "UserModule/updateUserProfile",
            updatePasswordAction : "AuthModule/updatePassword",
        }),
        getUserPictureUrl(pictureUrl){
            if(pictureUrl==null)
                return require("@/assets/no-user-image.jpg");
            return pictureUrl;
        },
        changeUserPicture(event){
            if(event){
                this.selectedUserPictureFile = event.srcElement.files[0];
                this.updateUserPicturePopUpVisible = true;
            }
        },
        addUpdatePicture(){
            if(this.getUserProfile.pictureUrl == null)
                this.addUserAvatar();

            if(this.getUserProfile.pictureUrl != null)
                this.updateUserPicture();
        },
        updateUserPicture(){
            if(this.selectedUserPictureFile != null && this.getUserId != 0){
                this.updateUserAvatar({
                    userId : this.getUserId,
                    userAvatar : this.selectedUserPictureFile
                })
            }
        },
        addUserAvatar(){
            if(this.selectedUserPictureFile != null && this.getUserId != 0){
                this.addUserAvatarAction({
                    userId : this.getUserId,
                    userAvatar : this.selectedUserPictureFile
                })
            }
        },
        deleteUserAvatar(){
            if(this.getUserId != 0)
                this.deleteUserAvatarAction(this.getUserId);
        },
        getButtonStyle(){
            if(this.getUserProfile.pictureUrl == null)
                return "add-user-picture-button"

            if(this.getUserProfile.pictureUrl != null)
                return "update-user-picture-button"
        },
        userFirstNameValidator(){
            if(this.userFirstName == "" ||
            this.userFirstName == null ||
            this.userFirstName.length < 3 ||
            this.userFirstName.length > 25){
                this.updateUserProfileFirstNameInputClassName = "user-information-error-input-border";
                console.log(this.updateUserProfileFirstNameInputClassName)
                return false;
            }

            this.updateUserProfileFirstNameInputClassName = "";
            return true;
        },
        userLastNameValidator(){
            if(this.userLastName == "" ||
            this.userLastName == null ||
            this.userLastName.length < 2 ||
            this.userLastName.length > 50){
                this.updateUserProfileLastNameInputClassName = "user-information-error-input-border"
                return false;
            }

            this.updateUserProfileLastNameInputClassName = "";
            return true;
        },
        updateUserProfile(){
            const firstNameValidatorResult = this.userFirstNameValidator();
            const lasttNameValidatorResult = this.userLastNameValidator();

            if(firstNameValidatorResult == false || lasttNameValidatorResult == false)
                return;

            this.updateUserProfileAction({
                id  : this.getUserId,
                name : this.userFirstName,
                lastName : this.userLastName
            });
        },
        oldPasswordValidator(){
            if(this.oldPassword == "" || 
            this.oldPassword == null ||
            this.oldPassword.length < 6 ||
            this.oldPassword.length > 15){
                this.oldPasswordInputBorder = true;
                return false;
            }
            
            this.oldPasswordInputBorder = false;
            return true;    
        },
        newPasswordValidator(){
            if(this.newPassword == "" || 
            this.newPassword == null ||
            this.newPassword.length < 6 ||
            this.newPassword.length > 15){
                this.newPasswordInputBorder = true;
                return false;
            }
            
            this.newPasswordInputBorder = false;
            return true; 
        },
        newPasswordRepeatValidator(){
            if(this.newPasswordRepeat == "" || 
            this.newPasswordRepeat == null ||
            this.newPasswordRepeat.length < 6 ||
            this.newPasswordRepeat.length > 15){
                this.newPasswordRepeatInputBorder = true;
                return false;
            }

            if(this.newPassword != this.newPasswordRepeat){
                this.newPasswordRepeatInputBorder = true;
                this.newPasswordInputBorder = true;
                return false;
            }
            
            this.newPasswordRepeatInputBorder = false;
            return true; 
        },
        updatePassword(){
            const isValidOldPassword =  this.oldPasswordValidator();
            const isValidNewPassword = this.newPasswordValidator();
            const isValidNewPasswordRepeat = this.newPasswordRepeatValidator();

            if(!isValidOldPassword || !isValidNewPassword || !isValidNewPasswordRepeat)
                return;
            
            this.updatePasswordAction({
                userId : this.getUserId,
                oldPassword : this.oldPassword, 
                newPassword : this.newPassword,
            });
        }
    },

    components:{
        HeaderComponent,
        UserAccountHeader,
    },

    mounted(){
        if(this.getUserProfile){
            this.userFirstName = this.getUserProfile.firstName;
            this.userLastName = this.getUserProfile.lastName;
            this.userEmail = this.getUserProfile.email;
        }
    },

    watch:{
        selectedUserPictureFile(){
            if(this.selectedUserPictureFile != null)
                this.selectedUserPictureUrl = URL.createObjectURL(this.selectedUserPictureFile);  

            if(this.selectedUserPictureFile == null)
                this.selectedUserPictureUrl = require("@/assets/no-user-image.jpg");
        },
        getUpdateUserAvatarSuccessResult(){
            if(this.getUpdateUserAvatarSuccessResult == true){
                this.getUserProfileAction(this.getUserId);
                this.updateUserPicturePopUpVisible = false;
            }
        },
        getAddUserAvatarSuccessResult(){
            if(this.getAddUserAvatarSuccessResult == true){
                this.getUserProfileAction(this.getUserId);
                this.updateUserPicturePopUpVisible = false;
            }
        },
        getDeleteUserAvatarSuccessResult(){
            if(this.getDeleteUserAvatarSuccessResult == true){
                this.getUserProfileAction(this.getUserId);
                this.deleteUserPicturePopUpVisible = false;
            }
        },
        getUpdateUserProfileSuccessResult(){
            if(this.getUpdateUserProfileSuccessResult == true){
                this.getUserProfileAction(this.getUserId);
                this.updateUserProfileButtonClassName ="update-user-profile-not-changed";
            }
        },
        userFirstName(newValue,oldValue){
            if(newValue != oldValue && newValue != null)
                this.updateUserProfileButtonClassName = "update-user-profile-changed";

            if(newValue == this.getUserProfile.firstName)
                this.updateUserProfileButtonClassName = "update-user-profile-not-changed";
        },
        userLastName(newValue,oldValue){
            if(newValue != oldValue && newValue != null)
                this.updateUserProfileButtonClassName = "update-user-profile-changed";

            if(newValue == this.getUserProfile.lastName)
                this.updateUserProfileButtonClassName = "update-user-profile-not-changed";
        },
        oldPassword(){
            this.oldPassword = this.oldPassword.replace(/\s/g, '');
            if(this.oldPassword.length > 0)
                this.updatePasswordButtonClassName = "update-password-button-changed";

            if(this.oldPassword.length == 0)
                this.oldPasswordInputBorder = false;

            if(this.oldPassword.length == 0 && this.newPassword.length == 0 && this.newPasswordRepeat.length == 0)
                this.updatePasswordButtonClassName = "update-password-button-not-changed";     
        },
        newPassword(){
            this.newPassword = this.newPassword.replace(/\s/g,'');
            if(this.newPassword.length > 0)
                this.updatePasswordButtonClassName = "update-password-button-changed";

            if(this.newPassword.length == 0)
                this.newPasswordInputBorder = false;

            if(this.oldPassword.length == 0 && this.newPassword.length == 0 && this.newPasswordRepeat.length == 0)
                this.updatePasswordButtonClassName = "update-password-button-not-changed"; 
        },
        newPasswordRepeat(){
            this.newPasswordRepeat = this.newPasswordRepeat.replace(/\s/g,'');
            if(this.newPasswordRepeat.length > 0)
                this.updatePasswordButtonClassName = "update-password-button-changed";

            if(this.newPasswordRepeat.length == 0)
                this.newPasswordRepeatInputBorder = false;

            if(this.oldPassword.length == 0 && this.newPassword.length == 0 && this.newPasswordRepeat.length == 0)
                this.updatePasswordButtonClassName = "update-password-button-not-changed";     
        },
        getUpdatePasswordSuccessResult(){
            if(this.getUpdatePasswordSuccessResult){
                this.oldPassword = "";
                this.newPassword = "";
                this.newPasswordRepeat = "";
                this.oldPasswordInputBorder = false;
                this.newPasswordInputBorder = false;
                this.newPasswordRepeatInputBorder = false;
                this.updatePasswordButtonClassName = "update-password-button-not-changed"; 
            }
        }
    }
}
</script>

<style>
    #user-information-page-container{
        width: 100%;
        min-width: 1510px;
        padding: 50px 9% 0 9%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin-bottom: 50px;
        height: auto;
    }

    #user-information-left-container{
        width: 23%;
        margin-right: 20px;
    }

    #user-information-right-container{
        width: 76%;
        display: flex;
        flex-direction: column;
    }

    #user-information-container{
        display: flex;
        flex-direction: row;
        width: 100%;
        height: 469px;
        background-color: #f8f9f9;
        border: 2px solid #D5DBDB;
        box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
        border-radius: 5px;
    }

    /*User Information Left Container Start*/
    #user-information-container-left{
        padding: 5px;
        width: 50%;
        height: 100%;
        border-right: 1.6px solid #D5DBDB;
    }

    #information-left-container-content{
        display: flex;
        flex-direction: column;
    }

    #information-left-container-top-content{
        display: flex;
        flex-direction: row;
        margin-bottom: 10px;
    }

    #information-left-container-top-content-left{
        position: relative;
        height: 150px;
        width: 150px;
        margin-left: 5px;
        margin-right: 20px;
    }

    #information-left-container-top-content-left img{
        width: 100%;
        height: 100%;
        border-radius: 50%;
        border: 2px solid #D5DBDB;
        object-fit : cover;
    }

    #user-information-picture-update{
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        top: 0px;
        background-color: #D5DBDB;
        height: 150px;
        width: 150px;
        border-radius: 50%;
        opacity: 0.6;
    }

    #user-information-picture-update input{
        display: none;
    }

    #user-information-picture-update i{
        font-size: 25px;
    }

    #information-left-container-top-content-right{
        height: 150px;
        width: 280px;
        display: flex;
        flex-direction: column;
    }

    #information-left-container-bottom-content{
        padding-left: 3px;
        padding-right: 3px;
        display: flex;
        height: 250px;
        flex-direction: column;
        justify-content: space-between;
    }
    
    .update-user-profile-not-changed{
        height: 40px;
        border-radius: 5px;
        outline: none;
        border: 2px solid #D5DBDB;
        margin-bottom: 7px;
        font-size: 16px;
    }

    .update-user-profile-changed{
        height: 40px;
        border-radius: 5px;
        outline: none;
        background-color: orange;
        color: #fff;
        border: 1.6px solid #E67E22;
        margin-bottom: 7px;
        font-size: 16px;
        cursor: pointer;
        transition: all 250ms;
    }

    .update-user-profile-changed:hover{
        opacity: 0.8;
        transition: all 250ms;
    }

    #delete-userPicture-container{
        cursor: pointer;
        width: 26px;
        height: 26px;
        position: absolute;
        background-color: #E74C3C;
        border: 1px solid #CB4335;
        border-radius: 50%;
        color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        left: 115px;
        top: 125px;
    }

    /*User Information Left Container End*/

    /*User Information Input Start*/
    .user-information-input{
        display: flex;
        flex-direction: column;
        margin-bottom: 10px;
    }

    .user-information-input span{
        font-size: 17px;
        margin-bottom: 3px;
        color: orange;
    }

    .user-information-input input{
        border: 2px solid #D5DBDB;
        border-radius: 5px;
        padding-left: 10px;
        height: 40px;
        font-size: 18px;
        outline: none;
    }
    
    .user-information-error-input-border{
        border: 2px solid #E74C3C !important;
    }
    /*User Information Input End*/

    .user-picture-popup{
        top: 0;
        height: 715px;
        width: 1535px;
        background-color: rgba(213, 213, 213, 0.3);
        z-index: 200;
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    /* Update User Picture PopUp Start */
    #update-user-picture-popup-container{
        padding: 10px;
        width: 500px;
        height: 350px;
        background-color: #f8f9f9;
        border: 2px solid #D5DBDB;
        box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
        border-radius: 5px;
    }

    #update-user-picture-popup-container-top{
        display: flex;
        justify-content: right;
        margin-bottom: 20px;
    }

    #update-user-picture-popup-container-top i{
        font-size: 18px;
        font-weight: bold;
        cursor: pointer;
        color: grey;
    }

    #update-user-picture-popup-container-bottom{
        display: flex;
        flex-direction: column;
        justify-content: start;
        align-items: center;
        width: 100%;
        height: 285px;
    }

    .add-user-picture-button{
        width: 125px;
        height: 30px;
        cursor: pointer;
        border-radius: 5px;
        background-color: #27AE60;
        color: #fff;
        border: 1.6px solid #138D75;
        transition: all 250ms;
    }

    .update-user-picture-button{
        width: 125px;
        height: 30px;
        cursor: pointer;
        border-radius: 5px;
        background-color: orange;
        color: #fff;
        border: 1.6px solid #E67E22;
        transition: all 250ms;
    }

    #update-user-picture-popup-container-bottom button:hover{
        opacity: 0.8;
        transition: all 250ms;
    }

    #update-user-picture-popup-img-container{
        width: 100%;
        display: flex;
        justify-content: center;
        margin-bottom: 25px;
    }

    #update-user-picture-popup-img-container img{
        width: 220px;
        height: 220px;
        border: 2px solid #D5DBDB;
        object-fit: cover;
        border-radius: 50%;
    }
    /* Update User Picture PopUp End*/

    /* Delete User Picture PopUp Start */

    #delete-user-picture-container{
        background-color: #f8f9f9;
        border: 2px solid #D5DBDB;
        box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
        border-radius: 5px;
        width: 500px;
        height: 230px;
        padding: 10px;
    }

    #delete-user-picture-container-top{
        display: flex;
        justify-content: right;
        margin-bottom: 30px;
    }

    #delete-user-picture-container-top i{
        font-size: 18px;
        font-weight: bold;
        cursor: pointer;
        color: grey;
    }

    #delete-user-picture-container-bottom{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    #delete-user-picture-container-bottom div{
        font-size: 20px;
        margin-bottom: 50px;
    }

    #delete-user-picture-container-bottom button{
        width: 125px;
        height: 30px;
        cursor: pointer;
        border-radius: 5px;
        background-color: #E74C3C;
        color: #fff;
        border: 1.6px solid #C0392B;
        transition: all 250ms;
    }

    #delete-user-picture-container-bottom button:hover{
        opacity: 0.8;
        transition: all 250ms;
    }

    /* Delete User Picture PopUp End */

    .user-information-container-title{
        padding-top: 5px;
        padding-left: 5px;
        margin-bottom: 10px;
        height: 35px;
        font-size: 18px;
        color: orange;
    }

    /*User Information Right Container Start*/
    #user-information-container-right{
        padding: 5px;
        width: 50%;
        height: 100%;
    }

    #information-container-right-content{
        padding: 0 2px 2px 2px;
        display: flex;
        flex-direction: column;
    }

    .update-password-input-container{
        display: flex;
        flex-direction: column;
        width: 100%;
        margin-bottom: 10px;
    }

    #update-password-desc{
        margin-top: 3px;
        color: orange;
        font-size: 11.5px;
    }

    #update-password-desc span{
        font-size: 11.5px;
        font-weight: 700;
    }

    .update-password-input-container span{
        font-size: 17px;
        color: orange;
        margin-bottom: 4px;
    }

    .update-password-input{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        width: 100%;
        height: 40px;
        border: 2px solid #D5DBDB;
        border-radius: 5px;
    }

    .update-password-input-error-border{
        border: 2px solid #E74C3C !important;
    }

    .update-password-input input{
        border-radius: 5px;
        outline: none;
        border: none;
        font-size: 20px;
        padding-left: 10px;
        width: 100%;
    }

    .update-password-input i{
        text-align: center;
        font-size: 22px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        width: 35px;
        background-color: #fff;
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;
        color: grey;
    }

    .update-password-button-not-changed{
        margin-top: 115px;
        height: 40px;
        width: 100%;
        border-radius: 5px;
        outline: none;
        border: 2px solid #D5DBDB;
        margin-bottom: 5px;
        font-size: 16px;
    }

    .update-password-button-changed{
        font-size: 16px;
        margin-top: 115px;
        height: 40px;
        width: 100%;
        border-radius: 5px;
        cursor: pointer;
        outline: none;
        background-color: orange;
        color: #fff;
        border: 1.6px solid #E67E22;
        margin-bottom: 5px;
    }

    .update-password-button-changed:hover{
        opacity: 0.8;
        transition: all 250ms;
    }
    /*User Information Right Container End*/
</style>