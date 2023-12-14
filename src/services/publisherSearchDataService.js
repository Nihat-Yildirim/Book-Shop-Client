import appAxios from "@/utils/appAxios";

const PublisherSearchDataService = {
    async add(publisherId){
        const result = await appAxios.post(`PublisherSearchDatas/Add?PublisherId=${publisherId}`);
        return result.data;
    }
}

export default PublisherSearchDataService;