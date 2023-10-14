import appAxios from "@/utils/appAxios";

const UserService = {
    async addUserAvatar(params){
        var result = await appAxios.post("Users/AddUserAvatar",
        {
            UserId : params.userId,
            UserAvatar : params.userAvatar
        },
        {
            headers : {'Content-Type': 'multipart/form-data'}
        });
        return result.data;
    },

    async deleteUserAvatar(userId){
        var result = await appAxios.delete(`Users/DeleteUserAvatar?UserId=${userId}`);
        return result.data;
    },

    async updateUserAvatar(params){
        var result = await appAxios.put("Users/UpdateUserAvatar",
        {
            UserId : params.userId,
            UserAvatar : params.userAvatar
        },
        {
            headers : {'Content-Type': 'multipart/form-data'}
        });

        return  result.data;
    },

    async updateUserProfile(params){
        var result = await appAxios.put("Users",null,
        {
            params:{
                Id : params.id,
                Name : params.name,
                LastName : params.lastName
            }
        });
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