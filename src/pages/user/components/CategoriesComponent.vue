<template>
    <div id="categories-container">
        <div v-for="parentCategory in getParentCategory" :key="parentCategory.id" class="category">
            {{ parentCategory.categoryName }}
        </div>
        <div id="more-category" class="category">
            daha fazlası...
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default{
    data(){
        return{}
    },

    computed:{
        ...mapGetters({
            getParentCategory : "CategoryModule/_getParentCategories",
        })
    },

    methods:{
        ...mapActions({
            getAllCategory : "CategoryModule/getAll",
        })
    },

    created(){
        this.getAllCategory();
    },
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
        margin-left: 15px;
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