import appAxios from "@/utils/appAxios";

const NeighbourhoodService = {
    async addNeighbourhood(addedNeighbourhood){
        const result = await appAxios.post("Neighbourhoods/AddNeighbourhood",null,{
            params:{
                DistrictId : addedNeighbourhood.districtId,
                Name : addedNeighbourhood.name
            }
        });
        return result.data;
    },

    async updateNeighbourhood(updatedNeighbourhood){
        const result = await appAxios.post("Neighbourhoods/UpdateNeighbourhood",null,{
            params:{
                Id : updatedNeighbourhood.neighbourhoodId,
                Name : updatedNeighbourhood.name
            }
        });
        return result.data;
    },

    async deleteNeighbourhood(deletedNeighbourhoodId){
        const result = await appAxios.delete("Neighbourhoods/DeleteNeighbourhood",{
            params:{
                Id : deletedNeighbourhoodId
            }
        });
        return result.data
    },

    async getAllNeighbourhood(){
        const result = await appAxios.get("Neighbourhoods/GetAllNeighbourhood");
        return result.data;
    },

    async getNeighbourhoodById(neighbourhoodId){
        const result = await appAxios.get(`Neighbourhoods/GetNeighbourhoodById?Id=${neighbourhoodId}`);
        return result.data
    },

    async getNeighbourhoodByDistrictId(districtId){
        const result = await appAxios.get(`Neighbourhoods/GetNeighbourhoodByDistrictId?DistrictId=${districtId}`);
        return result.data;
    }
}

export default NeighbourhoodService;