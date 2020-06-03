import Vue from 'vue'
import Router from 'vue-router'
import index from '@/pages/index/index'
import sort from '@/pages/index/sort'
import search from '@/pages/search'
import profile from '@/pages/profile'
import detail from '@/pages/detail/detail'
import buy from '@/pages/index/buy'
import filmInfoPanel from '@/pages/detail/filmInfoPanel'
import collectPanel from '@/pages/detail/collectPanel'
import ratePanel from '@/pages/detail/ratePanel'
import shortRatePanel from '@/pages/detail/shortRatePanel'
import tag from '@/pages/detail/tag'
import staff from '@/pages/detail/staff'
import vedio from '@/pages/detail/vedio'
import staffPanel from '@/pages/detail/staffPanel'
import vedioPanel from '@/pages/detail/vedioPanel'
import writeLongRate from '@/pages/detail/writeLongRate'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index', // 热映（首页）
      component: index
    },
    {
      path: '/sort',
      name: 'sort', // 热映的搜索页
      component: sort
    },
    {
      path: '/buy',
      name: 'buy', // 热映的购票页
      component: buy
    },
    {
      path: '/search',
      name: 'search', // 找片
      component: search
    },
    {
      path: '/profile',
      name: 'profile', // 我的
      component: profile
    },
    {
      path: '/detail/:id',
      name: 'detail', // 详情
      component: detail
    },
    {
      path: '/filmInfoPanel',
      name: 'filmInfoPanel', // 详情的影片信息面板
      component: filmInfoPanel
    },
    {
      path: '/collectPanel',
      name: 'collectPanel', // 详情的收藏面板
      component: collectPanel
    },
    {
      path: '/ratePanel',
      name: 'ratePanel', // 详情的评价面板
      component: ratePanel
    },
    {
      path: '/shortRatePanel',
      name: 'shortRatePanel', // 详情的短评面板
      component: shortRatePanel
    },
    {
      path: '/staffPanel',
      name: 'staffPanel', // 详情的演职员面板
      component: staffPanel
    },
    {
      path: '/vedioPanel',
      name: 'vedioPanel', // 详情的预告片/视频评论/剧照面板
      component: vedioPanel
    },
    {
      path: '/tag',
      name: 'tag', // 详情的标签搜索结果页
      component: tag
    },
    {
      path: '/staff',
      name: 'staff', // 详情的演职员详情页
      component: staff
    },
    {
      path: '/vedio',
      name: 'vedio', // 详情的预告片/视频评论详情页
      component: vedio
    },
    {
      path: '/writeLongRate',
      name: 'writeLongRate', // 详情的写影评
      component: writeLongRate
    }
  ]
})
