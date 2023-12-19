import appAxios from "@/utils/appAxios";

const BookSearchDataService = {
    async add(bookId){
        const result = await appAxios.post(`BookSearchDatas/Add?BookId=${bookId}`);
        return result.data;
    },

    async getSelectedBookSearchDatasForDays(bookId){
        const result = await appAxios.get(`BookSearchDatas/GetSelectedBookSearchDatasForDays?BookId=${bookId}`);
        return result.data;
    }
}

export default BookSearchDataService;