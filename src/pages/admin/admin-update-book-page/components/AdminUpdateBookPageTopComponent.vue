<template>
    <div id="admin-update-book-page-top-container">
        <div id="admin-update-book-top-header">
            <span @click="navigateUpdateBooksPage">Kitaplar </span>
            <span>/</span> 
            <span>{{ bookName }}</span> 
        </div>
        <div id="admin-update-book-top-content">
            <div id="admin-update-book-top-content-left">
                <div id="admin-update-book-pictures-slider"></div>
                <div id="admin-update-book-values">
                    <div class="update-book-input-row">
                        <div class="update-book-input">
                            <span>Kitap İsmi</span>
                            <input v-model="bookName" type="text">
                        </div>
                    </div>
                    <div class="update-book-input-row">
                        <div class="update-book-input">
                            <span>Yayıncı</span>
                            <div id="update-book-publisher-dropdown" class="update-book-dropdown-container">
                                <div :class="{'update-book-dropdown-clicked' : publisherDropDownClicked}" @click="publisherDropDownClicked = !publisherDropDownClicked" class="update-book-dropdown">
                                    <div id="update-book-publisher-dropdown-value" class="update-book-dropdown-value">{{ publisher.name }}</div>
                                    <i class="bi bi-chevron-down"></i>
                                </div>
                                <div v-if="publisherDropDownClicked" id="update-book-publisher-dropdown-values" class="update-book-dropdown-values">
                                    <div :class="{'update-book-dropdown-select-value-selected' : publisher.id == data.id}" class="update-book-dropdown-select-value" v-for="data in getPublisherNames" :key="publisher.id"> {{data.name}}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="update-book-input-row">
                        <div class="update-book-input">
                            <span>Yazar</span>
                            <div @click="authorDropDownClicked = !authorDropDownClicked" id="update-book-author-dropdown" class="update-book-dropdown-container">
                                <div :class="{'update-book-dropdown-clicked' : authorDropDownClicked}" class="update-book-dropdown">
                                    <div id="update-book-author-dropdown-value-container" class="update-book-dropdown-value">
                                        <div class="update-book-author-dropdown-value" v-for="author in authors">{{ author.name }}</div>
                                    </div>
                                    <i class="bi bi-chevron-down"></i>
                                </div>
                                <div v-if="authorDropDownClicked" id="update-book-author-dropdown-values" class="update-book-dropdown-values">
                                    <div class="update-book-dropdown-select-value" v-for="author in getAuthorNames" :key="author.id"> {{author.name}}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="update-book-input-row">
                        <div class="update-book-input">
                            <span>Dil</span>
                            <div @click="languageDropDownClicked = !languageDropDownClicked" id="update-book-language-dropdown" class="update-book-dropdown-container">
                                <div :class="{'update-book-dropdown-clicked' : languageDropDownClicked}" class="update-book-dropdown">
                                    <div id="update-book-language-dropdown-value" class="update-book-dropdown-value"> {{ language.name }} </div>
                                    <i class="bi bi-chevron-down"></i>
                                </div>
                                <div v-if="languageDropDownClicked" id="update-book-language-dropdown-values" class="update-book-dropdown-values">
                                    <div :class="{'update-book-dropdown-select-value-selected' : language.id == data.id}" v-for="data in getAllLanguage" :key="data.id" class="update-book-dropdown-select-value">{{ data.name }}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="update-book-input-row">
                        <div class="update-book-input">
                            <span>ISBN</span>
                            <input v-model="ISBN" type="text">
                        </div>
                    </div>
                    <div class="update-book-input-row">
                        <div class="update-book-input">
                            <span>Yayın Tarihi</span>
                            <input v-model="releaseDate" type="text">
                        </div>
                    </div>
                    <div class="update-book-input-row">
                        <div class="update-book-input">
                            <span>Kağıt Tipi</span>
                            <div @click="paperTypeDropDownClicked = !paperTypeDropDownClicked" id="update-book-paper-type-dropdown" class="update-book-dropdown-container">
                                <div :class="{'update-book-dropdown-clicked' : paperTypeDropDownClicked}" class="update-book-dropdown">
                                    <div id="update-book-paper-type-dropdown-value" class="update-book-dropdown-value"> {{ paperType }} </div>
                                    <i class="bi bi-chevron-down"></i>
                                </div>
                                <div v-if="paperTypeDropDownClicked" id="update-book-paper-type-dropdown-values" class="update-book-dropdown-values">
                                    <div v-for="(value,index) in paperTypes" :key="index + 1" :class="{'update-book-dropdown-select-value-selected' : paperType == value}" class="update-book-dropdown-select-value">{{ value }}</div>
                                    <div :class="{'update-book-dropdown-select-value-selected' : paperType == 'Saman Kağıdı'}" class="update-book-dropdown-select-value">Saman Kağıdı</div>
                                </div>
                            </div>
                        </div>
                        <div class="update-book-input">
                            <span>Cilt Tipi</span>
                            <div @click="skinTypeDropDownClicked = !skinTypeDropDownClicked" id="update-book-skin-type-dropdown" class="update-book-dropdown-container">
                                <div :class="{'update-book-dropdown-clicked' : skinTypeDropDownClicked}" class="update-book-dropdown">
                                    <div id="update-book-skin-type-dropdown-value" class="update-book-dropdown-value"> {{ skinType }} </div>
                                    <i class="bi bi-chevron-down"></i>
                                </div>
                                <div v-if="skinTypeDropDownClicked" id="update-book-skin-type-dropdown-values" class="update-book-dropdown-values">
                                    <div v-for="(value,index) in skinTypes" :key="index+1" :class="{'update-book-dropdown-select-value-selected' : skinType == value}" class="update-book-dropdown-select-value">{{ value }}</div>
                                </div>
                            </div>
                        </div>
                        <div class="update-book-input">
                            <span>Boyut</span>
                            <div @click="dimensionDropDownClicked = !dimensionDropDownClicked" id="update-book-dimension-dropdown" class="update-book-dropdown-container">
                                <div :class="{'update-book-dropdown-clicked' : dimensionDropDownClicked}" class="update-book-dropdown">
                                    <div id="update-book-dimension-dropdown-value" class="update-book-dropdown-value"> {{ dimension }}</div>
                                    <i class="bi bi-chevron-down"></i>
                                </div>
                                <div v-if="dimensionDropDownClicked" id="update-book-dimension-dropdown-values" class="update-book-dropdown-values">
                                    <div v-for="(value,index) in dimensions" :key="index + 1" :class="{'update-book-dropdown-select-value-selected' : dimension == value}" class="update-book-dropdown-select-value">{{ value }}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="update-book-input-row">
                        <div class="update-book-input">
                            <span>Sayfa Sayısı</span>
                            <input v-model="pageOfNumber" type="text">
                        </div>
                        <div class="update-book-input">
                            <span>Stok</span>
                            <input v-model="stock" type="text">
                        </div>
                        <div class="update-book-input">
                            <span>Fiyat</span>
                            <input v-model="price" type="text">
                        </div>
                    </div>
                    <button>Güncelle</button>
                </div>
            </div>
            <div id="admin-update-book-top-content-right">
                <div class="admin-update-book-chart"></div>
                <div class="admin-update-book-chart"></div>
                <div class="admin-update-book-chart"></div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters,mapActions } from 'vuex';

