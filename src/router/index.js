import { createRouter , createWebHashHistory } from 'vue-router';
import store from '@/store';
import userPageRoutes from './userPageRoutes';
import adminPageRoutes from './adminPageRoutes';

const routes = [    
    ...userPageRoutes,
    ...adminPageRoutes,
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