<template>
    <div id="admin-update-book-page-top-container">
        <div id="admin-update-book-top-header">
            <span @click="navigateUpdateBooksPage">Kitaplar </span>
            <span>/</span> 
            <span>{{ bookName }}</span> 
        </div>
        <div id="admin-update-book-top-content">
            <div id="admin-update-book-top-content-left">
                <div @mouseleave="buttonVisibility = false" @mouseenter="buttonVisibility = true" @mousemove="buttonVisibility = true" id="admin-update-book-pictures-slider">
                    <i :class="{'update-book-picture-slider-button-visibility' : buttonVisibility}" class="bi bi-chevron-left"></i>
                    <Swiper
                    v-if="getUpdatedBook"
                    :modules="modules"
                    :slides-per-view="1"
                    :space-between="15"
                    :centeredSlidesBounds= "true"
                    id="update-book-picture-wrapper">
                        <SwiperSlide v-for="picture in getBookPictures(getUpdatedBook.pictureUrls)">
                            <div class="update-book-picture-slide">
                                <img :src="picture.pictureUrl">
                            </div>
                        </SwiperSlide>
                    </Swiper>
                    <i :class="{'update-book-picture-slider-button-visibility' : buttonVisibility}" class="bi bi-chevron-right"></i>
                </div>
                <div id="admin-update-book-values">
                    <div class="update-book-input-row">
                        <div class="update-book-input">
                            <span>Kitap İsmi</span>
                            <input :class="{'update-information-error-input' : bookNameValid}" v-model="bookName" type="text">
                        </div>
                    </div>
                    <div class="update-book-input-row">
                        <div class="update-book-input">
                            <span>Yayıncı</span>
                            <div id="update-book-publisher-dropdown" class="publisher-dropdown-container update-book-dropdown-container">
                                <div :class="{'update-book-dropdown-clicked' : publisherDropDownClicked}" @click="publisherDropDownClicked = !publisherDropDownClicked" class="publisher-dropdown-container update-book-dropdown">
                                    <div id="update-book-publisher-dropdown-value" class="publisher-dropdown-container update-book-dropdown-value">{{ publisher.name }}</div>
                                    <i class="bi bi-chevron-down"></i>
                                </div>
                                <div @click="publisherDropDownClicked = false" v-if="publisherDropDownClicked" id="update-book-publisher-dropdown-values" class="publisher-dropdown-container update-book-dropdown-values">
                                    <div @click="publisher = data" :class="{'update-book-dropdown-select-value-selected' : publisher.id == data.id}" class="publisher-dropdown-container update-book-dropdown-select-value" v-for="data in getPublisherNames" :key="publisher.id"> {{data.name}}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="update-book-input-row">
                        <div class="update-book-input">
                            <span>Yazar</span>
                            <div id="update-book-author-dropdown" class="author-dropdown-container update-book-dropdown-container">
                                <div @click="authorDropDownClicked = !authorDropDownClicked" :class="{'update-book-dropdown-clicked' : authorDropDownClicked}" class="author-dropdown-container update-book-dropdown">
                                    <div id="update-book-author-dropdown-value-container" class="author-dropdown-container update-book-dropdown-value">
                                        <div class="author-dropdown-container update-book-author-dropdown-value">{{ getAuthorsName() }}</div>
                                    </div>
                                    <i class="bi bi-chevron-down"></i>
                                </div>
                                <div v-if="authorDropDownClicked" id="update-book-author-dropdown-values" class="author-dropdown-container update-book-dropdown-values">
                                    <div :class="{'update-book-dropdown-select-value-selected' : authors.findIndex(x => x.id == data.id) > -1 ? true : false}" @click="addAuthor(data)" class="author-dropdown-container update-book-dropdown-select-value update-book-author-dropdown-select-values" v-for="data in getAuthorNames" :key="data.id"> 
                                        <div class="author-dropdown-container update-book-dropdown-select-value-name">{{data.name}}</div>
                                        <input class="author-dropdown-container update-book-dropdown-select-value-checkbox" type="checkbox" :checked="authors.findIndex(x => x.id == data.id) > -1 ? true : false">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="update-book-input-row">
                        <div class="update-book-input">
                            <span>Dil</span>
                            <div @click="languageDropDownClicked = !languageDropDownClicked" id="update-book-language-dropdown" class="language-dropdown-container update-book-dropdown-container">
                                <div :class="{'update-book-dropdown-clicked' : languageDropDownClicked}" class="language-dropdown-container update-book-dropdown">
                                    <div id="update-book-language-dropdown-value" class="language-dropdown-container update-book-dropdown-value"> {{ language.name }} </div>
                                    <i class="bi bi-chevron-down"></i>
                                </div>
                                <div v-if="languageDropDownClicked" id="update-book-language-dropdown-values" class="language-dropdown-container update-book-dropdown-values">
                                    <div @click="language = data" :class="{'update-book-dropdown-select-value-selected' : language.id == data.id}" v-for="data in getAllLanguage" :key="data.id" class="language-dropdown-container update-book-dropdown-select-value">{{ data.name }}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="update-book-input-row">
                        <div class="update-book-input">
                            <span>ISBN</span>
                            <input :class="{'update-information-error-input' : ISBNValid}" v-model="ISBN" type="number">
                        </div>
                    </div>
                    <div class="update-book-input-row">
                        <div class="update-book-input">
                            <span>Yayın Tarihi</span>
                            <input :class="{'update-information-error-input' : releaseDateValid}" v-model="releaseDate" type="text">
                        </div>
                    </div>
                    <div class="update-book-input-row">
                        <div class="update-book-input">
                            <span>Kağıt Tipi</span>
                            <div @click="paperTypeDropDownClicked = !paperTypeDropDownClicked" id="update-book-paper-type-dropdown" class="paper-type-dropdown-container update-book-dropdown-container">
                                <div :class="{'update-book-dropdown-clicked' : paperTypeDropDownClicked}" class="paper-type-dropdown-container update-book-dropdown">
                                    <div id="update-book-paper-type-dropdown-value" class="paper-type-dropdown-container update-book-dropdown-value"> {{ paperType }} </div>
                                    <i class="bi bi-chevron-down"></i>
                                </div>
                                <div v-if="paperTypeDropDownClicked" id="update-book-paper-type-dropdown-values" class="paper-type-dropdown-container update-book-dropdown-values">
                                    <div @click="paperType = value" v-for="(value,index) in paperTypes" :key="index + 1" :class="{'update-book-dropdown-select-value-selected' : paperType == value}" class="paper-type-dropdown-container update-book-dropdown-select-value">{{ value }}</div>
                                </div>
                            </div>
                        </div>
                        <div class="update-book-input">
                            <span>Cilt Tipi</span>
                            <div @click="skinTypeDropDownClicked = !skinTypeDropDownClicked" id="update-book-skin-type-dropdown" class="skin-type-dropdown-container update-book-dropdown-container">
                                <div :class="{'update-book-dropdown-clicked' : skinTypeDropDownClicked}" class="skin-type-dropdown-container update-book-dropdown">
                                    <div id="update-book-skin-type-dropdown-value" class="skin-type-dropdown-container update-book-dropdown-value"> {{ skinType }} </div>
                                    <i class="bi bi-chevron-down"></i>
                                </div>
                                <div v-if="skinTypeDropDownClicked" id="update-book-skin-type-dropdown-values" class="skin-type-dropdown-container update-book-dropdown-values">
                                    <div @click="skinType = value" v-for="(value,index) in skinTypes" :key="index+1" :class="{'update-book-dropdown-select-value-selected' : skinType == value}" class="skin-type-dropdown-container update-book-dropdown-select-value">{{ value }}</div>
                                </div>
                            </div>
                        </div>
                        <div class="update-book-input">
                            <span>Boyut</span>
                            <div @click="dimensionDropDownClicked = !dimensionDropDownClicked" id="update-book-dimension-dropdown" class="dimension-dropdown-container update-book-dropdown-container">
                                <div :class="{'update-book-dropdown-clicked' : dimensionDropDownClicked}" class="dimension-dropdown-container update-book-dropdown">
                                    <div id="update-book-dimension-dropdown-value" class="dimension-dropdown-container update-book-dropdown-value"> {{ dimension }}</div>
                                    <i class="bi bi-chevron-down"></i>
                                </div>
                                <div v-if="dimensionDropDownClicked" id="update-book-dimension-dropdown-values" class="dimension-dropdown-container update-book-dropdown-values">
                                    <div @click="dimension = value" v-for="(value,index) in dimensions" :key="index + 1" :class="{'update-book-dropdown-select-value-selected' : dimension == value}" class="dimension-dropdown-container update-book-dropdown-select-value">{{ value }}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="update-book-input-row">
                        <div class="update-book-input">
                            <span>Sayfa Sayısı</span>
                            <input :class="{'update-information-error-input' : pageOfNumberValid}" v-model="pageOfNumber" type="number">
                        </div>
                        <div class="update-book-input">
                            <span>Stok</span>
                            <input :class="{'update-information-error-input' : stockValid}" v-model="stock" type="number">
                        </div>
                        <div class="update-book-input">
                            <span>Fiyat</span>
                            <input :class="{'update-information-error-input' : priceValid}" v-model="price" type="number">
                        </div>
                    </div>
                    <button :class="{'not-chanhed-update-button' : !updateBookInformationActivate}" @click="updateBookAuthorAndInformation">Güncelle</button>
                </div>
            </div>
            <div id="admin-update-book-top-content-right">
                <div class="admin-update-book-chart">
                    <div class="admin-update-book-chart-name">Chart Name</div>
                    <div class="admin-update-book-chart-container">
                        <canvas id="" class="updated-book-chart"></canvas>
                    </div>
                </div> 
                <div class="admin-update-book-chart">
                    <div class="admin-update-book-chart-name">Chart Name</div>
                    <div class="admin-update-book-chart-container">
                        <canvas id="" class="updated-book-chart"></canvas>
                    </div>
                </div>
                <div class="admin-update-book-chart">
                    <div id="view-comment-chart-title" class="admin-update-book-chart-name"><span>Görüntülenme</span> & <span>Yorum Sayısı</span></div>
                    <div class="admin-update-book-chart-container">
                        <canvas id="view-comment-chart" class="updated-book-chart"></canvas>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { markRaw } from 'vue'
