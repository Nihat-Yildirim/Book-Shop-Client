import AddressService from "@/services/addressService";

const AddressModule = {
    namespaced : true,

    state : {
        addAddressSuccessResult : false,
        userAddresses : [],
    },

    getters : {
        _getAddAddressSuccessResult : (state) => state.addAddressSuccessResult,
        _getUserAddresses : (state) => state.userAddresses,
    },

    mutations : {
        setAddAddressSuccessResult : (state,successResult) => state.addAddressSuccessResult = successResult,
        setUserAddresses : (state,addresses) => state.userAddresses = addresses,
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
        }
    }
}

export default AddressModule;