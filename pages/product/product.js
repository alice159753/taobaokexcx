import { commonAjax, product_detail } from '../../api/request'

var utils = require('../../utils/util.js');
var CommonEvent = require('../common/commonEvent');
var app = getApp();

Page({
  data: {
    //商品详情
    productDetail:[],

    //商品详情,你可能会喜欢
    productlists: [],

    //优惠卷口令
    coupon_command:'',
    istip: false,
    tip1Data: {
      con: '复制口令成功，打开手机淘宝或天猫下单'
    },


  },
  //立即购买
  lijigoumai()
  {
    let that = this
    console.log(that.data.coupon_command);
    wx.setClipboardData({
      data: that.data.coupon_command,
      success() {
        that.setData({
          url: that.data.coupon_command,
          istip: true
        })
      }
    })
  },
  //我知道了
  closetip()
  {
    let that = this
    that.setData({
      istip: false
    })
  },

  //查看教程
  userhelp()
  {
      wx.navigateTo({
        url: '../user/help',
      })
  },

  //options 可以获得请求的参数
  onLoad: function (options) {
    wx.showToast({ //显示消息提示框  此处是提升用户体验的作用
      title: '数据加载中',
      icon: 'loading',
    });

    //没有登录则展示登录框
    if (!app.globalData.userInfo) {
      this.setData({
        isloginshow: true,
      })
    }


    //商品详情
    product_detail(options.no).then((res) => {
      let arr = res.data.result.data;
      console.log(arr.likeLists);

      this.setData({
        productDetail: arr,
        productlists: arr.likeLists,
        coupon_command: arr.coupon_command,
      });

      //设置导航条名称
      wx.setNavigationBarTitle({
        title: arr.title
      });


    });


  },


  onShareAppMessage: function () {
    return {
      title: app.globalData.globalShareTitle,
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },

  //微信登录
  onGotUserInfo: function (e) {
    CommonEvent.login(e);

    console.log('登录完成');
    console.log(app.globalData.userInfo);

    this.setData({
      isloginshow: false,
    })
  },

  //关闭微信登录
  closetip: function () {
    this.setData({
      isloginshow: false,
    })
  },

});