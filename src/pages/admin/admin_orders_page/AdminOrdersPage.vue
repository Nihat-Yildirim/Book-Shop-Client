<template>
    <div id="admin-orders-page-container">
        <div id="admin-orders-page-left">
            <AdminNavigationComponent :adminOrdersPageNavButtonClicked="true" />
        </div>
        <div id="admin-orders-page-right">
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
    #admin-orders-page-container{
        display: flex;
    }

    #admin-orders-page-right{
        width: 100%;
    }
</style>