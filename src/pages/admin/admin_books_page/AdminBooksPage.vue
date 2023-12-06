<template>
    <div id="admin-books-page-container">
        <div id="admin-books-page-left">
            <AdminNavigationComponent :adminBooksPageNavButtonClicked="true" />
        </div>
        <div id="admin-books-page-right">
            <AdminHeaderComponent/>
            <div id="admin-books-page-content">
                <AdminBooksPageTopComponent/>
                <AdminBooksPageBottomComponent/>
            </div>
        </div>
    </div>
</template>

<script>
import AdminNavigationComponent from '@/pages/admin/components/AdminNavigationComponent';
import AdminHeaderComponent from '@/pages/admin/components/AdminHeaderComponent';
import AdminBooksPageTopComponent from '@/pages/admin/admin_books_page/components/AdminBooksPageTopComponent';
import AdminBooksPageBottomComponent from '@/pages/admin/admin_books_page/components/AdminBooksPageBottomComponent';

export default{
    components:{
        AdminBooksPageBottomComponent,
        AdminBooksPageTopComponent,
        AdminNavigationComponent,
        AdminHeaderComponent
    }
}
</script>

<style>
    #admin-books-page-container{
        display: flex;
    }

    #admin-books-page-right{
        width: 100%;
    }

    #admin-books-page-content{
        display: flex;
        flex-direction: column;
        margin-top: 15px;
        padding-top: 15px;
        padding-left: 30px;
        padding-right: 30px;
    }
</style>