import AuthenticationService from "@/services/authenticationService";
import UserService from "@/services/userService";

const AuthModule = {
    namespaced : true,

    state:{
        registeredUserEmail : "",
        updatePasswordSuccessResult : false,
        userRegisterSuccesResult : false,
        verifyMailComfirmCodeSuccessResult : false,
        loginSuccessResult:false,
        refreshToken : null,
        accessToken : null,
        userProfile : null,
        userId: 0,
    },

    getters:{
        _getUserRegisterSuccesResult : (state) => state.userRegisterSuccesResult,
        _getVerifyMailComfirmCodeSuccessResult : (state) => state.verifyMailComfirmCodeSuccessResult,
        _getUserRegisterMessageResult : (state) => state.userRegisterMessageResult,
        _getUpdatePasswordSuccessResult : (state) => state.updatePasswordSuccessResult,
        _getRegisteredUserMail : (state) => state.registeredUserEmail,
        _getLoginSuccessResult : (state) => state.loginSuccessResult,
        _getUserProfile : (state) => state.userProfile,
        _getUserId : (state) => state.userId,
    },

    mutations:{
        setUserRegisterSuccesResult : (state , successResult) => state.userRegisterSuccesResult = successResult,
        setUserRegisterMessageResult : (state , messageResult) => state.userRegisterMessageResult = messageResult,
        setUpdatePasswordSuccessResult : (state,successResult) => state.updatePasswordSuccessResult = successResult,
        setVerifyMailComfirmCodeSuccessResult : (state,successResult) => state.verifyMailComfirmCodeSuccessResult = successResult,
        setRegisteredUserEmail : (state,mail) => state.registeredUserEmail = mail,
        setRefreshToken : (state,refreshToken) => state.refreshToken = refreshToken,
        setAccessToken : (state,accessToken) => state.accessToken = accessToken,
        setUserProfile : (state,userProfile) => state.userProfile = userProfile,
        setLoginSuccessResult : (state,successResult) => state.loginSuccessResult = successResult,
        setUserId : (state,userId) => state.userId = userId,
    },

    actions:{
        async userRegister(context,registeredUser){
            context.commit('setUserRegisterSuccesResult',false);
            await AuthenticationService.userRegister(registeredUser)
            .then(response =>{
                context.commit('setUserRegisterSuccesResult',response.success);
                context.commit('setUserRegisterMessageResult', response.message);
            })
            .catch(error => console.log(error));
        },
        async newMailComfirmCode(context,mail){
            await AuthenticationService.newMailComfirmCode(mail)
            .then(response => console.log(response.success))
            .catch(error => console.log(error));
        },
        async verifyMailComfirmCode(context,params){
            context.commit('setVerifyMailComfirmCodeSuccessResult',false);
            await AuthenticationService.verifyMailComfirmCode(params)
            .then(response => {
                context.commit('setUserId',response.data.userId);
                context.commit('setAccessToken',response.data.token.accessToken);
                context.commit('setRefreshToken',response.data.token.refreshToken);
                context.commit('setVerifyMailComfirmCodeSuccessResult',response.success);
            })
            .catch(error => console.log(error));
        },
        async getUserProfile(context,userId){
            await UserService.getUserProfile(userId)
            .then(response => context.commit('setUserProfile',response.data))
            .catch(error => console.log(error));
        },
        async login(context,loginParams){
            await AuthenticationService.login(loginParams)
            .then(response => {
                context.commit('setUserId',response.data.userId);
                context.commit('setRefreshToken',response.data.token.refreshToken);
                context.commit('setAccessToken',response.data.token.accessToken);
                context.commit('setLoginSuccessResult',response.success);
            })
            .catch(error => console.log(error));
        },
        async updatePassword(context,params){
            context.commit('setUpdatePasswordSuccessResult',false);
            await AuthenticationService.updatePassword(params)
            .then(response => context.commit('setUpdatePasswordSuccessResult',response.success))
            .catch(error => console.log(error));
        }
    }
}

export default AuthModule;