<template>
    <div id="header-container">
        <h1 @click="$router.push('/')" class="app-name">Book Shop</h1>
        <div :class="{'search-container-selected' : searchContainerClicked}" ref="searchContainerRef" @click="searchContainerClickedMethod" id="search-container">
            <input v-model="searchedPattern" :class="{'search-input-selected' : searchContainerClicked}" type="text" class="search-input" placeholder="Ara ..">
            <i :class="{'search-icon-selected' : searchContainerClicked}" id="search-icon" class="bi bi-search"></i>
        </div>
        <div id="auths-login-user-profile-container">
            <div id="cart-container" @mouseenter="cartIconHover = !cartIconHover" @mouseleave="cartIconHover = false">
                <div :class="{iconhover : cartIconHover}" id="cart-icon">
                    <div><span v-if="basketItems>0" id="cart-count">1</span></div>
                    <i class="bi bi-cart3 icon"></i>
                </div>
                <span :class="{iconhover : cartIconHover}">Sepetim</span>
            </div>
            <div class="bracket"></div>
            <div v-if="getUserProfileGetter == null" @click="navigateTo('LoginPage')" ref="authContainerRef" id="auths-container" @mouseenter="authsDisplayAndHover(true)" @mouseleave="authsDisplayAndHover(false)">
                <i :class="{iconhover : authIconHover}" class="bi bi-person"></i>
                <span :class="{iconhover : authIconHover}">Giriş Yap</span>
            </div>
            <div v-else id="user-profile-container">
                <img id="user-profile-avatar" :src="getBookPictureUrl(getUserProfileGetter.pictureUrl)" alt="">
                <div>{{ getUserProfileGetter.firstName }}</div>
            </div>
        </div>
    </div>
    <div @mousemove="authsDisplayAndHover(true)" @mouseleave="authsDisplayAndHover(false)" :style="{left : cardLocationLeft - 40 + 'px' }" v-if="authsDisplay" id="auths">
        <div :style="{left : cardLocationLeft + 40 + 'px' }" id="triangle"></div>
        <ul>
            <li>
                <div @click="navigateTo('LoginPage')" class="auths-button" id="login">
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
                <div @click="navigateTo('RegisterPage')" class="auths-button" id="login">
                    <i class="bi bi-person-fill-add"></i>
                    <span>Kaydol</span>
                </div>
            </li>
        </ul>
    </div>
    <div v-if="searchContainerClicked" id="search-view-popup" :style="{left : searchContainerLocationLeft+'px'}">
        <div v-if="getSearchedBooks.length != 0" class="results-container"  id="search-result-books">
            <div class="results-container">
                <div :class="{'clicked-header' : bookSearchContainerClick}" @click="bookSearchContainerClick = !bookSearchContainerClick" class="search-results-container-header">
                    <span class="search-results-container-header-title">Kitaplar</span>
                    <i v-show="bookSearchContainerClick"  class="bi bi-chevron-up search-results-container-header-icon"></i>
                    <i v-show="bookSearchContainerClick == false" class="bi bi-chevron-down search-results-container-header-icon"></i>
                </div>
                <ul v-if="bookSearchContainerClick == false">
                    <li @click="searchResultClick(book)" v-for="book in getSearchedBooks" class="search-result">{{ book.name }}</li>
                </ul>
            </div>
        </div>
        <div v-if="searchedAuthors.length != 0" class="results-container" id="search-result-authors">
            <div class="results-container">
                <div :class="{'clicked-header' : authorSearchContainerClick}" @click="authorSearchContainerClick = !authorSearchContainerClick" class="search-results-container-header">
                    <span class="search-results-container-header-title">Yazarlar</span>
                    <i v-show="authorSearchContainerClick"  class="bi bi-chevron-up search-results-container-header-icon"></i>
                    <i v-show="authorSearchContainerClick == false" class="bi bi-chevron-down search-results-container-header-icon"></i>
                </div>
                <ul v-if="authorSearchContainerClick == false">
                    <li v-for="searchedAuthor in searchedAuthors" class="search-result">{{ searchedAuthor.name }}</li>
                </ul>
            </div>
        </div>
        <div v-if="searchedCategories.length != 0" class="results-container" id="search-result-categories">
            <div class="results-container">
                <div :class="{'clicked-header' : categorySearchContainerClick}" @click="categorySearchContainerClick = !categorySearchContainerClick" class="search-results-container-header">
                    <span class="search-results-container-header-title">Kategoriler</span>
                    <i v-show="categorySearchContainerClick"  class="bi bi-chevron-up search-results-container-header-icon"></i>
                    <i v-show="categorySearchContainerClick == false" class="bi bi-chevron-down search-results-container-header-icon"></i>
                </div>
                <ul v-if="categorySearchContainerClick == false">
                    <li v-for="searchedCategory in searchedCategories" class="search-result">{{ searchedCategory.categoryName }}</li>
                </ul>
            </div>
        </div>
        <div v-if="searchedPublishers.length != 0" class="results-container" id="search-result-publishers">
            <div class="results-container">
                <div :class="{'clicked-header' : publisherSearchContainerClick}" @click="publisherSearchContainerClick = !publisherSearchContainerClick" class="search-results-container-header">
                    <span class="search-results-container-header-title">Yayıncılar</span>
                    <i v-show="publisherSearchContainerClick"  class="bi bi-chevron-up search-results-container-header-icon"></i>
                    <i v-show="publisherSearchContainerClick == false" class="bi bi-chevron-down search-results-container-header-icon"></i>
                </div>
                <ul v-if="publisherSearchContainerClick == false">
                    <li v-for="searchedPublisher in searchedPublishers" class="search-result">{{ searchedPublisher.name }}</li>
                </ul>
            </div>
        </div>
    </div>
    <CategoriesComponent/>
