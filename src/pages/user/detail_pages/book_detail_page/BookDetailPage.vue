<template>
    <HeaderComponent/>
    <div v-if="selectedBook" id="book-detail-page-container">
        <div id="book-detail-top">
            <div id="book-detail-img" @mousemove="bookDetailImgNavButton = true" @mouseleave="bookDetailImgNavButton = false">
                <i @click="bookDetailNavButtonPrev" @mousemove="bookDetailImgNavButton = true" :class="{'book-detail-picture-button-visible' : bookDetailImgNavButton}" class="bi bi-chevron-left book-detail-picture-nav-button" id="book-detail-picture-pre"></i>
                <Swiper
                :modules="modules"
                :slides-per-view="1"
                :space-between="10"
                :grab-cursor="true"
                :centeredSlidesBounds= "true"
                :pagination="{clickable : true}"
                :autoplay="{
                    delay:2500,
                    disableOnInteraction:false,
                    pauseOnMouseEnter : true
                }" id="book-detail-card-wrapper">
                    <SwiperSlide class="book-detail-img-card" v-for="(bookPictureUrl,index) in getBookPictureUrls(selectedBook.pictureUrls)" :key="index">
                        <img :src="bookPictureUrl" alt="">
                    </SwiperSlide>
                </Swiper>
                <i @click="bookDetailNavButtonNext" @mousemove="bookDetailImgNavButton = true" :class="{'book-detail-picture-button-visible' : bookDetailImgNavButton}" class="bi bi-chevron-right book-detail-picture-nav-button" id="book-detail-picture-next"></i>
            </div>
            <div id="book-detail-desc">
                <div id="book-detail-desc-titles-content">
                    <h3 id="book-detail-book-name">{{ selectedBook.bookName }}</h3>
                    <div id="author-publisher-name">
                        <span id="book-detail-author-name">{{ selectedBook.authors[0].name  }}</span>
                        <div id="book-detail-bracket"></div>
                        <span id="book-detail-publisher-name">{{ selectedBook.publisher.name }}</span>
                    </div>
                </div>
                <div id="book-detail-bottom-contents">
                    <div :class="{'book-detail-desc-content-height' : bookDetialChangeHeight }" id="book-detail-desc-content">
                        <div :class="{'book-detail-desc-content-height' : bookDetialChangeHeight }" id="book-detail-desc-content-container">
                            <p id="book-detail-desc-content-value">{{ selectedBook.description }}</p>
                        </div>
                        <button @click="bookDetialChangeHeight = !bookDetialChangeHeight" v-if="300<bookDetailDescContentValueHeight" id="book-detail-desc-more-button">{{ bookDetialChangeHeight ? 'Gizle' : 'Devamını Oku..' }}</button>
                    </div>
                    <div id="book-detail-explanation-buying">
                        <div id="book-detail-buying">
                            <div id="book-detail-buying-price-content">
                                <span>{{ selectedBook.price }},00</span>
                                <span>TL</span>
                            </div>
                            <div id="book-detail-buying-button-content">
                                <button @click="addBasket" id="book-detail-buying-button">Sepete Ekle</button>
                            </div>
                            <div id="book-detail-book-stock-comment-quantity">
                                <div class="book-detail-quantity" id="book-detail-book-stock-quantity">
                                    <i class="bi bi-box2" id="stock-icon"></i>
                                    <span id="stock-quentity-value">{{ selectedBook.stock }}</span>
                                </div>  
                                <div class="book-detail-quantity" id="book-detail-book-comment-quantity">
                                    <i class="bi bi-chat-dots" id="comment-icon"></i>
                                    <span id="comment-quentity-value">{{ this.getSelectedBookComments == null? '0' : this.getSelectedBookComments.comments == null ? '0' : this.getSelectedBookComments.comments.length }}</span>
                                </div> 
                            </div>
                            <div id="book-detail-buying-book-totals">
                                <span>Bu üründen {{ selectedBookOrderCountByBookId.count == null ? '0' :selectedBookOrderCountByBookId.count }} adet satılmıştır</span>
                                <span>Bu ürünü {{ selectedBookBasketCount}} kişi sepete eklemiştir</span>
                            </div>
                        </div>
                        <div id="book-detail-explanation">
                            <div class="book-explanation-content">
                                <span class="book-explanation">Yayın Tarihi:</span>
                                <span class="book-explanation-value">{{ selectedBook.releaseDate }}</span>
                            </div>
                            <div class="book-explanation-content">
                                <span class="book-explanation">ISBN:</span>
                                <span class="book-explanation-value">{{ selectedBook.isbn }}</span>
                            </div>
                            <div class="book-explanation-content">
                                <span class="book-explanation">Dil:</span>
                                <span class="book-explanation-value">{{ selectedBook.language.name }}</span>
                            </div>
                            <div class="book-explanation-content">
                                <span class="book-explanation">Sayfa Sayısı:</span>
                                <span class="book-explanation-value">{{ selectedBook.pageOfNumber }}</span>
                            </div>
                            <div class="book-explanation-content">
                                <span class="book-explanation">Cilt Tipi:</span>
                                <span class="book-explanation-value">{{ selectedBook.skinType }}</span>
                            </div>
                            <div class="book-explanation-content">
                                <span class="book-explanation">Kağıt Tipi:</span>
                                <span class="book-explanation-value">{{ selectedBook.paperType }}</span>
                            </div>
                            <div class="book-explanation-content">
                                <span class="book-explanation">Boyut:</span>
                                <span class="book-explanation-value">{{ selectedBook.dimension}}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="favorite-button">
                <i @click="addFavoriteBook(selectedBook.id)" v-if="getFavoriteBooks.findIndex(x => x.bookId == selectedBook.id) == -1" class="bi bi-heart"></i>
                <i @click="deleteFavoriteBook(selectedBook.id)" v-else class="bi bi-heart-fill"></i>
            </div>
        </div>
        <div  id="book-detail-bottom">
            <div id="book-detail-bottom-left">
                <div id="book-detail-comment-child">
                    <div v-if="selectedBookUserComment == null && getUserId != 0 && getUserId != null" class="book-detail-user-comment">
                        <div class="book-detail-user-comment-titles">
                            <span>Yorum Yap</span>
                            <span>{{ comment != "" ? comment.length : 0 }}/1000</span>
                        </div>
                        <div class="book-detail-user-write-comment">
                            <textarea maxlength="1000" v-model="comment" spellcheck="false"></textarea>
                        </div>
                        <div id="book-detail-user-add-comment-button">
                            <button @click="addComment">Gönder</button>
                        </div>
                    </div>
                    <div v-else-if="selectedBookUserComment != null && getUserId != 0 && getUserId != null" class="book-detail-user-comment">
                        <div class="book-detail-user-comment-titles">
                            <span>Yorumum</span>
                            <span>{{ comment != "" ? comment.length : 0 }}/1000</span>
                        </div>
                        <div class="book-detail-user-write-comment">
                            <textarea maxlength="1000" v-model="comment" spellcheck="false" ></textarea>
                        </div>
                        <div id="book-detail-user-bottom-container">
                            <div id="my-comment-rating">
                                <div id="my-comment-ratings-like">
                                    <i class="bi bi-hand-thumbs-up"></i>
                                    <span>{{ selectedBookUserComment.totalUsefulRating }}</span>
                                </div>
                                <div id="my-comment-ratings-dislike">
                                    <i class="bi bi-hand-thumbs-down"></i>
                                    <span>{{ selectedBookUserComment.totalNotUsefulRating }}</span>
                                </div>
                            </div>
                            <button @click="deleteComment">Sil</button>
                        </div>
                    </div>
                    <div id="book-detail-other-user-comments">
                        <div id="book-detail-comments-contents">
                            <ul>
                                <li v-for="comment in getFilteredCommentDatas()" :key="comment.commentId">
                                    <div class="book-detail-comment">
                                        <div class="book-detail-comment-header">
                                            <div class="book-detail-comment-left">
                                                <img :src="getUserPictureUrl(comment.userPictureUrl)" alt="">
                                                <span>{{ comment.userName }}</span>
                                            </div>
                                            <div class="book-detail-comment-right">
                                                <span>{{ new Date(comment.createdDate).toLocaleDateString() }}</span>
                                            </div>
                                        </div>
                                        <div class="book-detail-other-user-comment">
                                            <p>{{ comment.comment }}</p>
                                        </div>
                                        <div class="book-detail-comment-rating">
                                            <div class="book-detail-comment-like-rating">
                                                <i v-if="comment.selectedCommentRating != 1 || comment.selectedCommentRating == 0" @click="like(comment.commentId,comment.selectedCommentRating)" class="bi bi-hand-thumbs-up"></i>
                                                <i @click="deleteCommentRating(comment.commentId)" v-if="comment.selectedCommentRating == 1" class="bi bi-hand-thumbs-up-fill"></i>
                                                <span>{{ comment.totalUsefulRating }}</span>
                                            </div>
                                            <div class="book-detail-comment-dislike-rating">
                                                <i v-if="comment.selectedCommentRating != 2 || comment.selectedCommentRating == 0" @click="dislike(comment.commentId,comment.selectedCommentRating)" class="bi bi-hand-thumbs-down"></i>
                                                <i @click="deleteCommentRating(comment.commentId)" v-if="comment.selectedCommentRating == 2" class="bi bi-hand-thumbs-down-fill"></i>
                                                <span>{{ comment.totalNotUsefulRating }}</span>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div id="book-detail-other-user-comments-pagination">
                        <div>Gösterilen 1 ile 5 arası, toplam {{ this.getSelectedBookComments != null && this.getSelectedBookComments.comments != null ? this.getSelectedBookComments.comments.length : 0  }}</div>
                        <div id="other-user-comments-pagination">
                            <i class="bi bi-chevron-left"></i>
                            <span>10/20</span>
                            <i class="bi bi-chevron-right"></i>
                        </div>
                        <div id="other-user-comments-pagination-last">Son</div>
                    </div>
                </div>
                <div v-show="getRelatedBooks != null" id="related-book-slider-container">
                    <div id="related-book-slider-title">İlgili Kitaplar</div>
                    <div @mousemove="relatedBookContainerHover = true" @mouseleave="relatedBookContainerHover = false" id="related-book-slider-content">
                        <i @click="relatedBookCardWrapper.slidePrev()" :class="{'related-book-slider-hover' : relatedBookContainerHover}" id="related-book-slider-prev" class="bi bi-chevron-left"></i>
                        <Swiper
                        :modules="modules"
                        :slides-per-view="4"
                        :space-between="18"
                        :centeredSlidesBounds= "true"
                        :autoplay="{
                            delay:1750,
                            disableOnInteraction:false,
                            pauseOnMouseEnter : true
                        }" id="related-book-card-wrapper">
                            <SwiperSlide v-for="relatedBook in getRelatedBooks" :key="relatedBook.id">
                                <div @click="navigateBookDetail($event,relatedBook)" class="related-book-card">
                                    <div class="related-book-img-container">
                                        <img :src="getRelatedBookPicture(relatedBook.pictureUrls)" alt="">
                                    </div>
                                    <div class="related-book-name">{{ relatedBook.bookName }}</div>
                                    <div class="related-book-price">{{ relatedBook.price }} TL</div>
                                    <div class="favorite-button-for-wrapper favorite-button-for-wrapper-element">
                                        <i @click="addFavoriteBook(relatedBook.id)" v-if="getFavoriteBooks.findIndex(x => x.bookId == relatedBook.id) == -1" class="bi bi-heart favorite-button-for-wrapper-element"></i>
                                        <i @click="deleteFavoriteBook(relatedBook.id)" v-else class="bi bi-heart-fill favorite-button-for-wrapper-element"></i>
                                    </div>
                                </div>
                            </SwiperSlide>
                        </Swiper>
                        <i @click="relatedBookCardWrapper.slideNext()" :class="{'related-book-slider-hover' : relatedBookContainerHover}" id="related-book-slider-next" class="bi bi-chevron-right"></i>
                    </div>
                </div>
            </div>
            <div v-if="selectedAuthor" id="book-detail-author-detail">
                <div id="book-detail-author-detail-img">
                    <img :src="getBookPictureUrl(selectedAuthor.pictureUrl)" alt="">
                </div>
                <div id="book-detail-author-detail-name">
                    <span>{{this.selectedAuthor.name}}</span>
                </div>
                <div id="book-detail-author-detail-autobiography">
                    <p id="book-detail-author-detail-autobiography-content">{{ this.selectedAuthor.autobiography }}</p>
                    <button @click="navigateAuthorDetailPage(selectedAuthor)">Detay ...</button>
                </div>
            </div>
        </div>  
    </div>
