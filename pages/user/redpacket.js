// pages/user/redpacket.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  //领取红包
  redpacket_submit:function()
  {
    wx.setClipboardData({
      data: '快来领支付宝红包！人人可领，天天可领！复制此消息，打开最新版支付宝就能领取！Y0sdS6091j',
      success() {

        wx.showModal({
          title: '复制支付宝口令成功',
          content: '赶快打开支付宝领取到店付红包吧!',
          showCancel: false,
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定')
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
      wx.showModal({
      title: '天天领支付宝到店付红包',
      content: '每天送您最高99元的支付宝现金红包，每天都能领，支付时即可抵现金，无门槛，超实惠。',
      confirmText:'立即领取',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')

          wx.setClipboardData({
            data: '快来领支付宝红包！人人可领，天天可领！复制此消息，打开最新版支付宝就能领取！Y0sdS6091j',
            success() {

              wx.showModal({
                title: '复制支付宝口令成功',
                content: '赶快打开支付宝领取到店付红包吧!',
                showCancel:false,
                success: function (res) {
                  if (res.confirm) {
                    console.log('用户点击确定')
                  } else if (res.cancel) {
                    console.log('用户点击取消')
                  }
                }
              })



            }
          })

        } else if (res.cancel) {
          console.log('用户点击取消');

          wx.setClipboardData({
            data: '快来领支付宝红包！人人可领，天天可领！复制此消息，打开最新版支付宝就能领取！Y0sdS6091j',
            success() {

            }
          })

        }
      }
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
  
  }
})