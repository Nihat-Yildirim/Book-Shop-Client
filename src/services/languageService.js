import appAxios from "@/utils/appAxios";

const LanguageService = {
    async getAllLanguage(){
        const result = await appAxios.get("Languages/GetAll");
        return result.data;
    }
}

export default LanguageService;