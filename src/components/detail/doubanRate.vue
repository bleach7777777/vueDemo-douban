<template>
  <div class="box">
    <div class="top">
      <span>豆瓣评分</span>
      <span class="iconfont iconright"></span>
    </div>
    <div class="middle">
      <div class="rateScope">
        <div class="scope">{{filmObj.rating.average}}</div>
        <div>星星</div>
      </div>
      <div class="rateDetail">
        <starProgress
          v-for="(item,index) in starNum"
          :key="index"
          class="star"
          :star-num="item"
          :people-total-num="filmObj.ratings_count"
          :people-num="filmObj.rating.details[item]"
        ></starProgress>
        <div class="total">{{filmObj.ratings_count}}人评价</div>
      </div>
    </div>
    <div class="bottom">
      <span>{{filter(filmObj.collect_count)}}人看过</span>
      <span>{{filter(filmObj.wish_count)}}人想看</span>
    </div>
  </div>
</template>
<script>
import starProgress from "./starProgress";
export default {
  name: "doubanRate",
  data() {
    return {
      starNum: [5, 4, 3, 2, 1]
    };
  },
  methods: {
    //过滤人数
    filter(value) {
      return this.$utils.filterPeopleNum(value);
    }
  },
  props: ["film-obj"],
  components: {
    starProgress
  }
};
</script>
<style lang="scss" scoped>
.box {
  border: 1px solid rgb(13, 13, 177);
  border-radius: 5px;
  background-color: rgb(13, 13, 177);
  color: white;
  .top {
    display: flex;
    justify-content: space-between;
    padding: 5px;
  }
  .middle {
    display: flex;
    padding: 5px;
    border-bottom: 1px solid rgba(228, 228, 228, 0.3);
    .rateScope {
      margin: 0 5px 0 10px;
      .scope {
        font-size: 30px;
      }
    }
    .rateDetail {
      .total {
        font-size: 10px;
        color: rgba(179, 179, 179, 0.7);
      }
    }
  }
  .bottom {
    display: flex;
    justify-content: flex-end;
    padding: 5px;
    span {
      margin: 0 5px;
    }
  }
}
</style>
