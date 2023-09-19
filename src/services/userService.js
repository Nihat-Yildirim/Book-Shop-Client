import appAxios from "@/utils/appAxios";

const UserService = {
    async addUserAvatar(addedUserAvatar){
        var result = await appAxios.post("Users/AddUserAvatar",addedUserAvatar,{
            headers : {'Content-Type': 'multipart/form-data'}
        });
        return result.data;
    },

    async deleteUserAvatar(userId){
        var result = await appAxios.delete(`Users/DeleteUserAvatar?UserId=${userId}`);
        return result.data;
    },

    async updateUserAvatar(updatedUserAvatar){
        var result = await appAxios.put("Users/UpdateUserAvatar",updatedUserAvatar,{
            headers : {'Content-Type': 'multipart/form-data'}
        });

        return  result.data;
    },

    async updateUserProfile(updatedUserProfile){
        var result = await appAxios.put("Users",updatedUserProfile);
        return result.data;
    },

    async getUserProfile(userId){
        var result = await appAxios.get(`Users/GetUserProfile?UserId=${userId}`);
        return result.data;
    },

    async getUsers(){
        var result = await appAxios.get("Users/GetUsers");
        return result.data;
    },

    async getUserByPattern(pattern){
        var result = await appAxios.get(`Users/GetUserByPattern?Pattern=${pattern}`);
        return result.data;
    }

}

export default UserService;