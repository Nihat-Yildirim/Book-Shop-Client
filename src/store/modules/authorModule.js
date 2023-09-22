import AuthorService from "@/services/authorService";

const AuthorModule = {
    namespaced : true,

    state : {
        authors : []
    },

    mutations:{
        setAuthors(state,authors){
            state.authors = authors;
        }
    },

    getters :{
        _getAll : (state) => state.authors,
    },

    actions:{
        async getAll(context){
            await AuthorService.getAllAuthor()
            .then(responseAuthors => context.commit('setAuthors',responseAuthors.data))
            .catch(error => console.log(error));
        },
    }
}

export default AuthorModule;