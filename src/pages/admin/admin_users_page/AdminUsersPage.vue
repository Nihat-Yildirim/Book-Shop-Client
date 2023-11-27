<template>
    <div id="admin-users-page-container">
        <div id="admin-users-page-left">
            <AdminNavigationComponent :adminUsersPageNavButtonClicked="true" />
        </div>
        <div id="admin-users-page-right">
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
    #admin-users-page-container{
        display: flex;
    }

    #admin-users-page-right{
        width: 100%;
    }
</style>