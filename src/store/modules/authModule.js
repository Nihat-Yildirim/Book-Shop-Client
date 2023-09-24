import AuthenticationService from "@/services/authenticationService";
import UserService from "@/services/userService";
import createPersistedState from "vuex-persistedstate";

const AuthModule = {
    plugins : [createPersistedState({
        key :"AuthModuleKey",
        paths : ["registeredUserEmail","refreshToken","accessToken","userId"],
        overwrite : true
    })],

    namespaced : true,

    state:{
        registeredUserEmail : "",
        userRegisterSuccesResult : false,
        userRegisterMessageResult : null,
        refreshToken : null,
        accessToken : null,
        userId: 0,
    },

    getters:{
        _getUserRegisterSuccesResult : (state) => state.userRegisterSuccesResult,
        _getUserRegisterMessageResult : (state) => state.userRegisterMessageResult,
        _getRegisteredUserMail : (state) => state.registeredUserEmail,
        _getUserId : (state) => state.userId
    },

    mutations:{
        setUserRegisterSuccesResult : (state , successResult) => state.userRegisterSuccesResult = successResult,
        setUserRegisterMessageResult : (state , messageResult) => state.userRegisterMessageResult = messageResult,
        setRegisteredUserEmail : (state,mail) => state.registeredUserEmail = mail,
        setRefreshToken : (state,refreshToken) => state.refreshToken = refreshToken,
        setAccessToken : (state,accessToken) => state.accessToken = accessToken,
        setUserId : (state,userId) => state.userId = userId,
    },

    actions:{
        async userRegister(context,registeredUser){
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
            await AuthenticationService.verifyMailComfirmCode(params)
            .then(response => {
                context.commit('setUserId',response.data.userId);
                context.commit('setAccessToken',response.data.token.accessToken);
                context.commit('setRefreshToken',response.data.token.refreshToken);
            })
            .catch(error => console.log(error));
        }
    }
}

export default AuthModule;