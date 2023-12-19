import appAxios from "@/utils/appAxios";

const FavoriteBookService = {
    async add(params){
        const result = await appAxios.post("FavoriteBooks/AddFavoriteBook",null,{
            params:{
                UserId : params.userId ,
                BookId : params.bookId
            }
        });

        return result.data;
    },

    async delete(id){
        const result = await appAxios.delete(`FavoriteBooks/DeleteFavoriteBook?Id=${id}`);
        return result.data;
    },

    async getUserFavoriteBooks(userId){
        const result = await appAxios.get(`FavoriteBooks/GetUserFavoriteBooks?UserId=${userId}`);
        return result.data;
    },

    async getSelectedBookFavoriteDatasForDays(bookId){
        const result = await appAxios.get(`FavoriteBooks/GetSelectedBookFavoriteDatasForDays?BookId=${bookId}`);
        return result.data;
    }
}

export default FavoriteBookService;