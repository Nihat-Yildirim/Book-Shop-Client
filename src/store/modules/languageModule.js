import LanguageService from "@/services/languageService";

const LanguageModule = {
    namespaced : true,

    state : {
        languages : []
    },

    getters : {
        _getAllLanguage : (state) => state.languages,
    },

    mutations : {
        setLanguages : (state,languages) => state.languages = languages,
    },


    actions : {
        async getAllLanguage(context){
            LanguageService.getAllLanguage()
            .then(response => context.commit('setLanguages',response.data))
            .catch(error => console.log(error));
        }
    }
}

export default LanguageModule;