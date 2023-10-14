import UserService from "@/services/userService";

const UserModule = {
    namespaced : true,

    state : {
        addUserAvatarSuccessResult : false,
        updateUserAvatarSuccessResult : false,
        deleteUserAvatarSuccessResult : false,
        updateUserProfileSuccessResult : false,
    },

    getters:{
        _getAddUserAvatarSuccessResult : (state) => state.addUserAvatarSuccessResult,
        _getUpdateUserAvatarSuccessResult : (state) => state.updateUserAvatarSuccessResult,
        _getDeleteUserAvatarSuccessResult : (state) => state.deleteUserAvatarSuccessResult,
        _getUpdateUserProfileSuccessResult : (state) => state.updateUserProfileSuccessResult,
    },

    mutations:{
        setAddUserAvatarSuccessResult : (state,successResult) => state.addUserAvatarSuccessResult = successResult,
        setUpdateUserAvatarSuccessResult : (state,successResult) => state.updateUserAvatarSuccessResult = successResult,
        setDeleteUserAvatarSuccessResult : (state,successResult) => state.deleteUserAvatarSuccessResult = successResult,
        setUpdateUserProfileSuccessResult : (state,successResult) => state.updateUserProfileSuccessResult = successResult,
    },

    actions : {
        async addUserAvatar(context,params){
            context.commit('setAddUserAvatarSuccessResult',false)
            UserService.addUserAvatar(params)
            .then(response => context.commit('setAddUserAvatarSuccessResult',response.success))
            .catch(error => console.log(error));
        },
        async updateUserAvatar(context,params){
            context.commit('setUpdateUserAvatarSuccessResult',false);
            UserService.updateUserAvatar(params)
            .then(response => context.commit('setUpdateUserAvatarSuccessResult',response.success))
            .catch(error => console.log(error));
        },
        async deleteUserAvatar(context,params){
            context.commit('setDeleteUserAvatarSuccessResult',false)
            UserService.deleteUserAvatar(params)
            .then(response => context.commit('setDeleteUserAvatarSuccessResult',response.success))
            .catch(error => console.log(error));
        },
        async updateUserProfile(context,params){
            context.commit('setUpdateUserProfileSuccessResult',false);
            UserService.updateUserProfile(params)
            .then(response => context.commit('setUpdateUserProfileSuccessResult',response.success))
            .catch(error => console.log(error));
        }
    }
}

export default UserModule;