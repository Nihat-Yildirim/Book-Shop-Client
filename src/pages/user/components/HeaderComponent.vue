<template>
    <div id="header-container">
        <h1 @click="$router.push('/')" class="app-name">Book Shop</h1>
        <div id="search-container" class="search-container-element">
            <div class="search-container-element" :class="{'search-container-selected' : searchContainerClicked}" @click="searchContainerClicked = true" id="search-input-container">
                <input v-model="searchedPattern" :class="{'search-input-selected' : searchContainerClicked}" type="text" class="search-input search-container-element" placeholder="Ara ..">
                <i :class="{'search-icon-selected' : searchContainerClicked}" id="search-icon" class="bi bi-search search-container-element"></i>
            </div>
            <div class="search-container-element" v-if="searchContainerClicked" id="search-view-container">
                <div v-if="searchedBookDatas.length != 0" class="results-container search-container-element"  id="search-result-books">
                    <div class="results-container search-container-element">
                        <div :class="{'clicked-header' : bookSearchContainerClick}" @click="bookSearchContainerClick = !bookSearchContainerClick" class="search-results-container-header search-container-element">
                            <span class="search-results-container-header-title search-container-element">Kitaplar</span>
                            <i v-show="bookSearchContainerClick"  class="bi bi-chevron-up search-results-container-header-icon search-container-element"></i>
                            <i v-show="bookSearchContainerClick == false" class="bi bi-chevron-down search-results-container-header-icon search-container-element"></i>
                        </div>
                        <ul class="search-container-element" v-if="bookSearchContainerClick == false">
                            <li @click="navigateBookDetailPage(book)" v-for="book in searchedBookDatas" class="search-container-element search-result">{{ book.name }}</li>
                        </ul>
                    </div>
                </div>
                <div v-if="searchedAuthorDatas.length != 0" class="results-container search-container-element" id="search-result-authors">
                    <div class="results-container search-container-element">
                        <div :class="{'clicked-header' : authorSearchContainerClick}" @click="authorSearchContainerClick = !authorSearchContainerClick" class="search-results-container-header search-container-element">
                            <span class="search-results-container-header-title search-container-element">Yazarlar</span>
                            <i v-show="authorSearchContainerClick"  class="bi bi-chevron-up search-results-container-header-icon search-container-element"></i>
                            <i v-show="authorSearchContainerClick == false" class="bi bi-chevron-down search-results-container-header-icon search-container-element"></i>
                        </div>
                        <ul class="search-container-element" v-if="authorSearchContainerClick == false">
                            <li @click="navigateAuthorDetailPage(searchedAuthor)" v-for="searchedAuthor in searchedAuthorDatas" class="search-result search-container-element">{{ searchedAuthor.name }}</li>
                        </ul>
                    </div>
                </div>
                <div v-if="searchedPublisherDatas.length != 0" class="results-container search-container-element" id="search-result-publishers">
                    <div class="results-container search-container-element">
                        <div :class="{'clicked-header' : publisherSearchContainerClick}" @click="publisherSearchContainerClick = !publisherSearchContainerClick" class="search-container-element search-results-container-header">
                            <span class="search-results-container-header-title search-container-element">Yayıncılar</span>
                            <i v-show="publisherSearchContainerClick"  class="bi bi-chevron-up search-results-container-header-icon search-container-element"></i>
                            <i v-show="publisherSearchContainerClick == false" class="bi bi-chevron-down search-results-container-header-icon search-container-element"></i>
                        </div>
                        <ul v-if="publisherSearchContainerClick == false">
                            <li @click="navigatePublisherDetailPage(searchedPublisher)" v-for="searchedPublisher in searchedPublisherDatas" class="search-result search-container-element">{{ searchedPublisher.name }}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div id="auths-login-user-profile-container">
            <div id="cart-container">
                <div @click="navigateBasketDetailPage" ref="cartContainerRef" id="cart-header" @mouseenter="cartViewHover = true" @mouseleave="cartViewHover = false">
                    <div :class="{iconhover : cartViewHover}" id="cart-icon">
                        <div><span v-if="basketItemsQuantity>0" id="cart-count">{{ basketItemsQuantity }}</span></div>
                        <i class="bi bi-cart3 icon"></i>
                    </div>
                    <span :class="{iconhover : cartViewHover}">Sepetim</span>
                </div>
                <div v-if="cartViewHover && getBasketItems.length > 0" @mousemove="cartViewHover = true" @mouseleave="cartViewHover = false"  id="basket-view-popup">
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
                                                <span class="basket-item-publisher-name">{{ basketItem.publisher.name }}</span>
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
                            <button @click="navigateBasketDetailPage" id="navigate-basket">Sepete Git</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="bracket"></div>
            <div v-if="getUserProfileGetter == null" id="auths-container">
                <div @click="navigateTo('LoginPage')" id="auths-header" @mouseenter="authViewHover = true" @mouseleave="authViewHover = false">
                    <i :class="{iconhover : authIconHover}" class="bi bi-person"></i>
                    <span :class="{iconhover : authIconHover}">Giriş Yap</span>
                </div>
                <div @mousemove="authViewHover = true" @mouseleave="authViewHover = false" v-if="authViewHover" id="auths">
                    <div :style="{left : 75 + 'px' }" class="triangle"></div>
                    <ul>
                        <li>
                            <div @click="navigateTo('LoginPage')" class="auths-button" id="login">
                                <i class="bi bi-person-fill"></i>
                                <span>Giriş</span>
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
            </div>
            <div v-if="getUserProfileGetter != null" id="user-profile-container">
                <div @click="navigateTo('UserInformationPage')" @mousemove="userProfileHover = true" @mouseleave="userProfileHover = false" id="user-profile-header">
                    <img id="user-profile-avatar" :src="getUserPictureUrl(getUserProfileGetter.pictureUrl)" :alt="getUserProfileGetter.firstName + ' Picture'">
                    <div>{{ getUserProfileGetter.firstName }}</div>
                </div>
                <div v-if="userProfileHover && getUserProfileGetter != null" @mousemove="userProfileHover = true" @mouseleave="userProfileHover = false" id="user-profile-popup">
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
                    <div @click="navigateTo('UserFavoriteBookPage')" class="user-profile-button">
                        <i class="bi bi-heart"></i>
                        <span>Favorilerim</span>
                    </div>
                    <div @click="navigateTo('UserCommentPage')" class="user-profile-button">
                        <i class="bi bi-chat-dots"></i>
                        <span>Değerlendirmelerim</span>
                    </div>
                    <div @click="exitAccount" class="user-profile-button">
                        <i class="bi bi-box-arrow-right"></i>
                        <span>Çıkış Yap</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <CategoriesComponent/>
