import CategoryService from "@/services/categoryService";

const CategoryModule = {
    namespaced : true,

    state:{
        categories : [],
    },

    mutations:{
        setCategories(state,categories){
            state.categories = categories;
        }
    },

    getters:{
        _getAll : (state) => state.categories,
        _getParentCategories : (state) => state.categories.filter(category => category.parentId == 0),
    },

    actions:{
        async getAll(context){
            await CategoryService.getAllCategory()
            .then(responseCategories => context.commit('setCategories',responseCategories.data))
            .catch(error => console.log(error));
        },
    }
}

export default CategoryModule;