import appAxios from "@/utils/appAxios";

const ProvinceService = {
    async addProvince(addedProvince){
        const result =await appAxios.post("Provinces/AddProvince",null,{
            params:{
                Name : addedProvince.name
            }
        });
        return result.data;
    },

    async updateProvince(updatedProvince){
        const result = await appAxios.put("Provinces/UpdateProvince",null,{
            params:{
                ProvinceId : updatedProvince.provinceId,
                Name : updatedProvince.name
            }
        });
        return result.data;
    },

    async deleteProvince(deletedProvinceId){
        const result = await appAxios.delete("Provinces/DeleteProvince",{
            params : {
                Id : deletedProvinceId
            }
        });
        return result.data;
    },

    async getAll(){
        const result = await appAxios.get("Provinces/GetAll");
        return result.data;
    },

    async getProvinceById(provinceId){
        const result = await appAxios.get(`Provinces/GetProvinceById?Id=${provinceId}`);
        return result.data;
    }
}

export default ProvinceService;