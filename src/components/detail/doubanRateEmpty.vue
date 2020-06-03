<template>
  <div class="box">
    <div class="left">
      <span class="left1">豆瓣评分</span>
      <span class="left2">尚未上映</span>
    </div>
    <div class="right">
      <span class="ritht1">{{filmObj.wish_count}}人想看</span>
    </div>
  </div>
</template>
<script>
export default {
  name: "doubanRateEmpty",
  data() {
    return {};
  },
  methods: {},
  props: [
    "film-obj"
  ]
};
</script>
<style lang="scss" scoped>
.box {
  border: 1px solid rgb(13, 13, 177);
  border-radius: 5px;
  background-color: rgb(13, 13, 177);
  color: white;
  display: flex;
  padding: 10px;
  .left{
    display: flex;
    flex-direction: column;
    width: 50%;
    .left1{
      font-size: 14px;
      color: white;
      text-align: left;
    }
    .left2{
      font-size: 12px;
      color: rgba(255, 255, 255, 0.5);
      padding: 10px 0;
    }
  }
  .right{
    width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    .right1{
    }
  }
}
</style>
