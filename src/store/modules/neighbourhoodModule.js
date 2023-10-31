import NeighbourhoodService from "@/services/neighbourhoodService";

const NeighbourhoodModule = {
    namespaced : true,

    state:{
        selectedNeighbourhoods : [],
    },

    getters:{
        _getSelectedNeighbourhoods : (state) => state.selectedNeighbourhoods,
    },

    mutations:{
        setSelectedNeighbourhoods : (state,neighbourhoods) => state.selectedNeighbourhoods = neighbourhoods,
    },

    actions:{
        async getNeighbourhoodByDistrictId(context,districtId){
            await NeighbourhoodService.getNeighbourhoodByDistrictId(districtId)
            .then(response => context.commit('setSelectedNeighbourhoods',response.data))
            .catch(error => console.log(error));
        }
    }
}

export default NeighbourhoodModule;