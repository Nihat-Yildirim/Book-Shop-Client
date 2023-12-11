import AuthorService from "@/services/authorService";

const AuthorModule = {
    namespaced : true,

    state : {
        authors : [],
        selectedAuthor : null,
        selectedAuthorId : 0,
        authorNames : [],
    },

    mutations:{
        setAuthors : (state,authors) => state.authors = authors,
        setSelectedAuthor : (state,author) => state.selectedAuthor = author,
        setAuthorNames : (state,authorNames) => state.authorNames = authorNames,
    },

    getters :{
        _getAll : (state) => state.authors,
        _getSelectedAuthor : (state) => state.selectedAuthor,
        _getSelectedAuthorId : (state) => state.selectedAuthorId,
        _getAuthorNames : (state) => state.authorNames,
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
        },
        async getAllAuthorName(context){
            await AuthorService.getAllAuthorName()
            .then(response => context.commit('setAuthorNames',response.data))
            .catch(error => console.log(error));
        }
    }
}

export default AuthorModule;