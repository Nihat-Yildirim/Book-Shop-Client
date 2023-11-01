import AddressService from "@/services/addressService";

const AddressModule = {
    namespaced : true,

    state : {
        userAddresses : [],
        addAddressSuccessResult : false,
        deleteAddressSuccessResult : false,
        updateAddressSuccessResult : false,
        updateAddressSelectedValueSuccessResult : false,
    },

    getters : {
        _getUserAddresses : (state) => state.userAddresses,
        _getAddAddressSuccessResult : (state) => state.addAddressSuccessResult,
        _getDeleteAddressSuccessResult : (state) => state.deleteAddressSuccessResult,
        _getUpdateAddressSuccessResult : (state) => state.updateAddressSuccessResult,
        _getUpdateAddressSelectedValueSuccessResult : (state) => state.updateAddressSelectedValueSuccessResult,
    },

    mutations : {
        setUserAddresses : (state,addresses) => state.userAddresses = addresses,
        setAddAddressSuccessResult : (state,successResult) => state.addAddressSuccessResult = successResult,
        setDeleteAddressSuccessResult : (state,successResult) => state.deleteAddressSuccessResult = successResult,
        setUpdateAddressSuccessResult : (state,successResult) => state.updateAddressSuccessResult = successResult,
        setUpdateAddressSelectedValueSuccessResult : (state,successResult) => state.updateAddressSelectedValueSuccessResult = successResult,
    },

    actions : {
        async addAddress(context,params){
            context.commit('setAddAddressSuccessResult',false);
            await AddressService.addAddress(params)
            .then(response => context.commit('setAddAddressSuccessResult',response.success))
            .catch(error => console.log(error));
        },
        async getUserAddresses(context,userId){
            await AddressService.getUserAddress(userId)
            .then(response => context.commit('setUserAddresses',response.data))
            .catch(error => console.log(error));
        },
        async deleteAddress(context,params){
            context.commit('setDeleteAddressSuccessResult',false);
            await AddressService.deleteAddress(params)
            .then(response => context.commit('setDeleteAddressSuccessResult',response.success))
            .catch(error => console.log(error));
        },
        async updateAddress(context,params){
            context.commit('setUpdateAddressSuccessResult',false);
            await AddressService.updateAddress(params)
            .then(response => context.commit('setUpdateAddressSuccessResult',response.success))
            .catch(error => console.log(error));
        },
        async updateAddressSelectedValue(context,params){
            context.commit('setUpdateAddressSelectedValueSuccessResult',false);
            await AddressService.updateAddressSelectedValue(params)
            .then(response => context.commit('setUpdateAddressSelectedValueSuccessResult',response.success))
            .catch(error => console.log(error));
        }
    }
}

export default AddressModule;