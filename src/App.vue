<template>
    <BookDetailPage/>
</template>

<script>
import BookDetailPage from './pages/user/book_detail_page/BookDetailPage.vue';
import {mapActions} from 'vuex';

export default{
  components:{
    BookDetailPage
  },

  methods:{
    ...mapActions({
      getAllCategory : "CategoryModule/getAll",
    })
  },

  created(){
    this.getAllCategory();
  }

}
</script>