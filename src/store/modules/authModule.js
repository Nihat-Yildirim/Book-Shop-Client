import AuthenticationService from "@/services/authenticationService";
import UserService from "@/services/userService";

const AuthModule = {
    namespaced : true,

    state:{
        registeredUserEmail : "",
        isRefreshTokenLoginExecuted : false,
        updatePasswordSuccessResult : false,
        userRegisterSuccesResult : false,
        verifyMailComfirmCodeSuccessResult : false,
        loginSuccessResult:false,
        refreshToken : null,
        accessToken : null,
        userProfile : null,
        userId: 0,
        isAdmin: false,
    },

    getters:{
        _getIsAuthenticate : (state) => {
            if(state.accessToken == null || state.refreshToken == null)
                return false;

            const accessTokenExpiration = new Date(state.accessToken.expiration);
            const refreshTokenExpiration = new Date(state.refreshToken.expiration);
            const date = new Date();

            if(accessTokenExpiration > date)
                return true;

            if(accessTokenExpiration< date && refreshTokenExpiration > date)
                return true;

            if(refreshTokenExpiration < date)
                return false;
        },
        _getUserRegisterSuccesResult : (state) => state.userRegisterSuccesResult,
        _getVerifyMailComfirmCodeSuccessResult : (state) => state.verifyMailComfirmCodeSuccessResult,
        _getUserRegisterMessageResult : (state) => state.userRegisterMessageResult,
        _getUpdatePasswordSuccessResult : (state) => state.updatePasswordSuccessResult,
        _getRegisteredUserMail : (state) => state.registeredUserEmail,
        _getLoginSuccessResult : (state) => state.loginSuccessResult,
        _getUserProfile : (state) => state.userProfile,
        _getUserId : (state) => state.userId,
        _getIsAdmin : (state) => state.isAdmin,
    },

    mutations:{
        setIsRefreshTokenLoginExecuted : (state,value) => state.isRefreshTokenLoginExecuted = value,
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
        setIsAdmin : (state,isAdmin) => state.isAdmin = isAdmin,
        clearUserAccountDatas(state){
            state.userId = null;
            state.refreshToken = null;
            state.accessToken = null;
            state.userProfile = null;
            state.loginSuccessResult = false;
            state.userRegisterSuccesResult = false;
            state.registeredUserEmail = "";
        }
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
                context.commit('setIsAdmin',response.data.isAdmin);
                context.commit('setUserId',response.data.userId);
                context.commit('setRefreshToken',response.data.token.refreshToken);
                context.commit('setAccessToken',response.data.token.accessToken);
                context.commit('setLoginSuccessResult',response.success);
            })
            .catch(error => console.log(error));
        },
        async refreshTokenLogin(context){
            if(!context.state.isRefreshTokenLoginExecuted){
                context.commit('setIsRefreshTokenLoginExecuted',true);
                await AuthenticationService.refreshTokenLogin({
                    userId : context.state.userId,
                    refreshToken : context.state.refreshToken.token
                })
                .then(response => {
                    context.commit('setRefreshToken',response.data.token.refreshToken);
                    context.commit('setAccessToken',response.data.token.accessToken);
                    context.commit('setIsRefreshTokenLoginExecuted',false);
                    console.log("Veri geldi");
                })
                .catch(error =>{    
                    console.log(error);
                    context.commit('setIsRefreshTokenLoginExecuted',false);
                })
            }
        },
        async updatePassword(context,params){
            context.commit('setUpdatePasswordSuccessResult',false);
            await AuthenticationService.updatePassword(params)
            .then(response => context.commit('setUpdatePasswordSuccessResult',response.success))
            .catch(error => console.log(error));
        },
    }
}

export default AuthModule;