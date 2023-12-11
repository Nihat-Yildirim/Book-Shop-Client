const userPageRoutes = [
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
    },
];

export default userPageRoutes;