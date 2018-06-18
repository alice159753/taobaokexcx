import { slideshow, category1, product } from '../../api/request'
var CommonEvent = require('../common/commonEvent');

var app = getApp();

Page({
  data: {
    //控制显示图片
    show:true,

    //首页轮播图
    swiperlists:[],
    swiperlists_cache: [],

    //首页一级分类
    category1list:[],
    category1list_cache:[],

    //首页商品
    productlists: [],
    productlists_cache: [],

    //分页
    page: 1,

  },

  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  onLoad: function () {
    /*wx.showToast({ //显示消息提示框  此处是提升用户体验的作用
      title: '数据加载中',
      icon: 'loading',
    });*/

    //没有登录则展示登录框
    if (!app.globalData.userInfo) {
      this.setData({
        isloginshow: true,
      })
    }

    // wx.showModal({
    //   title: '天天领支付宝到店付红包',
    //   content: '每天送您最高99元的支付宝现金红包，每天都能领，支付时即可抵现金，无门槛，超实惠。',
    //   confirmText:'立即领取',
    //   success: function (res) {
    //     if (res.confirm) {
    //       console.log('用户点击确定')

    //       wx.setClipboardData({
    //         data: '快来领支付宝红包！人人可领，天天可领！复制此消息，打开最新版支付宝就能领取！Y0sdS6091j',
    //         success() {
              
    //           wx.showModal({
    //             title: '复制支付宝口令成功',
    //             content: '赶快打开支付宝领取到店付红包吧!',
    //             showCancel:false,
    //             success: function (res) {
    //               if (res.confirm) {
    //                 console.log('用户点击确定')
    //               } else if (res.cancel) {
    //                 console.log('用户点击取消')
    //               }
    //             }
    //           })



    //         }
    //       })

    //     } else if (res.cancel) {
    //       console.log('用户点击取消');

    //       wx.setClipboardData({
    //         data: '快来领支付宝红包！人人可领，天天可领！复制此消息，打开最新版支付宝就能领取！Y0sdS6091j',
    //         success() {

    //         }
    //       })

    //     }
    //   }
    // })
    
    console.log('index onload');

    //CommonEvent.login();

    //设置导航条名称
    wx.setNavigationBarTitle({
      title: app.globalData.globalNameOne
    });

    //首页轮播图
    slideshow().then((res) => {
      let arr = res.data.result.data;
      this.setData({
        swiperlists: arr,
        })
    });

    //首页一级分类
    let storage_category = wx.getStorageSync('category1list_cache');

    console.log("缓存数据：首页一级分类");
    console.log(storage_category);

    if (!storage_category )
    {
      console.log('首页一级分类start');

      category1().then((res) => {
        let arr = res.data.result.data;

        console.log("数据：首页一级分类");
        console.log(arr);

        this.setData({
          category1list: arr,
        });

        console.log('首页一级分类end');

        //设置缓存
        wx.setStorageSync('category1list_cache', arr);

      });
    }
    else
    {
       //从缓存读取首页一级分类信息
      console.log('从缓存读取首页一级分类信息');
      this.setData({
        category1list: storage_category,
      });
    }

    //首页全部商品
    product(1).then((res) => {
      let arr = res.data.result.data;
      this.setData({
        productlists: arr,
      })
    });

  },

  /**
   * 页面下拉触底事件的处理函数
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
      product(that.data.page).then((res) => {
        let arr = res.data.result.data;
        let newarr = that.data.productlists.concat(arr);
        console.log(newarr);
        that.setData({
          productlists: newarr
        })
      })
    }, 1500)
  },

  gotosearch:function()
  {
    console.log("gotosearch");

    wx.switchTab({
      url: '/pages/search/search'
    })
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


})
