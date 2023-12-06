<template>
    <div id="admin-header-container">
        <div id="admin-hader-left">
        </div>
        <div id="admin-header-right">
            <div id="admin-header-notification">
                <i class="bi bi-bell-fill"></i>
            </div>
            <div class="admin-header-bracket"></div>
            <div id="admin-header-admin-profile">
                <div id="admin-header-admin-picture">
                    <img src="@\assets\no-user-image.jpg" alt="">
                </div>
                <div id="admin-header-admin-name">
                    Admin
                </div>
            </div>
            <div class="admin-header-bracket"></div>
            <div id="admin-header-admin-information">
                <i class="bi bi-list"></i>
            </div>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style>
    #admin-header-container{
        display: flex;
        width: 100%;
        min-width: 1289px;
        height: 50px;
        background-color: #F39C12;
        box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
        display: flex;
        justify-content: space-between;
    }

    #admin-header-right{
        padding-right: 15px;
        display: flex;
        align-items: center;
    }

    #admin-header-notification{
        color: #EAEDED;
        width: 35px;
        height: 35px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 17px;
        border-radius: 50%;
        background-color: #F5B041;
        cursor: pointer;
        margin-right: 10px;
    }

    .admin-header-bracket{
        border-radius: 1px;
        margin-right: 10px;
        width: 0.3px;
        height: 20px;
        background-color: #F8C471;
    }

    #admin-header-admin-profile{
        display: flex;
        margin-right: 10px;
        color: #EAEDED;
        user-select: none;
    }

    #admin-header-admin-picture{
        width: 35px;
        height: 35px;
        margin-right: 5px;
        border: 1px solid #F8C471;
        border-radius: 50%;
    }

    #admin-header-admin-picture img{
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 50%;
    }

    #admin-header-admin-name{
        padding-top: 5px;
    }

    #admin-header-admin-information i{
        font-size: 23px;
        font-weight: 500;
        color: #EAEDED;
        cursor: pointer;
    }
</style>