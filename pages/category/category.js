import { slideshow, category1, product, categoryall } from '../../api/request'
var CommonEvent = require('../common/commonEvent');

var app = getApp();


// pages/category/category.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
    //首页一级分类
    category1list: [],

    //首页二级分类
    category2list: [],

    //一级分类所有二级分类
    category2Map:[],

    //当前一级分类no
    category_no:0,

    //缓存
    categoryall_cache:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // wx.showToast({ //显示消息提示框  此处是提升用户体验的作用
    //   title: '数据加载中',
    //   icon: 'loading',
    // });

    //没有登录则展示登录框
    if (!app.globalData.userInfo) {
      this.setData({
        isloginshow: true,
      })
    }

    let that = this;

    let categoryall_cache = wx.getStorageSync('categoryall_cache');

    if (!categoryall_cache ) 
    {
      console.log('分类所有分类');

      //获取所有分类
      categoryall().then((res) => {
        let arr1 = res.data.result.data.category1list;
        let arr2 = res.data.result.data.category2list;

        arr1[0]['is_active'] = 1;

        this.setData({
          category1list: arr1,
          category2Map: arr2,
          category2list: arr2[arr1[0]['no']],
          category_no: arr1[0]['no'],
        });

        wx.setStorageSync('categoryall_cache', res.data.result.data);

      });
    }
    else
    {
      console.log('缓存分类所有分类');

      let arr1 = categoryall_cache.category1list;
      let arr2 = categoryall_cache.category2list;

      arr1[0]['is_active'] = 1;

      this.setData({
        category1list: arr1,
        category2Map: arr2,
        category2list: arr2[arr1[0]['no']],
        category_no: arr1[0]['no'],
      })
    }
  },

  changecategory: function (event)
  {
    let that = this;

    let id = event.target.id;

    that.setData({
      category2list: that.data.category2Map[id]
    });

    //清除一级分类的字段
    var length = that.data.category1list.length;

    for (var i = 0; i < length; i++)
    {
      that.data.category1list[i]['is_active'] = 0;

      if (that.data.category1list[i]['no'] == id )
      {
        that.data.category1list[i]['is_active'] = 1;
      }
    }

    this.setData({
      category1list: that.data.category1list,
    })

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