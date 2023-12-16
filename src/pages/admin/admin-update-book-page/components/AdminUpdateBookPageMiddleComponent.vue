<template>
    <div id="admin-update-book-page-middle-container">
        <div v-if="getUpdatedBook" id="update-book-category-container">
            <div id="update-book-category-header">
                <div id="update-book-category-header-left">
                    Kategoriler
                </div>
                <div id="update-book-category-header-right">
                    <div id="book-categories-container">
                        <div class="categories-container-element" v-if="addCategoryDropDownClicked" id="categories-content-container">
                            <div v-if="bookCategories" class="categories-container-element" id="book-category-values">
                                <div :class="{'book-category-value-selected' : getUpdatedBook.categories.findIndex(x => x.id == category.id) > -1}" @click="addCategory(category)" v-for="category in bookCategories" :key="category.id" class="book-category-value categories-container-element">
                                    <div class="book-category-name categories-container-element">{{ category.categoryName }}</div>
                                    <input v-if="getUpdatedBook" class="categories-container-element book-category-checkbox-input" :checked="getUpdatedBook.categories.findIndex(x => x.id == category.id) > -1" type="checkbox">
                                </div>
                            </div>
                            <div id="book-category-search-container" class="categories-container-element">
                                <input v-model="searchCategoryPattern" class="categories-container-element" type="text" placeholder="Ara ...">
                            </div>
                        </div>
                        <div :class="{'book-categories-add-button-clicked' : addCategoryDropDownClicked}" @click="addCategoryDropDownClicked = !addCategoryDropDownClicked" id="book-categories-add-button" class="categories-container-element">Ekle</div>
                    </div>
                </div>
            </div>
            <div id="update-book-category-content">
                <div class="book-category" v-for="bookCategory in getUpdatedBook.categories" :key="bookCategory.id">
                    <div>{{ bookCategory.categoryName }}</div>
                    <i class="bi bi-x-lg" @click="deleteCategoryOfBook(bookCategory.id)"></i>
                </div>
            </div>
        </div>

        <div v-if="getUpdatedBook" id="update-book-description-container">
            <div id="update-book-description-header">
                <div>Açıklama</div>
                <button @click="updateBookDescription" :class="{'button-visible' : updatedBookDescription != getUpdatedBook.description}">Güncelle</button>
            </div>
            <div id="update-book-description-content">
                <textarea id="updated-book-decription-input" v-model="updatedBookDescription" spellcheck="false"></textarea>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters,mapActions } from 'vuex';

export default{
    data(){
        return{
            addCategoryDropDownClicked : false,
            updatedBookDescription : "",
            searchCategoryPattern : "",
            bookCategories : [],
        }
    },
    
    computed : {
        ...mapGetters({
            getUpdateBookDescriptionSuccessResult : "BookModule/_getUpdateBookDescriptionSuccessResult",
            getUpdateBookCategoriesSuccessResult : "BookModule/_getUpdateBookCategoriesSuccessResult",
            getUpdatedBookId : "BookModule/_getUpdatedBookId",
            getUpdatedBook : "BookModule/_getUpdatedBook",
            categories : "CategoryModule/_getAll" 
        }),
    },


    methods: {
        ...mapActions({
            getUpdatedBookAction : "BookModule/getUpdatedBook",
            updateBookCategories : "BookModule/updateBookCategories",
            getAllCategory : "CategoryModule/getAll",
            updateBookDescriptionAction : "BookModule/updateBookDescription",
        }),

        hideCategoryContainer(){
            document.querySelector("#app").addEventListener('click',(e) => {
                let classNames = e.srcElement.className.split(" ");
                if(classNames.findIndex(x => x == "categories-container-element") > -1)
                    return;
                else                
                    this.addCategoryDropDownClicked = false;
            })
        },

        addCategory(category){
            let index = this.getUpdatedBook.categories.findIndex(x => x.id == category.id)
            if(index > -1 && this.getUpdatedBook.categories.length > 1){
                this.getUpdatedBook.categories.splice(index,1);
                let upadtedBookIds = this.getUpdatedBook.categories.map(x => x.id); 
                this.updateBookCategories({
                    bookId : this.getUpdatedBookId,
                    categoryIds : upadtedBookIds
                });
            }

            if(index == -1){
                let upadtedBookIds = this.getUpdatedBook.categories.map(x => x.id);
                upadtedBookIds.push(category.id);
                this.updateBookCategories({
                    bookId : this.getUpdatedBookId,
                    categoryIds : upadtedBookIds
                });
            }
        },

        deleteCategoryOfBook(categoryId){
            let index =  this.getUpdatedBook.categories.findIndex(x => x.id == categoryId);
            if(index > -1 && this.getUpdatedBook.categories.length > 1){
                this.getUpdatedBook.categories.splice(index,1);
                let categoryIdsOfBook = this.getUpdatedBook.categories.map(x => x.id);
                this.updateBookCategories({
                    bookId : this.getUpdatedBookId,
                    categoryIds : categoryIdsOfBook
                });
            }
        },

        updateBookDescription(){
            this.updateBookDescriptionAction({
                bookId: this.getUpdatedBook.id,
                description : this.updatedBookDescription
            });
        }
    },

    watch : {
        getUpdateBookCategoriesSuccessResult(){
            if(this.getUpdateBookCategoriesSuccessResult){
                this.$toastr.success("Kitap Kategorileri Başarıyla Güncellendi !");
                this.getUpdatedBookAction(this.getUpdatedBookId);
            }
        },
        addCategoryDropDownClicked(){
            if(this.addCategoryDropDownClicked)
                this.getAllCategory();
        },
        categories(){
            if(this.categories)
                this.bookCategories = this.categories
        },
        searchCategoryPattern(){
            if(this.categories == null){
                this.searchCategoryPattern = "";
                return;
            }

            if(this.searchCategoryPattern){
                var regex = new RegExp('^' + this.searchCategoryPattern, 'i');
                this.bookCategories = [];
                this.categories.forEach(category => {
                    if(category.categoryName.match(regex)){
                        this.bookCategories.push(category)
                    }   
                });
            }
            
            if(this.searchCategoryPattern == null || this.searchCategoryPattern == "")
                this.bookCategories = this.categories
        },
        getUpdatedBook(){
            if(this.getUpdatedBook)
                this.updatedBookDescription = this.getUpdatedBook.description;
        },
        getUpdateBookDescriptionSuccessResult(){
            if(this.getUpdateBookDescriptionSuccessResult)
                this.$toastr.success("Kitap Açıklaması Başarıyla Güncellendi !");    
        }
    },

    mounted(){
        this.getUpdatedBookAction(this.getUpdatedBookId);
    },

    updated(){
        this.hideCategoryContainer();
    },
}
</script>

