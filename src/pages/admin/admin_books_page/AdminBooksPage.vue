<template>
    <div id="admin-books-page-container">
        <div id="admin-books-page-left">
            <AdminNavigationComponent :adminBooksPageNavButtonClicked="true" />
        </div>
        <div id="admin-books-page-right">
            <AdminHeaderComponent/>
        </div>
    </div>
</template>

<script>
import AdminNavigationComponent from '@/pages/admin/components/AdminNavigationComponent';
import AdminHeaderComponent from '@/pages/admin/components/AdminHeaderComponent';

export default{
    components:{
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
</style>