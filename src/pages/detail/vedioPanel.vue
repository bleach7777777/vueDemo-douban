<template>
  <div class="box">
    <div class="title">
      <span @click="back()">x</span>
      <span>全部剧照({{filmImages.total}})</span>
    </div>
    <div class="img">
      <div class="bar"></div>
      <div class="imgList">
        <div v-for="(item,index) in filmImages.photos" :key="index" class="imgListItem">
          <img :src="item.image" alt="图片" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "vedioPanel",
  data() {
    return {
      filmImages: {}
    };
  },
  methods: {
    // 返回上一页
    back(){
      this.$router.go(-1);
    }
  },
  mounted() {
    this.filmImages = JSON.parse(
      decodeURIComponent(this.$route.query.filmImages)
    );
  }
};
</script>
<style lang="scss" scoped>
.box {
  width: 100%;
  .title {
    display: flex;
    justify-content: space-between;
    padding: 20px 5%;
    font-size: 18px;
    color: black;
    position: fixed;
    top: 0;
    background-color: white;
    z-index: 1;
    width: 90%;
  }
  .img {
    margin-top: 60px;
    .bar {
    }
    .imgList {
      display: flex;
      flex-wrap: wrap;
      .imgListItem {
        margin: 1px;
        width: 32.5%;
        img {
          width: 100%;
          height: 125px;
          border: 1px solid white;
        }
      }
    }
  }
}
</style>
