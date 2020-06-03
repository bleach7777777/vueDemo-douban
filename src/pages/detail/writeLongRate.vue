<template>
  <div class="box">
    <div class="title">
      <div class="left">
        <span class="close" @click="back()">x</span>
        <img :src="filmObj.images.small" alt="海报" />
        <span>{{filmObj.title}}</span>
      </div>
      <div class="right">
        <span class="button" @click="submit()">发布</span>
      </div>
    </div>
    <div class="content">
      <div class="tip">
        <span v-if="clickFlag === -1">点击星星评分</span>
        <span v-else>{{tipList[clickFlag]}}</span>
      </div>
      <div class="star">
        <starRate @select="selected"></starRate>
      </div>
      <div class="addTitle">
        <div class="text dataTitle" contenteditable="true">添加标题</div>
      </div>
      <div class="addText">
        <div class="text dataText" contenteditable="true">添加内容</div>
      </div>
      <div class="other">
        <div class="left" @click="selectTrailter()">
          <span class="iconfont icondown" :class="isTrailter ? 'active' : ''"></span>
          <span>影评包含剧透</span>
        </div>
        <div class="right" @click="showOriginal()">
          <span class="iconfont icondown" v-if="isOriginal"></span>
          <span>豆瓣原创声明</span>
        </div>
      </div>
      <div class="bar">
        <div class="left">
          <span class="iconfont iconimage"></span>
          <span class="iconfont iconcollect"></span>
        </div>
        <div class="right">
          <span>...</span>
        </div>
      </div>
      <div class="loading" v-if="isLoading">
        <loading></loading>
      </div>
    </div>
    <div class="mongolia" v-if="isMongolia" @click="isMongolia = false"></div>
    <div class="selectOriginalPanel" v-if="isMongolia">
      <div class="left">
        <span>这是我的原创内容</span>
        <span>《豆瓣原创声明》</span>
      </div>
      <div class="right" :class="isOriginal ? 'originalYes' : ''" @click="selectOriginal()">
        <div class="dot" :class="isOriginal ? 'originalDotYes' : ''"></div>
      </div>
    </div>
  </div>
