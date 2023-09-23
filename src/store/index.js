import { createStore } from "vuex";
import CategoryModule from "./modules/categoryModule";
import AuthorModule from "./modules/authorModule";
import PublisherModule from "./modules/publisherModule";
import BookModule from "./modules/bookModule";
import createPersistedState from "vuex-persistedstate";
import CommentModule from "./modules/commentModule";
import BasketModule from "./modules/basketModule";
import OrderModule from "./modules/orderModule";

const store = createStore({
    plugins : [createPersistedState({
        key : "BookShopKey",
        paths : ["BookModule","AuthorModule"],
    })],

    modules:{
        CategoryModule,
        AuthorModule,
        PublisherModule,
        BookModule,
        CommentModule,
        BasketModule,
        OrderModule
    }
});

export default store;