import appAxios from "@/utils/appAxios";

const PublisherService = {
    async addPublisher(addedPublisher){
        var result = await appAxios.post("Publishers/AddPublisher",addedPublisher,{
            headers : {'Content-Type': 'multipart/form-data'}
        });
        return result.data;
    },

    async deletePublisher(publisherId){
        var result = await appAxios.delete(`Publishers/DeletePublisher?PublisherId=${publisherId}`);
        return result.data;
    },

    async updatePublisherLogo(updatedPublisherLogo){
        var result = await appAxios.put("Publishers/UpdatePublisherLogo",updatedPublisherLogo,{
            headers : {'Content-Type': 'multipart/form-data'}
        });
        return result.data;
    },

    async updatePublisher(updatedPublisher){
        var result = await appAxios.put(`Publishers/UpdatePublisher?PublisherId=${updatedPublisher.publisherId}&Name=${updatedPublisher.name}`);
        return result.data;
    },

    async getAllPublisher(){
        var result = await appAxios.get("Publishers/GetAllPublisher");
        return result.data;
    },

    async getPublisherById(publisherId){
        var result = await appAxios.get(`Publishers/GetPublisherById?PublisherId=${publisherId}`);
        return result.data;
    },

    async getPublisherByPattern(pattern){
        var result = await appAxios.get(`Publishers/GetPublisherByPattern?Pattern=${pattern}`);
        return result.data;
    },

    async getPublisherByPatternForAdmin(pattern){
        var result = await appAxios.get(`Publishers/GetPublisherByPatternForAdmin?Pattern=${pattern}`);
        return result.data;
    },

    async getAllPublisherName(){
        var result = await appAxios.get("Publishers/GetAllPublisherName");
        return result.data;
    },

    async getRecommendBooksForSearch(){
        var result = await appAxios.get("Publishers/GetRecommendBooksForSearch");
        return result.data;
    }
}

export default PublisherService;