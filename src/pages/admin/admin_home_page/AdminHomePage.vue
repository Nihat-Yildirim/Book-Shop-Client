<template>
    <div id="admin-home-page-container">
        <div id="admin-home-page-left">
            <AdminNavigationComponent :adminHomePageNavButtonClicked = "true" />
        </div>
        <div id="admin-home-page-right">
            <AdminHeaderComponent/>
            <div id="admin-home-page-content">
                <AdminHomePageTopComponent/>
                <AdminHomePageMiddleComponent/>
                <AdminHomePageBottomComponent/>
            </div>
        </div>
    </div>
</template>

<script>
import AdminNavigationComponent from '@/pages/admin/components/AdminNavigationComponent';
import AdminHeaderComponent from '../components/AdminHeaderComponent.vue';
import AdminHomePageTopComponent from './components/AdminHomePageTopComponent.vue';
import AdminHomePageMiddleComponent from './components/AdminHomePageMiddleComponent.vue';
import AdminHomePageBottomComponent from './components/AdminHomePageBottomComponent.vue';

export default {
    components : {
        AdminNavigationComponent,
        AdminHeaderComponent,
        AdminHomePageTopComponent,
        AdminHomePageMiddleComponent,
        AdminHomePageBottomComponent
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

    #admin-home-page-content{
        display: flex;
        flex-direction: column;
        margin-top: 15px;
        padding-top: 15px;
        padding-left: 30px;
        padding-right: 30px;
    }
</style>