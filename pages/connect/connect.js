// pages/connect/connect.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ssid: 'WiFi名称',
    bssid: '设备MAC',
    password: '密码'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let ssid = options.ssid;
    let bssid = options.bssid;
    let password = options.password;
    this.setData({
      ssid: ssid,
      bssid: bssid,
      password: password
    })
  },

  /**
   * 点击连接按钮触发
   */
  connectWifi: function() {
    const that = this;
    wx.showToast({
      title: '请稍等...',
    })
    that.startWiFi();
  },
  
  /**
   * 加载WiFi模块
   */
  startWiFi: function() {
    const that = this;
    wx.startWifi({
      complete: (res) => {
        that.connected();
      },
    })
  },

  /**
   * 连接WiFi
   */
  connected: function() {
    const that = this; 
    wx.connectWifi({
      SSID: that.data.ssid,
      BSSID: that.data.bssid,
      password: that.data.password,
      success: () => {
        wx.showToast({
          title: 'WiFi连接成功',
        })
        // 跳转至成功页面
        wx.redirectTo({
          url: '/pages/success/success',
        })
      },
      fail: (res) => {
        that.errorDialog(res);
      }
    })
  },

  /**
   * 连接失败弹窗
   * @param {错误返回} res 
   */
  errorDialog: function(res) {
    const that = this;
    wx.showModal({
      title: '连接失败',
      content: res.errMsg,
      confirmText: '复制密码',
      success (res) {
        if (res.confirm) {
          that.copyPassword();
        } else if (res.cancel) {
          console.log('cancel')
        }
      },
      fail(res) {
        wx.showToast({
          title: res.errMsg,
        })
      }
    });
  },

  /**
   * 复制密码到剪贴板
   */
  copyPassword: function() {
    const that = this;
    wx.setClipboardData({
      data: that.data.password,
      success (res) {
        wx.getClipboardData({
          success (res) {
            console.log(res.data);
          }
        })
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