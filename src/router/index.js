import { createRouter , createWebHashHistory } from 'vue-router';

const routes = [
    {
        name : "HomePage",
        path : "/",
        component : () => import("@/pages/user/home_page/HomePage")
    },
    {
        name : "BookDetailPage",
        path : "/kitap/:bookName",
        component : () => import("@/pages/user/book_detail_page/BookDetailPage"),
    },
    {
        name : "LoginPage",
        path: "/giris",
        component : () => import("@/pages/user/login_page/LoginPage")
    },
    {
        name : "RegisterPage",
        path : "/kaydol",
        component : () => import("@/pages/user/register_page/RegisterPage")
    },
    {
        name : "MailComfirmPage",
        path : "/kaydol/mail-dogrulama",
        component : () => import("@/pages/user/mail_comfirm_page/MailComfirmPage")
    },
    {
        name : "SearchPage",
        path : "/arama/:searchParameter",
        component : () => import("@/pages/user/search_page/SearchPage")
    }
];

const router = createRouter({
    routes,
    history : createWebHashHistory()
});

export default router;