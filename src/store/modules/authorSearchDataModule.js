import AuthorSearchDataService from "@/services/authorSearchDataService";

const AuthorSearchDataModule = {
    namespaced : true,

    state : {
        addAuthorSearchDataSuccessResult : false
    },

    getters : {
        _getAddAuthorSearchDataSuccessResult : (state) => state.addAuthorSearchDataSuccessResult
    },  

    mutations : {
        setAddAuthorSearchDataSuccessResult : (state,successResult) => state.addAuthorSearchDataSuccessResult = successResult
    },

    actions : {
        async add(context,authorId){
            context.commit('setAddAuthorSearchDataSuccessResult',false);
            await AuthorSearchDataService.add(authorId)
            .then(response => context.commit('setAddAuthorSearchDataSuccessResult',response.success))
            .catch(error => console.log(error));
        }
    }
}

export default AuthorSearchDataModule;