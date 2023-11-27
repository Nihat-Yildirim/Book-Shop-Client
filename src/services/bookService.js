import appAxios from "@/utils/appAxios";

const BookService = {
    async addBook(addedBook){
        const result = await appAxios.post("Books/AddBook",addedBook);
        return result.data;
    },

    async addBookPictures(addedBookPictures){
        const result = await appAxios.post("Books/AddBookPictures",addedBookPictures,{
            headers : {'Content-Type': 'multipart/form-data'}
        });
        return result.data;
    },

    async updateBook(updatedBook){
        const result = await appAxios.put("Books/UpdateBook",updatedBook);
        return result.data;
    },

    async updateBookAuthors(updatedBookAuthors){
        const result = await appAxios.put("Books/UpdateBookAuthors",updatedBookAuthors);
        return result.data;
    },

    async updateBookCategories(updatedBookCategories){
        const result = await appAxios.put("Books/UpdateBookCategories",updatedBookCategories);
        return result.data;
    },

    async updateBookPicture(updatedBookPictures){
        const result = await appAxios.put("Books/UpdateBookPicture",updatedBookPictures,{
            headers:{'Content-Type': 'multipart/form-data'}
        });
        return result.data;
    },

    async deleteBook(deletedBook){
        const result = await appAxios.delete("Books/DeleteBook",deletedBook);
        return result.data;
    },

    async deleteBookPicture(deletedBookPicture){
        const result = await appAxios.delete("Books/DeleteBookPicture",deletedBookPicture);
        return result.data;
    },

    async getAll(params){
        const result = await appAxios.get("Books/GetAllBook",{
            params : {
                Page : params.page,
                Size : params.size
            }
        });
        return result.data;
    },

    async getAllBookForAdmin(pagination){
        const result = await appAxios.get("Books/GetAllBookForAdmin",{
            params:{
                Page : pagination.page,
                Size : pagination.size
            }
        });
        return result.data;
    },

    async getById(bookId){
        const result = await appAxios.get(`Books/GetById`,{
            params:{
                Id : bookId
            }
        });
        return result.data;
    },

    async getByIdForAdmin(bookId){
        const result = await appAxios.get(`Books/GetByIdForAdmin=${bookId}`);
        return result.data;
    },

    async getBooksByNamePattern(params){
        const result = await appAxios.get(`Books/GetBooksByNamePattern?Page=${params.page}&Size=${params.size}&Pattern=${params.pattern}`);
        return result.data;
    },

    async getBooksByNamePatternForAdmin(pagination , pattern){
        const result = await appAxios.get(`Books/GetBooksByNamePatternForAdmin?Page=${pagination.Page}&Size=${pagination.Size}&Pattern=${pattern}`);
        return result.data;
    },

    async getBooksByPublisherId(params){
        const result = await appAxios.get(`Books/GetBooksByPublisherId`,{
            params:{
                Id : params.id,
                Page : params.page,
                Size : params.size
            }
        });
        return result.data;
    },

    async getBooksByAuthorId(params){
        const result = await appAxios.get(`Books/GetBooksByAuthorId`,{
            params:{
                Id : params.authorId,
                Page : params.page,
                Size : params.size
            }
        });
        return result.data;
    },

    async getBookByISBN(isbn){
        const result = await appAxios.get(`/Books/GetBookByISBN?ISBN=${isbn}`);
        return result.data;
    },

    async getBooksByLanguageId(params){
        const result = await appAxios.get("/Books/GetBooksByLanguageId",{
            params:{
                Id : params.languageId,
                Page : params.page,
                Size : params.Size
            }
        });
        return result.data;
    },

    async getBooksByCategoryId(params){
        const result = await appAxios.get("/Books/GetBooksByCategoryId",{
            params : {
                Id : params.categoryId,
                Page : params.page,
                Size : params.size
            }
        });
        return result.data;
    },

    async getBooksByCommentCount(params){
        const result = await appAxios.get("/Books/GetBooksByCommentCount",{
            params:{
                Page : params.page,
                Size : params.size
            }   
        });
        return result.data;
    },

    async getBooksByBasketCount(params){
        const result = await appAxios.get("/Books/GetBooksByBasketCount",{
            params : {
                Page : params.page,
                Size : params.size
            }
        });
        return result.data;
    },

    async getBooksByCategoryAndAuthorId(params){
        const result = await appAxios.get("/Books/GetBooksByCategoryAndAuthorId",{
            params: {
                CategoryIds : params.categoryIds,
                AuthorIds : params.authorIds,
            }
        });

        return result.data;
    }
}

export default BookService;