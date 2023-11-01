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
import UserModule from "./modules/userModule";
import ProvinceModule from "./modules/provinceModule";
import DistrictModule from "./modules/districtModule";
import NeighbourhoodModule from "./modules/neighbourhoodModule";
import AddressModule from "./modules/addressModule";

const store = createStore({
    plugins : [createPersistedState({
        key : "BookShopKey",
        paths : ["BookModule","AuthorModule","AuthModule","BasketModule","PublisherModule","CommentModule","ProvinceModule","DistrictModule","NeighbourhoodModule","AddressModule"],
        overwrites : true,
    })],

    modules:{
        CategoryModule,
        AuthorModule,
        PublisherModule,
        BookModule,
        CommentModule,
        BasketModule,
        OrderModule,
        AuthModule,
        UserModule,
        ProvinceModule,
        DistrictModule,
        AddressModule,
        NeighbourhoodModule
    }
});

export default store;