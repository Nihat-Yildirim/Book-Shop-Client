<template>
    <div id="admin-update-book-page-container">
        <div id="admin-update-book-page-left">
            <AdminNavigationComponent :adminBooksPageNavButtonClicked="true"/>
        </div>
        <div id="admin-update-book-page-right">
            <AdminHeaderComponent/>
            <div id="admin-update-book-page-content">
                <AdminUpdateBookPageTopComponent/>
                <AdminUpdateBookPageMiddleComponent/>
                <AdminUpdateBookPageBottomComponent/>
            </div>
        </div>
    </div>
</template>

<script>
import AdminNavigationComponent from '@/pages/admin/components/AdminNavigationComponent'
import AdminHeaderComponent from '@/pages/admin/components/AdminHeaderComponent';
import AdminUpdateBookPageTopComponent from './components/AdminUpdateBookPageTopComponent';
import AdminUpdateBookPageMiddleComponent from './components/AdminUpdateBookPageMiddleComponent';
import AdminUpdateBookPageBottomComponent from './components/AdminUpdateBookPageBottomComponent';

export default{
    components:{
        AdminHeaderComponent,
        AdminNavigationComponent,
        AdminUpdateBookPageTopComponent,
        AdminUpdateBookPageMiddleComponent,
        AdminUpdateBookPageBottomComponent
    }
}
</script>

<style>
    #admin-update-book-page-container{
        display: flex;
    }

    #admin-update-book-page-content{
        display: flex;
        flex-direction: column;
        margin-top: 15px;
        padding-top: 15px;
        padding-left: 30px;
        padding-right: 30px;
    }

    #admin-update-book-page-right{
        width: 100%;
    }
</style>