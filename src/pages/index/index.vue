<template>
  <div class="box">
    <div class="head">
      <headhead></headhead>
      <div class="ban">
        <div class="banitem" :class="isActive1" @click="changeFlag1()">正在热映</div>
        <div class="banitem" :class="isActive2" @click="changeFlag2()">即将上映</div>
      </div>
      <div class="toolbar" v-if="flag2">
        <div class="totalnum">影视:{{comingFilmtotal}}</div>
        <div class="sortkey">
          <div class="sortkey12 sortkey1">
            <button :class="isselect1" @click="changeSelect1()">时间</button>
            <button :class="isselect2" @click="changeSelect2()">热度</button>
          </div>
          <div class="sortkey12 sortkey2">
            <button @click="showSelectTimePanel()">
              上映时间
              <span class="iconfont icondown"></span>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="main1" v-if="flag1">
      <router-link
        v-for="(item ,index) in filmlist"
        :key="index"
        class="list"
        :to="'/detail/'+item.id"
      >
        <div class="listitem left">
          <img :src="item.images.small" alt="海报" />
        </div>
        <div class="listitem middle">
          <div class="title">{{item.title}}</div>
          <div class="rate">{{item.rating.average}}</div>
          <div class="content">
            <span>{{item.year}}</span>&nbsp;/&nbsp;
            <span
              v-for="(addressitem,index) in item.pubdates"
              :key="index + 100"
            >{{addressitem | filter1()}}&nbsp;</span>/&nbsp;
            <span
              v-for="(typeitem,index) in item.genres"
              :key="index + 200"
            >{{typeitem}}&nbsp;</span>/&nbsp;
            <span
              v-for="(directoritem,index) in item.directors"
              :key="index + 300"
            >{{directoritem.name}}&nbsp;</span>/&nbsp;
            <span
              v-for="(castitem,index) in item.casts"
              :key="index + 400"
            >{{castitem.name}}&nbsp;</span>
          </div>
        </div>
        <div class="listitem right">
          <router-link to="/buy" class="collectButton">购票</router-link>
          <span class="collectNum">{{filter(item.collect_count)}}人看过</span>
        </div>
      </router-link>
    </div>
    <div class="main2" v-if="flag2">
      <router-link
        :to="'/detail/'+item.id"
        v-for="(item ,index) in sortComingFilmlist"
        :key="index"
        class="list"
      >
        <div class="listitem left">
          <img :src="item.images.small" alt="海报" />
        </div>
        <div class="listitem middle">
          <div class="title">{{item.title}}</div>
          <div class="content">
            <span>{{item.year}}</span>&nbsp;/&nbsp;
            <span
              v-for="(addressitem,index) in item.pubdates"
              :key="index + 100"
            >{{addressitem | filter1()}}&nbsp;</span>/&nbsp;
            <span
              v-for="(typeitem,index) in item.genres"
              :key="index + 200"
            >{{typeitem}}&nbsp;</span>/&nbsp;
            <span
              v-for="(directoritem,index) in item.directors"
              :key="index + 300"
            >{{directoritem.name}}&nbsp;</span>/&nbsp;
            <span
              v-for="(castitem,index) in item.casts"
              :key="index + 400"
            >{{castitem.name}}&nbsp;</span>
          </div>
        </div>
        <div class="listitem right">
          <span class="collectButton" @click.prevent="collectComingFilm(item.id)">
            <span :class="item.id === collectId ? 'iconfont icondown' : 'iconfont iconxiangkan'"></span>
            <span>想看</span>
          </span>
          <span class="collectNum">{{filter(item.collect_count)}}人想看</span>
        </div>
      </router-link>
    </div>
    <div class="foot">
      <footfoot></footfoot>
    </div>
    <div class="selectTimePanel" v-if="isShowSelectTimePanel">
      <div class="line"></div>
      <span class="title">上映时间</span>
      <div class="timelist">
        <div
          class="listitem"
          v-for="(item,index) in comingTimelist"
          :key="index"
          @click="selectComingTime(index,item)"
          :class="index === isSelectComingTimeFlag ? 'active' : ''"
        >{{item}}</div>
      </div>
      <button class="closeButton" @click="closeSelectTimePanel()">取消</button>
    </div>
    <div class="mongolia" v-if="isShowSelectTimePanel" @click="closeSelectTimePanel()"></div>
  </div>
