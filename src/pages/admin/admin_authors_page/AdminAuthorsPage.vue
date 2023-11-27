<template>
    <div id="admin-authors-page-container">
        <div id="admin-authors-page-left">
            <AdminNavigationComponent :adminAuthorsPageNavButtonClicked="true" />
        </div>
        <div id="admin-authors-page-right">
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
    #admin-authors-page-container{
        display: flex;
    }

    #admin-authors-page-right{
        width: 100%;
    }
</style>