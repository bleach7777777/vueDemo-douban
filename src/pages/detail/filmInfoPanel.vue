<template>
  <div class="box">
    <div class="closePanel" @click="back()">x</div>
    <div class="title">影片信息</div>
    <div class="info">
      <div class="infoTitle">片名：</div>
      <div class="font">{{filmObj.title}}</div>
    </div>
    <div class="info">
      <div class="infoTitle">原名：</div>
      <div class="font">{{filmObj.original_title}}</div>
    </div>
    <div class="info">
      <div class="infoTitle">又名：</div>
      <div class="font">
        <span v-for="(item,index) in filmObj.aka" :key="index">{{item}} /</span>
      </div>
    </div>
    <div class="info">
      <div class="infoTitle">导演：</div>
      <div class="font">
        <span v-for="(item,index) in filmObj.directors" :key="index + 100">{{item.name}} /</span>
      </div>
    </div>
    <div class="info">
      <div class="infoTitle">编剧：</div>
      <div class="font">
        <span v-for="(item,index) in filmObj.writers" :key="index + 200">{{item.name}} /</span>
      </div>
    </div>
    <div class="info">
      <div class="infoTitle">主演：</div>
      <div class="font">
        <span v-for="(item,index) in filmObj.casts" :key="index + 300">{{item.name}} /</span>
      </div>
    </div>
    <div class="info">
      <div class="infoTitle">上映：</div>
      <div class="font">
        <span v-for="(item,index) in filmObj.pubdates" :key="index + 400">{{item}} /</span>
      </div>
    </div>
    <div class="info">
      <div class="infoTitle">类型：</div>
      <div class="font">
        <span v-for="(item,index) in filmObj.genres" :key="index + 500">{{item}} /</span>
      </div>
    </div>
    <div class="info">
      <div class="infoTitle">片长：</div>
      <div class="font">
        <span v-for="(item,index) in filmObj.durations" :key="index + 600">{{item}} /</span>
      </div>
    </div>
    <div class="info">
      <div class="infoTitle">地区：</div>
      <div class="font">
        <span v-for="(item,index) in filmObj.countries" :key="index + 700">{{item}} /</span>
      </div>
    </div>
    <div class="info">
      <div class="infoTitle">语言：</div>
      <div class="font">
        <span v-for="(item,index) in filmObj.languages" :key="index + 800">{{item}} /</span>
      </div>
    </div>
    <div class="info">
      <div class="infoTitle">IMDb：</div>
      <div class="font"></div>
    </div>
  </div>
</template>
<script>
export default {
  name: "detailInfoPanel",
  data() {
    return {
      filmObj: {}
    };
  },
  methods: {
    back(){
      this.$router.go(-1)
    }
  },
  mounted(){
    this.filmObj = JSON.parse(decodeURIComponent(this.$route.query.filmObj))
  }
};
</script>
<style lang="scss" scoped>
.box {
  background-color: white;
  display: flex;
  flex-direction: column;
  text-align: left;
  font-size: 16px;
  color: rgb(179, 179, 179);
  .closePanel {
    font-size: 24px;
    color: black;
    position: fixed;
    padding-top: 20px;
    left: 20px;
    background-color: white;
    z-index: 1;
    width: 100%;
  }
  .title {
    font-size: 24px;
    color: black;
    padding: 20px;
    margin-top: 50px;
  }
  .info {
    display: flex;
    padding: 3px 20px;
    .infoTitle {
    }
    .font {
      width: 80%;
      color: rgb(98, 98, 98);
    }
  }
}
</style>