</template>
<script>
import headhead from "../../components/common/header";
import footfoot from "../../components/common/footer";
const testlist = ["全部", "11月", "12月", "1月"];
export default {
  name: "index",
  data() {
    return {
      //正在热映的电影列表
      filmlist: [],
      //控制切换热映和即将上映
      flag1: true,
      flag2: false,
      //控制即将上映页面的toolbar的时间与热度的切换
      select1: true,
      select2: false,
      //即将上映的电影列表
      comingFilmtotal: "",
      comingFilmlist: [], //源数据
      sortByTimeComingFilmlist: [], //根据月份查询的数据
      sortComingFilmlist: [], //排序的数据
      //想看的电影的id
      collectId: "",
      //是否出现选择时间的弹框
      isShowSelectTimePanel: false,
      isSelectComingTimeFlag: 0,
      comingTimelist: testlist
    };
  },
  methods: {
    //获取正在热映的电影
    getFilmList() {
      this.$axios
        .post("/v2/movie/in_theaters", {
          city: "北京",
          apikey: "0b2bdeda43b5688921839c8ecb20399b"
        })
        .then(res => {
          console.log(res);
          this.filmlist = res.data.subjects;
        })
        .catch(err => {
          alert("获取正在热映的电影失败");
        });
    },
    //获取即将上映的电影
    getComingFilmList() {
      this.$axios
        .post("/v2/movie/coming_soon", {
          start: 0,
          count: 72,
          apikey: "0b2bdeda43b5688921839c8ecb20399b"
        })
        .then(res => {
          console.log(res);
          this.comingFilmlist = res.data.subjects;
          this.comingFilmtotal = res.data.total;
          this.sortByTimeComingFilmlist = this.$utils.deepClone(
            this.comingFilmlist
          );
          this.sortComingFilmlist = this.$utils.deepClone(
            this.sortByTimeComingFilmlist
          );
        })
        .catch(err => {
          alert("获取即将上映的电影失败");
        });
    },
    //控制切换热映和即将上映
    changeFlag1() {
      this.flag1 = true;
      this.flag2 = false;
    },
    changeFlag2() {
      this.flag1 = false;
      this.flag2 = true;
    },
    //控制即将上映页面的toolbar的时间与热度的切换
    //切换时间
    changeSelect1() {
      this.select1 = true;
      this.select2 = false;
      this.sortComingFilmlist = this.$utils.deepClone(
        this.sortByTimeComingFilmlist
      );
    },
    //切换热度
    changeSelect2() {
      this.select1 = false;
      this.select2 = true;
      this.sortComingFilmlist.sort(function(a, b) {
        return b.collect_count - a.collect_count;
      });
    },
    //收藏即将上映的想看的电影
    collectComingFilm(id) {
      this.collectId = id;
    },
    //控制弹出选择上映时间的弹框
    showSelectTimePanel() {
      this.isShowSelectTimePanel = true;
    },
    selectComingTime(index, item) {
      this.isSelectComingTimeFlag = index;
      this.isShowSelectTimePanel = false;
      this.sortByTimeComingFilmlist = this.$utils.deepClone(
        this.comingFilmlist
      );
      if (item === "全部") {
        this.sortComingFilmlist = this.$utils.deepClone(
          this.sortByTimeComingFilmlist
        );
      } else {
        console.log(this.sortByTimeComingFilmlist);
        let reg = /[^0-9]/g;
        let target = item.replace(reg, "");
        for (let i in this.sortByTimeComingFilmlist) {
          let temp = this.sortByTimeComingFilmlist[i].mainland_pubdate.split(
            "-"
          );
          console.log(temp);
          if (temp[1] != target) {
            console.log(this.sortByTimeComingFilmlist[i]);
            this.sortByTimeComingFilmlist.splice(i, 1);
          }
        }
        console.log(this.sortByTimeComingFilmlist);
        this.sortComingFilmlist = this.$utils.deepClone(
          this.sortByTimeComingFilmlist
        );
      }
      this.comingFilmtotal = this.sortComingFilmlist.length;
    },
    closeSelectTimePanel() {
      this.isShowSelectTimePanel = false;
    },
    //过滤人数
    filter(value) {
      return this.$utils.filterPeopleNum(value)
    }
  },
  mounted() {
    this.getFilmList();
    this.getComingFilmList();
  },
  components: {
    headhead,
    footfoot
  },
  filters: {
    //过滤导演数据中的时间
    filter1(value) {
      let reg = /[\u4e00-\u9fa5]/g;
      let str = value.match(reg);
      let result = "";
      for (let i = 0; i < str.length; i++) {
        result += str[i];
      }
      return result;
    },
  },
  computed: {
    //控制切换热映和即将上映的样式
    isActive1() {
      if (this.flag1) {
        return "active";
      } else {
        return "";
      }
    },
    isActive2() {
      if (this.flag2) {
        return "active";
      } else {
        return "";
      }
    },
    //控制即将上映页面的toolbar的时间与热度的切换
    isselect1() {
      if (this.select1) {
        return "active";
      } else {
        return "";
      }
    },
    isselect2() {
      if (this.select2) {
        return "active";
      } else {
        return "";
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.box {
  background-color: white;
  .head {
    position: fixed;
    top: 0;
    width: 100%;
    border-bottom: 1px solid rgb(246, 246, 246);
    z-index: 1;
    .ban {
      display: flex;
      justify-content: space-around;
      background-color: white;
      .banitem {
        padding: 5px 10px;
        text-align: center;
        color: rgb(179, 179, 179);
      }
      .active {
        color: black;
        border-bottom: 1px solid black;
      }
    }
    .toolbar {
      display: flex;
      justify-content: space-between;
      padding: 10px 10px;
      font-size: 14px;
      background-color: white;
      .totalnum {
      }
      .sortkey {
        display: flex;
        .sortkey12 {
          border: 1px solid rgb(179, 179, 179);
          border-radius: 20px;
          margin: 0 5px;
          button {
            border: 0;
            border-radius: 20px;
            outline: none;
          }
          .active {
            border: 1px solid rgb(179, 179, 179);
            border-radius: 20px;
            background-color: white;
          }
        }
        .sortkey1 {
          background-color: rgb(246, 246, 246);
          button {
            background-color: rgb(246, 246, 246);
          }
        }
        .sortkey2 {
        }
      }
    }
  }
  .main1 {
    width: 100%;
    margin-top: 80px;
    .list {
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid rgb(246, 246, 246);
      padding: 10px 10px;
      .listitem {
        padding: 0 5px;
        img {
          width: 100px;
          height: 130px;
          border: 1px solid white;
          border-radius: 5px;
        }
      }
      .left {
      }
      .middle {
        text-align: left;
        width: 150px;
        height: 80px;
        overflow: hidden;
        -webkit-line-clamp: 2;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        .title {
          font-size: 14px;
          font-weight: bold;
          padding-top: 5px;
        }
        .rate,
        .content {
          color: rgb(179, 179, 179);
          font-size: 12px;
          padding-top: 5px;
        }
      }
      .right {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 80px;
        border-left: 1px dashed rgb(225, 225, 225);
        .collectButton {
          border: 1px solid red;
          border-radius: 5px;
          color: red;
          padding: 3px;
          width: 50px;
          font-size: 12px;
        }
        .collectNum {
          color: rgb(179, 179, 179);
          font-size: 10px;
          padding-top: 5px;
        }
      }
    }
  }
  .main2 {
    width: 100%;
    margin-top: 120px;
    .list {
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid rgb(246, 246, 246);
      padding: 10px 10px;
      .listitem {
        padding: 0 5px;
        img {
          width: 100px;
          height: 130px;
          border: 1px solid white;
          border-radius: 5px;
        }
      }
      .left {
      }
      .middle {
        text-align: left;
        width: 150px;
        height: 60px;
        overflow: hidden;
        -webkit-line-clamp: 2;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        .title {
          font-size: 14px;
          font-weight: bold;
          padding-top: 5px;
        }
        .content {
          color: rgb(179, 179, 179);
          font-size: 12px;
          padding-top: 5px;
        }
      }
      .right {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 80px;
        border-left: 1px dashed rgb(225, 225, 225);
        .collectButton {
          display: flex;
          flex-direction: column;
          color: orange;
          font-size: 12px;
        }
        .collectNum {
          color: rgb(179, 179, 179);
          font-size: 10px;
          padding-top: 5px;
        }
      }
    }
  }
  .foot {
    position: fixed;
    bottom: 0;
    width: 100%;
    z-index: 1;
  }
  .selectTimePanel {
    position: fixed;
    bottom: 0;
    z-index: 3;
    width: 100%;
    height: 50%;
    background-color: white;
    text-align: left;
    border: 1px solid rgb(246, 246, 246);
    border-radius: 5px;
    padding: 10px 10px;
    display: flex;
    flex-direction: column;
    .line {
      width: 50px;
      height: 5px;
      background-color: rgb(179, 179, 179);
      margin: 20px auto;
      border: 1px solid rgb(179, 179, 179);
      border-radius: 5px;
      flex: 0 0 auto;
    }
    .title {
      font-size: 16px;
      font-weight: bold;
      color: black;
      padding: 5px 10px;
      margin-bottom: 10px;
      flex: 0 0 auto;
    }
    .timelist {
      display: flex;
      padding: 5px 10px;
      flex: 1 0 auto;
      .listitem {
        font-size: 14px;
        color: black;
        height: 15px;
        padding: 5px 10px;
        margin-right: 5px;
        border: 1px solid rgb(225, 225, 225);
        border-radius: 5px;
        background-color: rgb(225, 225, 225);
      }
      .active {
        background-color: green;
        color: white;
      }
    }
    .closeButton {
      width: 100%;
      border: 0;
      border-top: 1px solid rgb(225, 225, 225);
      color: green;
      font-size: 16px;
      flex: 0 0 auto;
    }
  }
  .mongolia {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    z-index: 2;
  }
}
</style>
