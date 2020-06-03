<template>
  <div class="box">
    <div class="title">
      <span @click="back()">x</span>
      <span>全部演职员</span>
    </div>
    <div class="content">
      <div v-for="(item,index) in staffs" :key="index" class="contentItem">
        <div class="img">
          <img :src="item.avatars.small" alt="图片" />
        </div>
        <div class="text">
          <span class="textItem font1">{{item.name}}</span>
          <span class="textItem font1">{{item.name_en}}</span>
          <span class="textItem font2">{{item.positions}}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "staffPanel",
  data() {
    return {
      staffs: []
    };
  },
  methods: {
    // 返回上一页
    back(){
      this.$router.go(-1)
    }
  },
  mounted() {
    this.staffs = JSON.parse(decodeURIComponent(this.$route.query.staffs));
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
    width: 90%;
    z-index: 1;
    background-color: white;
  }
  .content {
    padding: 0 5%;
    margin-top: 60px;
    .contentItem {
      display: flex;
      margin: 20px 0;
      .img {
        margin: 0 10px;
        img {
          width: 100px;
          height: 150px;
          border: 1px solid white;
          border-radius: 5px;
        }
      }
      .text {
        display: flex;
        flex-direction: column;
        text-align: left;
        .textItem{
          padding: 5px 0;
        }
        .font1{
          font-size: 16px;
          color: black;
        }
        .font2{
          font-size: 15px;
          color: rgba(0, 0, 0, 0.5);
        }
      }
    }
  }
}
</style>
