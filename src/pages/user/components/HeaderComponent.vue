<template>
    <div id="header-container">
        <h1 class="app-name">Book Shop</h1>
        <div id="search-container">
            <input type="text" class="search-input" placeholder="Ara ..">
            <i id="search-icon" class="bi bi-search"></i>
        </div>
        <div id="auths-login-container">
            <div id="cart-container" @mouseenter="cartIconHover = !cartIconHover" @mouseleave="cartIconHover = false">
                <div :class="{iconhover : cartIconHover}" id="cart-icon">
                    <div><span v-if="basketItems>0" id="cart-count">1</span></div>
                    <i class="bi bi-cart3 icon"></i>
                </div>
                <span :class="{iconhover : cartIconHover}">Sepetim</span>
            </div>
            <div class="bracket"></div>
            <div ref="authContainerRef" id="auths-container" @mouseenter="authsDisplayAndHover(true)" @mouseleave="authsDisplayAndHover(false)">
                <i :class="{iconhover : authIconHover}" class="bi bi-person"></i>
                <span :class="{iconhover : authIconHover}">Giriş Yap</span>
            </div>
        </div>
    </div>
    <div @mousemove="authsDisplayAndHover(true)" @mouseleave="authsDisplayAndHover(false)" :style="{left : locationLeft - 40 + 'px' }" v-if="authsDisplay" id="auths">
        <div :style="{left : locationLeft + 40 + 'px' }" id="triangle"></div>
        <ul>
            <li>
                <div class="auths-button" id="login">
                    <i class="bi bi-person-fill"></i>
                    <span>Giriş</span>
                </div>
            </li>
            <li>
                <div class="auths-button" id="login">
                    <i class="bi bi-person-fill-gear"></i>
                    <span>Admin Giriş</span>
                </div>
            </li>
            <li>
                <div class="auths-button" id="login">
                    <i class="bi bi-person-fill-add"></i>
                    <span>Kaydol</span>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
export default{
    data(){
        return{
            cartIconHover : false,
            authIconHover : false,
            authsDisplay : false,
            locationLeft : null,
            /*Store içerisinden ya da sepete ürün eklenince değer gelecektir*/
            basketItems : 0,
        }
    },
    
    methods:{
        authsDisplayAndHover(hover){
            this.locationLeft =  this.$refs.authContainerRef.getBoundingClientRect().left;
            this.authIconHover = hover;
            this.authsDisplay = hover;
        }
    },

    created(){
        console.log()
    }
}
</script>

<style>
    #header-container{
        position: sticky;
        height: 85px;
        padding:  0px 40px 0 40px;
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        background-color: #FBFCFC;
        border-bottom: 1px solid grey;
    }

    #header-container .app-name{
        cursor: pointer;
        user-select: none;
        color: orange;
        font-size: 45px;
        padding-bottom: 5px;
    }

    #search-container{
        display: flex;
        width: 39%;
    }

    #search-container .search-input{
        background-color: #F0F3F4;
        border-radius: 5px 0 0px 5px;
        border-style: none;
        font-size: 18px;
        height: 45px;
        padding-left: 8px;
        outline: none;
        width: 90%;
        border-top: 2px solid orange;
        border-left: 2px solid orange;
        border-bottom: 2px solid orange ;
    }

    #search-container #search-icon{
        padding-top: 2px;
        text-align: center;
        font-weight: 700;
        font-size: 30px;
        color: #fff;
        width: 10%;
        background-color: orange;
        border-radius: 0 5px 5px 0 ;
    }

    #auths-login-container{
        height: 100%;
        width: 16%;
        display: flex;
        justify-content: space-between;
        align-items:  center;
    }

    #auths-login-container .bracket{
        width: 2px;
        height: 60px;
        border-radius: 2px;
        background-color: orange;
    }

    #cart-container{
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
    }

    #cart-icon{
        display: flex;
        align-items: center;
        flex-direction: column;
    }

    #cart-count{
        position: absolute;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background-color: red;
        color: #fff;
        text-align: center;
        font-size: 5px;
    }

    #cart-container #cart-icon .icon{
        transition: all 500ms;
        font-size: 35px;
    }

    #cart-container span,
    #auths-container span{
        user-select: none;
        margin-left: 3px;
        font-size: 15px;
        transition: all 500ms;
    }

    .iconhover{
        color: orange;
        transform-origin: 500ms color;
    }

    #auths-container{
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
    }

    #auths-container i{
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
    }

    #auths-container i{
        height: 100%;
        transition: all 500ms;
        font-size: 35px;
    } 

    #auths{
        border: 0.1rem solid #F8F9F9;
        display: flex;
        flex-direction: column;
        padding: 20px;
        position: fixed;
        border-radius: 5px;
        top: 75px;
        height: 160px;
        width: 200px;
        background-color: #fefefe;
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    }

    #triangle{
        position: fixed;
        top: 61px;
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 0 15px 15px 15px;
        border-color: transparent transparent #F8F9F9 transparent;
        -webkit-filter: drop-shadow(rgba(0, 0, 0, 0.24) 0px 0px 6px);
        filter: drop-shadow(rgba(0, 0, 0, 0.24) 0px 0px 6px);
    }

    .auths-button{
        border: 1px solid #D5DBDB;
        border-radius: 5px;
        display: flex;
        align-items: center;
        padding-left: 15px;
        width: 100%;
        height: 35px;
        margin-bottom: 10px;
        background-color: #fff;
        cursor: pointer;
        transition: all 500ms;
    }

    .auths-button:hover{
        background-color: orange;
        transition: all 500ms;
    }

    .auths-button:hover i{
        color: #FFF;
        transition: all 500ms;
    }

    .auths-button:hover i{
        color: #FFF;
        transition: all 500ms;
    }

    .auths-button:hover span{
        color: #FFF;
        transition: all 500ms;
    }

    .auths-button i{
        margin-right: 5px;
        font-size: 25px;
        color: orange;
        transition: all 500ms;
    }

    .auths-button span{
        user-select: none;
        transition: all 500ms;
    }
</style>