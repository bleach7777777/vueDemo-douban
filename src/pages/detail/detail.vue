<template>
  <div class="box">
    <div class="toolbar">
      <span class="iconfont iconleft" @click="back()"></span>
      <span>电影</span>
      <span>...</span>
    </div>
    <div class="filmInfo">
      <div class="photo">
        <img :src="filmObj.images.small" alt="海报" />
      </div>
      <div class="info">
        <span class="title">{{filmObj.title}}</span>
        <span class="enTitle">{{filmObj.original_title}}</span>
        <span @click="showDetailInfoPanel()" class="content">
          <span v-for="(item,index) in filmObj.countries" :key="index + 100">{{item}}</span>
          /
          <span v-for="(item,index) in filmObj.genres" :key="index + 200">{{item}}</span>
          /
          <span>上映时间：{{filmObj.pubdate}}</span>
          /
          <span>
            片长：
            <span v-for="(item,index) in filmObj.durations" :key="index + 300">{{item}}</span>
          </span>
        </span>
        <span class="fButton">
          <button @click="showCollectPanel()">
            <span class="iconfont iconxiangkan"></span>想看
          </button>
          <button @click="showRatePanel()">
            <span class="iconfont iconxingxing"></span>看过
          </button>
        </span>
      </div>
      <div class="rateTip" @click="showRatePanel()">
        <div>已看过？记录此刻感受</div>
        <div>
          <span class="iconfont iconxingxing"></span>
          <span class="iconfont iconxingxing"></span>
          <span class="iconfont iconxingxing"></span>
          <span class="iconfont iconxingxing"></span>
          <span class="iconfont iconxingxing"></span>
        </div>
        <div class="iconfont iconright"></div>
      </div>
    </div>
    <div class="filmRate">
      <router-link to="/shortRatePanel" v-if="isOnwatch">
        <doubanRate :film-obj="filmObj"></doubanRate>
      </router-link>
      <div v-else>
        <doubanRateEmpty :film-obj="filmObj"></doubanRateEmpty>
      </div>
    </div>
    <div class="buyFilmTicket">
      <router-link to="/buy" class="link">
        <span class="title">选座购票</span>
        <span class="iconfont iconright"></span>
      </router-link>
    </div>
    <div class="filmTag" :style="'width:'+'35'*filmObj.tags.length+'px;'">
      <div class="title">所属频道</div>
      <div class="content">
        <router-link
          to="/tag"
          v-for="(item,index) in filmObj.tags"
          :key="index"
          class="contentItem"
        >
          <span class="text" :style="'width:'+'14'*item.length+'px'">{{item}}</span>
          <span class="iconfont iconright"></span>
        </router-link>
      </div>
    </div>
    <div class="filmSummary">
      <div class="title">简介</div>
      <div :class="isSeeMore ? 'moreSummaryContent' : 'summaryContent'">{{filmObj.summary}}</div>
      <div @click.stop="seeMore()" v-show="isSummaryOverflow" class="more">展开</div>
    </div>
    <div class="filmActingStaff">
      <div class="title">
        <span>演职员</span>
        <span @click="showStaffPanel()" class="total">
          <span>全部{{staff.length}}</span>
          <span class="iconfont iconright"></span>
        </span>
      </div>
      <div class="imgList">
        <div class="imgListBox" :style="'width:' + '112'*(tempStaff.length) + 'px'">
          <router-link
            to="/staff"
            class="imgListItem"
            v-for="(item,index) in tempStaff"
            :key="index"
          >
            <img :src="item.avatars.small" alt="演职员图片" />
            <span class="name">{{item.name}}</span>
            <span class="position">{{item.positions}}</span>
          </router-link>
        </div>
      </div>
    </div>
    <div class="filmVideo">
      <div class="title">
        <span class="left">预告片 / 视频评论 / 剧照</span>
        <span @click="showVedioPanel()" class="right">
          <span>全部{{filmImages.total}}</span>
          <span class="iconfont iconright"></span>
        </span>
      </div>
      <div class="vedioList">
        <div class="vedioListBox" :style="'width' + '300'*(tempVedio.length) + 'px'">
          <router-link
            to="/vedio"
            v-for="(item,index) in tempVedio"
            :key="index"
            class="vedioListItem"
          >
            <img :src="item.medium || item.image" alt="图片" />
            <span class="tip" v-if="item.tag === '预告片'">{{item.tag}}</span>
            <span class="iconfont iconvedio" v-if="item.tag === '预告片'"></span>
          </router-link>
        </div>
      </div>
    </div>
    <div class="filmShortRate">
      <div class="title">
        <span class="left">短评</span>
        <router-link to="/shortRatePanel" class="right">
          <span>全部{{filmShortRates.total}}</span>
          <span class="iconfont iconright"></span>
        </router-link>
      </div>
      <div class="content">
        <div v-for="(item,index) in filmShortRates.comments" :key="index" class="contentItem">
          <div class="top">
            <div class="left">
              <div class="avatar">
                <img :src="item.author.avatar" alt="头像" />
              </div>
              <div class="other">
                <span class="otherItem1">{{item.author.name}}</span>
                <span class="otherItem2">
                  <span>星星</span>
                  <span>{{item.created_at | filterTime}}</span>
                </span>
              </div>
            </div>
            <div class="right" @click.stop="showToolTip(index)">
              ...
              <div class="tooltip" v-if="index === toolTipFlag">
                <span class="tooltipItem">分享</span>
                <span class="tooltipItem">与电影无关</span>
                <span class="tooltipItem">举报</span>
              </div>
            </div>
          </div>
          <div class="middle">
            <div
              class="shortRateContent"
              :class="isSeeMoreShortRate[index] ? 'more' : 'less'"
            >{{item.content}}</div>
            <div
              v-show="isShortRateOverflow[index]"
              @click.stop="seeMoreShortRate(index)"
              class="button"
            >展开</div>
          </div>
          <div class="bottom">
            <span class="iconfont icondianzan" @click="giveThumpsUp(index)"></span>
            <span>{{filter(item.useful_count)}}</span>
          </div>
        </div>
      </div>
      <router-link to="/shortRatePanel" class="moreShortRates">
        <span>查看全部短评</span>
        <span class="iconfont iconright"></span>
      </router-link>
    </div>
    <div class="filmRecommend">
      <div class="title">喜欢这部电影的也喜欢</div>
      <div class="content">
        <div class="bar">
          <span
            class="barItem"
            :class="recommendSelect === 1 ? 'active' : ''"
            @click="changeToRecommendSelect(1)"
          >电影</span>
          <span
            class="barItem"
            :class="recommendSelect === 2 ? 'active' : ''"
            @click="changeToRecommendSelect(2)"
          >片单</span>
        </div>
        <div class="recommendList">
          <div class="recommendBox" :style="'width:' + 100*5 + 'px'">
            <div v-for="(item,index) in 5" :key="index" class="recommendListItem"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="filmLongRate">
      <div class="title">
        <span
          class="titleItem"
          :class="longRateSelect === 1 ? 'active' : ''"
          @click="changeToLongRateSelect(1)"
        >影评{{filmLongRates.total}}</span>
        <span
          class="titleItem"
          :class="longRateSelect === 2 ? 'active' : ''"
          @click="changeToLongRateSelect(2)"
        >讨论</span>
      </div>
      <div class="content" v-if="longRateSelect === 1">
        <div class="bar">
          <div class="left">影评列表</div>
          <div class="right">
            <button
              class="rightItem"
              @click="sortByFlag(1)"
              :class="sortFlag === 1 ? 'active' : ''"
            >热门</button>
            <button
              class="rightItem"
              @click="sortByFlag(2)"
              :class="sortFlag === 2 ? 'active' : ''"
            >最新</button>
            <button
              class="rightItem"
              @click="sortByFlag(3)"
              :class="sortFlag === 3 ? 'active' : ''"
            >好友</button>
          </div>
        </div>
        <div class="longRateList">
          <div class="notEmpty" v-if="tempFilmLongRatesReviews.length != 0">
            <router-link
              to
              v-for="(item,index) in tempFilmLongRatesReviews"
              :key="index"
              class="longRateListItem"
            >
              <div class="top">
                <img :src="item.author.avatar" alt="头像" />
                <span class="topItem1">{{item.author.name}}</span>
                <span class="topItem2">看过</span>
                <span class="topItem3">星星</span>
              </div>
              <div class="middle">
                <span class="middleTitle">{{item.title}}</span>
                <span class="middleText">{{item.content}}</span>
              </div>
              <div class="bottom">
                <span>{{filter(item.comments_count)}}回复·</span>
                <span>{{filter(item.useful_count)}}有用·</span>
                <span>xxx转发</span>
              </div>
            </router-link>
          </div>
          <div class="empty" v-if="tempFilmLongRatesReviews.length == 0">
            暂无影评，
            <span @click="toWriteLongRate()" class="button">写影评</span>
          </div>
        </div>
      </div>
      <div class="content1" v-if="longRateSelect === 2">
        <div class="bar">
          <div class="left">讨论列表</div>
          <div class="right">
            <button
              class="rightItem"
              @click="sortByFlag1(1)"
              :class="sortFlag1 === 1 ? 'active' : ''"
            >最新</button>
            <button
              class="rightItem"
              @click="sortByFlag1(2)"
              :class="sortFlag1 === 2 ? 'active' : ''"
            >热门</button>
          </div>
        </div>
        <div class="longRateList1"></div>
      </div>
    </div>
    <div class="mongolia" v-if="isMongolia"></div>
  </div>