</template>

<script>
import CategoriesComponent from '@/pages/user/components/CategoriesComponent';
import { mapGetters,mapActions } from 'vuex';

export default{
    components:{
        CategoriesComponent
    },

    data(){
        return{
            bookSearchContainerClick : false,
            authorSearchContainerClick : false,
            categorySearchContainerClick : false,
            publisherSearchContainerClick : false,
            cartIconHover : false,
            authIconHover : false,
            authsDisplay : false,
            cardLocationLeft : 0,
            searchContainerLocationLeft : 0,
            searchContainerClicked : false,
            searchedCategories : [],
            searchedPublishers : [],
            searchedAuthors : [],
            basketItems : 0,
            searchedPattern : ""
        }
    },

    computed:{
        ...mapGetters({
            getUserId : "AuthModule/_getUserId",
            getUserProfileGetter : "AuthModule/_getUserProfile",
            getSearchedBooks : "BookModule/_getSearchBooks",
            getAllAuthor :"AuthorModule/_getAll",
            getAllCategory : "CategoryModule/_getAll",
            getAllPublisher : "PublisherModule/_getAll",
        })
    },
    
    methods:{
        ...mapActions({
            getUserProfile : "AuthModule/getUserProfile",
            getBookByNamePattern : "BookModule/getBooksByPattern"
        }),
        authsDisplayAndHover(hover){
            this.cardLocationLeft =  this.$refs.authContainerRef.getBoundingClientRect().left;
            this.authIconHover = hover;
            this.authsDisplay = hover;
        },
        searchContainerClickedMethod(){
            this.searchContainerClicked = true
            this.searchContainerLocationLeft = this.$refs.searchContainerRef.getBoundingClientRect().left;
        },
        navigateTo(pageName){
            this.$router.push({
                name : pageName,
            });
        },
        getBookPictureUrl(pictureUrl){
            if(pictureUrl==null)
                return require("@/assets/no-user-image.jpg");
            return pictureUrl;
        },
        ignoreSearchPopUpElement(){
            document.querySelector("#app").addEventListener("click",(e) =>{
            if(e.srcElement.id == "search-view-popup")
                return;
            if(e.srcElement.parentElement.id == "search-container")
                return;
            if(e.srcElement.className == "search-result")
                return;
            if(e.srcElement.parentElement.className == "results-container")
                return;
            if(e.srcElement.className == "search-results-container-header-title")
                return;
            if(e.srcElement.classList[2] == "search-results-container-header-icon")
                return;

            this.searchContainerClicked = false;
        })
        },
        searchCategory(regex){
            this.searchedCategories = [];
            this.getAllCategory.forEach(category => {
                if(category.categoryName.match(regex)){
                    this.searchedCategories.push(category);
                }
            });
        },
        searchPublisher(regex){
            this.searchedPublishers = [];
            this.getAllPublisher.forEach(publisher => {
                if(publisher.name.match(regex)){
                    this.searchedPublishers.push(publisher);
                }
            });
        },
        searchAuthor(regex){
            this.searchedAuthors = [];
            this.getAllAuthor.forEach(author => {
                if(author.name.match(regex)){
                    this.searchedAuthors.push(author);
                }
            });
        },
        searchBook(pattern){
            this.getBookByNamePattern({
                page : 0,
                size : 10,
                pattern
            });
        },
        search(pattern){
            if(pattern != ""){
                var regex = new RegExp('^' + pattern, 'i');
                this.searchAuthor(regex);
                this.searchCategory(regex);
                this.searchPublisher(regex);
                this.searchBook(pattern);
            }
        },
        searchResultClick(book){
            this.$store.state.BookModule.selectedBookId = book.id;
            this.$router.push({
                name : "BookDetailPage",
                params : {
                    bookName : book.name.toLowerCase().replace(/\s+/g, "-")
                }
            });
        }
    },

    watch:{
        getUserId(newValue,oldValue){
            if(newValue != 0)
                this.getUserProfile(this.getUserId);
            if(newValue != oldValue && newValue != 0)
                this.getUserProfile(this.getUserId);
        },
        searchedPattern(newValue,oldValue){
            this.search(newValue);
        }
    },

    updated(){
        this.ignoreSearchPopUpElement();
    },

    mounted(){
        if(this.getUserId != 0)
            this.getUserProfile(this.getUserId);
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
        border-bottom: 1px solid #EAEDED;
        width: 100%;
    }

    #header-container .app-name{
        cursor: pointer;
        user-select: none;
        color: orange;
        font-size: 45px;
        padding-bottom: 5px;
    }

    /* search */
    #search-container{
        display: flex;
        width: 40%;
    }

    .search-input-selected{
        border-bottom-left-radius: 0px !important;
    }

    .search-icon-selected{
        border-bottom-right-radius: 0px !important;
    }

    .search-container-selected{
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
        transition: all 250ms;
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
        transition: all 250ms;
    }

    .clicked-header{
        border-bottom: 1.5px solid #EAEDED;
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
        cursor: pointer;
        transition: all 250ms;
    }

    #search-view-popup{
        padding: 10px 20px 5px 20px ;
        z-index: 200;
        position: absolute;
        background-color: #F8F9F9;
        top: 63px;
        width:572.3px;
        height: auto;
        min-height: 100px;
        max-height: 550px;
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
        border-radius: 0 0 5px 5px;
        border: 2px solid orange;
        display: flex;
        flex-direction: column;
        overflow-y: auto;
    }

    .results-container{
        display: flex;
        flex-direction: column;
    }

    .results-container li:last-child{
        border-bottom: none !important;
    }

    .search-results-container-header{
        color: orange;
        user-select: none;
        cursor: pointer;
        transition: all 500ms;
    }

    .search-results-container-header span{
        margin-right: 5px;
    }

    .search-results-container-header:hover span{
        border-bottom: 2px solid orange;
    }

    .search-result{
        font-weight: 400;
        font-size: 15px;
        padding-left: 5px;
        height: 30px;
        user-select: none;
        cursor: pointer;
        border-bottom: 1.5px solid #EAEDED;
        padding-top: 5px;
    }

    .search-result:hover{
        background-color: #EAEDED;
        border-radius: 5px;
    }

    /* search end */

    #user-profile-container{
        display: flex;
        height: 100%;
        width: 40%;
        justify-content:space-between ;
        align-items: center;
        cursor: pointer;
    }

    #user-profile-container div{
        display: block;
        user-select: none;
        color: orange;
        font-size: 20px;
    }

    #user-profile-avatar{
        width: 45px;
        height: 45px;
        margin-right: 5px;
        border-radius: 50%;
        border: 1px solid #F39C12;
    }

    #auths-login-user-profile-container{
        height: 100%;
        width: 20%;
        display: flex;
        justify-content: center;
        align-items: center;
        align-items:  center;
    }

    #auths-login-user-profile-container .bracket{
        margin-left: 15px;
        margin-right: 15px;
        width: 1.5px;
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

    #cart-container span{
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

    #auths-container span{
        display: inline-block;

        width: 80px;
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
        z-index: 200;
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