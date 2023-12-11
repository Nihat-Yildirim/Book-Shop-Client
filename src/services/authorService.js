import appAxios from "@/utils/appAxios";

const AuthorService = {
    async addAuthor(addedAuthor){
        var result  = await appAxios.post("Authors/AddAuthor",addedAuthor);
        return result.data;
    },

    async addAuthorPicture(addedAuthorPicture){
        var result = await appAxios.post("Authors/AddAuthorPicture",addedAuthorPicture,{
            headers : {'Content-Type': 'multipart/form-data'}
        });
        return result.data;
    },

    async deleteAuthor(authorId){
        var result = await appAxios.delete(`Authors/DeleteAuthor?AuthorId=${authorId}`);
        return result.data;
    },

    async updateAuthor(updatedAuthor){
        var result = await appAxios.put("Authors/UpdateAuthor",updatedAuthor);
        return result.data;
    },

    async updateAuthorPicture(updatedAuthorPicture){
        var result = await appAxios.put("Authors/UpdateAuthorPicture",updatedAuthorPicture,{
            headers : {'Content-Type': 'multipart/form-data'}
        });
        return result.data;
    },

    async deleteAuthorPicture(authorId){
        var result = await appAxios.delete(`Authors/DeleteAuthorPicture?AuthorId=${authorId}`);
        return result.data;
    },

    async getAllAuthor(){
        var result = await appAxios.get("Authors/GetAllAuthors");
        return result.data;
    },

    async getAuthorById(authorId){
        var result = await appAxios.get(`Authors/GetAuthorById?Id=${authorId}`);
        return result.data;
    },

    async getAllAuthorForAdmin(){
        var result = await appAxios.get("Authors/GetAllAuthorForAdmin");
        return result.data;
    },

    async getAuthorByIdForAdmin(authorId){
        var result = await appAxios.get(`Authors/GetAuthorByIdForAdmin?Id=${authorId}`);
        return result.data;
    },

    async getAuthorByPattern(pattern){
        var result = await appAxios.get(`Authors/GetAuthorByPattern?Pattern=${pattern}`);
        return result.data;
    },

    async getAuthorByPatternForAdmin(pattern){
        var result = await appAxios.get(`GetAuthorByPatternForAdmin?Pattern=${pattern}`);
        return result.data;
    },

    async getAllAuthorName(){
        var result = await appAxios.get('Authors/GetAllAuthorName');
        return result.data;
    }
}

export default AuthorService;