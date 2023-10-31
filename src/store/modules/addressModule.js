import AddressService from "@/services/addressService";

const AddressModule = {
    namespaced : true,

    state : {
        addAddressSuccessResult : false,
    },

    getters : {
        _getAddAddressSuccessResult : (state) => state.addAddressSuccessResult,
    },

    mutations : {
        setAddAddressSuccessResult : (state,successResult) => state.addAddressSuccessResult = successResult,
    },

    actions : {
        async addAddress(context,params){
            context.commit('setAddAddressSuccessResult',false);
            await AddressService.addAddress(params)
            .then(response => context.commit('setAddAddressSuccessResult',response.success))
            .catch(error => console.log(error));
        }
    }
}

export default AddressModule;