<style scoped>
    #admin-update-book-page-middle-container{
        display: flex;
        flex-direction: column;
        background-color: #f8f9f9;
        width: 100%;
        border-radius: 7px;
        border: 1px solid #F2F3F4;
        box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 2px 0px;
        padding: 10px;
        margin-bottom: 15px;
    }

    #update-book-category-container{
        display: flex;
        flex-direction: column;
        margin-bottom: 15px;
    }

    #update-book-category-header{
        display: flex;
        justify-content: space-between;
        margin-bottom: 2px;
    }

    #update-book-category-header-left{
        font-size: 18px;
        color: #f4a72d;
    }

    #update-book-category-header-right{
        display: flex;
    }

    #book-categories-container{
        display: flex;
        flex-direction: column;
        position: relative;
    }

    #categories-content-container{
        display: flex;
        flex-direction: column;
        border-top-right-radius: 3px;
        border-top-left-radius: 3px;
        border-bottom-left-radius: 3px;
        right: 0px;
        bottom: 25px;
        height: auto;
        width: auto;
        position: absolute;
        background-color: #ffffff;
        border: 1px solid #196d3c;
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    }

    #book-category-search-container input{
        height: 24px;
        font-size: 16px;
        padding-left: 1.5px;
        outline: none;
        border: none;
        min-width: 200px;
        width: 100%;
        border-top: 1px solid #196d3c;
        border-bottom-left-radius: 3px;
    }

    .book-categories-add-button-clicked{
        border-top: none !important;
        border-top-left-radius: 0px !important;
        border-top-right-radius: 0px !important;
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
        transition: 250ms all;
        z-index: 10;
    }

    #book-categories-add-button{
        display: flex;
        align-items: center;
        height: 25px;
        font-size: 14px;
        border-radius: 3px;
        user-select: none;
        cursor: pointer;
        padding-left: 7px;
        padding-right: 7px;
        color : #fff;
        background-color: #1D8348;
        border: 1px solid #196F3D;
        transition: all 250ms;
    }

    #book-categories-add-button:hover{
        opacity: 0.7;
    }

    #update-book-category-content{
        padding-top: 5px;
        padding-left: 5px;
        display: flex;
        flex-wrap: wrap;
        border: 1px solid orange;
        height: auto;
        background-color: #ffffff;
        border-radius: 5px;
    }

    #book-category-values{
        padding-top: 1px;
        padding-left: 1px;
        width: 275px;
        max-height: 250px;
        overflow-y: auto;

    }

    .book-category-value{
        display: flex;
        justify-content: space-between;
        align-items: center;
        cursor: pointer;
        margin-bottom: 1px;
        transition: all 200ms;
        padding-left: 2px;
        padding-right: 2px;
    }

    .book-category-checkbox-input{
        cursor: pointer;
        height: 15px !important;
        width: 15px !important;
    }

    .book-category-value:hover{
        color: #fff;
        background-color: #27AE60;
        transition: all 200ms;
    }

    .book-category-value-selected{
        color: #fff;
        background-color: #27AE60;
    }

    .book-category-name{
        user-select: none;
        font-size: 15px !important;
    }

    .book-category{
        align-items: center;
        display: flex;
        border: 1px solid #E67E22;
        user-select: none;
        border-radius: 3px;
        font-size: 16px;
        padding-left: 1px;
        padding-right: 1px;
        height: 21px;
        margin-right: 5px;
        margin-bottom: 5px;
        background-color: #F39C12;
        color: #fff;
        box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
    }

    .book-category i{
        cursor: pointer;
        margin-left: 3px;
        font-size: 13px;
    }

    .book-category i:hover{
        color: #E74C3C;
    }

    #update-book-description-header{
        font-size: 18px;
        color: #f4a72d;
        display: flex;
        justify-content: space-between;
        margin-bottom: 2px;
    }

    #update-book-description-header button{
        color: #fff;
        background-color: #F5B041;
        border: 1px solid #E67E22;
        cursor: pointer;
        border-radius: 3px;
        padding-left: 5px;
        padding-right: 5px;
        visibility: hidden;
    }

    .button-visible{
        visibility: visible !important;
    }

    #update-book-description-header button:hover{
        opacity: 0.8;
    }

    #update-book-description-content{
        display: flex;
        width: 100%;
        border: 1px solid #fdb736;
        border-radius: 5px;
        height: auto;
    }

    #update-book-description-content textarea{
        font-size: 15px;
        padding-left: 2px;
        outline: none;
        width: 100%;
        height: 200px;
        border: none;
        border-radius: 5px;
        resize: initial;
        overflow-y: auto;
    }
</style>