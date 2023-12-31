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
                PhoneNumber: addedAddress.phoneNumber,
                AddressTitle : addedAddress.addressTitle,
                Description : addedAddress.description,
            }
        });
        return result.data;
    },

    async updateAddress(updatedAddress){
        const result = await appAxios.put("Addresses",null,{
            params:{
                UserId : updatedAddress.userId,
                PhoneNumber: updatedAddress.phoneNumber,
                AddressId : updatedAddress.addressId,
                ProvinceId : updatedAddress.provinceId,
                DistrictId : updatedAddress.districtId,
                NeighbourhoodId : updatedAddress.neighbourhoodId,
                AddressTitle : updatedAddress.addressTitle,
                Description : updatedAddress.description,
                OpenAddress : updatedAddress.openAddress,
                Selected : updatedAddress.selected,
            }
        });
        return result.data;
    },

    async updateAddressSelectedValue(params){
        const result = await appAxios.put("Addresses/UpdateAddressSelectedValue",null,{
            params:{
                UserId : params.userId,
                AddressId : params.userId,
            }
        });
        return result.data;
    },

    async deleteAddress(params){
        const result = await appAxios.delete("Addresses",{
            params:{
                UserId : params.userId,
                AddressId : params.addressId
            }
        });
        return result.data;
    },

    async getAllAddress(){
        const result = await appAxios.get("Addresses");
        return result.data;
    },

    async getUserAddress(userId){
        const result = await appAxios.get(`Addresses/GetAllAddressByUserId?UserId=${userId}`);
        return result.data;
    },
    
    async getAddressByUserAndAddressId(params){
        const result = await appAxios.get("Addresses/GetAddressByUserAndAddressId",{
            params:{
                UserId : params.userId,
                AddressId : params.addressId
            }
        });
        return result.data;
    }
};

export default AddressService;