
var txtfilepath;
var peiyinnew;
var username;


// pages/index/first.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    messages: [],
    isSpeech: false,
    scrollHeight: 0,
    toView: '',
    windowHeight: 0,
    windowWidth: 0,
    pxToRpx: 2,
    msg: '',
    emotionBox: false,
    emotions: [],
    speechText: '单击开始说话',
    changeImageUrl: '/images/voice.png',
    speechIcon: '/images/speech0.png',
    defaultSpeechIcon: '/images/speech0.png',
    emotionIcon: '/images/emotion.png',
    playingSpeech: '',
    baoxiangshow: true,
    inputValue: '',
    //src:'http://118.244.196.11:8008/static/iceall.mp4',
    peiyinwenzi: '看完这段视频后，尝试用雪宝的语气配音，配得好有礼物哦！~',
    speakboxshow: true,
    baoxiangallshow: false,
    shipinshowup: false,
    footershow: true,
    mute: false,
    jinduchang: 1,
    toView: "ok", 
    userN: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          windowHeight: res.windowHeight,
          pxToRpx: 750 / res.screenWidth,
          scrollHeight: (res.windowHeight - 0) * 750 / res.screenWidth
        })
      }
    })

    wx.setNavigationBarTitle({
      title: 'AI外教体验课',
    })

    // wx.login({
    //   success: function (res) {
    //     if (res.code) {
    //       console.log(res.code);
    //     } else {
    //       console.log('获取用户登录态失败！' + res.errMsg)
    //     }
    //   }
    // });


  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.downloadFile({
      url: 'http://118.244.196.11:8008/static/a.txt', //仅为示例，并非真实的资源
      success: function (res) {
        if (res.statusCode === 200) {
          console.dir(res.tempFilePath);
          txtfilepath = res.tempFilePath;

        }
      }
    })
  
  },

  kaishike: function () {
    console.log(username);

    wx.uploadFile({
      url: 'http://118.244.196.11:5000/', //host + '/wx/uploadSilk',
      filePath: txtfilepath,
      name: 'file',
      formData: {
        'user': 'first',
        'sessionID': username
      },
      success: function (res) {
        peiyinnew = JSON.parse(res.data)["new"];
        console.log(JSON.parse(res.data)["quesNum"]);
        if (peiyinnew == "yes") {
          wx.navigateTo({
            url: '../index/index?sessionID=' + username
          })
        }
      }
    })

  },

  nameinput: function (e) {
    console.log(e.detail.value);
    this.setData({
      userN: e.detail.value
    });
    username = e.detail.value;
    console.log(username);
    
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