<template>
    <div id="admin-home-page-top-container">
        <div class="admin-home-page-top-card">
            <div class="admin-home-page-card-title">
                <div>15</div>
                <div>Üye Sayısı</div>
            </div>
            <div class="home-page-card-chart-container">
                <canvas id="user-chart" class="home-page-card-chart"></canvas>
            </div>
            <div class="admin-home-page-top-card-icon">
                <i class="bi bi-people-fill"></i>
            </div>
        </div>
        <div class="admin-home-page-top-card">
            <div class="admin-home-page-card-title">
                <div>15</div>
                <div>Satış Miktarı</div>
            </div>
            <div class="home-page-card-chart-container">
                <canvas id="order-chart" class="home-page-card-chart"></canvas>
            </div>
            <div class="admin-home-page-top-card-icon">
                <i class="bi bi-cart-check-fill"></i>
            </div>
        </div>
        <div class="admin-home-page-top-card">
            <div class="admin-home-page-card-title">
                <div>15</div>
                <div>Stok Miktarı</div>
            </div>
            <div class="home-page-card-chart-container">
                <canvas id="stock-chart" class="home-page-card-chart"></canvas>
            </div>
            <div class="admin-home-page-top-card-icon">
                <i class="bi bi-box-seam-fill"></i>
            </div>
        </div>
        <div class="admin-home-page-top-card">
            <div class="admin-home-page-card-title">
                <div>15</div>
                <div>Gelir</div>
            </div>
            <div class="home-page-card-chart-container"> 
                <canvas id="income-chart" class="home-page-card-chart"></canvas>
            </div>
            <div class="admin-home-page-top-card-icon">
                <i class="bi bi-tag-fill"></i>
            </div>
        </div>
    </div>
</template>

<script>
import { Chart } from 'chart.js/auto';
export default {

    methods:{
        loadUserChartData(){
            const chart = document.getElementById("user-chart");
            new Chart(chart, {
                type: 'line',
                data: {
                    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange',4,9],
                    datasets: [{
                        data: [12, 19, 3, 5, 2, 3,5,7],
                        pointRadius: 0,
                        borderWidth: 2,
                        borderColor: '#CA6F1E',
                    }]
                },
                options: {
                    responsive: false,
                    scales: {
                        x: {
                            display: false,
                        },
                        y: {
                            display: false,
                        }
                    },
                    plugins:{
                        legend: {
                            display: false
                        },
                        tooltip: {
                            enabled : false
                        }
                    },
                },
            });
        },
        loadOrderChartData(){
            const chart = document.getElementById("order-chart");
            new Chart(chart, {
                type: 'bar',
                data: {
                    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange',4,9],
                    datasets: [{
                        data: [12, 19, 3, 5, 2, 3,5,7],
                        pointRadius: 0,
                        borderWidth: 2,
                        borderColor: '#CA6F1E',
                        backgroundColor: '#EDBB99'
                    }]
                },
                options: {
                    responsive: false,
                    scales: {
                        x: {
                            display: false,
                        },
                        y: {
                            display: false,
                        }
                    },
                    plugins:{
                        legend: {
                            display: false
                        },
                        tooltip: {
                            enabled : false
                        }
                    },
                },
            });
        },
        loadStockChartData(){
            const chart = document.getElementById("stock-chart");
            new Chart(chart, {
                type: 'line',
                data: {
                    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange',4,9],
                    datasets: [{
                        data: [12, 19, 3, 5, 2, 3,5,7],
                        pointRadius: 0,
                        borderWidth: 2,
                        fill: true,
                        borderColor: '#CA6F1E',
                        backgroundColor: '#EDBB99'
                    }]
                },
                options: {
                    responsive: false,
                    tension : 0.5,
                    scales: {
                        x: {
                            display: false,
                        },
                        y: {
                            display: false,
                        }
                    },
                    plugins:{
                        legend: {
                            display: false
                        },
                        tooltip: {
                            enabled : false
                        }
                    },
                },
            });
        },
        loadIncomeChartData(){
            const chart = document.getElementById("income-chart");
            new Chart(chart, {
                type: 'line',
                data: {
                    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange',4,9],
                    datasets: [{
                        data: [12, 19, 3, 5, 2, 3,5,7],
                        pointRadius: 2,
                        borderWidth: 2,
                        borderColor: '#CA6F1E',
                    }]
                },
                options: {
                    responsive: false,
                    scales: {
                        x: {
                            display: false,
                        },
                        y: {
                            display: false,
                        }
                    },
                    plugins:{
                        legend: {
                            display: false
                        },
                        tooltip: {
                            enabled : false
                        }
                    },
                },
            });
        }
    },

    mounted(){
        this.loadUserChartData();
        this.loadOrderChartData();
        this.loadStockChartData();
        this.loadIncomeChartData();
    }
}
</script>

<style>
    #admin-home-page-top-container{
        display: flex;
        justify-content: space-between;
        margin-bottom: 20px;
    }

    .admin-home-page-top-card{
        position: relative;
        display: flex;
        flex-direction: column;
        padding: 10px;
        padding-top: 6px;
        width: 295px;
        height: 150px;
        border-radius: 7px;
        box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 2px 0px;
        border: 1px solid #F2F3F4;
        background-color: #F8F9F9;
    }

    .admin-home-page-top-card-icon{
        font-size: 55px;
        position: absolute;
        top: 5px;
        right: 20px;
        color: orange;
    }

    .admin-home-page-card-title{
        display: flex;
        flex-direction: column;
        padding-bottom: 10px;
    }

    .admin-home-page-card-title div:first-child{
        padding-left: 10px;
        font-size: 27px;
        color: #E67E22;
    } 

    .admin-home-page-card-title div:last-child{
        padding-left: 7px;
        font-size: 13px;
        font-weight: 500;
        color: #F39C12;
    }

    .home-page-card-chart-container canvas{
        width: 275px !important;
        height: 75px !important;
    }
</style>