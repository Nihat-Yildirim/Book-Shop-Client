import { createRouter , createWebHashHistory } from 'vue-router';
import store from '@/store';

const routes = [
    {
        name : "HomePage",
        path : "/",
        component : () => import("@/pages/user/home_page/HomePage"),
    },
    {
        name : "BookDetailPage",
        path : "/kitap/:bookName",
        component : () => import("@/pages/user/detail_pages/book_detail_page/BookDetailPage"),
    },
    {
        name: "PublisherDetailPage",
        path : "/yayinci/:publisherName",
        component : () => import ("@/pages/user/detail_pages/publisher_detail_page/PublisherDetailPage")
    },
    {
        name : "AuthorDetailPage",
        path : "/yazar/:authorName",
        component : () => import("@/pages/user/detail_pages/author_detail_page/AuthorDetailPage")
    },
    {
        name : "LoginPage",
        path: "/giris",
        component : () => import("@/pages/user/auth_pages/login_page/LoginPage")
    },
    {
        name : "RegisterPage",
        path : "/kaydol",
        component : () => import("@/pages/user/auth_pages/register_page/RegisterPage")
    },
    {
        name : "MailComfirmPage",
        path : "/kaydol/mail-dogrulama",
        component : () => import("@/pages/user/auth_pages/mail_comfirm_page/MailComfirmPage")
    },
    {
        name : "SearchPage",
        path : "/arama/:searchParameter",
        component : () => import("@/pages/user/search_page/SearchPage")
    },
    {
        name : "UserInformationPage",
        path : "/hesabim/kullanici-bilgileri",
        component : () => import("@/pages/user/account_pages/user_information_page/UserInformationPage")
    },
    {
        name : "UserAddressPage",
        path : "/hesabim/adreslerim",
        component : () => import("@/pages/user/account_pages/user_address_page/UserAddressPage")
    },
    {
        name : "UserPhoneNumberPage",
        path : "/hesabim/telefon-numaralarim",
        component : () => import("@/pages/user/account_pages/user_phone_number_page/UserPhoneNumberPage")
    },
    {
        name : "UserOrderPage",
        path : "/hesabim/siparislerim",
        component : () => import("@/pages/user/account_pages/user_order_page/UserOrderPage")
    },
    {
        name : "UserMessagePage",
        path : "/hesabim/mesajlarim",
        component : () => import("@/pages/user/account_pages/user_message_page/UserMessagePage")
    },
    {
        name : "UserCommentPage",
        path : "/hesabim/degerlendirmelerim",
        component : () => import("@/pages/user/account_pages/user_comment_page/UserCommentPage")
    },
    {
        name : "UserVisitedBookPage",
        path : "/hesabim/onceden-gezdiklerim",
        component : () => import("@/pages/user/account_pages/user_visited_book_page/UserVisitedBookPage")
    },
    {
        name : "BasketDetailPage",
        path : "/sepetim",
        component : () => import("@/pages/user/detail_pages/basket_detail_page/BasketDetailPage")
    }
];

const router = createRouter({
    routes,
    history : createWebHashHistory(),
});

//todo
router.beforeResolve((to,from,next)=>{
    const isAuthenticate = store.getters["AuthModule/_getIsAuthenticate"];
    const registerSuccessResult = store.getters["AuthModule/_getUserRegisterSuccesResult"];
    const verifyMailComfirmCodeSuccessResult = store.getters["AuthModule_getVerifyMailComfirmCodeSuccessResult"];

    const authPages = ["LoginPage","RegisterPage"];
    const mailComfirmPage = "MailComfirmPage";
    const accountPages = ["UserInformationPage","UserAddressPage","UserPhoneNumberPage","UserOrderPage","UserMessagePage","UserCommentPage","UserVisitedBookPage","BasketDetailPage"]
    const detailPages = ["BookDetailPage","PublisherDetailPage","AuthorDetailPage"];
    const pages = ["HomePage","SearchPage"];

    if(!isAuthenticate){
        if(accountPages.indexOf(to.name) > -1)
            next(false)
        else
            next(true)    
    }   

    if(isAuthenticate){
        if(authPages.indexOf(to.name) > -1 || to.name == mailComfirmPage)
            next(false);
        else
            next(true)
    }
});

export default router;