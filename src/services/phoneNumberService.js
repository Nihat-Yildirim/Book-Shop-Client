import appAxios from "@/utils/appAxios";

const PhoneNumberService = {
    async addPhoneNumber(addedPhoneNumber){
        var result = await appAxios.post("PhoneNumbers",addedPhoneNumber);
        return result.data;
    },

    async updatePhoneNumber(updatedPhoneNumber){
        var result = await appAxios.put("PhoneNumbers",updatedPhoneNumber);
        return result.data;
    },

    async deletePhoneNumber(deletedPhoneNumber){
        var result = await appAxios.delete(`PhoneNumbers?UserId=${deletedPhoneNumber.userId}&PhoneId=${deletedPhoneNumber.phoneId}`);
        return result.data;
    },

    async getAllPhoneNumbers(){
        var result = await appAxios.get("PhoneNumbers");
        return result.data;
    },

    async getUserPhoneNumbers(userId){
        var result = await appAxios.get(`PhoneNumbers/GetUserPhoneNumbers?UserId=${userId}`);
        return result.data;
    }
}

export default PhoneNumberService;