</template>
<script>
import doubanRate from "../../components/detail/doubanRate";
import doubanRateEmpty from '../../components/detail/doubanRateEmpty'
export default {
  name: "detail",
  data() {
    return {
      id: this.$route.params.id,
      filmObj: {},
      filmImages: {}, //影片剧照
      filmShortRates: [], //影片短评
      filmLongRates: [], //影片长评
      filmLongRatesReviews: [],
      tempFilmLongRatesReviews: [],
      isSummaryOverflow: false, // 简介是否溢出
      isSeeMore: false, // 简介是否展开
      // 演职员列表
      staff: [], // 总的列表
      tempStaff: [], // 要显示的列表
      // 预告片/视频评论/剧照列表
      vedio: [], // 总的列表
      tempVedio: [], //要显示的列表
      toolTipFlag: "", //短评的气泡弹框是否显示
      isMongolia: false, //是否显示蒙层
      recommendSelect: 1, //电影推荐的标签切换
      longRateSelect: 1, //电影长评的标签切换
      sortFlag: 1, //电影长评的搜索条件切换
      isShortRateOverflow: [true, true, true, true], //短评是否溢出
      isSeeMoreShortRate: [false, false, false, false], //短评是否展开
      sortFlag1: 1, //长评的讨论的标签切换
      isOnwatch: false, //是否上映
    };
  },
  methods: {
    //返回上一页
    back() {
      this.$router.go(-1);
    },
    //获取影片条目信息
    getFilmObj() {
      this.$axios
        .post("/v2/movie/subject/" + this.id, {
          apikey: "0b2bdeda43b5688921839c8ecb20399b"
        })
        .then(res => {
          this.filmObj = res.data;
        })
        .catch(err => {
          alert("获取影片条目信息失败");
        });
    },
    //获取影片条目剧照
    getFilmImages() {
      this.$axios
        .post("/v2/movie/subject/" + this.id + "/photos", {
          apikey: "0b2bdeda43b5688921839c8ecb20399b"
        })
        .then(res => {
          this.filmImages = res.data;
        })
        .catch(err => {
          alert("获取影片条目剧照失败");
        });
    },
    //获取影片条目短评
    getFilmShortRates() {
      this.$axios
        .post("/v2/movie/subject/" + this.id + "/comments", {
          apikey: "0b2bdeda43b5688921839c8ecb20399b",
          count: 4
        })
        .then(res => {
          this.filmShortRates = res.data;
        })
        .catch(err => {
          alert("获取影片短评失败");
        });
    },
    //获取影片条目长评
    getFilmLongRates() {
      this.$axios
        .post("/v2/movie/subject/" + this.id + "/reviews", {
          apikey: "0b2bdeda43b5688921839c8ecb20399b"
        })
        .then(res => {
          this.filmLongRates = res.data;
          this.filmLongRatesReviews = this.$utils.deepClone(
            this.filmLongRates.reviews
          );
          this.tempFilmLongRatesReviews = this.$utils.deepClone(
            this.filmLongRatesReviews
          );
        })
        .catch(res => {
          alert("获取影片长评失败");
        });
    },
    //跳转到影片信息面板
    showDetailInfoPanel() {
      this.$router.push({
        path: "/filmInfoPanel",
        query: {
          filmObj: encodeURIComponent(JSON.stringify(this.filmObj))
        }
      });
    },
    //跳转到影片收藏面板
    showCollectPanel() {
      this.$router.push("/collectPanel");
    },
    //跳转到影片评价面板
    showRatePanel() {
      this.$router.push("/ratePanel");
    },
    //跳转到影片演职员面板
    showStaffPanel() {
      this.$router.push({
        path: "/staffPanel",
        query: {
          staffs: encodeURIComponent(JSON.stringify(this.staff))
        }
      });
    },
    //跳转到影片预告片/视频评价/剧照面板
    showVedioPanel() {
      this.$router.push({
        path: "/vedioPanel",
        query: {
          filmImages: encodeURIComponent(JSON.stringify(this.filmImages))
        }
      });
    },
    //简介的展开更多
    seeMore() {
      this.isSummaryOverflow = false;
      this.isSeeMore = true;
    },
    //拼接演职员列表
    contactStaff() {
      for (let i = 0; i < this.filmObj.directors.length; i++) {
        let obj = this.$utils.deepClone(this.filmObj.directors[i]);
        let key = "positions";
        let value = "导演";
        obj[key] = value;
        this.staff.push(obj);
      }
      for (let i = 0; i < this.filmObj.casts.length; i++) {
        let obj = this.$utils.deepClone(this.filmObj.casts[i]);
        let key = "positions";
        let value = "演员";
        obj[key] = value;
        this.staff.push(obj);
      }
      for (let i = 0; i < this.filmObj.writers.length; i++) {
        let obj = this.$utils.deepClone(this.filmObj.writers[i]);
        let key = "positions";
        let value = "编剧";
        obj[key] = value;
        this.staff.push(obj);
      }
      for (let i = 0; i < 6; i++) {
        this.tempStaff.push(this.staff[i]);
      }
    },
    //拼接预告片/视频评论/剧照列表
    contactVedio() {
      // 第一个预告片
      let obj = this.$utils.deepClone(this.filmObj.trailers[0]);
      let key = "tag";
      let value = "预告片";
      obj[key] = value;
      this.vedio.push(obj);
      //剧照
      for (let i = 0; i < this.filmObj.photos.length; i++) {
        let obj = this.$utils.deepClone(this.filmObj.photos[i]);
        let key = "tag";
        let value = "剧照";
        obj[key] = value;
        this.vedio.push(obj);
      }
      for (let i = 0; i < 6; i++) {
        this.tempVedio.push(this.vedio[i]);
      }
    },
    //过滤人数(短评点赞/长评相关人数)
    filter(value) {
      return this.$utils.filterPeopleNum(value);
    },
    //显示短评的气泡弹框
    showToolTip(key) {
      this.toolTipFlag = key;
      this.isMongolia = true;
    },
    //短评点赞
    giveThumpsUp(key) {
      this.filmShortRates.comments[key].useful_count++;
      let obj = document.getElementsByClassName("icondianzan")[key];
      obj.style.color = "white";
      obj.style.transform = "rotate(-30deg)";
      setTimeout(function() {
        obj.style.transform = "rotate(0)";
      }, 300);
    },
    //电影推荐的标签切换
    changeToRecommendSelect(flag) {
      this.recommendSelect = flag;
    },
    //电影长评的标签切换
    changeToLongRateSelect(flag) {
      this.longRateSelect = flag;
    },
    //电影长评的搜索按钮切换
    sortByFlag(flag) {
      this.sortFlag = flag;
      let that = this;
      if (flag === 1) {
        that.tempFilmLongRatesReviews = that.$utils.deepClone(
          that.filmLongRatesReviews
        );
      } else if (flag === 2) {
        that.tempFilmLongRatesReviews = that.$utils.deepClone(
          that.filmLongRatesReviews
        );
        that.tempFilmLongRatesReviews.sort(function(a, b) {
          a = that.$utils.transTime(a.created_at);
          b = that.$utils.transTime(b.created_at);
          return b - a;
        });
      } else {
        that.tempFilmLongRatesReviews = [];
      }
    },
    //展开短评
    seeMoreShortRate(key) {
      this.isSeeMoreShortRate[key] = true;
      this.isShortRateOverflow[key] = false;
    },
    //长评的讨论的标签切换
    sortByFlag1(flag) {
      this.sortFlag1 = flag;
    },
    //跳转到写影评的页面
    toWriteLongRate() {
      this.$router.push({
        path: "/writeLongRate",
        query: {
          id: this.id
        }
      });
    }
  },
  mounted() {
    this.getFilmObj();
    this.getFilmImages();
    this.getFilmShortRates();
    this.getFilmLongRates();
    //判断简介是否溢出
    this.$nextTick(() => {
      setTimeout(() => {
        let obj = document.getElementsByClassName("summaryContent")[0];
        if (obj.offsetHeight < obj.scrollHeight) {
          this.isSummaryOverflow = true;
        }
      }, 1000);
    });
    //拼接演职员列表
    this.$nextTick(() => {
      setTimeout(() => {
        this.contactStaff();
      }, 1000);
    }),
    //拼接预告片/视频评论/剧照列表
    this.$nextTick(() => {
        setTimeout(() => {
          this.contactVedio();
        }, 1000);
    });
    //关于短评，点击气泡弹框外的地方气泡弹框会消失
    let that = this;
    document.addEventListener("click", function() {
      that.toolTipFlag = "";
      that.isMongolia = false;
    });
    //判断短评是否溢出
    this.$nextTick(() => {
      setTimeout(() => {
        let obj = document.getElementsByClassName("shortRateContent");
        for (let i = 0; i < 4; i++) {
          if (obj[i].offsetHeight < obj[i].scrollHeight) {
            this.isShortRateOverflow[i] = true;
          } else {
            this.isShortRateOverflow[i] = false;
          }
        }
      }, 1000);
    });
    //判断是否上映
    let pubdate = this.$utils.transTime(this.filmObj.mainland_pubdate);
    let nowdate = this.$utils.transTime(new Date());
    if(pubdate > nowdate){
      this.isOnwatch = false;
    }else{
      this.isOnwatch = true;
    }
  },
  destroyed() {
    //离开页面时移除click事件
    document.removeEventListener("click", function() {
      that.toolTipFlag = "";
      that.isMongolia = false;
    });
  },
  components: {
    doubanRate,
    doubanRateEmpty
  },
  filters: {
    //过滤短评的时间
    filterTime(value) {
      let reg1 = /\s/;
      let arr1 = value.split(reg1);
      let reg2 = /\-/;
      let arr2 = arr1[0].split(reg2);
      return arr2[0] + "年" + arr2[1] + "月" + arr2[2] + "日";
    }
  }
};
</script>
<style lang="scss" scoped>
.box {
  background-color: rgb(126, 126, 236);
  .toolbar {
    display: flex;
    justify-content: space-between;
    color: white;
    font-size: 16px;
    width: 95%;
    padding: 10px 2.5%;
    position: fixed;
    top: 0;
    z-index: 1;
    background-color: rgb(126, 126, 236);
  }
  .filmInfo {
    display: flex;
    position: relative;
    width: 95%;
    padding: 0 2.5%;
    padding-top: 50px;
    .photo {
      img {
        width: 100px;
        height: 130px;
        border: 1px solid rgb(126, 126, 236);
        border-radius: 5px;
      }
    }
    .info {
      display: flex;
      flex-direction: column;
      text-align: left;
      padding: 10px;
      .title {
        font-size: 18px;
        color: white;
        padding: 5px;
      }
      .enTitle {
        font-size: 16px;
        color: white;
        padding: 5px;
      }
      .content {
        font-size: 12px;
        color: rgb(179, 179, 179);
        overflow: hidden;
        -webkit-line-clamp: 2;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
      }
      .fButton {
        display: flex;
        padding: 10px;
        button {
          background-color: white;
          font-size: 14px;
          color: black;
          padding: 5px 20px;
          margin-right: 10px;
          border: 1px solid white;
          border-radius: 5px;
          span {
            color: orange;
          }
        }
      }
    }
    .rateTip {
      width: 95%;
      margin: 0 2.5%;
      display: flex;
      justify-content: space-between;
      position: absolute;
      top: 100%;
      left: 0;
      background-color: rgba(255, 255, 255, 0.3);
      border: 1px solid rgba(255, 255, 255, 0.3);
      border-radius: 5px;
      color: white;
      div {
        padding: 10px;
      }
      .iconxingxing,
      .iconright {
        color: rgb(222, 222, 222);
      }
      &::after {
        content: "";
        position: absolute;
        bottom: 100%;
        right: 20%;
        border-width: 10px;
        border-style: solid;
        border-color: transparent transparent rgba(255, 255, 255, 0.3)
          transparent;
      }
    }
  }
  .filmRate {
    width: 95%;
    padding: 0 2.5%;
    margin-top: 80px;
  }
  .buyFilmTicket {
    width: 95;
    padding: 0 2.5%;
    .link {
      width: 100%;
      padding: 10px 0;
      color: white;
      border-bottom: 1px solid rgba(255, 255, 255, 0.3);
      margin-top: 20px;
      display: flex;
      justify-content: space-between;
      .title {
        font-size: 16px;
      }
    }
  }
  .filmTag {
    display: flex;
    margin-top: 20px;
    overflow: auto;
    width: 95%;
    padding: 0 2.5%;
    &::-webkit-scrollbar {
      width: 0;
    }
    .title {
      width: 20%;
      margin-top: 10px;
      color: rgba(255, 255, 255, 0.5);
    }
    .content {
      display: flex;
      width: 80%;
      .contentItem {
        padding: 5px;
        margin: 5px;
        border: 1px solid rgb(13, 13, 177);
        border-radius: 10px;
        background-color: rgb(13, 13, 177);
        color: white;
        font-size: 14px;
        display: flex;
        .text {
          display: inline-block;
        }
        .iconright {
          display: inline-block;
          font-size: 14px;
        }
      }
    }
  }
  .filmSummary {
    width: 95%;
    padding: 0 2.5%;
    text-align: left;
    color: white;
    .title {
      font-size: 16px;
      padding: 5px 0;
    }
    .summaryContent {
      font-size: 14px;
      overflow: hidden;
      -webkit-line-clamp: 4;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
    }
    .moreSummaryContent {
      font-size: 14px;
    }
    .more {
      color: rgba(255, 255, 255, 0.5);
    }
  }
  .filmActingStaff {
    width: 95%;
    padding: 0 2.5%;
    margin-top: 20px;
    .title {
      display: flex;
      justify-content: space-between;
      font-size: 16px;
      color: white;
      .total {
        font-size: 14px;
        color: rgba(255, 255, 255, 0.5);
      }
    }
    .imgList {
      overflow: auto;
      &::-webkit-scrollbar {
        width: 0;
      }
      .imgListBox {
        display: flex;
        .imgListItem {
          display: flex;
          flex-direction: column;
          margin: 10px 5px;
          img {
            width: 100px;
            height: 130px;
            border: 1px solid rgb(126, 126, 236);
            border-radius: 5px;
          }
          .name {
            display: inline-block;
            font-size: 14px;
            color: white;
            width: 75px;
            overflow: hidden;
            -webkit-line-clamp: 1;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-box-orient: vertical;
          }
          .position {
            font-size: 12px;
            color: rgba(255, 255, 255, 0.5);
            text-align: left;
          }
        }
      }
    }
  }
  .filmVideo {
    width: 95%;
    padding: 0 2.5%;
    .title {
      display: flex;
      justify-content: space-between;
      .left {
        font-size: 16px;
        color: white;
      }
      .right {
        font-size: 14px;
        color: rgba(255, 255, 255, 0.5);
      }
    }
    .vedioList {
      overflow: auto;
      &::-webkit-scrollbar {
        width: 0;
      }
      .vedioListBox {
        display: flex;
        .vedioListItem {
          margin: 10px 3px;
          position: relative;
          img {
            width: 270px;
            height: 170px;
          }
          .tip {
            position: absolute;
            top: 5px;
            left: 5px;
            z-index: 1;
            color: white;
            padding: 5px;
            background-color: orange;
            border: 1px solid orange;
            border-radius: 5px;
            font-size: 14px;
          }
          .iconvedio {
            position: absolute;
            top: 40%;
            left: 40%;
            z-index: 1;
            color: white;
            padding: 10px;
            background-color: rgba(0, 0, 0, 0.3);
            border: 1px solid rgba(0, 0, 0, 0.3);
            border-radius: 21px;
            font-size: 21px;
            font-weight: bold;
          }
        }
      }
    }
  }
  .filmShortRate {
    width: 90%;
    margin: 0 2.5%;
    background-color: rgb(13, 13, 177);
    color: white;
    border: 1px solid rgb(13, 13, 177);
    border-radius: 5px;
    padding: 10px 2.5%;
    .title {
      display: flex;
      justify-content: space-between;
      .left {
        font-size: 16px;
        color: white;
      }
      .right {
        font-size: 14px;
        color: rgba(255, 255, 255, 0.5);
      }
    }
    .content {
      margin: 20px 0;
      .contentItem {
        text-align: left;
        padding: 15px 0;
        border-bottom: 1px solid rgba(255, 255, 255, 0.3);
        .top {
          display: flex;
          justify-content: space-between;
          padding: 5px 0;
          .left {
            display: flex;
            .avatar {
              padding: 0 5px;
              img {
                width: 30px;
                height: 30px;
                border: 1px solid rgb(13, 13, 177);
                border-radius: 15px;
              }
            }
            .other {
              display: flex;
              flex-direction: column;
              padding: 0 5px;
              .otherItem1 {
                font-size: 16px;
                font-weight: bold;
              }
              .otherItem2 {
                font-size: 12px;
                color: rgba(255, 255, 255, 0.5);
              }
            }
          }
          .right {
            font-size: 16px;
            font-weight: bold;
            color: rgba(255, 255, 255, 0.5);
            position: relative;
            .tooltip {
              position: absolute;
              top: 80%;
              right: -160%;
              z-index: 3;
              background-color: white;
              display: flex;
              flex-direction: column;
              padding: 10px;
              .tooltipItem {
                width: 150px;
                padding: 10px 0;
                font-size: 14px;
                color: black;
              }
            }
          }
        }
        .middle {
          margin: 5px 0;
          font-size: 14px;
          .more {
          }
          .less {
            overflow: hidden;
            -webkit-line-clamp: 4;
            text-overflow: 4;
            display: -webkit-box;
            -webkit-box-orient: vertical;
          }
          .button {
            color: rgba(255, 255, 255, 0.5);
          }
        }
        .bottom {
          padding: 5px 0;
          font-size: 12px;
          color: rgba(255, 255, 255, 0.5);
          .icondianzan {
            display: inline-block;
          }
        }
      }
    }
    .moreShortRates {
      display: flex;
      justify-content: space-between;
      font-size: 16px;
      color: white;
    }
  }
  .filmRecommend {
    width: 95%;
    padding: 0 2.5%;
    margin-top: 20px;
    color: white;
    text-align: left;
    .title {
      display: flex;
      justify-content: space-between;
      font-size: 16px;
      padding: 5px 0;
    }
    .content {
      padding: 5px 0;
      .bar {
        font-size: 14px;
        color: rgba(255, 255, 255, 0.5);
        padding: 5px 0;
        .barItem {
          padding: 5px;
        }
        .active {
          color: white;
          border-bottom: 1px solid white;
        }
      }
      .recommendList {
        padding: 5px 0;
        overflow: auto;
        &::-webkit-scrollbar {
          width: 0;
        }
        .recommendBox {
          display: flex;
          padding: 5px;
          .recommendListItem {
            width: 100px;
            height: 120px;
            background-color: black;
            margin: 0 5px;
            border: 1px solid black;
            border-radius: 5px;
          }
        }
      }
    }
  }
  .filmLongRate {
    width: 100%;
    border: 0 solid rgb(226, 226, 226);
    border-radius: 5px;
    background-color: rgb(226, 226, 226);
    text-align: left;
    .title {
      font-size: 16px;
      color: rgba(0, 0, 0, 0.7);
      padding: 10px 0;
      margin: 0 10px;
      border-bottom: 1px solid rgb(182, 182, 182);
      .titleItem {
        padding: 10px;
      }
      .active {
        color: black;
        border-bottom: 1px solid black;
      }
    }
    .content {
      .bar {
        display: flex;
        justify-content: space-between;
        font-size: 14px;
        color: black;
        margin: 10px;
        .left {
        }
        .right {
          border: 1px solid black;
          border-radius: 10px;
          background-color: rgb(210, 210, 210);
          .rightItem {
            border: 0;
            border-radius: 10px;
            outline: none;
            background-color: rgb(210, 210, 210);
          }
          .active {
            border: 1px solid black;
            border-radius: 10px;
            background-color: white;
          }
        }
      }
      .longRateList {
        .notEmpty {
          .longRateListItem {
            display: inline-block;
            padding: 10px 10px;
            margin: 5px 0;
            background-color: white;
            .top {
              display: flex;
              padding: 5px 0;
              img {
                width: 30px;
                height: 30px;
                border: 1px solid white;
                border-radius: 15px;
              }
              .topItem1 {
                font-size: 14px;
                color: rgba(0, 0, 0, 0.5);
                padding: 0 5px;
              }
              .topItem2,
              .topItem3 {
                font-size: 12px;
                color: rgba(0, 0, 0, 0.5);
                padding: 0 5px;
              }
            }
            .middle {
              display: flex;
              flex-direction: column;
              padding: 5px 0;
              .middleTitle {
                font-size: 16px;
                font-weight: bold;
                padding-bottom: 5px;
              }
              .middleText {
                font-size: 14px;
                color: black;
                overflow: hidden;
                -webkit-line-clamp: 3;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-box-orient: vertical;
              }
            }
            .bottom {
              padding: 5px 0;
              font-size: 13px;
              color: rgba(0, 0, 0, 0.5);
            }
          }
        }
        .empty {
          text-align: center;
          .button {
            color: green;
          }
        }
      }
    }
    .content1 {
      .bar {
        display: flex;
        justify-content: space-between;
        font-size: 14px;
        color: black;
        margin: 10px;
        .left {
        }
        .right {
          border: 1px solid black;
          border-radius: 10px;
          background-color: rgb(210, 210, 210);
          .rightItem {
            border: 0;
            border-radius: 10px;
            outline: none;
            background-color: rgb(210, 210, 210);
          }
          .active {
            border: 1px solid black;
            border-radius: 10px;
            background-color: white;
          }
        }
      }
    }
  }
  .mongolia {
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0);
    z-index: 2;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
}
</style>