</template>
<script>
import starRate from "../../components/detail/starRate";
import loading from "../../components/common/loading";
export default {
  name: "writeLongRate",
  data() {
    return {
      id: this.$route.query.id,
      filmObj: {},
      tipList: ["很差", "较差", "还行", "推荐", "力荐"],
      clickFlag: -1,
      //
      rateGrade: "",
      rateTitle: "",
      rateText: "",
      isTrailter: false,
      isOriginal: false,
      //
      isMongolia: false,
      //
      isLoading: true
    };
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    getFilmInfo() {
      this.$axios
        .post("/v2/movie/subject/" + this.id, {
          apikey: "0b2bdeda43b5688921839c8ecb20399b"
        })
        .then(res => {
          this.filmObj = res.data;
        })
        .catch(err => {
          alert("获取电影条目信息失败");
        });
    },
    selected(key) {
      this.clickFlag = key;
    },
    submit() {
      this.rateGrade = this.clickFlag + 1;
      this.rateTitle = document.getElementsByClassName(
        "dataTitle"
      )[0].innerHTML;
      this.rateText = document.getElementsByClassName("dataText")[0].innerHTML;
      alert(
        "发布成功!" +
          "星星等级：" +
          this.rateGrade +
          " 标题：" +
          this.rateTitle +
          " 内容：" +
          this.rateText +
          " 影评是否包含剧透：" +
          this.isTrailter +
          " 是否原创：" +
          this.isOriginal
      );
    },
    selectTrailter() {
      if (this.isTrailter === true) {
        this.isTrailter = false;
      } else {
        this.isTrailter = true;
      }
    },
    showOriginal() {
      this.isMongolia = true;
    },
    selectOriginal() {
      if (this.isOriginal === false) {
        this.isOriginal = true;
      } else {
        this.isOriginal = false;
      }
    }
  },
  mounted() {
    this.getFilmInfo();
    setTimeout(() => {
      this.isLoading = false;
    }, 2000);
  },
  components: {
    starRate,
    loading
  }
};
</script>
<style lang="scss" scoped>
.box {
  width: 100%;
  height: 100%;
  .title {
    width: 100%;
    display: flex;
    justify-content: space-between;
    position: fixed;
    top: 0;
    background-color: #7e7eec;
    z-index: 2;
    .left {
      margin: 10px;
      display: flex;
      font-size: 16px;
      color: white;
      .close {
        font-size: 21px;
      }
      img {
        width: 25px;
        height: 30px;
        border: 1px solid white;
        border-radius: 5px;
        margin: 0 5px 0 15px;
      }
    }
    .right {
      margin: 10px;
      .button {
        color: black;
        padding: 5px 10px;
        background-color: rgba(2555, 255, 255, 0.5);
        border: 1px solid rgba(2555, 255, 255, 0.5);
        border-radius: 5px;
      }
    }
  }
  .content {
    display: flex;
    flex-direction: column;
    position: relative;
    width: 100%;
    height: 100%;
    margin-top: 50px;
    .tip {
      text-align: center;
      font-size: 12px;
      color: rgba(0, 0, 0, 0.5);
      margin: 10px;
    }
    .star {
      margin: 10px;
    }
    .addTitle {
      margin: 10px;
      .text {
        width: 100%;
        height: auto;
        border: 0;
        padding: 20px 0;
        border-top: 0.5px solid rgba(0, 0, 0, 0.5);
        border-bottom: 0.5px solid rgba(0, 0, 0, 0.5);
        font-size: 21px;
        text-align: left;
        outline: none;
      }
    }
    .addText {
      margin: 10px;
      min-height: 250px;
      .text {
        width: 100%;
        height: auto;
        border: 0;
        padding: 20px 0;
        font-size: 19px;
        text-align: left;
        outline: none;
      }
    }
    .other {
      display: flex;
      justify-content: space-between;
      font-size: 14px;
      width: 100%;
      .left {
        margin: 20px 10px;
        padding: 5px;
        .icondown {
          border: 1px solid rgba(0, 0, 0, 0.5);
          border-radius: 15px;
          padding: 1px 0;
        }
        .active {
          background-color: green;
          color: white;
        }
      }
      .right {
        margin: 20px 10px;
        padding: 5px;
        border: 1px solid rgba(0, 0, 0, 0.5);
        border-radius: 15px;
        .icondown {
          border: 1px solid rgba(0, 0, 0, 0.5);
          border-radius: 15px;
          padding: 1px 0;
          background-color: green;
          color: white;
        }
      }
    }
    .bar {
      width: 100%;
      display: flex;
      justify-content: space-between;
      font-size: 21px;
      position: fixed;
      bottom: 0;
      background-color: white;
      z-index: 1;
      border-top: 0.5px solid rgba(0, 0, 0, 0.3);
      .left {
        margin: 10px;
        .iconcollect,
        .iconimage {
          font-size: 21px;
          margin-right: 15px;
        }
      }
      .right {
        margin: 10px;
      }
    }
    .loading {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 2;
      background-color: white;
    }
  }
  .mongolia {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 2;
    background-color: rgba(0, 0, 0, 0.1);
  }
  .selectOriginalPanel {
    width: 100%;
    height: 25%;
    position: absolute;
    bottom: 0;
    z-index: 3;
    background-color: white;
    border: 1px solid white;
    border-radius: 10px;
    display: flex;
    justify-content: space-between;
    .left {
      display: flex;
      flex-direction: column;
      margin: 10px;
    }
    .right {
      width: 30px;
      height: 10px;
      border: 1px solid rgba(0, 0, 0, 0.5);
      border-radius: 5px;
      background-color: rgba(0, 0, 0, 0.5);
      margin: 10px;
      position: relative;
      .dot {
        position: absolute;
        width: 20px;
        height: 20px;
        border: 1px solid lightgray;
        border-radius: 20px;
        background-color: lightgray;
        top: -5px;
        left: -5px;
      }
      .originalDotYes {
        left: 15px;
        background-color: green;
      }
    }
    .originalYes {
      background-color: rgba(0, 128, 0, 0.5);
    }
  }
}
</style>