import { Chart } from 'chart.js/auto';
import { mapGetters,mapActions } from 'vuex';
import { Swiper , SwiperSlide  } from 'swiper/vue';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

export default{
    data() {
        return{
            buttonVisibility : false,
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
            bookDescription : "",
            pageOfNumber : 0,
            stock : 0,
            price : 0,
            bookNameValid : false,
            ISBNValid : false,
            releaseDateValid : false,
            pageOfNumberValid : false,
            stockValid : false,
            priceValid : false,
            bookDescriptionValid : false,
            updateInformationButtonClicked : false,
            updateBookAuthorsButtonClicked : false,
            updateBookInformationActivate : false,
            viewCommentChart : null,
        }
    },

    components:{
        Swiper,
        SwiperSlide
    },

    setup(){
        return{
            modules : [Autoplay]
        }
    },

    computed:{
        ...mapGetters({
            getUpdatedBook : "BookModule/_getUpdatedBook",
            getUpdatedBookId : "BookModule/_getUpdatedBookId",
            getAllLanguage : "LanguageModule/_getAllLanguage",
            getAuthorNames : "AuthorModule/_getAuthorNames",
            getPublisherNames : "PublisherModule/_getPublisherNames",
            getUpdateBookAuthorsSuccessResult : "BookModule/_getUpdateBookAuthorsSuccessResult",
            getUpdateBookInformationSuccessResult : "BookModule/_getUpdateBookInformationSuccessResult",
            getSelectedBookViewDatasForDays : "ViewModule/_getSelectedBookViewDatasForDays",
            getSelectedBookCommentDatasForDays : "CommentModule/_getSelectedBookCommentDatasForDays",
        }),
    },

    methods:{
        ...mapActions({
            getUpdatedBookAction : "BookModule/getUpdatedBook",
            getAllLanguageAction : "LanguageModule/getAllLanguage",
            getAllAuthorName : "AuthorModule/getAllAuthorName",
            getAllPublisherName : "PublisherModule/getAllPublisherName",
            updateBookInformationsAction : "BookModule/updateBookInformations",
            updateBookAuthorsAction : "BookModule/updateBookAuthors",
            getSelectedBookViewDatasForDaysAction : "ViewModule/getSelectedBookViewDatasForDays",
            getSelectedBookCommentDatasForDaysAction : "CommentModule/getSelectedBookCommentDatasForDays",
        }),
        navigateUpdateBooksPage(){
            this.$router.push({
                name : "AdminBooksPage",
            });
        },
        hidePublisherDropDown(){
            document.querySelector("#app").addEventListener('click',(e) => {
                let classNames = e.srcElement.className.split(" ");
                if(classNames.findIndex(x => x == "publisher-dropdown-container") > -1)
                    return;
                else                
                    this.publisherDropDownClicked = false;
            })
        },
        hideAuthorDropDown(){
            document.querySelector("#app").addEventListener('click',(e) => {
                let classNames = e.srcElement.className.split(" ");
                if(classNames.findIndex(x => x == "author-dropdown-container") > -1)
                    return;
                else
                    this.authorDropDownClicked = false;
            })
        },
        hideLanguageDropDown(){
            document.querySelector("#app").addEventListener('click',(e) => {
                let classNames = e.srcElement.className.split(" ");
                if(classNames.findIndex(x => x == "language-dropdown-container") > -1)
                    return;
                else
                    this.languageDropDownClicked = false;
            })
        },
        hidePaperTypeDropDown(){
            document.querySelector("#app").addEventListener('click',(e) => {
                let classNames = e.srcElement.className.split(" ");
                if(classNames.findIndex(x => x == "paper-type-dropdown-container") > -1)
                    return;
                else
                    this.paperTypeDropDownClicked = false;
            })
        },
        hideSkinTypeDropDown(){
            document.querySelector("#app").addEventListener('click',(e) => {
                let classNames = e.srcElement.className.split(" ");
                if(classNames.findIndex(x => x == "skin-type-dropdown-container") > -1)
                    return;
                else
                    this.skinTypeDropDownClicked = false;
            })
        },
        hideDimensionDropDown(){
            document.querySelector("#app").addEventListener('click',(e) => {
                let classNames = e.srcElement.className.split(" ");
                if(classNames.findIndex(x => x == "dimension-dropdown-container") > -1)
                    return;
                else
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
        },
        getBookPictures(pictureUrls){
            if(pictureUrls == null)
                return require("@/assets/no-image-available.jpg");
            return pictureUrls;
        },
        addAuthor(author){
            let index = this.authors.findIndex(x => x.id == author.id)
            if(index > -1 && this.authors.length > 1)
                this.authors.splice(index,1);
            
            if(index == -1)
                this.authors.push(author);

            this.updateBookInformationActivate = this.handleChangeAuthors();
        },
        getAuthorsName(){
            let names = "";
            for(let i = 0; i<this.authors.length ; i++){
                if(i == 0)
                    names += this.authors[i].name;
                if(i == 1)
                    names += ","+this.authors[i].name;

                if(i > 1){
                    names += " ...";
                    break;
                }
            }

            return names;
        },
        bookNameValidator(){
            if(this.bookName == "" || this.bookName == null || this.bookName.length > 50 || this.bookName.length < 2)
                return true;

            return false;
        },
        ISBNValidator(){
            if(this.ISBN == "" || this.ISBN == null || this.ISBN.length != 13 )
                return true;

            return false;
        },
        releaseDateValidator(){
            if(this.releaseDate.length > 10 || new Date(this.releaseDate) > new Date())
                return true;

            return false;
        },
        pageOfNumberValidator(){
            if(this.pageOfNumber == 0 || this.pageOfNumber == null || this.pageOfNumber < 0)
                return true;

            return false;
        },
        stockValidator(){
            if(this.stock < 0 )
                return true;

            return false;
        },
        priceValidator(){
            if(this.price == 0 || this.price == null || this.price <0)
                return true;

            return false;
        },
        bookDescriptionValidator(){
            if(this.bookDescription == "" ||this.bookDescription == null || this.bookDescription.length < 50)
                return true;

            return false;
        },
        handleChangeAuthors(){
            if(this.authors.length > this.getUpdatedBook.authors.length)
                for(let data of this.authors)
                    if(this.getUpdatedBook.authors.findIndex(author => author.id == data.id) == -1)
                        return true;

            if(this.authors.length < this.getUpdatedBook.authors.length)
                for(let data of this.getUpdatedBook.authors)
                    if(this.authors.findIndex(author => author.id == data.id) == -1)
                        return true;

            if(this.authors.length == this.getUpdatedBook.authors.length)
                for(let data of this.getUpdatedBook.authors)
                    if(this.authors.findIndex(author => author.id == data.id) == -1)
                        return true;
            
            return false;
        },
        updateAuthor(){
            let isUpdate = this.handleChangeAuthors();
            if(!isUpdate)
                return;

            if(this.updateBookInformationActivate){
                this.updateBookAuthorsAction({
                    bookId : this.getUpdatedBookId,
                    authorIds : this.authors.map(x => x.id),
                })
            }   
        },
        updateBookInformations(){
            this.bookNameValid = this.bookNameValidator();
            this.ISBNValid = this.ISBNValidator();
            this.releaseDateValid = this.releaseDateValidator();
            this.pageOfNumberValid = this.pageOfNumberValidator();
            this.stockValid = this.stockValidator();
            this.priceValid = this.priceValidator();

            if(this.bookNameValid || this.ISBNValid || this.releaseDateValid || this.pageOfNumberValid || this.stockValid || this.priceValid)
                return;

            if(this.updateBookInformationActivate){
                this.updateBookInformationsAction({
                    bookId : this.getUpdatedBookId,
                    publisherId : this.publisher.id,
                    languageId : this.language.id,
                    bookName : this.bookName,
                    ISBN : this.ISBN,
                    paperType : this.paperType,
                    skinType : this.skinType,
                    dimension : this.dimension,
                    releaseDate : this.releaseDate,
                    pageOfNumber : this.pageOfNumber,
                    stock : this.stock,
                    price : this.price,
                });
            }
        },
        updateBookAuthorAndInformation(){
            this.updateAuthor();
            this.updateBookInformations();
        },
        createCharts(){
            let chart = new Chart(document.getElementById("view-comment-chart"),
            {
                type: 'bar',
                data: {
                    labels: [],
                    datasets: []
                },
                options:{
                    responsive: false,
                    plugins:{
                        legend: {
                            display: false
                        }
                    }
                }
            });

            this.viewCommentChart = markRaw(chart);
        }
    },

    watch:{
        getSelectedBookViewDatasForDays(){
            if(this.getSelectedBookViewDatasForDays != null){
                let labels = [];
                let datas  = [];
                for(let data of this.getSelectedBookViewDatasForDays){
                    labels.push(data.date);
                    datas.push(data.viewCount);
                }
                this.viewCommentChart.data.labels = labels;
                this.viewCommentChart.data.datasets.push({
                    label : "Görüntülenme",
                    data: datas,
                    pointRadius: 0,
                    borderWidth: 2,
                    fill: true,
                    borderColor: '#CA6F1E',
                    backgroundColor: '#EDBB99'
                });

                this.viewCommentChart.update();
            }
        },
        getSelectedBookCommentDatasForDays(){
            if(this.getSelectedBookCommentDatasForDays != null){
                let labels = [];
                let datas  = [];
                for(let data of this.getSelectedBookCommentDatasForDays){
                    labels.push(data.date);
                    datas.push(data.commentCount);
                }
                this.viewCommentChart.data.labels = labels;
                this.viewCommentChart.data.datasets.push({
                    label :"Yorum",
                    data: datas,
                    pointRadius: 0,
                    borderWidth: 2,
                    fill: true,
                    borderColor: '#C0392B',
                    backgroundColor: '#EC7063'
                });

                this.viewCommentChart.update();
            }
        },
        getUpdateBookInformationSuccessResult(){
            if(this.getUpdateBookInformationSuccessResult)
                this.$toastr.success("Kitap Bilgileri Başarıyla Güncellendi !");
        },
        getUpdateBookAuthorsSuccessResult(){
            if(this.getUpdateBookAuthorsSuccessResult)
                this.$toastr.success("Kitap Yazar Bilgileri Başarıyla Güncellendi !");
        },
        getUpdatedBook(){
            if(this.getUpdatedBook != null){
                this.bookName = this.getUpdatedBook.bookName ;
                this.ISBN = this.getUpdatedBook.isbn;
                this.releaseDate  = this.getUpdatedBook.releaseDate;
                this.publisher = this.getUpdatedBook.publisher;
                this.language = this.getUpdatedBook.language;
                this.authors = [];
                for(let data of this.getUpdatedBook.authors)
                    this.authors.push(data)
                this.paperType = this.getUpdatedBook.paperType ;
                this.skinType = this.getUpdatedBook.skinType ;
                this.dimension = this.getUpdatedBook.dimension ;
                this.pageOfNumber = this.getUpdatedBook.pageOfNumber;
                this.stock = this.getUpdatedBook.stock ;
                this.price = this.getUpdatedBook.price ;
                this.bookDescription = this.getUpdatedBook.description;
            }
        },
        bookName(){
            if(this.bookName != this.getUpdatedBook.bookName)
                this.updateBookInformationActivate = true;
            else
                this.updateBookInformationActivate = false;
        },
        publisherId(){
            if(this.publisherId != this.getUpdatedBook.publisherId)
                this.updateBookInformationActivate = true;
            else
                this.updateBookInformationActivate = false;
        },
        publisher(){
            if(this.publisher.id != this.getUpdatedBook.publisher.id)
                this.updateBookInformationActivate = true;
            else
                this.updateBookInformationActivate = false;
        },
        language(){
            if(this.language.id != this.getUpdatedBook.language.id)
                this.updateBookInformationActivate = true;
            else
                this.updateBookInformationActivate = false;
        },
        ISBN(){
            if(this.ISBN != this.getUpdatedBook.isbn)
                this.updateBookInformationActivate = true;
            else
                this.updateBookInformationActivate = false;
        },
        paperType(){
            if(this.paperType != this.getUpdatedBook.paperType)
                this.updateBookInformationActivate = true;
            else
                this.updateBookInformationActivate = false;
        },
        skinType(){
            if(this.skinType != this.getUpdatedBook.skinType)
                this.updateBookInformationActivate = true;
            else
                this.updateBookInformationActivate = false;
        },
        dimension(){
            if(this.dimension != this.getUpdatedBook.dimension)
                this.updateBookInformationActivate = true;
            else
                this.updateBookInformationActivate = false;
        },
        pageOfNumber(){
            if(this.pageOfNumber != this.getUpdatedBook.pageOfNumber)
                this.updateBookInformationActivate = true;
            else
                this.updateBookInformationActivate = false;
        },
        stock(){
            if(this.stock != this.getUpdatedBook.stock)
                this.updateBookInformationActivate = true;
            else
                this.updateBookInformationActivate = false;
        },
        price(){
            if(this.price != this.getUpdatedBook.price)
                this.updateBookInformationActivate = true;
            else
                this.updateBookInformationActivate = false;
        },
        releaseDate(){
            if(this.releaseDate != this.getUpdatedBook.releaseDate)
                this.updateBookInformationActivate = true;
            else
                this.updateBookInformationActivate = false;
        },
    },

    updated(){
        this.hideDropDown();
    },

    mounted(){
        this.createCharts();
        this.getSelectedBookCommentDatasForDaysAction(this.getUpdatedBookId);
        this.getSelectedBookViewDatasForDaysAction(this.getUpdatedBookId)
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
        height: 195px;
        width: 100%;
        margin-bottom: 15px;
        border-radius: 7px;
        box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 2px 0px;
        border: 1px solid #F2F3F4;
        background-color: #F8F9F9;
        padding: 5px;
        display : flex;
        flex-direction: column;
    }

    .admin-update-book-chart-name{
        font-size : 16px;
        color : #e78229;
        margin-bottom : 5px;
    }

    .admin-update-book-chart-container{
        height : 157px;
        display: flex;
    }

    .updated-book-chart{
        height: 100% !important;
        width: 100%;
    }

    #view-comment-chart-title span:first-child{
        color: #CA6F1E;
    }

    #view-comment-chart-title span:last-child{
        color: #C0392B;
    }

    #admin-update-book-top-content-right .admin-update-book-chart:last-child{
        margin-bottom: 0px !important;
    }

    #admin-update-book-pictures-slider{
        position: relative;
        display: flex;
        align-items: center;
        width: 44%;
        max-width: 362px;
        height: 100%;
        border-radius: 7px;
        background-color: #fbfcfc;
        border: 1px solid #d7dcdc;
        margin-right: 15px;
        padding: 6px;
    }

    #update-book-picture-wrapper{
        width: 100% ;
        height: 100% ;
    }

    .update-book-picture-slide{
        border-radius: 3px;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100% ;
        height: 100%;
        background-color: #F4F6F6;
    }

    .update-book-picture-slide img{
        width: 100%;
        height: 100%;
        object-fit: scale-down;
    }

    #admin-update-book-pictures-slider i{
        z-index: 200;
        opacity: 0;
        font-size: 19px;
        height: 37px;
        width: 37px;
        border-radius: 50%;
        color: #fff;
        background-color: orange;
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
        cursor: pointer;
        transition: all 250ms;
    }

    .update-book-picture-slider-button-visibility{
        opacity: 1 !important;
        transition: all 250ms;
    }

    #admin-update-book-pictures-slider i:hover{
        background-color: #F5B041;
    }

    #admin-update-book-pictures-slider i:last-child{
        padding-left: 3px;
        right: -10px;   
    }

    #admin-update-book-pictures-slider i:first-child{
        padding-right: 3px;
        left: -10px;
    }

    #admin-update-book-values{
        width: 55%;
        display: flex;
        flex-direction: column;
    }

    .not-chanhed-update-button{
        cursor: auto !important;
        color: #3e3e3e !important;
        border: 1px solid #BFC9CA !important;
        background-color: #D5DBDB !important;
    }

    .not-chanhed-update-button:hover{
        opacity: 1 !important;
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

    .update-book-input input[type=number]::-webkit-outer-spin-button,
    .update-book-input input[type=number]::-webkit-inner-spin-button{
        -webkit-appearance: none;
    }

    .update-information-error-input{
        border: 1px solid #E74C3C !important;
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

    #update-book-author-dropdown-values{
        width: 100%;
        display: flex;
        justify-content: space-between;
    }

    .update-book-author-dropdown-select-values{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-right: 5px;
    }

    .update-book-author-dropdown-select-values div{
        width: 100%;
    }

    .update-book-author-dropdown-select-values input{
        height: 16px;
        width: 16px;
        cursor: pointer;
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