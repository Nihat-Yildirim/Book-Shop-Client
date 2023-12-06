<template>
    <div id="admin-home-page-middle-container">
        <div id="admin-home-page-middle-left">
            <div id="user-order-income-container">
                <div id="user-order-income-title">
                    Kullanıcı- Sipariş - Gelir
                </div>
                <div id="user-order-income-chart-container">
                    <canvas id="user-order-income-chart"></canvas>
                </div>
            </div>
        </div>
        <div id="admin-home-page-middle-right">
            <div id="province-income-container">
                <div id="province-income-title">
                    İllere Göre Gelir
                </div>
                <div id="province-income-chart-container">
                    <canvas id="province-income-chart"></canvas>
                </div>
                <div id="province-income-table">
                    <div id="province-income-table-title">
                        <div class="province-income-table-title-column" id="province-income-table-province">İl</div>
                        <div class="province-income-table-title-column" id="province-income-table-income">Gelir</div>
                    </div>
                    <div id="province-income-table-value">
                        <div v-for="i in 81" :class="{'table-valye-bacgournd-color': i%2 == 0}" key="i" class="province-income-table-row">
                            <div class="province-income-table-province-column">
                                Şehir {{ i }}
                            </div>
                            <div class="province-income-table-income-column">
                                {{ i }} TL
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Chart } from 'chart.js/auto';

export default {
    methods:{
        loadUserOrderIncomeChartData(){
            const chart = document.getElementById("user-order-income-chart");
            new Chart(chart, {
                type: 'line',
                data: {
                    labels: ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi','Pazar'],
                    datasets: [
                        {
                            label : "Kullanıcı",
                            data: [20,19,18,20,24,17,20],
                            pointRadius: 4,
                            borderWidth: 1.4,
                            fill: true,
                            borderColor: '#CA6F1E',
                        },
                        {
                            label : "Sipariş",
                            data: [20,12,18,14,18,12,15],
                            pointRadius: 4,
                            borderWidth: 1.4,
                            fill: true,
                            borderColor: '#F4D03F',
                        },
                        {
                            label : "Gelir",
                            data: [5,16,14,23,21,17,13],
                            pointRadius: 4,
                            borderWidth: 1.4,
                            fill: true,
                            borderColor: '#E74C3C',
                        },
                    ]
                },
                options: {
                    tension : 0.5,
                    responsive: true,
                },
            });
        },
        loadProvinceIncomeChartData(){
            const chart = document.getElementById("province-income-chart");
            new Chart(chart, {
                type: 'pie',
                data: {
                    labels: ['İstanbul','Ankara','İzmir','Bursa','Diğer'],
                    datasets: [{
                        data: [12, 19, 6, 5, 8],
                    }]
                },
                options:{
                    plugins:{
                        responsive: false,
                        legend: {
                            display: false
                        },
                    }
                }
            });
        }
    },

    mounted(){
        this.loadUserOrderIncomeChartData();
        this.loadProvinceIncomeChartData();
    }
}
</script>

<style>
    #admin-home-page-middle-container{
        height: 475px;
        margin-bottom: 20px;
        display: flex;
    }

    #admin-home-page-middle-left,
    #admin-home-page-middle-right{
        border-radius: 7px;
        box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 2px 0px;
        border: 1px solid #F2F3F4;
        background-color: #F8F9F9;
        height: 100%;
    }

    #admin-home-page-middle-left{
        width: 74%;
        margin-right: 20px;
    }

    #admin-home-page-middle-right{
        width: 25%;
    }

    #user-order-income-container{
        padding: 10px;
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
    }

    #user-order-income-title{
        font-size: 18px;
        width: 100%;
        color: #D68910;
    }

    #user-order-income-chart-container{
        height: 426px;
    }

    #user-order-income-chart{
        width: 100% !important;
        height: 100% !important;
    }

    #province-income-container{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        padding: 10px;
    }

    #province-income-title{
        font-size: 18px;
        margin-bottom: 10px;
        color: #d78952;
    }

    #province-income-chart-container{
        display: flex;
        justify-content: center;
        height: 200px;
        margin-bottom: 10px;
    }

    #province-income-chart-container canvas{
        width: 200px !important;
        height: 200px !important;
    }

    #province-income-table-title{
        display: flex;
        width: 100%;
    }

    .province-income-table-title-column{
        padding-left: 3px ;
        padding-top: 5px;
        font-size: 15px;
        height: 30px;
        background-color: #FDFEFE;
        color: orange;
        border: 1px solid #E5E7E9;
        user-select: none;
    }

    #province-income-table-province{
        width: 216px;
    }

    #province-income-table-income{
        width: 125px;
        border-left: none !important;
    }

    #province-income-table-value{
        overflow-y: scroll;
        height: 180px;
        background-color: #FBFCFC;
    }

    #province-income-table-value::-webkit-scrollbar {
        display: none;
    }

    .province-income-table-row{
        height: 23px;
        border: 1px solid #E5E7E9;
        border-top: none;
        display: flex;
        user-select: none;
    }

    .province-income-table-row:hover{
        background-color: #F2F4F4;
    }

    .table-valye-bacgournd-color{
        background-color: #F7F9F9;
    }

    .province-income-table-province-column,
    .province-income-table-income-column{
        color: #cf7a30;
        padding-top: 2px;
        font-size: 14px;
        padding-left: 5px;
    }

    .province-income-table-province-column{
        width: 216px;
    }

    .province-income-table-income-column{
        width: 126px;
        border-left: 1px solid #E5E7E9;
    }
</style>