const adminPageRoutes = [
    {
        name : "AdminHomePage",
        path : "/admin/anasayfa",
        component : () => import("@/pages/admin/admin_home_page/AdminHomePage")
    },
    {
        name : "AdminUsersPage",
        path : "/admin/kullanıcılar",
        component : () => import("@/pages/admin/admin_users_page/AdminUsersPage")
    },
    {
        name : "AdminPublisherPage",
        path : "/admin/yayin-evleri",
        component : () => import("@/pages/admin/admin_publishers_page/AdminPublishersPage")
    },
    {
        name : "AdminOrdersPage",
        path : "/admin/siparişler",
        component : () => import("@/pages/admin/admin_orders_page/AdminOrdersPage")
    },
    {
        name : "AdminBooksPage",
        path : "/admin/kitaplar",
        component : () => import("@/pages/admin/admin_books_page/AdminBooksPage")
    },
    {
        name : "AdminAuthorsPage",
        path : "/admin/yazarlar",
        component : () => import("@/pages/admin/admin_authors_page/AdminAuthorsPage")
    },
    {
        name : "AdminUpdateBookPage",
        path : "/admin/guncelle/:bookName",
        component : () => import("@/pages/admin/admin-update-book-page/AdminUpdateBookPage")
    }
];

export default adminPageRoutes;