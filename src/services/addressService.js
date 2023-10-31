import appAxios from "@/utils/appAxios";

const AddressService = {
    async addAddress(addedAddress){
        const result = await appAxios.post("Addresses",null,{
            params:{
                UserId : addedAddress.userId,
                ProvinceId : addedAddress.provinceId,
                DistrictId : addedAddress.districtId,
                NeighbourhoodId : addedAddress.neighbourhoodId,
                OpenAddress : addedAddress.openAddress,
                AddressTitle : addedAddress.addressTitle,
                Description : addedAddress.description,
            }
        });
        return result.data;
    },

    async updateAddress(updatedAddress){
        const result = await appAxios.put("Addresses",updatedAddress);
        return result.data;
    },

    async deleteAddress(userId , addressId){
        const result = await appAxios.delete(`Addresses?UserId=${userId}&AddressId=${addressId}`);
        return result.data;
    },

    async getAllAddress(){
        const result = await appAxios.get("Addresses");
        return result.data;
    },

    async getUserAddress(userId){
        const result = await appAxios.get(`Addresses/GetAllAddressByUserId?UserId=${userId}`);
        return result.data;
    }
};

export default AddressService;