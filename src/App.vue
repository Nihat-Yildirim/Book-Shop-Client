<template>
    <router-view></router-view>
</template>

<script>
import {mapActions} from 'vuex';

export default{
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