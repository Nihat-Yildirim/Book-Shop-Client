import appAxios from "@/utils/appAxios";

const ViewService = {
    async addView(params){
        const result = await appAxios.post("Views/Add",null,{
            params:{
                BookId : params.bookId
            }
        });

        return result.data;
    },

    async getSelectedBookViewDatasForDays(bookId){
        const result = await appAxios.get("Views/GetSelectedBookViewDatasForDays",{
            params:{
                BookId : bookId
            }
        });

        return result.data;
    }
}

export default ViewService;