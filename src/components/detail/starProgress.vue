<template>
  <div class="box">
    <div class="star">
       <span v-for="(item,index) in starNum" :key="index" class="iconfont iconxingxing"></span>
    </div>
    <div class="line"></div>
  </div>
</template>
<script>
export default {
  name: "star",
  data() {
    return {
      num: 5
    };
  },
  methods: {},
  props: [
    "star-num",,
    "people-total-num",
    "people-num"
    ],
  mounted(){
    let result = Math.floor((this.peopleNum / this.peopleTotalNum) * 150)
    document.getElementsByClassName('line')[5 - this.starNum].style.width = result + "px"
  }
};
</script>
<style lang="scss" scoped>
.box {
  position: relative;
  .star{
    display: flex;
    justify-content: flex-end;
    .iconxingxing{
      font-size: 10px;
    }
  }
  &::after {
    content: "";
    width: 150px;
    height: 5px;
    background-color: rgba(157, 157, 157, 0.3);
    position: absolute;
    top: 0;
    left:110%;
    border: 1px solid rgba(157, 157, 157, 0.3);
    border-radius: 5px;
  }
  .line {
    width: 70px;
    height: 5px;
    background-color: yellow;
    position: absolute;
    top: 0;
    left: 110%;
    border: 1px solid yellow;
    border-radius: 5px;
  }
}
</style>
