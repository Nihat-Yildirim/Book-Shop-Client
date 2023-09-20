<template>
    <div id="categories-container">
        <div v-for="parentCategory in parentCategories" :key="parentCategory.key" class="category">
            {{ parentCategory.name }}
        </div>
        <div id="more-category" class="category">
            daha fazlası...
        </div>
    </div>
</template>

<script>
export default{
    data(){
        return{
            parentCategories:[
                {name : "Edebiyat", id:1},
                {name : "Çocuk Kitapları", id:2},
                {name : "Tarih", id:3},
                {name : "Siyaset", id:4},
                {name : "Kişisel Gelişim", id:5},
                {name : "Eğitim", id:6},
                {name : "Sınav", id:7},
                {name : "Ders Kitapları", id:8},
                {name : "Felsefe Düşünce", id:9},
                {name : "Ekonomi", id:11},
                {name : "Roman", id:12},
            ]
        }
    }
}
</script>

<style>
    #categories-container{
        width: 100%;
        height: 30px;
        padding:0 10% 0 10%;
        display: flex;
        align-items: center;
        justify-content: center;
        border-bottom: 0.5px solid #F2F4F4;
    }

    .category{
        margin-left: 23px;
        cursor: pointer;
        user-select: none;
    }

    .category:hover{
        border-bottom: 2px solid orange;
        color: orange;
    }

    #more-category{
        color: orange;
    }

</style>