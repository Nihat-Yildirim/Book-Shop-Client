import { createStore } from "vuex";
import CategoryModule from "./modules/categoryModule";
import AuthorModule from "./modules/authorModule";
import PublisherModule from "./modules/publisherModule";
import BookModule from "./modules/bookModule";

const store = createStore({
    modules:{
        CategoryModule,
        AuthorModule,
        PublisherModule,
        BookModule
    }
});

export default store;