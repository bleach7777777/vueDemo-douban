<template>
  <div class="box">
    <router-link to="/" class="boxitem">
      <div class="iconfont iconreying active"></div>
      <div class="active">热映</div>
    </router-link>
    <router-link to="/search" class="boxitem">
      <div class="iconfont iconzhaopian"></div>
      <div>找片</div>
    </router-link>
    <router-link to="/profile" class="boxitem">
      <div class="iconfont iconwode"></div>
      <div>我的</div>
    </router-link>
  </div>
</template>
<script>
export default {
  name:'footer',
  date(){
    return{

    }
  },
  methods:{

  }
}
</script>
<style lang="scss" scoped>
.box{
  display: flex;
  flex-direction: row;
  padding: 5px 10px;
  border-top: 1px solid  rgb(246, 246, 246);
  .boxitem{
    width: 33%;
    color: rgb(179, 179, 179);
    font-size: 14px;
    .active{
      color: black;
    }
  }
}
</style>
