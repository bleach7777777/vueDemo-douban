<template>
  <div class="box">
    <span
      v-for="(item,index) in 5"
      :key="index"
      class="iconfont iconsolidxingxing"
      @click="select(index)"
    ></span>
  </div>
</template>
<script>
export default {
  name: "starRate",
  data() {
    return {
      clickFlag: -1, // 点击的位置
      delayTime: [250,210,170,130,90]
    };
  },
  methods: {
    select(key) {
      this.clickFlag = key;
      let obj = document.getElementsByClassName("iconsolidxingxing");
      for (let i = 0; i < 5; i++) {
        if (i <= this.clickFlag) {
          obj[i].style.color = "yellow";
          obj[i].style.fontSize = 43 + "px";
        }else{
          obj[i].style.color = "rgba(0,0,0,0.1)";
          obj[i].style.fontSize = 39 + "px";
        }
      }
        for (let i = 0; i < 5; i++) {
          setTimeout(() => {
            if (i <= this.clickFlag) {
            obj[i].style.color = "orange";
            obj[i].style.fontSize = 39 + "px";
          }else{
            obj[i].style.color = "rgba(0,0,0,0.1)";
            obj[i].style.fontSize = 39 + "px";
          }
          },this.delayTime[i])
        }
      this.$emit("select", key);
    }
  }
};
</script>
<style lang="scss" scoped>
.box {
  width: 100%;
  height: 60px;
  .iconsolidxingxing {
    font-size: 39px;
    color: rgba(0, 0, 0, 0.1);
    display: inline-block;
    width: 45px;
    height: 45px;
    @keyframes changeColor {
    0%{
      color: rgba(0, 0, 0, 0.1);
    }
    50%{
      color: yellow;
    }
    100%{
      color: orange;
    }
  }
  }
}
</style>
