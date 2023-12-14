import appAxios from "@/utils/appAxios";

const AuthorSearchDataService = {
    async add(authorId){
        const result = await appAxios.post(`AuthorSearchDatas/Add?AuthorId=${authorId}`);
        return result.data;
    }
}

export default AuthorSearchDataService;