</template>

<script>
import CategoriesComponent from '@/pages/user/components/CategoriesComponent';
import { mapGetters,mapActions,mapMutations } from 'vuex';

export default{
    components:{
        CategoriesComponent
    },

    data(){
        return{
            bookSearchContainerClick : false,
            authorSearchContainerClick : false,
            publisherSearchContainerClick : false,
            cartViewHover : false,
            authViewHover : false,
            userProfileHover : false,
            searchContainerClicked : false,
            searchedPublisherDatas : [],
            searchedAuthorDatas : [],
            searchedBookDatas : [],
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
            getBasketItems : "BasketModule/_getSelectedBasketItems",
            getBasketId: "BasketModule/_getSelectedBasketId",
            getSelectedBook : "BookModule/_getSelectedBook",
            getRecommendBooks : "BookModule/_getRecommendBooks",
            getSearchedAuthors : "AuthorModule/_getSearchedAuthors",
            getRecommendAuthors : "AuthorModule/_getRecommendAuthors",
            getSearchedPublisher : "PublisherModule/_getSearchedPublisher",
            getRecommendPublisher : "PublisherModule/_getRecommendPublisher",
        })
    },
    
    methods:{
        ...mapActions({
            getUserProfile : "AuthModule/getUserProfile",
            getSelectedUserBasket : "BasketModule/getSelectedUserBasket",
            addBasket : "BasketModule/addBasket",
            deleteBasketItemAction : "BasketModule/deleteBasketItem",
            updateBasketItem : "BasketModule/updateBasketItem",
            addBookSearchData : "BookSearchDataModule/add",
            addAuthorSearchData : "AuthorSearchDataModule/add",
            addPublisherSearchData : "PublisherSearchDataModule/add",
            getBookByNamePattern : "BookModule/getBooksByPattern",
            getPublisherByPatternAction : "PublisherModule/getPublisherByPattern",
            getAuthorByPatternAction : "AuthorModule/getAuthorByPattern",
            getRecommendBooksForSearchAction : "BookModule/getRecommendBooksForSearch",
            getRecommendAuthorsForSearchAction :"AuthorModule/getRecommendAuthorsForSearch",
            getRecommendPublishersForSearchAction : "PublisherModule/getRecommendBooksForSearch",
        }),
        ...mapMutations({
            clearUserAccountAuthDatas : "AuthModule/clearUserAccountDatas",
            clearUserAccountAddressDatas : "AddressModule/clearUserAccountDatas",
            clearUserAccountBasketDatas : "BasketModule/clearUserAccountDatas",
            clearUserAccountBookDatas : "BookModule/clearUserAccountDatas",
            clearUserAccountCommentDatas : "CommentModule/clearUserAccountDatas",
        }),
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
            document.querySelector("#app").addEventListener('click',(e) => {
                let classNames = e.srcElement.className.split(" ");
                if(classNames.findIndex(x => x == "search-container-element") > -1)
                    return;
                else
                    this.searchContainerClicked = false;
            })
        },
        navigateBookDetailPage(book){
            this.$store.state.BookModule.selectedBookId = book.id;
            this.searchContainerClicked = false;
            this.addBookSearchData(book.id);
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

            if(this.getUserId != 0 && this.getUserId != null)
                this.getSelectedUserBasket(this.getUserId);
        },
        totalPrice(){
            let price = 0;
            this.getBasketItems.forEach(basketItem => {
                price += basketItem.quantity * basketItem.price
            });
            return price;
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
            if(basketItem.quantity + 1 != this.getSelectedBook.stock && basketItem.quantity != 10)
                this.updateBasketItem({
                    userId : this.getUserId,
                    basketId : this.getBasketId,
                    basketItemId : basketItem.basketItemId,
                    quantity : basketItem.quantity +1
                });
        },
        navigatePublisherDetailPage(publisher){
            this.$store.state.PublisherModule.selectedPublisherId = publisher.id;
            this.addPublisherSearchData(publisher.id);
            this.$router.push({
                name : "PublisherDetailPage",
                params : {
                    publisherName : publisher.name.toLowerCase().replace(/\s+/g, "-")
                }
            });    
        },
        getRecommendSearchDatas(){
            this.getRecommendBooksForSearchAction();
            this.getRecommendAuthorsForSearchAction();
            this.getRecommendPublishersForSearchAction();
        },
        navigateAuthorDetailPage(author){
            this.$store.state.AuthorModule.selectedAuthorId = author.id;
            this.addAuthorSearchData(author.id);
            this.$router.push({
                name : "AuthorDetailPage",
                params : {
                    authorName : author.name.toLowerCase().replace(/\s+/g, "-")
                }
            });
        },
        navigateBasketDetailPage(){
            if(this.getUserId != null)
                this.$router.push({
                    name : "BasketDetailPage"
                });
        },
        exitAccount(){
            this.clearUserAccountAuthDatas();
            this.clearUserAccountAddressDatas();
            this.clearUserAccountBasketDatas();
            this.clearUserAccountBookDatas();
            this.clearUserAccountCommentDatas();
            this.navigateTo("HomePage");
            this.userProfilePopupDisplay = false;
            this.authsDisplay = false;
        }
    },

    watch:{
        getUserId(newValue,oldValue){
            if(newValue != 0 && newValue != null)
                this.getUserProfile(this.getUserId);
            
            if(newValue != oldValue && newValue != 0 && newValue != null)
                this.getUserProfile(this.getUserId);
        },
        searchedPattern(){
            if(this.searchedPattern != ""){
                this.getBookByNamePattern({page : 0,size : 10,pattern : this.searchedPattern});
                this.getAuthorByPatternAction(this.searchedPattern);
                this.getPublisherByPatternAction(this.searchedPattern);
            }

            if(this.searchedPattern == "")
                this.getRecommendSearchDatas();
        },
        getUserProfileGetter(){
            if(this.getUserId != 0 && this.getUserId != null)
                this.getSelectedUserBasket(this.getUserId);
        },
        getBasketItems(){
            this.basketItemsQuantity = 0;
            this.getBasketItems.forEach(basketItem => {
                this.basketItemsQuantity += basketItem.quantity;
            });
        },
        getSearchedBooks(){
            if(this.getSearchedBooks)
                this.searchedBookDatas = this.getSearchedBooks;
        },
        getRecommendBooks(){
            if(this.getRecommendBooks)
                this.searchedBookDatas = this.getRecommendBooks;
        },
        getSearchedAuthors(){
            if(this.getSearchedAuthors)
                this.searchedAuthorDatas = this.getSearchedAuthors;
        },
        getRecommendAuthors(){
            if(this.getRecommendAuthors)    
                this.searchedAuthorDatas = this.getRecommendAuthors;
        },
        getSearchedPublisher(){
            if(this.getRecommendPublisher)
                this.searchedPublisherDatas = this.getRecommendPublisher;
        },
        getRecommendPublisher(){
            if(this.getRecommendPublisher)
                this.searchedPublisherDatas = this.getRecommendPublisher;
        },
        searchContainerClicked(){
            if(this.searchContainerClicked)
                this.getRecommendSearchDatas();
        },
        cartViewHover(){
            if(this.cartViewHover && this.getUserProfileGetter != null && this.getUserId != 0 && this.getUserId != null)
                if(this.getUserProfileGetter.basketId == 0)
                    this.addBasket(this.getUserId);
        }
    },

    updated(){
        this.ignoreSearchPopUpElement();
    },

    mounted(){
        if(this.getUserId != 0 && this.getUserId!= null)
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
        z-index: 200;
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
        position: relative;
        display: flex;
        flex-direction: column;
        width: 40%;
        height: auto;
    }

    #search-input-container{
        display: flex;
        align-items: center;
        width: 100%;
        height: 45px;
        border: 2px solid orange;
        border-radius: 5px;
        transition: all 250ms;
    }

    #search-input-container input{
        padding-left: 5px;
        border-top-left-radius:3px ;
        border-bottom-left-radius:3px ;
        font-size: 19px;
        outline: none;
        border: none;
        background-color: #f0f3f4;
        width: 92%;
        height: 100%;
        transition: all 250ms;
    }

    #search-input-container i{
        font-size: 30px;
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 9%;
        height: 100%;
        background-color: orange;
    }

    .search-container-selected{
        border-bottom-left-radius: 0px !important;
        border-bottom-right-radius: 0px !important;
        background-color: green !important;
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
        transition: all 250ms;
    }

    .search-container-selected input{
        border-bottom-left-radius: 0px !important;
    }

    #search-view-container{
        padding: 5px;
        display: flex;
        flex-direction: column;
        z-index: 1050;
        opacity: 1;
        position: absolute;
        background-color: #f8f9f9;
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
        border:2px solid orange;
        border-top-style: none;
        width: 100%;
        top: 45px;
        min-height: 0px;
        max-height: 410px;
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
        transition: all 250ms;
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
        border-bottom: 1px solid orange;
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
    #user-profile-header{
        display: flex;
        height: 70px;
        width: 100%;
        justify-content:space-between ;
        align-items: center;
        cursor: pointer;
    }

    #user-profile-header div{
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
        right: 140px;
        width: 205px;
        height: 250px;
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
        position: relative;
        display: flex;
        flex-direction: column;
    }

    #cart-header{
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 55px;
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

    #cart-header #cart-icon .icon{
        transition: all 500ms;
        font-size: 35px;
    }

    #cart-header span{
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
        top: 60px;
        right: 1px;
        position: absolute;
        padding: 10px;
        border: 0.1rem solid #F8F9F9;
        width: 500px;
        min-height: 150px;
        z-index: 200;
        border-radius: 5px;
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
        user-select: none;
        width: 20px;
        height: 20px;
        text-align: center;
        border-radius: 3px;
        background-color: #E5E7E9;
        font-size: 15px;
    }

    .basket-item-decrease:hover,
    .basket-item-increase:hover{
        color: orange;
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
        display: flex;
        flex-direction: column;
        position: relative;
    }

    #auths-header{
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 50px;
    }

    #auths-header span{
        display: inline-block;
        width: 80px;
    }

    #auths-header i{
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
    }

    #auths-header i{
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
        top: 55px;
        right: -45px;
        height: 125px;
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