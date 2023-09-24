import { createStore } from "vuex";
import CategoryModule from "./modules/categoryModule";
import AuthorModule from "./modules/authorModule";
import PublisherModule from "./modules/publisherModule";
import BookModule from "./modules/bookModule";
import createPersistedState from "vuex-persistedstate";
import CommentModule from "./modules/commentModule";
import BasketModule from "./modules/basketModule";
import OrderModule from "./modules/orderModule";
import AuthModule from "./modules/authModule";

const store = createStore({
    plugins : [createPersistedState({
        key : "BookShopKey",
        paths : ["BookModule","AuthorModule","AuthModule"],
    })],

    modules:{
        CategoryModule,
        AuthorModule,
        PublisherModule,
        BookModule,
        CommentModule,
        BasketModule,
        OrderModule,
        AuthModule
    }
});

export default store;