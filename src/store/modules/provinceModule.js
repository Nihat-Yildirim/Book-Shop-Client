import ProvinceService from "@/services/provinceService";

const ProvinceModule = {
    namespaced : true,

    state:{
        provinces : [],
    },

    getters:{
        _getProvinces : (state) => state.provinces,
    },

    mutations:{
        setProvinces : (state,provinces) => state.provinces = provinces,
    },

    actions:{
        async getAllProvince(context){
            await ProvinceService.getAll()
            .then(response => context.commit('setProvinces',response.data))
            .catch(error => console.log(error));
        }
    }
};

export default ProvinceModule;