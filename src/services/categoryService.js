import appAxios from "@/utils/appAxios";

const CategoryService = {
    async addCategory(addedCategory){
        var result = await appAxios.post("Categories/AddCategory",addedCategory);
        return result.data;
    },

    async updateCategory(updatedCategory){
        var result = await appAxios.put("Categories/UpdateCategory",updatedCategory);
        return result.data;
    },

    async deleteCategory(categoryId){
        var result = await appAxios.delete(`Categories/DeleteCategory?CategoryId=${categoryId}`);
        return result.data;
    },

    async getAllCategory(){
        var result = await appAxios.get("Categories/GetAllCategories");
        return result.data;
    },

    async getCategoryById(categoryId){
        var result = await appAxios.get(`Categories/GetCategoryById?Id=${categoryId}`);
        return result.data;
    },

    async getCategoriesByParentId(parentId){
        var result = await appAxios.get(`Categories/GetCategoriesByParentId?ParentId=${parentId}`);
        return result.data;
    },

    async getParentCategories(){
        var result = await appAxios.get("Categories/GetParentCategories");
        return result.data;
    }
};

export default CategoryService;