export default{
    data() {
        return{
            publisherDropDownClicked : false,
            authorDropDownClicked : false,
            languageDropDownClicked : false,
            paperTypeDropDownClicked : false,
            skinTypeDropDownClicked : false,
            dimensionDropDownClicked : false,
            skinTypes : ['Ciltli','Karton Kapak'],
            paperTypes : ['Kitap Kağıdı',"Saman Kağıdı"],
            dimensions : ['13.5 x 19.45 cm','12.5 x 20.5 cm','13.5 x 19.5 cm','13.5 x 21 cm'],
            publisher : Object,
            authors : [],
            language : Object,
            paperType : "",
            skinType : "",
            dimension : "", 
            ISBN : "",
            releaseDate : "",
            bookName : "",
            pageOfNumber : 0,
            stock : 0,
            price : 0,
        }
    },

    computed:{
        ...mapGetters({
            getUpdatedBook : "BookModule/_getUpdatedBook",
            getUpdatedBookId : "BookModule/_getUpdatedBookId",
            getAllLanguage : "LanguageModule/_getAllLanguage",
            getAuthorNames : "AuthorModule/_getAuthorNames",
            getPublisherNames : "PublisherModule/_getPublisherNames",
        })
    },

    methods:{
        ...mapActions({
            getUpdatedBookAction : "BookModule/getUpdatedBook",
            getAllLanguageAction : "LanguageModule/getAllLanguage",
            getAllAuthorName : "AuthorModule/getAllAuthorName",
            getAllPublisherName : "PublisherModule/getAllPublisherName",
        }),
        navigateUpdateBooksPage(){
            this.$router.push({
                name : "AdminBooksPage",
            });
        },
        hidePublisherDropDown(){
            document.querySelector("#app").addEventListener('click',(e) => {
                if(e.srcElement.id == "update-book-publisher-dropdown")
                    return;

                if(e.srcElement.id == "update-book-publisher-dropdown-value")
                    return;

                if(e.srcElement.parentElement != null && e.srcElement.parentElement.id == "update-book-publisher-dropdown")
                    return;

                if(e.srcElement.id == "update-book-publisher-dropdown-values")    
                    return;

                if(e.srcElement.parentElement == "update-book-publisher-dropdown-values")
                    return;  
                
                this.publisherDropDownClicked = false;
            })
        },
        hideAuthorDropDown(){
            document.querySelector("#app").addEventListener('click',(e) => {
                if(e.srcElement.id == "update-book-author-dropdown")
                    return;

                if(e.srcElement.id == "update-book-author-dropdown-value-container")
                    return;

                if(e.srcElement.className =="update-book-author-dropdown-value")
                    return;

                if(e.srcElement.parentElement != null && e.srcElement.parentElement.id == "update-book-author-dropdown")
                    return;

                if(e.srcElement.id == "update-book-author-dropdown-values")    
                    return;

                if(e.srcElement.parentElement == "update-book-author-dropdown-values")
                    return;  
                
                this.authorDropDownClicked = false;
            })
        },
        hideLanguageDropDown(){
            document.querySelector("#app").addEventListener('click',(e) => {
                if(e.srcElement.id == "update-book-language-dropdown")
                    return;

                if(e.srcElement.id == "update-book-language-dropdown-value")
                    return;

                if(e.srcElement.parentElement != null && e.srcElement.parentElement.id == "update-book-language-dropdown")
                    return;

                if(e.srcElement.id == "update-book-language-dropdown-values")    
                    return;

                if(e.srcElement.parentElement == "update-book-language-dropdown-values")
                    return;  
                
                this.languageDropDownClicked = false;
            })
        },
        hidePaperTypeDropDown(){
            document.querySelector("#app").addEventListener('click',(e) => {
                if(e.srcElement.id == "update-book-paper-type-dropdown")
                    return;

                if(e.srcElement.id == "update-book-paper-type-dropdown-value")
                    return;

                if(e.srcElement.parentElement != null && e.srcElement.parentElement.id == "update-book-paper-type-dropdown")
                    return;

                if(e.srcElement.id == "update-book-paper-type-dropdown-values")    
                    return;

                if(e.srcElement.parentElement == "update-book-paper-type-dropdown-values")
                    return;  
                
                this.paperTypeDropDownClicked = false;
            })
        },
        hideSkinTypeDropDown(){
            document.querySelector("#app").addEventListener('click',(e) => {
                if(e.srcElement.id == "update-book-skin-type-dropdown")
                    return;

                if(e.srcElement.id == "update-book-skin-type-dropdown-value")
                    return;

                if(e.srcElement.parentElement != null && e.srcElement.parentElement.id == "update-book-skin-type-dropdown")
                    return;

                if(e.srcElement.id == "update-book-skin-type-dropdown-values")    
                    return;

                if(e.srcElement.parentElement == "update-book-skin-type-dropdown-values")
                    return;  
                
                this.skinTypeDropDownClicked = false;
            })
        },
        hideDimensionDropDown(){
            document.querySelector("#app").addEventListener('click',(e) => {
                if(e.srcElement.id == "update-book-dimension-dropdown")
                    return;

                if(e.srcElement.id == "update-book-dimension-dropdown-value")
                    return;

                if(e.srcElement.parentElement != null && e.srcElement.parentElement.id == "update-book-dimension-dropdown")
                    return;

                if(e.srcElement.id == "update-book-dimension-dropdown-values")    
                    return;

                if(e.srcElement.parentElement == "update-book-dimension-dropdown-values")
                    return;  
                
                this.dimensionDropDownClicked = false;
            })
        },
        hideDropDown(){
            this.hidePublisherDropDown();
            this.hideAuthorDropDown();
            this.hideLanguageDropDown();
            this.hidePaperTypeDropDown();
            this.hideSkinTypeDropDown();
            this.hideDimensionDropDown(); 
        }
    },

    watch:{
        getUpdatedBook(){
            if(this.getUpdatedBook != null){
                this.bookName = this.getUpdatedBook.bookName ;
                this.ISBN = this.getUpdatedBook.isbn;
                this.releaseDate = this.getUpdatedBook.releaseDate ;
                this.publisher = this.getUpdatedBook.publisher;
                this.language = this.getUpdatedBook.language;
                this.authors = this.getUpdatedBook.authors;
                this.paperType = this.getUpdatedBook.paperType ;
                this.skinType = this.getUpdatedBook.skinType ;
                this.dimension = this.getUpdatedBook.dimension ;
                this.pageOfNumber = this.getUpdatedBook.pageOfNumber;
                this.stock = this.getUpdatedBook.stock ;
                this.price = this.getUpdatedBook.price ;
            }
        }
    },

    updated(){
        this.hideDropDown();
    },

    mounted(){
        this.getUpdatedBookAction(this.getUpdatedBookId);
        this.getAllLanguageAction();
        this.getAllAuthorName();
        this.getAllPublisherName();
    }
}
</script>

