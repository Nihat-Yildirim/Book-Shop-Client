import appAxios from "@/utils/appAxios";

const DistrictService = {
    async addDistrict(addedDistrict){
        const result = await appAxios.post("Districts/AddDistrict",null,{
            params:{
                ProvinceId : addedDistrict.provinceId,
                Name : addedDistrict.name
            }
        });
        return result.data;
    },

    async updateDistrict(updatedDistrict){
        const result = await appAxios.put("Districts/UpdateDistrict",null,{
            params:{
                DistrictId : updatedDistrict.districtId,
                Name : updatedDistrict.name
            }
        });
        return result.data;
    },

    async deleteDistrict(deletedDistrictId){
        const result = await appAxios.delete("Districts/DeleteDistrict",{
            params:{
                Id : deletedDistrictId
            }
        });
        return result.data;
    },

    async getAllDistrict(){
        const result = await appAxios.get("Districts/GetAllDistrict");
        return result.data;
    },

    async getDistrictById(districtId){
        const result = await appAxios.get(`Districts/GetDistrictById?Id=${districtId}`);
        return result.data;
    },
    
    async getDistrictByProvinceId(provinceId){
        const result = await appAxios.get(`Districts/GetDistrictsByProvinceId?ProvinceId=${provinceId}`);
        return result.data;
    }
}

export default DistrictService;