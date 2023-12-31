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
import ViewModule from "./modules/viewModule";
import LanguageModule from "./modules/languageModule";
import BookSearchDataModule from "./modules/bookSearchDataModule";
import AuthorSearchDataModule from "./modules/authorSearchDataModule";
import PublisherSearchDataModule from "./modules/publisherSearchDataModule";
import FavoriteBookModule from "./modules/favoriteBookModule";

const store = createStore({
    plugins : [createPersistedState({
        key : "BookShopKey",
        paths : [
            "BookModule",
            "AuthorModule",
            "AuthModule",
            "BasketModule",
            "PublisherModule",
            "CategoryModule",
            "CommentModule",
            "ProvinceModule",
            "DistrictModule",
            "NeighbourhoodModule",
            "AddressModule",
            "ViewModule",
            "LanguageModule",
            "BookSearchDataModule",
            "AuthorSearchDataModule",
            "PublisherSearchDataModule",
            "FavoriteBookModule"
        ],
        overwrites : true
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
        NeighbourhoodModule,
        ViewModule,
        LanguageModule,
        BookSearchDataModule,
        AuthorSearchDataModule,
        PublisherSearchDataModule,
        FavoriteBookModule
    }
});

export default store;