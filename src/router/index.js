import { createRouter , createWebHashHistory } from 'vue-router';

const routes = [
    {
        name : "HomePage",
        path : "/",
        component : () => import("@/pages/user/home_page/HomePage")
    },
    {
        name : "BookDetail",
        path : "/kitap/:bookName",
        component : () => import("@/pages/user/book_detail_page/BookDetailPage"),
    }
];

const router = createRouter({
    routes,
    history : createWebHashHistory()
});

export default router;