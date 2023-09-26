import AuthorService from "@/services/authorService";

const AuthorModule = {
    namespaced : true,

    state : {
        authors : [],
        selectedAuthor : null
    },

    mutations:{
        setAuthors : (state,authors) => state.authors = authors,
        setSelectedAuthor : (state,author) => state.selectedAuthor = author,
    },

    getters :{
        _getAll : (state) => state.authors,
        _getSelectedAuthor : (state) => state.selectedAuthor,
    },

    actions:{
        async getAll(context){
            await AuthorService.getAllAuthor()
            .then(responseAuthors => context.commit('setAuthors',responseAuthors.data))
            .catch(error => console.log(error));
        },
        async getById(context,authorId){
            await AuthorService.getAuthorById(authorId)
            .then(responseAuthor => context.commit('setSelectedAuthor',responseAuthor.data))
            .catch(error => console.log(error));
        }
    }
}

export default AuthorModule;