<template>
    <div id="header-container">
        <h1 @click="$router.push('/')" class="app-name">Book Shop</h1>
        <div :class="{'search-container-selected' : searchContainerClicked}" ref="searchContainerRef" @click="searchContainerClickedMethod" id="search-container">
            <input v-model="searchedPattern" :class="{'search-input-selected' : searchContainerClicked}" type="text" class="search-input" placeholder="Ara ..">
            <i :class="{'search-icon-selected' : searchContainerClicked}" id="search-icon" class="bi bi-search"></i>
        </div>
        <div id="auths-login-user-profile-container">
            <div ref="cartContainerRef" id="cart-container" @mouseenter="cartViewDisplayAndHover(true)" @mouseleave="cartViewDisplayAndHover(false)">
                <div :class="{iconhover : cartIconHover}" id="cart-icon">
                    <div><span v-if="basketItemsQuantity>0" id="cart-count">{{ basketItemsQuantity }}</span></div>
                    <i class="bi bi-cart3 icon"></i>
                </div>
                <span :class="{iconhover : cartIconHover}">Sepetim</span>
            </div>
            <div class="bracket"></div>
            <div v-if="getUserProfileGetter == null" @click="navigateTo('LoginPage')" ref="authContainerRef" id="auths-container" @mouseenter="authsDisplayAndHover(true)" @mouseleave="authsDisplayAndHover(false)">
                <i :class="{iconhover : authIconHover}" class="bi bi-person"></i>
                <span :class="{iconhover : authIconHover}">Giriş Yap</span>
            </div>
            <div @click="navigateTo('UserInformationPage')" v-else ref="userProfileContainerRef" @mousemove="userProfileDisplayAndHover(true)" @mouseleave="userProfileDisplayAndHover(false)" id="user-profile-container">
                <img id="user-profile-avatar" :src="getUserPictureUrl(getUserProfileGetter.pictureUrl)" :alt="getUserProfileGetter.firstName + ' Picture'">
                <div>{{ getUserProfileGetter.firstName }}</div>
            </div>
        </div>
    </div>
    <div @mousemove="authsDisplayAndHover(true)" @mouseleave="authsDisplayAndHover(false)" :style="{left : authLocationLeft - 40 + 'px' }" v-if="authsDisplay" id="auths">
        <div :style="{left : 75 + 'px' }" class="triangle"></div>
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
    <div v-if="searchContainerClicked" id="search-view-popup" :style="{left : searchContainerLocationLeft+'px',width : searchContainerWidth+'px'}">
        <div v-if="getSearchedBooks.length != 0" class="results-container"  id="search-result-books">
            <div class="results-container">
                <div :class="{'clicked-header' : bookSearchContainerClick}" @click="bookSearchContainerClick = !bookSearchContainerClick" class="search-results-container-header">
                    <span class="search-results-container-header-title">Kitaplar</span>
                    <i v-show="bookSearchContainerClick"  class="bi bi-chevron-up search-results-container-header-icon"></i>
                    <i v-show="bookSearchContainerClick == false" class="bi bi-chevron-down search-results-container-header-icon"></i>
                </div>
                <ul v-if="bookSearchContainerClick == false">
                    <li @click="navigateBookDetailPage(book)" v-for="book in getSearchedBooks" class="search-result">{{ book.name }}</li>
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
                    <li @click="navigateAuthorDetailPage(searchedAuthor)" v-for="searchedAuthor in searchedAuthors" class="search-result">{{ searchedAuthor.name }}</li>
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
                    <li @click="navigatePublisherDetailPage(searchedPublisher)" v-for="searchedPublisher in searchedPublishers" class="search-result">{{ searchedPublisher.name }}</li>
                </ul>
            </div>
        </div>
    </div>
    <div @mousemove="cartViewDisplayAndHover(true)" @mouseleave="cartViewDisplayAndHover(false)" v-if="cardViewDisplay == true && getBasketItems && getBasketItems.length> 0" id="basket-view-popup" :style="{left : cartLocationLeft- 400 + 'px'}">
        <div :style="{right : 40 + 'px'}" class="triangle"></div>
        <div id="basket-view-popup-content">
            <div id="basket-view-popup-title">Sepetim</div>
            <div id="basket-view-popup-basket-items">
                <ul>
                    <li v-for="basketItem in getBasketItems" :key="basketItem.basketItemId">
                        <div class="basket-view-popup-basket-item">
                            <img :src="getBookPictureUrl(basketItem.bookPictureUrl)" alt="">
                            <div class="basket-item-explantation">
                                <div class="basket-item-titles">
                                    <span class="basket-item-name">{{ basketItem.bookName }}</span>
                                    <span class="basket-item-publisher-name">{{ getSelectedPublisher(basketItem.publisherId) }}</span>
                                </div>
                                <div class="basket-item-quantity-and-price">
                                    <div class="basket-item-quantity">
                                        <span @click="decreaseBasketItemQuantity(basketItem)" class="basket-item-decrease">-</span>
                                        <span class="basket-item-quantity">{{ basketItem.quantity }}</span>
                                        <span @click="increaseBasketItemQuantity(basketItem)" class="basket-item-increase">+</span>
                                        <i @click="deleteBasketItem(basketItem)" class="bi bi-trash basket-item-delete"></i>
                                    </div>
                                    <div class="basket-item-price">
                                        {{ basketItem.price * basketItem.quantity }} TL 
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>                    
                </ul>
            </div>
            <div id="basket-view-popup-result">
                <div id="basket-view-popup-result-total-price">
                    <span>Toplam Tutar</span>
                    <span>{{ totalPrice() }} TL</span>
                </div>
                <button id="navigate-basket">Sepete Git</button>
            </div>
        </div>
    </div>
    <div v-if="userProfilePopupDisplay" :style="{left : userProfilePopupLeftLocation - 85+ 'px'}" @mousemove="userProfileDisplayAndHover(true)" @mouseleave="userProfileDisplayAndHover(false)" id="user-profile-popup">
        <div :style="{right : 28 + 'px'}" class="triangle"></div>
        <div @click="navigateTo('UserInformationPage')" id="user-information" class="user-profile-button">
            <i class="bi bi-person"></i>
            <span>Kullanıcı Bilgilerim</span>
        </div>
        <div @click="navigateTo('UserOrderPage')" class="user-profile-button">
            <i class="bi bi-box2"></i>
            <span>Siparişlerim</span>
        </div>
        <div @click="navigateTo('UserMessagePage')" class="user-profile-button">
            <i class="bi bi-envelope"></i>
            <span>Mesajlarım</span>
        </div>
        <div @click="navigateTo('UserCommentPage')" class="user-profile-button">
            <i class="bi bi-chat-dots"></i>
            <span>Değerlendirmelerim</span>
        </div>
        <div class="user-profile-button">
            <i class="bi bi-box-arrow-right"></i>
            <span>Çıkış Yap</span>
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
            cardViewDisplay : false,
            authIconHover : false,
            authsDisplay : false,
            authLocationLeft : 0,
            cartLocationLeft : 0,
            userProfilePopupLeftLocation : 0,
            userProfilePopupDisplay : false,
            searchContainerLocationLeft : 0,
            searchContainerWidth : 0,
            searchContainerClicked : false,
            searchedCategories : [],
            searchedPublishers : [],
            searchedAuthors : [],
            basketItemsQuantity : 0,
            searchedPattern : "",
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
            getBasketItems : "BasketModule/_getSelectedBasketItems",
            getBasketId: "BasketModule/_getSelectedBasketId",
            getSelectedBook : "BookModule/_getSelectedBook"
        })
    },
    
    methods:{
        ...mapActions({
            getUserProfile : "AuthModule/getUserProfile",
            getBookByNamePattern : "BookModule/getBooksByPattern",
            getSelectedUserBasket : "BasketModule/getSelectedUserBasket",
            addBasket : "BasketModule/addBasket",
            deleteBasketItemAction : "BasketModule/deleteBasketItem",
            updateBasketItem : "BasketModule/updateBasketItem",
            getBookById : "BasketModule/getBookById",
        }),
        authsDisplayAndHover(hover){
            this.authLocationLeft=  this.$refs.authContainerRef.getBoundingClientRect().left;
            this.authIconHover = hover;
            this.authsDisplay = hover;
        },
        cartViewDisplayAndHover(hover){
            this.cartLocationLeft = this.$refs.cartContainerRef.getBoundingClientRect().left;
            this.cartIconHover = hover;
            this.cardViewDisplay = hover;

            if(this.getUserProfileGetter != null && this.getUserId != 0)
                if(this.getUserProfileGetter.basketId == 0)
                    this.addBasket(this.getUserId);

        },
        userProfileDisplayAndHover(hover){
            this.userProfilePopupLeftLocation = this.$refs.userProfileContainerRef.getBoundingClientRect().left;
            this.userProfilePopupDisplay = hover;
        },
        searchContainerClickedMethod(){
            this.searchContainerClicked = true
            this.searchContainerLocationLeft = this.$refs.searchContainerRef.getBoundingClientRect().left;
            this.searchContainerWidth = this.$refs.searchContainerRef.offsetWidth;
        },
        navigateTo(pageName){
            this.$router.push({
                name : pageName,
            });
        },
        getUserPictureUrl(pictureUrl){
            if(pictureUrl==null)
                return require("@/assets/no-user-image.jpg");
            return pictureUrl;
        },
        getBookPictureUrl(pictureUrl){
            if(pictureUrl=="")
                return require("@/assets/no-image-available.jpg");
            return pictureUrl;
        },
        ignoreSearchPopUpElement(){
            document.querySelector("#app").addEventListener("click",(e) =>{
            if(e.srcElement.id == "search-view-popup")
                return;
            if(e.srcElement.parentElement != null && e.srcElement.parentElement.id == "search-container")
                return;
            if(e.srcElement.className == "search-result")
                return;
            if(e.srcElement.parentElement != null && e.srcElement.parentElement.className == "results-container")
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

            if(pattern == ""){
                this.searchedCategories = [];
                this.searchedPublishers = [];
                this.searchedAuthors = [];
                this.searchBook(pattern);
            }
        },
        navigateBookDetailPage(book){
            this.$store.state.BookModule.selectedBookId = book.id;
            this.$router.push({
                name : "BookDetailPage",
                params : {
                    bookName : book.name.toLowerCase().replace(/\s+/g, "-")
                }
            });
        },
        deleteBasketItem(basketItem){
            this.deleteBasketItemAction({
                userId : this.getUserId,
                basketId : this.getBasketId,
                basketItemId : basketItem.basketItemId
            });
            this.getSelectedUserBasket(this.getUserId);
        },
        totalPrice(){
            let price = 0;
            this.getBasketItems.forEach(basketItem => {
                price += basketItem.quantity * basketItem.price
            });
            return price;
        },
        getSelectedPublisher(publisherId){
            var selectedPublisher = this.getAllPublisher.find(publisher => publisher.id == publisherId);
            return selectedPublisher.name;
        },
        decreaseBasketItemQuantity(basketItem){
            if(basketItem.quantity -1 != 0)
                this.updateBasketItem({
                    userId : this.getUserId,
                    basketId : this.getBasketId,
                    basketItemId : basketItem.basketItemId,
                    quantity : basketItem.quantity -1
                });
        },
        increaseBasketItemQuantity(basketItem){
            this.getBookById(basketItem.bookId);
            if(basketItem.quantity + 1 != this.getSelectedBook.stock)
                this.updateBasketItem({
                    userId : this.getUserId,
                    basketId : this.getBasketId,
                    basketItemId : basketItem.basketItemId,
                    quantity : basketItem.quantity +1
                });
        },
        navigatePublisherDetailPage(publisher){
            this.$store.state.PublisherModule.selectedPublisherId = publisher.id;
            this.$router.push({
                name : "PublisherDetailPage",
                params : {
                    publisherName : publisher.name.toLowerCase().replace(/\s+/g, "-")
                }
            });    
        },
        navigateAuthorDetailPage(author){
            this.$store.state.AuthorModule.selectedAuthorId = author.id;
            this.$router.push({
                name : "AuthorDetailPage",
                params : {
                    authorName : author.name.toLowerCase().replace(/\s+/g, "-")
                }
            });
        },
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
        },
        getUserProfileGetter(){
            this.getSelectedUserBasket(this.getUserId);
        },
        getBasketItems(){
            this.basketItemsQuantity = 0;
            this.getBasketItems.forEach(basketItem => {
                this.basketItemsQuantity += basketItem.quantity;
            });
        },
        getBookPictureUrl(pictureUrl){
            if(pictureUrls==null)
                return require("@/assets/no-image-available.jpg");
            return pictureUrls;
        },
    },

    updated(){
        this.ignoreSearchPopUpElement();
        this.searchContainerWidth = this.$refs.searchContainerRef.offsetWidth;
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

    /* User Profile Start */
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

    #user-profile-popup{
        padding: 10px 5px 3px 5px;
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 75px;
        width: 205px;
        height: 220px;
        background-color: #fefefe;
        border: 0.1rem solid #F8F9F9;
        border-radius: 5px;
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
        z-index: 200;
    }

    .user-profile-button{
        height: 40px;
        display: flex;
        flex-direction: row;
        align-items: center;
        user-select: none;
        cursor: pointer;
        margin-bottom: 5px;
        border-radius: 3px;
        padding: 3px 3px 3px 10px;
    }

    .user-profile-button .bi-person{
        font-size: 24px;
        margin-right: 9px;
    }

    .user-profile-button i{
        font-size: 20px;
        margin-right: 12px;
    }

    .user-profile-button span{
        font-size: 15px;
    }

    #user-information{
        padding: 3px 3px 3px 7px !important;
    }

    .user-profile-button:hover{
        background-color: #F8C471;
        color: #FFF;
    }

    /* User Profile End */

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

    /* basket start*/
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
    
    #basket-view-popup{
        padding: 10px;
        border: 0.1rem solid #F8F9F9;
        top: 75px;
        width: 500px;
        min-height: 150px;
        z-index: 200;
        border-radius: 5px;
        position: absolute;
        background-color: #fefefe;
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    }

    #basket-view-popup-title{
        font-size: 18px;
        color: orange;
        border-bottom: 1.5px solid #EAEDED;
        height: 30px;
    }

    #basket-view-popup-basket-items{
        overflow-y:auto;
        min-height: 80px;
        max-height: 250px;
    }

    #basket-view-popup-basket-items .basket-view-popup-basket-item:last-child{
        border-bottom: none;
    }

    .basket-view-popup-basket-item{
        cursor: pointer;
        background-color: #fefefe;
        width: 100%;
        height: 85px;
        border-bottom: 2px solid #EAEDED;
    }

    .basket-view-popup-basket-item:hover{
        background-color: #F8F9F9;
        border-radius: 3px;
    }

    .basket-view-popup-basket-item{
        padding: 5px 10px 5px 10px;
        display: flex;
        flex-direction: row;
        justify-content: left;
        align-items: center;
    }

    .basket-view-popup-basket-item img{
        width: 55px;
        height: 75px;
        object-fit: cover;
        border: 1.5px solid #EAECEE;
        margin-right: 10px;
    }

    .basket-item-explantation{
        height: 70%;
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }   

    .basket-item-titles{
        display: flex;
        flex-direction: column;
        height: 100%;
    }

    .basket-item-name{
        color: orange;
        font-size: 19px;
        margin-bottom: 0.5px;
    }

    .basket-item-publisher-name{
        font-size: 15px;
        color: #F5B041;
    }

    .basket-item-quantity-and-price{
        display: flex;
        flex-direction: column;
        height: 100%;
    }

    .basket-item-quantity{
        display: flex;
    }

    .basket-item-decrease,
    .basket-item-increase{
        width: 20px;
        height: 20px;
        text-align: center;
        border-radius: 3px;
        background-color: #E5E7E9;
        font-size: 15px;
    }

    .basket-item-increase{
        margin-right: 10px;
    }

    .basket-item-quantity{
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 16px;
        min-width: 25px;
    }

    .basket-item-delete:hover{
        color: #E74C3C;
    }

    .basket-item-price{
        color: orange;
        text-align: right;
        margin-top: 10px;
        font-size: 20px;
    }

    #basket-view-popup-result{
        height: 50px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        border-top: 1.5px solid #EAECEE;
    }

    #basket-view-popup-result-total-price span:first-child{
        font-size: 18px;
        color: #F5B041;
        margin-right: 10px;
    }

    #basket-view-popup-result-total-price span:last-child{
        font-size: 20px;
        color: #F5B041;
    }

    #navigate-basket{
        margin-top: 7px;
        cursor: pointer;
        width: 100px;
        height: 30px;
        border-radius: 5px;
        border: 2px solid #EAEDED;
        color:#17202A ;
    }

    /* basket end */

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
        position: absolute;
        border-radius: 5px;
        top: 75px;
        height: 160px;
        width: 200px;
        background-color: #fefefe;
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
        z-index: 200;
    }

    .triangle{
        position: absolute;
        width: 0;
        height: 0;
        top: -15px;
        border-style: solid;
        border-width: 0 15px 15px 15px;
        border-color: transparent transparent #f8f9f9 transparent;
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