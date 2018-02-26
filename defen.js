// pages/index/defen
var audiofilep;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    starshow:true,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.downloadFile({
      url: 'http://118.244.196.11:8008/static/finalAudio.wav', //仅为示例，并非真实的资源
      success: function (res) {
        if (res.statusCode === 200) {
          console.dir(res.tempFilePath);
          audiofilep = res.tempFilePath;
          console.log("download success");

        }
      }
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that=this;
    setTimeout(function(){
      that.setData({
        starshow: false,
      })
    },2000)
    
  },

  bofangshipin: function () {
    const innerAudioContext = wx.createInnerAudioContext();
    innerAudioContext.autoplay = false;
    innerAudioContext.src = audiofilep;//'http://118.244.196.11:8008/static/finalAudio.wav'; 
    innerAudioContext.onPlay(() => {
      console.log('开始播放')
    })
    innerAudioContext.onEnded(() => {
      innerAudioContext.destroy();
    }) 
    this.videoContext = wx.createVideoContext('defenVideo');
    this.videoContext.play();
    innerAudioContext.play();

  },

  jieshukecheng: function () {
    wx.navigateTo({
      url: '../index/wenjuan'
    })

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