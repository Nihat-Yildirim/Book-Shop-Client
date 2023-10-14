<template>
    <HeaderComponent/>
    <div id="user-visited-book-page-container">
        <div id="left-container">
            <UserAccountHeader :userVisitedButtonSelect="true"/>
        </div>
        <div id="right-container">

        </div>
    </div>
</template>

<script>
import HeaderComponent from '@/pages/user/components/HeaderComponent';
import UserAccountHeader from '@/pages/user/account_pages/components/UserAccountHeader'

export default{
    components:{
        HeaderComponent,
        UserAccountHeader,
    }
}
</script>

<style>
    #user-visited-book-page-container{
        width: 100%;
        min-width: 1510px;
        padding: 50px 9% 0 9%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin-bottom: 50px;
        height: auto;
    }

    #left-container{
        width: 23%;
        margin-right: 20px;
    }

    #right-container{
        width: 76%;
        background-color: blue;
    }
</style>