import DistrictService from "@/services/districtService";

const DistrictModule = {
    namespaced : true,

    state : {
        selectedDistricts : [],
    },

    getters : {
        _getSelectedDistricts : (state) => state.selectedDistricts,
    },

    mutations:{
        setSelectedDistricts : (state,districts) => state.selectedDistricts = districts,
    },

    actions:{
        async getDistrictByProvinceId(context,provinceId){
            await DistrictService.getDistrictByProvinceId(provinceId)
            .then(response => context.commit('setSelectedDistricts',response.data))
            .catch(error => console.log(error));
        }
    }
}

export default DistrictModule;