<template>
    <div id="admin-publishers-page-container">
        <div id="admin-publishers-page-left">
            <AdminNavigationComponent :adminPublishersPageNavButtonClicked="true" />
        </div>
        <div id="admin-publishers-page-right">
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
    #admin-publishers-page-container{
        display: flex;
    }

    #admin-publishers-page-right{
        width: 100%;
    }
</style>