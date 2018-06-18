import { slideshow, category1, product } from '../../api/request'
var CommonEvent = require('../common/commonEvent');
var app = getApp();

// pages/product/productlists.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //控制显示图片
    show: false,

    //商品列表
    productlists:[],

    //分页
    page: 1,

    //分类no
    category_no1 : 0,
    category_no2: 0,

    //分类排序, 销量降序
    category_order: 'sale_num desc',

    //展示的是那个排序
    istab: 0,

    //默认图标
    shang0:'shang.png',
    xia0: 'xia.png',
    shang1: 'shang.png',
    xia1: 'xia.png',
    shang2: 'shang.png',
    xia2: 'xia.png',
    shang3: 'shang.png',
    xia3: 'xia.png',



  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);

    //没有登录则展示登录框
    if (!app.globalData.userInfo) {
      this.setData({
        isloginshow: true,
      })
    }

    //设置导航条名称
    wx.setNavigationBarTitle({
      title: options.title
    });

    wx.showToast({ //显示消息提示框  此处是提升用户体验的作用
      title: '数据加载中',
      icon: 'loading',
    });

    //首页全部商品
    product(1, options.category_no1, options.category_no2, 'sale_num desc').then((res) => {
      let arr = res.data.result.data;

      //没有抓到商品
      if (arr.length <= 0 )
      {
        wx.showModal({
          title: '提示',
          content: '对不起，没有找到该宝贝',
          showCancel:false,
          success: function (res) {
            if (res.confirm) {
              wx.switchTab({
                url: '/pages/index/index',
              })
            }
          }
        });

        return '';
      }

      this.setData({
        productlists: arr,
        category_no1: options.category_no1,
        category_no2: options.category_no2,
        category_order: 'sale_num desc',
        //设置默认箭头颜色
        xia0: 'xia_active.png',

      })
    });


  },

  //tab选择
  taplist: function (event) 
  {
    let that = this;

    let id = event.currentTarget.dataset.id;
    let order = event.currentTarget.dataset.order;

    console.log("id="+id);
    console.log("order=" +order);

    this.setData({
      istab: id,
      category_order: order,
      page: 1
    })

    //首页全部商品
    product(1, that.data.category_no, order).then((res) => {
      let arr = res.data.result.data;
      this.setData({
        productlists: arr,
      })
    });

    that.clearjiantou();

    if (id == 0 )
    {
      if (order.indexOf('asc') >= 1 )
       {
        this.setData({
          shang0: 'shang_active.png',
        })
       }

      if (order.indexOf('desc') >= 1) {
        this.setData({
          xia0: 'xia_active.png',
        })
      }
    }

    if (id == 1) 
    {
      if (order.indexOf('asc') >= 1) {
        this.setData({
          shang1: 'shang_active.png',
        })
      }

      if (order.indexOf('desc') >= 1) {
        this.setData({
          xia1: 'xia_active.png',
        })
      }
    }

    if (id == 2) 
    {
      if (order.indexOf('asc') >= 1) {
        this.setData({
          shang2: 'shang_active.png',
        })
      }

      if (order.indexOf('desc') >= 1) {
        this.setData({
          xia2: 'xia_active.png',
        })
      }
    }

    if (id == 3) 
    {
      if (order.indexOf('asc') >= 1) {
        this.setData({
          shang3: 'shang_active.png',
        })
      }

      if (order.indexOf('desc') >= 1) {
        this.setData({
          xia3: 'xia_active.png',
        })
      }
    }




  },

  //清空箭头的颜色
  clearjiantou:function()
  {
    let that = this;

    this.setData({
      shang0: 'shang.png',
      xia0: 'xia.png',
      shang1: 'shang.png',
      xia1: 'xia.png',
      shang2: 'shang.png',
      xia2: 'xia.png',
      shang3: 'shang.png',
      xia3: 'xia.png',
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

      product(that.data.page, that.data.category_no1, that.data.category_no2, that.data.category_order).then((res) => {
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