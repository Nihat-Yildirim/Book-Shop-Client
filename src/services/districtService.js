import appAxios from "@/utils/appAxios";

const DistrictService = {
    async addDistrict(addedDistrict){
        const result = appAxios.post("Districts/AddDistrict",null,{
            params:{
                ProvinceId : addedDistrict.provinceId,
                Name : addedDistrict.name
            }
        });
        return result.data;
    },

    async updateDistrict(updatedDistrict){
        const result = appAxios.put("Districts/UpdateDistrict",null,{
            params:{
                DistrictId : updatedDistrict.districtId,
                Name : updatedDistrict.name
            }
        });
        return result.data;
    },

    async deleteDistrict(deletedDistrictId){
        const result = appAxios.delete("Districts/DeleteDistrict",{
            params:{
                Id : deletedDistrictId
            }
        });
        return result.data;
    },

    async getAllDistrict(){
        const result = appAxios.get("Districts/GetAllDistrict");
        return result.data;
    },

    async getDistrictById(districtId){
        const result = appAxios.get(`Districts/GetDistrictById?Id=${districtId}`);
        return result.data;
    },
    
    async getDistrictByProvinceId(provinceId){
        const result = appAxios.get(`Districts/GetDistrictsByProvinceId?ProvinceId=${provinceId}`);
        return result.data;
    }
}

export default DistrictService;