<style>
    #admin-update-book-page-top-container{
        display: flex;
        flex-direction: column;
        margin-bottom: 15px;
    }

    #admin-update-book-top-header{
        user-select: none;
        padding-left: 10px;
        display: flex;
        align-items: center;
        font-size: 17px;
        color: orange;
        display: flex;
        height: 45px;
        width: 100%;
        border-radius: 7px;
        box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 2px 0px;
        border: 1px solid #F2F3F4;
        background-color: #F8F9F9;
        margin-bottom: 15px;
    }

    #admin-update-book-top-header span:first-child{
        cursor: pointer;
    }

    #admin-update-book-top-header span:first-child:hover{
        border-bottom: 1.6px solid orange;
    }

    #admin-update-book-top-content{
        display: flex;
    }

    #admin-update-book-top-content-left{
        display: flex;
        width: 69%;
        margin-right: 15px;
        height: auto;
        box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 2px 0px;
        border: 1px solid #F2F3F4;
        background-color: #F8F9F9;
        border-radius: 7px;
        padding: 10px;
    }

    #admin-update-book-top-content-right{
        display: flex;
        flex-direction: column;
        width: 29.7%;
    }

    .admin-update-book-chart{
        height: 190px;
        width: 100%;
        margin-bottom: 15px;
        border-radius: 7px;
        box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 2px 0px;
        border: 1px solid #F2F3F4;
        background-color: #F8F9F9;
    }

    #admin-update-book-top-content-right .admin-update-book-chart:last-child{
        margin-bottom: 0px !important;
    }

    #admin-update-book-pictures-slider{
        width: 44%;
        height: 100%;
        border-radius: 7px;
        background-color: #fbfcfc;
        border: 1px solid #d7dcdc;
        margin-right: 15px;
    }

    #admin-update-book-values{
        width: 55%;
        display: flex;
        flex-direction: column;
    }

    #admin-update-book-values button{
        margin-top: 39px;
        height: 38px;
        border: 1.5px solid #E67E22;
        background-color: #F39C12;
        color: #fff;
        border-radius: 5px;
        cursor: pointer;
        font-size: 17px;
    }

    #admin-update-book-values button:hover{
        opacity: 0.9;
    }

    .update-book-input-row{
        display: flex;
        width: 100%;
        margin-bottom: 10px;
    }

    .update-book-input-row .update-book-input{
        margin-right: 7px;
    }

    .update-book-input-row .update-book-input:last-child{
        margin-right: 0px;
    }

    .update-book-input{
        display: flex;
        flex-direction: column;
        width: 100%;
    }

    .update-book-input span{
        color: #f39c12;
        font-size: 16px;
        margin-bottom: 1.5px;
    }

    .update-book-input input{
        padding-left: 3px;
        border-radius: 3px;
        border: 1px solid orange;
        outline: none;
        width: 100%;
        font-size: 17px;
        height: 30px;
    }

    .update-book-dropdown-container{
        display: flex;
        flex-direction: column;
        position: relative;
    }

    .update-book-dropdown{
        height: 30px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border: 1px solid orange;
        background-color: #ffffff;
        border-radius: 3px;
        padding-left: 3px;
        padding-right: 3px;
        cursor: pointer;
        width: 100%;
        user-select: none;
    }

    .update-book-dropdown-clicked{
        border-bottom-left-radius: 0px;
        border-bottom-right-radius: 0px;
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
        transition: all 250ms;
    }

    .update-book-dropdown i{
        position: absolute;
        font-size: 18px;
        right: 3px;
        z-index: 10;
        color: #2c3c4b;
    }

    .update-book-dropdown-value{
        display: flex;
        align-items: center;
        height: 100%;
        width: 100%;
        position: relative;
        z-index: 150;
    }

    .update-book-dropdown-values{
        padding: 1px;
        display: flex;
        flex-direction: column;
        width: 100%;
        position: absolute;
        z-index: 200;
        max-height: 217px;
        height: auto;
        border: 1px solid orange;
        border-top: none;
        background-color: #fff;
        top: 30px;
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
        border-bottom-left-radius: 3px;
        border-bottom-right-radius: 3px;
        overflow-y: auto;
    }

    .update-book-dropdown-values .update-book-dropdown-select-value:last-child{
        margin-bottom: 0px;
    }

    #update-book-author-dropdown-values .update-book-dropdown-select-value,
    #update-book-publisher-dropdown-values .update-book-dropdown-select-value{
        padding-top: 2.5px;
        padding-bottom: 2.5px;
    }

    .update-book-dropdown-select-value{
        padding-left: 2px;
        display: flex;
        align-items: center;
        user-select: none;
        cursor: pointer;
        margin-bottom: 2px;
        height: 25px;
        font-size: 15px;
        transition: 250ms all;
    }

    .update-book-dropdown-select-value-selected{
        color: #fff;
        background-color: #F5B041;
    }

    .update-book-dropdown-select-value:hover{
        color: #fff;
        background-color: #F5B041;
        transition: 250ms all;
    }
</style>