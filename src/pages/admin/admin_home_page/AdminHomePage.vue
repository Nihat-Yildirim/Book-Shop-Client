<template>
    <div id="admin-home-page-container">
        <div id="admin-home-page-left">
            <AdminNavigationComponent :adminHomePageNavButtonClicked = "true" />
        </div>
        <div id="admin-home-page-right">
            <AdminHeaderComponent/>
        </div>
    </div>
</template>

<script>
import AdminNavigationComponent from '@/pages/admin/components/AdminNavigationComponent';
import AdminHeaderComponent from '../components/AdminHeaderComponent.vue';

export default {
    components : {
        AdminNavigationComponent,
        AdminHeaderComponent
    }
}
</script>

<style>
    #admin-home-page-container{
        display: flex;
    }

    #admin-home-page-right{
        width: 100%;
    }
</style>