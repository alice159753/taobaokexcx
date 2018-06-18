// pages/search/search.js
import { hot_search, user_search_history, user_search_delete,product_search } from '../../api/request'
var CommonEvent = require('../common/commonEvent');

var app = getApp();


Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 1,
    //判断是否显示搜索和历史
    val: '',

    //是否展示热门搜索
    is_show_hot:true,
    //是否展示商品
    is_show_product:false,

    //热门搜索
    hotlists: [],
    hotlists_cache: [],

   //历史搜索
    historyArray:[],

    //首页商品
    productlists: [],
  },

  //点击小叉叉清除input内容
  clearFont: function () {
    this.setData({
      val: '',
      is_show_hot: true,
      is_show_product: false,
      productlists: [],
    });
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    console.log("search onload");


    //没有登录则展示登录框
    if (!app.globalData.userInfo) {
      this.setData({
        isloginshow: true,
      })
    }


    //清除之前搜索的产品结果
    this.setData({
      val: '',
      is_show_hot: true,
      is_show_product: false,
      productlists:[],
    });

    //热门搜索
    let hotlists = wx.getStorageSync('hotlists_cache');

    if (!hotlists) 
    {
      console.log('热门搜索');

      hot_search().then((res) => {
        let arr = res.data.result.data;
        this.setData({
          hotlists: arr,
        })

        //设置缓存
        wx.setStorageSync('hotlists_cache', arr);
      });
    }
    else {
      //从缓存读取首页一级分类信息
      console.log('从缓存读取热门搜索');
      this.setData({
        hotlists: hotlists,
      });
    }

    //历史搜索
    user_search_history(app.globalData.userInfo.user_no).then((res) => {
      let arr = res.data.result.data;
      this.setData({
        historyArray: arr,
      })
    });

  },

  userInput:function(e)
  {
    let title = e.detail.value;

    this.search_make(title);
  },

  //点击enter按键
  search_submit_confirm:function(e) 
  {
    let title = e.detail.value;

    console.log("搜索关键字:" + title);

    this.search_make(title);
  },

  //点击搜索图标
  search_submit_query:function()
  {
    let title = this.data.val;

    console.log("搜索关键字:" + title);

    this.search_make(title);
  },

  submitInfo:function(e)
  {
    let title = e.detail.value.title;

    this.search_make(title);
  },

  //搜索提交
  search_submit: function (event)
  {
      let title = event.currentTarget.dataset.title;

      console.log("搜索关键字:"+title);

      this.search_make(title);
  },

  //执行搜索
  search_make:function(title)
  {
    wx.showToast({ //显示消息提示框  此处是提升用户体验的作用
      title: '数据加载中',
      icon: 'loading',
    });

    this.setData({
      val: title,
      page: 1
    });

    product_search(this.data.page, title, app.globalData.userInfo.user_no).then((res) => {

      let arr = res.data.result.data;

      //如果查询出来的结果为空，则展示空结果，否则展示产品
      if (res.data.result.data.length == 0) {

        this.setData({
          is_show_hot: true,
          is_show_product: false,
        });

        wx.showToast({ //显示消息提示框  此处是提升用户体验的作用
          title: '没有此宝贝',
          icon: 'none',
        });
      }
      else {
        this.setData({
          is_show_hot: false,
          is_show_product: true,
          productlists: arr,
        });
      }
    })
  },

  //删除用户历史搜索记录
  user_search_delete: function (event)
  {
    let no = event.currentTarget.dataset.no;

    //删除需要展示
    user_search_delete(no).then((res) => {
      let arr = res.data.result.data;
    });

     //重新加载 
    user_search_history(app.globalData.userInfo.user_no).then((res) => {
      let arr = res.data.result.data;
      this.setData({
        historyArray: arr,
      })
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log('下拉刷新～');
    let that = this;

    that.setData({
      show: true,
      page: that.data.page + 1
    });

    setTimeout(function () {
      that.setData({
        show: false
      });
      product_search(that.data.page, that.data.val, app.globalData.userInfo.user_no).then((res) => {
        let arr = res.data.result.data;
        let newarr = that.data.productlists.concat(arr);
        console.log(newarr);
        that.setData({
          productlists: newarr
        })
      })
    }, 1500)
  },

  /**
   * 用户点击右上角分享
   */

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


})