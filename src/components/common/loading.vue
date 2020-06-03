<template>
  <div class="box">
    <div class="idsRing">
      <div class="dot1"></div>
      <div></div>
      <div></div>
      <div class="dot2"></div>
    </div>
  </div>
</template>
<script>
export default {
  name: "loading",
  data() {
    return {};
  },
  methods: {}
};
</script>
<style lang="scss" scoped>
.box {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .idsRing {
    position: relative;
    width: 30px;
    height: 30px;
    div {
      position: absolute;
      width: 25px;
      height: 25px;
      display: border-box;
      border: 5px solid green;
      border-color: transparent green green transparent;
      border-radius: 50%;
      animation: idsRing 1.2s cubic-bezier(0.25, 0, 0.25, 1) infinite;
    }
    .dot1{
      &::after{
        content: '';
        position: absolute;
        width: 7px;
        height: 7px;
        border-radius: 50%;
        background-color: green;
        margin-left: -3px;
        margin-top: -3px;
      }
    }
    .dot2{
      &::after{
        content: '';
        position: absolute;
        width: 7px;
        height: 7px;
        border-radius: 50%;
        background-color: green;
        margin-top: 7px;
        margin-left: -17px;
      }
    }
  }
  @keyframes idsRing {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
}
</style>