</template>

<script>
import { Swiper , SwiperSlide  } from 'swiper/vue';
import {Autoplay,Pagination} from 'swiper/modules';
import { mapActions, mapGetters,mapMutations } from 'vuex';
import HeaderComponent from '@/pages/user/components/HeaderComponent';
import 'swiper/css';
import 'swiper/css/pagination';

export default{
    data(){
        return{
            addBasketItemMethod : false,
            updateBasketItemMethod : false,
            relatedBookContainerHover : false,
            bookDetailDescContentValueHeight : 0,
            bookDetailImgNavButton : false,
            bookDetailCardWrapper : null,
            relatedBookCardWrapper : null,
            bookDetialChangeHeight : false,
            updated : false,
            comment : ""
        }
    },

    components:{
        HeaderComponent,
        Swiper,
        SwiperSlide
    },

    setup(){
        return{
            modules:[Autoplay,Pagination]
        } 
    },

    computed:{
        ...mapGetters({
            getAddFavoriteBookSuccesResult : "FavoriteBookModule/_getAddFavoriteBookSuccesResult",
            getDeleteFavoriteBookSuccessResult : "FavoriteBookModule/_getDeleteFavoriteBookSuccessResult",
            getFavoriteBooks : "FavoriteBookModule/_getFavoriteBooks",
            selectedBook : "BookModule/_getSelectedBook",
            selectedBookCommentCount : "CommentModule/_getSelectedBookCommentCount",
            selectedBookBasketCount : "BasketModule/_getSelectedBookBasketCount",
            selectedBookOrderCountByBookId : "OrderModule/_getSelectedBookOrderCount",
            getSelectedBasketItems: "BasketModule/_getSelectedBasketItems",
            selectedAuthor : "AuthorModule/_getSelectedAuthor",
            selectedBookId : "BookModule/_getSelectedBookId",
            getBasketId :"BasketModule/_getSelectedBasketId",
            getUserId : "AuthModule/_getUserId",
            selectedBookUserComment : "CommentModule/_getSelectedBookUserComment",
            getSelectedBookComments : "CommentModule/_getSelectedBookComments",
            selectedCommentRating : "CommentModule/_getSelectedCommentRating",
            getVisitedBooks : "BookModule/_getVisitedBooks",
            getRelatedBooks : "BookModule/_getRelatedBooks",
            getAddedBasketItemSuccessResult: "BasketModule/_getAddedBasketItemSuccessResult",
            getUpdateBasketItemSuccessResult: "BasketModule/_getUpdateBasketItemSuccessResult",
        }),
    },

    methods:{
        ...mapActions({
            getBookById : "BookModule/getBookById",
            getCommentCountByBookId : "CommentModule/getCommentCountByBookId",
            getSelectedBookBasketCount : "BasketModule/getSelectedBookBasketCount",
            getOrderCountByBookId : "OrderModule/getOrderCountByBookId",
            getAuthorById : "AuthorModule/getById",
            addBasketItemAction : "BasketModule/addBasketItem",
            addCommentAction : "CommentModule/addComment", 
            getSelectedBookUserComment : "CommentModule/getSelectedBookUserComment",
            deleteUserComment : "CommentModule/deleteUserComment",
            getSelectedBookCommentsAction : "CommentModule/getSelectedBookComments",
            addCommentRating : "CommentModule/addCommentRating",
            getSelectedCommentRatingAction : "CommentModule/getSelectedCommentRating",
            updateCommentRating  :"CommentModule/updateCommentRating",
            deleteUserCommentRatingAction : "CommentModule/deleteCommentRating",
            getRelatedBooksAction : "BookModule/getRelatedBooks",
            updateBasketItemAction : "BasketModule/updateBasketItem",
            addViewAction : "ViewModule/addView",
            addFavoriteBookAction : "FavoriteBookModule/addFavoriteBook",
            deleteFavoriteBookAction : "FavoriteBookModule/deleteFavoriteBook",
            getFavoriteBooksAction : "FavoriteBookModule/getFavoriteBooks",
        }),
        ...mapMutations({
            addVisitedBook : "BookModule/addVisitedBook",
            deleteLastVisitedBook : "BookModule/deleteLastVisitedBook",
            updateVisitedBookViewsCount : "BookModule/updateVisitedBookViewsCount",
        }),
        navigateBookDetail(event,bookData){
            let classNames = event.srcElement.className.split(" ");
            if(classNames.findIndex(x =>x == "favorite-button-for-wrapper-element") > -1)
                return;

            this.$router.push({
                name : "BookDetailPage",
                params : {
                    bookName : bookData.bookName.toLowerCase().replace(/\s+/g, "-")
                }
            });
            this.$store.state.BookModule.selectedBookId = bookData.id;
        },
        bookDetailNavButtonNext(){
            this.bookDetailCardWrapper.slideNext();
        },
        bookDetailNavButtonPrev(){
            this.bookDetailCardWrapper.slidePrev();
        },
        getRelatedBookPicture(bookPictures){
            if(bookPictures == null)
                return require("@/assets/no-image-available.jpg");
            return bookPictures.find(x => x.showOrder == 1).pictureUrl;
        },
        getBookPictureUrls(bookPictures){
            if(bookPictures == null)
                return require("@/assets/no-image-available.jpg");
            return bookPictures.map(x => x.pictureUrl);
        },
        getBookPictureUrl(pictureUrl){
            if(pictureUrl==null)
                return require("@/assets/no-image-available.jpg");
            return pictureUrl;
        },
        getUserPictureUrl(pictureUrl){
            if(pictureUrl=="")
                return require("@/assets/no-user-image.jpg");
            return pictureUrl;
        },
        getDatas(){
            this.getBookById(this.selectedBookId);
            this.getCommentCountByBookId(this.selectedBookId);
            this.getSelectedBookBasketCount(this.selectedBookId);
            this.getOrderCountByBookId(this.selectedBookId);
            this.addViewAction({bookId : this.selectedBookId});
            
            if(this.getUserId != 0 && this.getUserId != null){
                if(this.selectedBookId != null)
                    this.getSelectedBookUserComment({
                            bookId : this.selectedBookId,
                            userId : this.getUserId});
                
                this.getFavoriteBooksAction(this.getUserId);
            }

                            
            this.getSelectedBookCommentsAction({
                page : 0,
                size : 50,
                bookId : this.selectedBookId,
                userId : this.getUserId});
        },
        addBasket(){
            let selectedBasketItem = null;
            if(this.getSelectedBasketItems)
                selectedBasketItem = this.getSelectedBasketItems.find(basketItem => basketItem.bookId == this.selectedBook.id);
            
            if(selectedBasketItem == null && this.getUserId != 0 && this.getUserId != null){
                this.addBasketItemMethod = true;
                this.addBasketItemAction({
                    userId : this.getUserId,
                    basketId : this.getBasketId, 
                    bookId : this.selectedBook.id,
                    quantity : 1 
                });
            }

            if(selectedBasketItem != null && this.getUserId != 0 && this.getUserId != null &&  selectedBasketItem.quantity != 10){
                this.updateBasketItemMethod = true;
                this.updateBasketItemAction({
                    userId : this.getUserId,
                    basketId : this.getBasketId,
                    basketItemId : selectedBasketItem.basketItemId,
                    quantity : selectedBasketItem.quantity + 1,
                });
            }
        },
        addComment(){
            if(this.getUserId == 0)
                return;
            if(this.comment.length == 0 || this.comment == "")
                return;
            if(this.selectedBookId == 0)
                return;

            this.addCommentAction({
                userId : this.getUserId,
                comment : this.comment,
                bookId : this.selectedBookId, 
            });
        },
        deleteComment(){
            this.deleteUserComment({
                userId : this.getUserId,
                bookId : this.selectedBookId,
                commentId : this.selectedBookUserComment.commentId
            });
            this.comment = "";
        },
        getFilteredCommentDatas(){
            if(this.getSelectedBookComments.comments == null)
                return null;
            return this.getSelectedBookComments.comments.filter(comment => comment.userId != this.getUserId);
        },
        like(commentId,selectedCommentRating){
            if(this.getUserId != 0 && this.getUserId != null && selectedCommentRating == 0)
                this.addCommentRating({
                    commentId : commentId,
                    userId : this.getUserId,
                    useful : true,
                    bookId :this.selectedBookId
                });
            
            if(selectedCommentRating == 2)
                this.updateCommentRating({
                    userId : this.getUserId,
                    bookId : this.selectedBookId,
                    useful : true,
                    commentId : commentId,
                })
        },
        dislike(commentId,selectedCommentRating){
            if(this.getUserId != 0 && this.getUserId != null && selectedCommentRating == 0)
                this.addCommentRating({
                    commentId : commentId,
                    userId : this.getUserId,
                    useful : false,
                    bookId :this.selectedBookId
                });

            if(selectedCommentRating == 1)
                this.updateCommentRating({
                    userId : this.getUserId,
                    bookId : this.selectedBookId,
                    useful : false,
                    commentId : commentId,
                })
        },
        deleteCommentRating(commentId){
            this.deleteUserCommentRatingAction({
                commentId : commentId,
                userId : this.getUserId,
                bookId : this.selectedBookId,
            })
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
        addUpdateVisitedBook(){
            const selectedVisitedBook = this.getVisitedBooks.find(visitedBook => {
                return visitedBook.visitedBook.id == this.selectedBookId;
            });

            if(selectedVisitedBook == null){
                if(this.getVisitedBooks.length < 40)
                    this.addVisitedBook({
                        visitedBook : this.selectedBook,
                        viewsCount : 1
                    });

                if(this.getVisitedBooks.length == 40){
                    this.addVisitedBook({
                        visitedBook : this.selectedBook,
                        viewsCount : 1
                    });
                    this.deleteLastVisitedBook();    
                } 
            }

            if(selectedVisitedBook != null)
                this.updateVisitedBookViewsCount(selectedVisitedBook.visitedBook.id);
        },
        addFavoriteBook(bookId){
            if(this.getUserId != 0 && this.getUserId != null){
                if(this.getFavoriteBooks.findIndex(x => x.bookId == bookId) == -1)
                    this.addFavoriteBookAction({
                        userId : this.getUserId,
                        bookId : bookId    
                    })
            }
        },
        deleteFavoriteBook(bookId){
            if(this.getUserId != 0 && this.getUserId != null){
                let value = this.getFavoriteBooks.find(x => x.bookId == bookId);
                if(value != null)
                   this.deleteFavoriteBookAction({
                        favoriteBookId : value.id,
                        userId : this.getUserId
                    })
            }
        }
    },

    watch:{
        getAddFavoriteBookSuccesResult(){
            if(this.getAddFavoriteBookSuccesResult)
                this.$toastr.success("Ürün Favorilere Eklendi !");
        },
        getDeleteFavoriteBookSuccessResult(){
            if(this.getDeleteFavoriteBookSuccessResult)
                this.$toastr.info("Ürün Favorilerden Silindi !");
        },
        getAddedBasketItemSuccessResult(){
            if(this.getAddedBasketItemSuccessResult && this.addBasketItemMethod){
                this.$toastr.success("Ürün Sepete Eklendi !");
                this.addBasketItemMethod = false;
            }
        },
        getUpdateBasketItemSuccessResult(){
            if(this.getUpdateBasketItemSuccessResult && this.updateBasketItemMethod){
                this.$toastr.info("Ürün Miktarı Artırıldı !");
                this.updateBasketItemMethod = false;
            }
        },
        selectedBook(){
            if(this.selectedBook != null && this.selectedBook.id == this.selectedBookId){          
                this.addUpdateVisitedBook(); 
                this.getRelatedBooksAction({
                    bookId : this.selectedBookId,
                    categoryIds : this.selectedBook.categories.map(x => x.id),
                    authorIds : this.selectedBook.authors.map(x => x.id),
                });
                this.getAuthorById(this.selectedBook.authors[0].id);
            }

            if(this.selectedBook != null && this.selectedBook.id == this.selectedBookId && document.querySelector("#book-detail-card-wrapper") != null)
                this.bookDetailCardWrapper = document.querySelector("#book-detail-card-wrapper").swiper;
        },
        selectedBookId(){
            this.getDatas();    
        },
        selectedBookUserComment(){
            if(this.selectedBookUserComment == null)
                this.comment = "";
            
            if(this.selectedBookUserComment != null)
                this.comment = this.selectedBookUserComment.comment;
        },
        getRelatedBooks(){
            if(this.getRelatedBooks != null && this.selectedBook != null)
                this.relatedBookCardWrapper = document.querySelector("#related-book-card-wrapper").swiper;
        }
    },

    created(){
        this.getDatas();
    },

    unmounted(){
        this.updated = false;
    },

    updated(){
        if(!this.updated && this.selectedBook != null)
            this.bookDetailDescContentValueHeight = document.querySelector("#book-detail-desc-content-value").offsetHeight;
    }
}
</script>

<style scoped>
    #book-detail-page-container{
        height: 100%;
        width: 100%;
        min-width: 1510px;
        padding: 50px 9% 0 9%;
    }

    #book-detail-top{
        position: relative;
        width: 100%;
        min-height: 650px;
        background-color: #f8f9f9;
        border: 2px solid #D5DBDB;
        border-radius: 5px;
        box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
        margin-bottom: 20px;
        display: flex;
        flex-direction: row;
        padding: 15px;
    }

    #book-detail-img{
        max-width: 400px;
        position: relative;
        width: 33%;
        height: 630px;
        background-color: #EAEDED;
        border: 2px solid #D5DBDB;
        z-index: 100;
        display: flex;
        flex-direction: row;
        align-items:center ;
        border-radius: 7px;
    }

    .book-detail-picture-nav-button{
        position: absolute;
        display: block;
        width: 45px;
        height: 45px;
        font-size: 24px;
        color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        background-color: orange;
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
        cursor: pointer;
        z-index: 200;
        opacity: 0;
        transition: 500ms all;
    }

    .book-detail-picture-button-visible{
        opacity: 1;
        transition: 500ms all;
    }

    #book-detail-picture-pre{
        left: -10px;
    }

    #book-detail-picture-next{
        right: -10px;
    }

    #book-detail-bottom{
        width: 100%;
        display: flex;
        flex-direction: row;
        height: auto;
    }

    /* book comment start */
    #book-detail-bottom-left{
        width: 918px;
        height: auto;
        margin-right: 20px;
    }

    #book-detail-comment-child{
        padding: 15px 15px 5px 15px;
        height: auto;
        background-color: #f8f9f9;
        border: 2px solid #D5DBDB;
        border-radius: 5px;
        box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    }

    .book-detail-user-comment{
        display: flex;
        flex-direction: column;
        height: 150px;
    }

    .book-detail-user-comment-titles{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        border-bottom: 1px solid #D5DBDB;
        margin-bottom: 5px;
    }

    .book-detail-user-comment-titles span:first-child{
        font-size: 19px;
        color: orange;
    }

    .book-detail-user-comment-titles span:last-child{
        margin-top: 5px;
        font-size: 15px;
        color: orange;
    }

    .book-detail-user-write-comment{
        border-radius: 4px;
        border: 1.5px solid #E5E8E8;
        width: 100%;
        height: 80px;
        margin-bottom: 5px;
    }

    .book-detail-user-write-comment textarea{
        border: none;
        color: #17202A;
        font-size: 15px;
        padding:7px;
        background-color: #F2F4F4;
        outline: none;
        border-radius: 4px;
        width: 100%;
        height: 100%;
        resize: none;
    }

    #book-detail-user-add-comment-button{
        display: flex;
        justify-content: right;
        border-bottom: 1.5px solid #E5E8E8;
    }

    #book-detail-user-add-comment-button button{
        cursor: pointer;
        width: 75px;
        height: 23px;
        border-radius: 4px;
        background-color: orange;
        color: #fff;
        border: 1px solid #D35400;
        transition: all 250ms;
        opacity: 1;
        margin-bottom: 5px;
    }

    #book-detail-user-add-comment-button button:hover{
        opacity: 0.8;
        transition: all 250ms;
    }

    #book-detail-user-bottom-container{
        display: flex;
        justify-content: space-between;
        border-bottom: 1.5px solid #E5E8E8;
        height: 28px;
    }

    #my-comment-rating{
        display: flex;
    }

    #my-comment-ratings-like{
        margin-right: 10px;
        color: #229954;
    }

    #my-comment-ratings-dislike{
        color: #CB4335;
    }

    #book-detail-user-bottom-container button{
        cursor: pointer;
        width: 75px;
        height: 23px;
        border-radius: 4px;
        background-color: #CB4335;
        color: #fff;
        border: 1px solid #A93226;
        transition: all 250ms;
        opacity: 1;
        margin-bottom: 4px;
    }

    #book-detail-user-bottom-container button:hover{
        opacity: 0.8;
        transition: all 250ms;
    }

    #book-detail-other-user-comments{
        height: auto;
    }

    #book-detail-comments-contents li:last-child .book-detail-comment:last-child{
        border: none !important;
        margin-bottom: 15px;
    }

    .book-detail-comment-header{
        display: flex;
        justify-content: space-between;
        margin-bottom: 5px;
    }

    .book-detail-comment-left{
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .book-detail-comment-left img{
        height: 40px;
        width: 40px;
        border-radius: 50%;
        object-fit: cover;
        margin-right: 10px;
        border: 1.5px solid orange;
    }

    .book-detail-comment-left span{
        display: block;
        color: orange;
        font-size: 20px;
    }

    .book-detail-comment-right{
        display: flex;
        align-items: center;
    }

    .book-detail-comment-right span{
        font-size: 14px;
        color: #F4D03F;
    }

    .book-detail-comment{
        padding: 5px 10px 3px 10px;
        display: flex;
        flex-direction: column;
        width: 100%;
        min-height: 120px;
        border-bottom: 1.5px solid #E5E8E8;
    }

    .book-detail-other-user-comment{
        padding-left: 40px;
    }

    .book-detail-other-user-comment p{
        max-width: 820px;
    }

    .book-detail-comment-rating{
        display: flex;
        flex-direction: row;
        justify-content: right;
    }

    .book-detail-comment-like-rating{
        margin-right: 10px;
        color: #229954;
    }

    .book-detail-comment-like-rating i,
    .book-detail-comment-dislike-rating i{
        font-size: 18px;
        cursor: pointer;
        margin-right: 1px;
    }

    .book-detail-comment-dislike-rating{
        color: #CB4335;
    }

    #book-detail-other-user-comments-pagination{
        bottom: 5px;
        display: flex;
        align-items: center;
        border-top:1.5px solid #E5E8E8;
        height: 30px;
        width: 100%;
    }

    #book-detail-other-user-comments-pagination  div:first-child{
        font-size: 15px;
        margin-right: 510px;
    }

    #other-user-comments-pagination{
        margin-right: 15px;
    }

    #other-user-comments-pagination span{
        margin-left: 5px;
        margin-right: 5px;
    }

    #other-user-comments-pagination i{
        cursor: pointer;
    }

    #other-user-comments-pagination i:hover{
        color: orange;
    }

    #other-user-comments-pagination-last{
        cursor: pointer;
        user-select: none;
    } 

    #other-user-comments-pagination-last:hover{
        color: orange;
    }
    /* book comment end */

    /*Book Detail Author*/
    #book-detail-author-detail{
        padding: 30px 15px 0px 15px;
        display: flex;
        flex-direction: column;
        justify-content: start;
        align-items: center;
        height: 600px !important;
        height: auto;
        width: 307px;
        background-color: #f8f9f9;
        border: 2px solid #D5DBDB;
        border-radius: 5px;
        box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    }

    #book-detail-author-detail-img{
        width: 200px;
        height: 200px;
        border: 3px solid #D5DBDB;
        margin-bottom: 7px;
        border-radius: 3px;
    }

    #book-detail-author-detail-img img{
        border-radius: 3px;
        width: 100%;
        height: 100%;
        object-fit: cover;
        margin-bottom: 5px;
    }

    #book-detail-author-detail-name{
        text-align: center;
        width: 100%;
        font-size: 20px;
        color: orange;
        border-bottom: 2px solid #D5DBDB;
        margin-bottom: 5px;
    }

    #book-detail-author-detail-autobiography{
        display: flex;
        justify-content: left;
        flex-direction: column;
        align-items: start;
        height: 330px ;
        width: 270px;
    }

    #book-detail-author-detail-autobiography-content{
        font-size: 16px;
        padding: 2px;
        width: 100%;
        height: 275px ;
        margin-bottom: 10px;
        overflow: hidden;
        text-align: center;
        border-radius: 2px;
    }

    #book-detail-author-detail button{
        padding: 0  10px 0 10px;
        color:#99A3A4 ;
        cursor: pointer;
        width: fit-content;
        height: 27px;
        border-radius: 5px;
        border-style: none;
        box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
        transition: 250ms all;
    }

    #book-detail-author-detail button:hover{
        color: orange;
        transition: 250ms all;
    }

    /*Book Detail Author End*/

    #book-detail-card-wrapper{
        padding: 10px;
        width: 100%;
        height: 100%;
    }

    .book-detail-img-card{
        width: 100%;
        height: 100%;
        border-radius: 5px;
        padding: 5px;
    }

    .book-detail-img-card{
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .book-detail-img-card img{
        object-fit: fill;
    }

    #book-detail-desc{
        margin-left: 20px;
        width: 67%;
        min-height: 600px;
        height: auto;
        display: flex;
        flex-direction: column;
    }

    #book-detail-desc-titles-content{
        width: 100%;
        height: 80px;
        display: flex;
        flex-direction: column;
        margin-bottom: 10px;
    }

    #book-detail-book-name{
        font-size: 35px;
        color: orange;
        margin-bottom: 5px;
    }

    #author-publisher-name{
        display: flex;
        align-items: center;
        flex-direction: row;
        margin-bottom: 20px;
    }

    #book-detail-author-name,
    #book-detail-publisher-name{
        font-size: 20px;
        margin-right: 10px;
        color: #F5B041;
    }

    #book-detail-bracket{
        height: 18px ;
        width: 2px;
        border-radius: 2px;
        background-color: #F5B041;
        margin-right: 10px;
    }

    #book-detail-bottom-contents{
        width: 100%;
        min-height: 540px ;
        height: auto;
        display: flex;
        flex-direction: row;
        align-items: start;
    }

    /*Book Description Start*/
    #book-detail-desc-content{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 60%;
        height: 350px;
        background-color: #EAEDED;
        border: 2px solid #D5DBDB;
        margin-right: 20px;
        border-radius: 10px;
        padding: 15px 15px 25px 15px;
        transition: all 500ms;
    }

    .book-detail-desc-content-height{
        height: auto !important;
    }

    #book-detail-desc-content-container{
        padding-bottom: 10px;
        overflow-y: hidden;
        margin-bottom: 10px;
        height: 300px;
        transition: all 500ms;
    }

    #book-detail-desc-content-value{

        display: block;
        max-width: 427px;
        height: auto;
        margin-bottom: 10px;
    }
    
    #book-detail-desc-more-button{
        padding: 0  10px 0 10px;
        color:#99A3A4 ;
        cursor: pointer;
        width: fit-content;
        height: 27px;
        border-radius: 5px;
        border-style: none;
        box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
        transition: 250ms all;
        bottom: 10px;
    }

    #book-detail-desc-more-button:hover{
        color: orange;
        transition: 250ms all;
    }

    /*Book Description End*/

    #book-detail-explanation-buying{
        width: 40%;
        height: 540px;
        display: flex;
        flex-direction: column;
    }

    #book-detail-explanation{
        height: 45%;
        width: 100%;
        background-color: #EAEDED;
        border: 2px solid #D5DBDB;
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        padding: 15px;
        justify-content: center;
    }

    #book-detail-buying{
        height: 55%;
        margin-bottom: 20px;
        background-color: #EAEDED;
        border: 2px solid #D5DBDB;
        border-radius: 10px;
        padding: 10px;
        display: flex;
        flex-direction: column;
    }   

    #book-detail-buying-price-content{
        display: flex;
        align-items: center;
        width: 150px;
        height: 50px;
        margin-bottom: 10px;
    }

    #book-detail-buying-price-content span:first-child{
        padding-left: 5px;
        font-size: 40px;
        font-weight: 600;
        margin-right: 5px;
        color: #F5B041;
    }

    #book-detail-buying-price-content span:last-child{
        padding-left: 5px;
        font-size: 25px;
        font-weight: 600;
        margin-right: 5px;
        color: orange;
    }

    .book-explanation-content{
        display: flex;
        flex-direction: row;
        margin-bottom: 3px;
    }

    .book-explanation{
        font-size: 18px;
        color: orange;
        margin-right: 5px;
    }

    .book-explanation-value{
        font-size: 18px;
        color: #F5B041;
    }

    #book-detail-buying-button-content{
        display: flex;
        justify-content: center;
        align-items: center;
    }

    #book-detail-buying-button{
        width: 270px;
        height: 50px;
        cursor: pointer;
        background-color: orange;
        color: #fff;
        font-size: 18px;
        border-radius: 8px;
        outline: none;
        border: 2px solid #D68910 ;
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
        opacity: 1;
        transition: all 500ms;
        margin-bottom: 10px;
    }

    #book-detail-buying-button:hover{
        opacity: 0.8;
        transition: all 500ms;
    }

    #book-detail-book-stock-comment-quantity{
        padding: 0px 9px 0px 9px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin-bottom: 10px;
    }

    .book-detail-quantity{
        padding: 15px;
        width: 48%;
        height: 50px;
        border-radius: 8px;
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
        display: flex;
        align-items: center;
        
    }

    #book-detail-book-stock-quantity{
        background-color: #229954 ;
        border: 2px solid  #1E8449;
    }

    #book-detail-book-comment-quantity {
        background-color: #2E86C1 ;
        border: 2px solid  #2874A6; 
    }

    #book-detail-book-stock-quantity i,
    #book-detail-book-comment-quantity i{
        font-size: 20px;
        margin-right: 7px;
        color: #fff;
    }

    #book-detail-book-stock-quantity span,
    #book-detail-book-comment-quantity span{
        font-size: 20px;
        color: #fff;
    }

    #book-detail-buying-book-totals{
        height: 100%;
        padding: 0 10px 0 10px;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
    }

    #book-detail-buying-book-totals span{
        color: #F5B041;
        margin-bottom: 2px;
        font-size: 14px;
    }

    /*Related Book Slider Start*/
    #related-book-slider-container{
        display: flex;
        flex-direction: column;
        margin-top: 20px;
        background-color: #f8f9f9;
        border: 2px solid #D5DBDB;
        border-radius: 5px;
        box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
        height: 340px;
    }

    #related-book-slider-title{
        padding-top: 4px;
        background-color: #EAEDED;
        color: orange;
        padding-left: 10px;
        font-size: 18px;
        height: 35px;
        border-bottom: 2px solid #D5DBDB;
    }

    #related-book-slider-content{
        position: relative;
        padding-left: 10px;
        padding-right: 10px;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
    }

    #related-book-card-wrapper{
        padding-top: 12px;
        width: 100%;
        height: 305px;
    }

    .related-book-card{
        position: relative;
        user-select: none;
        padding: 10px 7px 7px 7px;
        cursor: pointer;
        height: 280px;
        width: 210px;
        border: 2px solid #D5DBDB;
        border-radius: 7px;
        background-color: #F2F3F4;
        transition: 250ms all;
        display : flex;
        flex-direction: column;
        align-items: center;
    }

    .related-book-img-container{
        width: 165px;
        height: 190px;
        margin-bottom: 7px;
    }

    .related-book-img-container img{
        width: 100%;
        height: 100%;
        object-fit: scale-down;
    }

    .related-book-price{
        font-size: 14px;
        user-select: none;
    }

    .related-book-name{
        font-size: 15px;
        text-align: center;
        margin-bottom: 3px;
    }

    .related-book-card:hover{
        color: orange;
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
        transition: 250ms all;
    }

    #related-book-slider-next,
    #related-book-slider-prev{
        padding-top: 5px;
        text-align: center;
        position: absolute;
        background-color: orange;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        z-index: 150;
        color: #fff;
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
        cursor: pointer;
        font-size: 21px;
        opacity: 0;
        transition: all 250ms;
    }

    .related-book-slider-hover{
        opacity: 1 !important;
        transition: all 250ms;
    }

    #related-book-slider-prev{
        padding-right: 3px;
        left: -14px;
    }

    #related-book-slider-next{
        padding-left: 3px;
        right: -14px;
    }

    .favorite-button-for-wrapper{
        cursor: pointer;
        top: 5px;
        right : 3px;
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        background-color: #EAEDED;
        width: 35px;
        height: 35px;
        border-radius: 50%;
        box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
        border: 1.8px solid #E5E7E9;
    }

    .favorite-button-for-wrapper i{
        color: #17202A;
        padding-top: 2px;
        font-size: 17px;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
    }

    .favorite-button-for-wrapper i:hover{
        color: orange;
    }

    .favorite-button-for-wrapper .bi-heart-fill{
        color: orange;
    }
    /*Related Book Slider End*/


    /*favorite button start*/
    #favorite-button{
        cursor: pointer;
        right: 15px;
        position: absolute;
        display: flex ;
        align-items: center;
        justify-content: center;
        width: 45px;
        height: 45px;
        border-radius: 50%;
        background-color: #eaeded;
        border : 2px solid #e0e4e4;
    }

    #favorite-button i{
        padding-top: 2px;
        font-size: 21px;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
    }

    #favorite-button i:hover{
        color: orange;
    }

    #favorite-button .bi-heart-fill{
        color: orange;
    }
    /*favorite button end */
</style>