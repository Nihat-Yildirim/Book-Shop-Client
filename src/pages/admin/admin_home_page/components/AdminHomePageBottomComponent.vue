<template>
    <div id="admin-home-page-bottom-container">
        <div id="admin-home-page-order-table">
            <div id="admin-home-page-order-table-title">
                <div style="width: 285px">Kullanıcı İsmi</div>
                <div style="width: 310px">Teslimat Şehri</div>
                <div style="width: 120px">Ürün Adeti</div>
                <div style="width: 200px">Sepet Tutarı</div>
                <div style="width: 200px">Sipariş Durumu</div>
                <div style="width: 90px">Göster</div>
            </div>
            <div id="admin-home-page-order-table-value">
                <div :class="{'admin-home-page-order-table-row-bacground-color' : i % 2 == 0}" v-for="i in 100" :key="i" class="admin-home-page-order-table-row">
                    <div style="width: 285px">Kullanıcı {{ i }}</div>
                    <div style="width: 310px">Şehir {{ i }}</div>
                    <div style="width: 120px">{{ i }}</div>
                    <div style="width: 200px">{{ i }} TL</div>
                    <div style="width: 200px">Adres {{ i }}</div>
                    <div style="width: 90px">
                        <button class="admin-home-page-order-visible-button">
                            <i class="bi bi-eye"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    
}
</script>

<style>
    #admin-home-page-bottom-container{
        max-height: 475px;
        display: flex;
        margin-bottom: 20px;
    }

    #admin-home-page-order-table{
        width: 100%;
        height: 100%;
        border-radius: 7px;
        box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 2px 0px;
        border: 1px solid #F2F3F4;
        background-color: #F8F9F9;
        padding: 10px;
    }

    #admin-home-page-order-table-title{
        display: flex;
        background-color: #fdfefe;
        border: 1px solid #e9ebec;
        height: 37px;
    }

    #admin-home-page-order-table-title div{
        font-size: 16px;
        padding-left: 5px;
        padding-top: 6px;
        user-select: none;
        border-left: 1px solid #eef0f1;
        color: orange;
    }

    #admin-home-page-order-table-value{
        max-height: 415px;
        overflow-y: scroll;
    }

    #admin-home-page-order-table-value::-webkit-scrollbar {
        display: none;
    }
    
    .admin-home-page-order-table-row{
        display: flex;
        height: 30px;
        border: 1px solid #F2F3F4;
        border-top: none;
        color: #d17e36;
        background-color: #FBFCFC;
        user-select: none;
    }

    .admin-home-page-order-table-row:hover{
        background-color: #F2F4F4 !important;
    }

    .admin-home-page-order-table-row div{
        padding-top: 3px;
        padding-left: 5px;
        border-left: 1px solid #eef0f1;
        border-top: none;
    }

    .admin-home-page-order-table-row-bacground-color{
        background-color: #f7f9f9 !important;
    }

    .admin-home-page-order-visible-button{
        margin-left: 25px;
        height: 22px;
        width: 30px;
        color: #fff;
        font-size: 16px;
        border: 1px solid #2980B9;
        background-color: #3498DB;
        border-radius: 4px;
        cursor: pointer;
        transition: all 200ms;
    }

    .admin-home-page-order-visible-button:hover{
        background-color: #5DADE2;
    }
</style>