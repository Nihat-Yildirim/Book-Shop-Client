import AuthorService from "@/services/authorService";

const AuthorModule = {
    namespaced : true,

    state : {
        authors : [],
        selectedAuthor : null,
        selectedAuthorId : 0,
        authorNames : [],
        searchedAuthors : [],
        recommendAuthors : [],
    },

    mutations:{
        setRecommendAuthors : (state,recommendAuthors) => state.recommendAuthors = recommendAuthors,
        setSearchedAuthors : (state,searchedAuthors) => state.searchedAuthors = searchedAuthors,
        setAuthors : (state,authors) => state.authors = authors,
        setSelectedAuthor : (state,author) => state.selectedAuthor = author,
        setAuthorNames : (state,authorNames) => state.authorNames = authorNames,
    },

    getters :{
        _getAll : (state) => state.authors,
        _getSelectedAuthor : (state) => state.selectedAuthor,
        _getSelectedAuthorId : (state) => state.selectedAuthorId,
        _getSearchedAuthors : (state) => state.searchedAuthors,
        _getRecommendAuthors : (state) => state.recommendAuthors,
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
        async getAuthorByPattern(context,pattern){
            await AuthorService.getAuthorByPattern(pattern)
            .then(response => context.commit('setSearchedAuthors',response.data))
            .catch(error => console.log(error));
        },
        async getAllAuthorName(context){
            await AuthorService.getAllAuthorName()
            .then(response => context.commit('setAuthorNames',response.data))
            .catch(error => console.log(error));
        },
        async getRecommendAuthorsForSearch(context){
            context.commit('setRecommendAuthors',null);
            await AuthorService.getRecommendAuthorsForSearch()
            .then(response =>context.commit('setRecommendAuthors',response.data))
            .catch(error => console.log(error));
        }
    }
}

export default AuthorModule;