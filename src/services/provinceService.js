import appAxios from "@/utils/appAxios";

const ProvinceService = {
    async addProvince(addedProvince){
        const result = appAxios.post("Provinces/AddProvince",null,{
            params:{
                Name : addedProvince.name
            }
        });
        return result.data;
    },

    async updateProvince(updatedProvince){
        const result = appAxios.put("Provinces/UpdateProvince",null,{
            params:{
                ProvinceId : updatedProvince.provinceId,
                Name : updatedProvince.name
            }
        });
        return result.data;
    },

    async deleteProvince(deletedProvinceId){
        const result = appAxios.delete("Provinces/DeleteProvince",{
            params : {
                Id : deletedProvinceId
            }
        });
        return result.data;
    },

    async getAll(){
        const result = appAxios.get("Provinces/GetAll");
        return result.data;
    },

    async getProvinceById(provinceId){
        const result = appAxios.get(`Provinces/GetProvinceById?Id=${provinceId}`);
        return result.data;
    }
}

export default ProvinceService;