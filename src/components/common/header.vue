<template>
  <div class="box">
    <div class="address">
      <span>定位</span>
      <span class="iconfont icondown"></span>
    </div>
    <div class="sort">
      <router-link to="/sort">
        <input type="text" placeholder="电影 / 电视剧 / 影人" />
        <span class="iconfont iconsousuo"></span>
      </router-link>
    </div>
  </div>
</template>
<script>
export default {
  name: "header",
  data() {
    return {};
  },
  methods: {}
};
</script>
<style lang="scss" scoped>
.box {
  display: flex;
  flex-direction: row;
  padding: 5px 10px;
  .address {
    width: 15%;
    font-size: 14px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .sort {
    width: 85%;
    position: relative;
    input {
      width: 300px;
      height: 28px;
      text-align: center;
      border-radius: 5px;
      border: 1px solid rgb(246, 246, 246);
      background-color: rgb(246, 246, 246);
    }
    .iconsousuo {
      position: absolute;
      top: 7px;
      left: 70px;
    }
  }
}
</style>
