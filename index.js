var util = require('../../utils/util')
const app = getApp()
const host = app.globalData.host
var emojis = app.globalData.emojis
var countmusic=1
const recorderManager = wx.getRecorderManager()
var tempFilePath;

//for test download only
var answerfilepath;
var answerfilepath2;
var answerfilepath3;
var txtfilepath;
var quesnum=101;
var peiyinques=700;
var recorlen;
var peiyinFilePath;
var finalaudiopath;
var v1path;
var v2path;
var v3path;
var v4path;
var v5path;
var vpath;
var usersession;

//download list
var urllist =
  [
    //'http://118.244.196.11:8008/static/iceall.mp4',
    'http://118.244.196.11:8008/static/Q13OK.mp3', 'http://118.244.196.11:8008/static/Q14Watch%20your%20language.mp3', 'http://118.244.196.11:8008/static/Q22Well.mp3', 'http://118.244.196.11:8008/static/Q41Whatistheweatherliketoday.mp3', 'http://118.244.196.11:8008/static/Q23Dont%20worry.mp3', 'http://118.244.196.11:8008/static/Q41Whatistheweatherliketoday.mp3', 'http://118.244.196.11:8008/static/Q24OKno%20problem.mp3', 'http://118.244.196.11:8008/static/Q25Watch%20your%20language.mp3', 'http://118.244.196.11:8008/static/Q26Sorry%20i%20didnt%20get%20you.mp3', 'http://118.244.196.11:8008/static/Q42well.mp3', 'http://118.244.196.11:8008/static/Q31Are%20you%20ready%20for%20English%20class.mp3', 'http://118.244.196.11:8008/static/Q43OK.mp3', 'http://118.244.196.11:8008/static/Q44watch.mp3', 'http://118.244.196.11:8008/static/Q45sorry.mp3', 'http://118.244.196.11:8008/static/Q32All%20right.mp3', 'http://118.244.196.11:8008/static/So%20today.mp3', 'http://118.244.196.11:8008/static/We%20use%20in.mp3', 'http://118.244.196.11:8008/static/Television.mp3', 'http://118.244.196.11:8008/static/We%20use%20on.mp3', 'http://118.244.196.11:8008/static/On%20July%2020th%201969.mp3', 'http://118.244.196.11:8008/static/We%20use%20at.mp3', 'http://118.244.196.11:8008/static/Three%20monkeys.mp3', 'http://118.244.196.11:8008/static/i%20am%20going.mp3', 'http://118.244.196.11:8008/static/Q51What%20time%20do%20you%20get%20up.mp3', 'http://118.244.196.11:8008/static/Q33We%20should%20cherish%20time.mp3', 'http://118.244.196.11:8008/static/So%20today.mp3', 'http://118.244.196.11:8008/static/We%20use%20in.mp3', 'http://118.244.196.11:8008/static/Television.mp3', 'http://118.244.196.11:8008/static/We%20use%20on.mp3', 'http://118.244.196.11:8008/static/On%20July%2020th%201969.mp3', 'http://118.244.196.11:8008/static/We%20use%20at.mp3', 'http://118.244.196.11:8008/static/Three%20monkeys.mp3', 'http://118.244.196.11:8008/static/i%20am%20going.mp3', 'http://118.244.196.11:8008/static/Q51What%20time%20do%20you%20get%20up.mp3', 'http://118.244.196.11:8008/static/Q34OK%20no%20problem.mp3', 'http://118.244.196.11:8008/static/Q35Watch%20your%20language.mp3', 'http://118.244.196.11:8008/static/Q36Sorry%20i%20didnt%20get%20you.mp3', 'http://118.244.196.11:8008/static/Q52Oh.mp3', 'http://118.244.196.11:8008/static/Q61WHAT.mp3', 'http://118.244.196.11:8008/static/Q53All%20right.mp3', 'http://118.244.196.11:8008/static/Q61WHAT.mp3', 'http://118.244.196.11:8008/static/Q54OK.mp3', 'http://118.244.196.11:8008/static/Q55Watch%20your%20language.mp3', 'http://118.244.196.11:8008/static/Q56sorry.mp3', 'http://118.244.196.11:8008/static/Q62ALL.mp3', 'http://118.244.196.11:8008/static/Q71How%20about%20your%20lunch.mp3', 'http://118.244.196.11:8008/static/Q63All%20right.mp3', 'http://118.244.196.11:8008/static/Q71How%20about%20your%20lunch.mp3', 'http://118.244.196.11:8008/static/Q65ok.mp3', 'http://118.244.196.11:8008/static/Q71How%20about%20your%20lunch.mp3', 'http://118.244.196.11:8008/static/Q66OK.mp3', 'http://118.244.196.11:8008/static/Q67Watch%20your%20language.mp3', 'http://118.244.196.11:8008/static/Q68sorry.mp3', 'http://118.244.196.11:8008/static/Q64We%20are.mp3', 'http://118.244.196.11:8008/static/Q72all.mp3', 'http://118.244.196.11:8008/static/Q111On%20which%20days.mp3', 'http://118.244.196.11:8008/static/Q73allright.mp3', 'http://118.244.196.11:8008/static/Q111On%20which%20days.mp3', 'http://118.244.196.11:8008/static/Q74Remember.mp3', 'http://118.244.196.11:8008/static/Q111On%20which%20days.mp3', 'http://118.244.196.11:8008/static/Q76OK.mp3', 'http://118.244.196.11:8008/static/Q77Watch.mp3', 'http://118.244.196.11:8008/static/Q78sorry.mp3', 'http://118.244.196.11:8008/static/Q75We.mp3', 'http://118.244.196.11:8008/static/Q112That%E2%80%99s%20Awesome.mp3', 'http://118.244.196.11:8008/static/Greatnextsection.mp3', 'http://118.244.196.11:8008/static/long%20long%20ago.mp3', 'http://118.244.196.11:8008/static/nowi.mp3', 'http://118.244.196.11:8008/static/Did%20you%20go%20anywhere%20this%20Christmas.mp3', 'http://118.244.196.11:8008/static/Q113OK.mp3', 'http://118.244.196.11:8008/static/Q114Watch%20your%20language.mp3', 'http://118.244.196.11:8008/static/Q116sorry.mp3', 'http://118.244.196.11:8008/static/that%20sounds%20cool.MP3', 'http://118.244.196.11:8008/static/Is%20this%20your%20fist%20time%20to%20go%20there%20.mp3', 'http://118.244.196.11:8008/static/I%20see.%20So%20you%20didnt%20go%20anywhere.MP3', 'http://118.244.196.11:8008/static/So%20did%20you%20finish%20your%20homework%20this%20holiday.mp3', 'http://118.244.196.11:8008/static/OnpDid%20you%20go%20anywhere%20this%20chirstmas.mp3', 'http://118.244.196.11:8008/static/watch.mp3', 'http://118.244.196.11:8008/static/sorry%20i%20didnt%20get%20you.mp3', 'http://118.244.196.11:8008/static/I%20see%20so%20it%20was%20your%20first%20time.mp3', 'http://118.244.196.11:8008/static/Did%20you%20see%20any%20interesting%20people%20there.mp3', 'http://118.244.196.11:8008/static/Did%20you%20see%20any%20interesting%20people%20there.mp3', 'http://118.244.196.11:8008/static/Onp%20Is%20this%20your%20fist%20time%20to%20go%20there.mp3', 'http://118.244.196.11:8008/static/watch%20your%20language%20kido%20Is%20it%20or%20isnt%20it%20your%20first%20time%20to%20go%20there.mp3', 'http://118.244.196.11:8008/static/sorry%20i%20didnt%20get%20you%20Is%20it%20or%20isnt%20it%20your%20first%20time%20to%20go%20there.mp3', 'http://118.244.196.11:8008/static/Cool.%20it%20sounds%20like%20interesting%20experience%20..mp3', 'http://118.244.196.11:8008/static/So%20did%20you%20finish%20your%20homework%20this%20holiday.mp3', 'http://118.244.196.11:8008/static/Well.%20As%20long%20as%20you%20have%20a%20good%20time,%20.mp3', 'http://118.244.196.11:8008/static/So%20did%20you%20finish%20your%20homework%20this%20holiday.mp3', 'http://118.244.196.11:8008/static/OK%20no%20problem%20Did%20you%20see%20any%20interesting%20people%20there.mp3', 'http://118.244.196.11:8008/static/watch%20your%20language%20kido%20Did%20you%20or%20didnt%20you%20see%20any%20interesting%20people%20there.mp3', 'http://118.244.196.11:8008/static/Sorry%20I%20didnt%20get%20you%20Did%20you%20or%20didnt%20you%20see%20any%20interesting%20people%20there.mp3', 'http://118.244.196.11:8008/static/Cool.%20you%20are%20a%20good%20kid.mp3', 'http://118.244.196.11:8008/static/great!%20lets%20start%20the%20next%20session.mp3', 'http://118.244.196.11:8008/static/please%20read%20after%20me.mp3', 'http://118.244.196.11:8008/static/ChristmasSay.mp3', 'http://118.244.196.11:8008/static/now%20it%20is%20your%20turn,%20please%20read%20the%20sentences..mp3', 'http://118.244.196.11:8008/static/ha.%20i%20think%20you%20should%20put%20more%20effort%20on%20your%20studies.mp3', 'http://118.244.196.11:8008/static/great!%20lets%20start%20the%20next%20session.mp3', 'http://118.244.196.11:8008/static/please%20read%20after%20me.mp3', 'http://118.244.196.11:8008/static/ChristmasSay.mp3', 'http://118.244.196.11:8008/static/now%20it%20is%20your%20turn,%20please%20read%20the%20sentences..mp3', 'http://118.244.196.11:8008/static/OK%20no%20problem%20So%20did%20you%20finish%20your%20homework%20this%20holiday.mp3', 'http://118.244.196.11:8008/static/watch your language kido Did you or didnt you finish your homework this holiday.mp3', 'http://118.244.196.11:8008/static/Sorry%20I%20didnt%20get%20you.%20Did%20you%20or%20didnt%20you%20finish%20your%20homework%20this%20holiday.mp3', 'http://118.244.196.11:8008/static/repeat.mp3', 'http://118.244.196.11:8008/static/you%20still.mp3', 'http://118.244.196.11:8008/static/You%20still%20mispronounce%20some%20words.mp3', 'http://118.244.196.11:8008/static/Wechatxms0.mp3', 'http://118.244.196.11:8008/static/great!good%20job.mp3', 'http://118.244.196.11:8008/static/Please%20answer%20the%20following%20questions.mp3', 'http://118.244.196.11:8008/static/eat.mp3', 'http://118.244.196.11:8008/static/goodpeiyinqian.mp3', 'http://118.244.196.11:8008/static/Q15Sorry%20i%20did%20not%20get%20you.mp3', 'http://118.244.196.11:8008/static/Q12You%20have%20a%20nice%20name.mp3', 'http://118.244.196.11:8008/static/Q21How%20are%20you.mp3',
  ]
//download list end
var name = [];



Page({
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
    peiyinwenzi:'看完这段视频后，尝试用雪宝的语气配音，配得好有礼物哦！~',
    speakboxshow:true,
    baoxiangallshow:false,
    shipinshowup:false,
    footershow:true,
    mute:false,
    jinduchang:1,
  },
  chooseEmotion(e) {
    this.setData({
      msg: this.data.msg + '[' + e.target.dataset.name + ']',
    })
  },
  sendMessage(e) {
    this.setData({
      msg: e.detail.value,
    })
  },
  //baoxiang tap function
  baoxiangtap: function () {
    var that = this;
    this.setData({
      //showView: (!that.data.showView)
      baoxiangshow: false
    })
    setTimeout(function(){
      that.setData({
        baoxiangallshow: false,
        shipinshowup:true,
        footershow:false,
        speakboxshow:false,
        
      })
      that.setData({
        src: 'http://118.244.196.11:8008/static/iceall.mp4'//vpath //'http://118.244.196.11:8008/static/iceall.mp4'
      })
      that.videoContext.play();
    },2500)
  },

  //video play begins
  bindInputBlur: function (e) {
    this.inputValue = e.detail.value
  },

  peiyinbofang: function () {
    //this.videoContext.stop();
    //var that=this;
    this.setData({
      mute: false,
      auto: false,     
    })
    if (peiyinques==700){
      this.setData({
        src: 'http://118.244.196.11:8008/static/iceall.mp4'//vpath //'http://118.244.196.11:8008/static/iceall.mp4'
      })
    }    
    this.videoContext.play();
  },

  huifang:function(){
    console.log("click huifang");
    this.setData({
      mute: true,
      auto: false,
    })
    const innerAudioContext = wx.createInnerAudioContext();
    innerAudioContext.autoplay = false;
    innerAudioContext.src = peiyinFilePath;
    this.videoContext.play();
    innerAudioContext.play();
    innerAudioContext.onPlay(() => {
      console.log('开始播放')
    })
    innerAudioContext.onEnded(() => {
      innerAudioContext.destroy();
    })
  },

  peiyinluyin: function () {
    //this.videoContext.stop();
    //var that=this;
    this.setData({
      mute: true,
      auto: false,      
    })
    this.videoContext.play();
    const options = {
      //duration: recorlen,//指定录音的时长，单位 ms
      sampleRate: 16000,//采样率
      numberOfChannels: 1,//录音通道数
      encodeBitRate: 96000,//编码码率
      format: 'mp3',//音频格式，有效值 aac/mp3
      frameSize: 50,//指定帧大小，单位 KB
    }
    //开始录音
    recorderManager.start(options);
    recorderManager.onStart(() => {
      console.log('recorder start');
      setTimeout(function () {
        recorderManager.stop();
      }, (recorlen-150));
    });
    //错误回调
    recorderManager.onError((res) => {
      console.log(res);
    })
    // setTimeout(function(){
    //   recorderManager.stop();
    // }, recorlen);

    recorderManager.onStop((res) => {
      peiyinFilePath = res.tempFilePath;
      tempFilePath = res.tempFilePath;
      wx.uploadFile({
        url: 'http://118.244.196.11:5000/',//host + '/wx/uploadSilk',
        filePath: tempFilePath,
        name: 'file',
        formData: {
          // 'userid': wx.getStorageSync('openid'),
          // 'username': wx.getStorageSync('userInfo').nickName
          'user': 'test',
          'sessionID': usersession
        },
        success: function (res) {
          console.log("upload successfully")
          },
        fail: function (err) {
          console.log(err)
        }
      
      })
    })  
  },

  nextButton: function () {    
    var that=this;
    if (peiyinques==705){
      that.setData({
        peiyinwenzi:"外教正在帮你剪辑视频",
      })
    }  
    wx.uploadFile({
      url: 'http://118.244.196.11:5000/', //host + '/wx/uploadSilk',
      filePath: txtfilepath,
      name: 'file',
      formData: {
        // 'userid': wx.getStorageSync('openid'),
        // 'username': wx.getStorageSync('userInfo').nickName
        'user': 'no',
        'sessionID': usersession
      },
      success: function (res) {
        console.log(res.data);
        console.log(res.statusCode);
        //console.log(JSON.parse(JSON.parse(res.data))["quesNum"]);
        console.log(JSON.parse(res.data)["quesNum"]);
        var peiyinnew = JSON.parse(res.data)["new"];
        peiyinques = JSON.parse(res.data)["quesNum"];
        console.log(peiyinnew);
        console.log(peiyinques);
        if (peiyinnew == "yes") {
          if (peiyinques == 701) {
            that.setData({
              mute: false,
              auto: false,
              peiyinwenzi: "please, I know you're hungry...",
              src: "http://118.244.196.11:8008/static/icee1.mp4" //v1path //"http://118.244.196.11:8008/static/icee1.mp4"
            })
            console.log(peiyinques);
            recorlen = 1870;
            console.log(recorlen);
            setTimeout(function(){
              that.videoContext.play();
            },1000)
            

            // document.getElementById("peiyinluyin").style.display = "inline";
            // document.getElementById("huifang").style.display = "inline";
            
          }
          if (peiyinques == 702) {
            that.setData({
              mute: false,
              auto: false,
              peiyinwenzi:"But I need at least one tradition for my best friends.",
              src: "http://118.244.196.11:8008/static/icee2.mp4" //v2path //"http://118.244.196.11:8008/static/icee2.mp4"
            })
            recorlen = 3110;
            console.log(recorlen);
            setTimeout(function () {
              that.videoContext.play();
            }, 1000)    
          }
          if (peiyinques == 703) {
            that.setData({
              mute: false,
              auto: false,
              peiyinwenzi:"The fate of the world depends on it!",
              src: "http://118.244.196.11:8008/static/icee3.mp4" //v3path //"http://118.244.196.11:8008/static/icee3.mp4"
            })
            recorlen = 3783;
            console.log(recorlen);
            setTimeout(function () {
              that.videoContext.play();
            }, 1000)   
            
            // window.recorlen = 3783;
            // document.getElementById("peiyinwenzi").innerHTML = "<br/>The fate of the world depends on it!";
          }
          if (peiyinques == 704) {
            that.setData({
              mute: false,
              auto: false,
              peiyinwenzi:"Yes! Yes! I did it!",
              src: "http://118.244.196.11:8008/static/icee4.mp4"//v4path //"http://118.244.196.11:8008/static/icee4.mp4"
            })
            recorlen = 2460;
            console.log(recorlen);
            setTimeout(function () {
              that.videoContext.play();
            }, 1000)   
            
            // window.recorlen = 2460;
            // document.getElementById("peiyinwenzi").innerHTML = "<br/>Yes! Yes! I did it!";
            
          }
          if (peiyinques == 705) {
            that.setData({
              mute: false,
              auto: false,
              peiyinwenzi:"A tradition is saved!",
              src: "http://118.244.196.11:8008/static/icee5.mp4"//v5path //"http://118.244.196.11:8008/static/icee5.mp4"
            })
            recorlen = 3540;
            console.log(recorlen);
            setTimeout(function () {
              that.videoContext.play();
            }, 1000)  
            
            // window.recorlen = 3540;
            // document.getElementById("peiyinwenzi").innerHTML = "<br/>A tradition is saved!";
            
          }
          if (peiyinques == 706) {
            wx.downloadFile({
              url: 'http://118.244.196.11:8008/static/finalAudio.wav', //仅为示例，并非真实的资源
              success: function (res) {
                console.log(res.statusCode)
                if (res.statusCode === 200) {
                  console.dir(res.tempFilePath);
                  finalaudiopath = res.tempFilePath;
                  that.setData({
                    mute: true,
                    auto: false,
                    peiyinwenzi:"不错，你的读音很标准！\n这是你的配音成果\n请点击next继续",
                    src: "http://118.244.196.11:8008/static/iceall.mp4"//vpath //"http://118.244.196.11:8008/static/iceall.mp4"
                  })
                  const innerAudioContext = wx.createInnerAudioContext();
                  innerAudioContext.autoplay = false;
                  innerAudioContext.src = finalaudiopath;                  
                  innerAudioContext.onPlay(() => {
                    console.log('开始播放')
                  })
                  innerAudioContext.onEnded(() => {
                    innerAudioContext.destroy();
                  })
                  setTimeout(function () {
                    that.videoContext.play();
                    innerAudioContext.play();
                  }, 1000)  
                }
              }
            })
            // document.getElementById("peiyinluyin").style.display = "none";
            // document.getElementById("huifang").style.display = "none";
            // document.getElementById("progressbar1").style.display = "none";
            // document.getElementById("peiyinwenzi").innerHTML = "<br/>不错，你的读音很标准！这是你的配音成果</br>请点击next继续";            
          }
          if (peiyinques == 707) {
            wx.redirectTo({ url: '../index/defen' });
            //window.location.href = "{{ url_for('static', filename='defenR.html') }}";
          }
        }
      }
    })

  },

  //video play ended
  onLoad(options) {
    console.log("session id:"+options.sessionID);
    usersession = options.sessionID;
    const innerAudioContext = wx.createInnerAudioContext();
    innerAudioContext.autoplay = false;
    innerAudioContext.src = "http://118.244.196.11:8008/static/Q11Hello%20kid.mp3";
    innerAudioContext.play();
    innerAudioContext.onPlay(() => {
      console.log('开始播放')
    })
    innerAudioContext.onEnded(() => {
      innerAudioContext.destroy();
    })
    
    var that = this
    let emotions = []
    for (let i = 0; i < emojis.length; i++) {
      emotions.push({
        src: '/emoji/' + util.getEmojiEn(emojis[i]) + '.png',
        id: i,
        name: emojis[i]
      })
    }
    this.setData({
      emotions: emotions
    })
    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          windowHeight: res.windowHeight,
          pxToRpx: 750 / res.screenWidth,
          scrollHeight: (res.windowHeight - 50) * 750 / res.screenWidth
        })
      }
    })
    let answer = 'Hello there. Please tell me your name.';//'Now I am going to ask you some questions, to practice the usage of time.\n现在我将会问你一些问题，来练习时间的用法。请你用两句以内回答。 '//'We use ‘at’in front of the precise time of the day.\n我们把‘at’放在，一天之中具体的时刻。';//'Hello there. Please tell me your name.';
    let contents = util.getContents(answer)
    let id = 'id_' + Date.parse(new Date()) / 1000;
    let data = { id: id, contents: contents, me: false, imgshow: false, avatar: '/images/robot.jpg', speech: true, jiaoxueimg: 'http://118.244.196.11:8008/static/images/j1.gif', textshow: true, }
    let messages = that.data.messages
    messages.push(data)
    that.setData({
      messages: messages
    })
    that.setData({
      toView: id
    })
    console.time('testing');
    for (let i = 0; i < urllist.length; i++) {
      wx.downloadFile({
        url: urllist[i],
        success: function (res) {
          name[i] = res.tempFilePath
          console.dir('file:' + name[0])
        }
      })
    }
    // var videoContext = wx.createVideoContext()
    // that.setData({
    //   src: name[0]
    // })
    // that.videoContext.play();
    console.timeEnd('testing');
  },
  onShareAppMessage: function () {
    return {
      title: '伙伴小Q',
      path: '/pages/index/index'
    }
  },
  emotionBtn() {
    if (this.data.emotionBox) {
      this.setData({
        emotionBox: false,
        scrollHeight: (this.data.windowHeight - 50) * this.data.pxToRpx
      })
    } else {
      this.setData({
        emotionBox: true,
        scrollHeight: (this.data.windowHeight - 285) * this.data.pxToRpx
      })
      if (this.data.isSpeech) {
        this.setData({
          isSpeech: false,
          changeImageUrl:  '/images/voice.png'
        });
      }
    }
  }, changeType: function () {
    if (this.data.isSpeech) {
      this.setData({
        isSpeech: false,
        changeImageUrl:  '/images/voice.png'
      });
    } else {
      this.setData({
        isSpeech: true,
        changeImageUrl:  '/images/keyinput.png',
        emotionBox: false,
        scrollHeight: (this.data.windowHeight - 50) * this.data.pxToRpx
      });
    }
  },
  send: function () {
    var that = this;
    let msg = this.data.msg
    let contents = util.getContents(msg)
    let id = 'id_' + Date.parse(new Date()) / 1000;
    let data = { id: id, contents: contents, me: true, avatar: wx.getStorageSync('userInfo').avatarUrl, speech: false }
    let messages = this.data.messages
    messages.push(data)
    this.setData({
      messages: messages,
      msg: ''
    })
    this.setData({
      toView: id
    })
    wx.request({
      url: host + '/wx/robot',
      method: 'POST',
      data: { 'info': msg, 'userid': wx.getStorageSync('openid'), 'username': wx.getStorageSync('userInfo').nickName },
      header: {
        "content-type": "application/json"
      },
      success: function (res) {
        if (res.statusCode == 200) {
          let answer = res.data.text;
          console.log(typeof (answer));
          console.log(answer);
          let contents = util.getContents(answer, res.data.url)
          console.log(contents);
          let id = 'id_' + Date.parse(new Date()) / 1000;
          let data = { id: id, contents: contents, me: false, avatar:  '/images/robot.jpg', speech: false }
          let messages = that.data.messages
          messages.push(data)
          console.log(messages)
          that.setData({
            messages: messages
          })
          answer = 'abc';
          console.log(typeof (answer));
          console.log(answer);
          contents = util.getContents(answer)
          data = { id: id, contents: contents, me: false, avatar: '/images/robot.jpg', speech: false }
          
          messages.push(data)
          console.log(messages)
          that.setData({
            messages: messages
          })
          that.setData({
            toView: id
          })
        }
      },
      fail: function (res) {
        console.log(res)
      }
    })
  },
  startRecord: function () {
    var that = this;
    this.setData({
      speechText: '松开 发送'
    })
    var seconds = 0;
    var interval = setInterval(function () {
      seconds++
    }, 1000);
    wx.startRecord({
      success: function (res) {
        clearInterval(interval);
        var tempFilePath = res.tempFilePath

        seconds = seconds == 0 ? 1 : seconds;
        let id = 'id_' + Date.parse(new Date()) / 1000;
        let data = { id: id, me: true, avatar: wx.getStorageSync('userInfo').avatarUrl, speech: true, seconds: seconds, filePath: tempFilePath }
        let messages = that.data.messages
        messages.push(data)
        that.setData({
          messages: messages
        });
        that.setData({
          toView: id
        })
        let nickName = wx.getStorageSync('userInfo').nickName;
        if (!nickName) nickName = 'null';
        wx.uploadFile({
          url: 'http://118.244.196.11:5000/',//host + '/wx/uploadSilk',
          filePath: tempFilePath,
          name: 'file',
          formData: {
            // 'userid': wx.getStorageSync('openid'),
            // 'username': wx.getStorageSync('userInfo').nickName
            'user': 'test',
            'sessionID': usersession
          },
          success: function (res) {
            //let resData = JSON.parse(res.data);
            let aiReply = JSON.parse(res.data)["status"];

            // if (resData.code == 102) {
            //   let answer = resData.text;
            //   let contents = util.getContents(answer)
            //   let id = 'id_' + Date.parse(new Date()) / 1000;
            //   let data = { id: id, contents: contents, me: false, avatar:   '/images/robot.jpg', speech: false }
            //   let messages = that.data.messages
            //   messages.push(data)
            //   that.setData({
            //     messages: messages
            //   })
            let answer = aiReply;
            // let answer = 'So today I am gonna to teach you, how to tell the time.  First, I am going to introduce the prepositions of Time – at. In. on.  ';
              let contents = util.getContents(answer)
              let id = 'id_' + Date.parse(new Date()) / 1000;
              let data = { id: id, contents: contents, me: false, imgshow: false, avatar: '/images/robot.jpg', speech: true,  textshow: true, }
              let messages = that.data.messages
              messages.push(data)
              that.setData({
                messages: messages
              })
              that.setData({
                toView: id
              })
              // setTimeout(function(){
              //   answer = 'abc';
              //   contents = util.getContents(answer)
              //   id = 'id_' + Date.parse(new Date()) / 1000;
              //   data = { id: id, contents: contents, me: false, imgshow: true, avatar: '/images/robot.jpg', speech: true, jiaoxueimg: 'http://118.244.196.11:8008/static/images/j1.gif', textshow: false, }
              //   messages = that.data.messages
              //   messages.push(data)
              //   that.setData({
              //     messages: messages
              //   })
              //   that.setData({
              //     toView: id
              //   })
              // },2000)
              

            //} 
              //begins here
            //   else if (resData.code == 101) {
            //   var isFirst = true;
            //   wx.playBackgroundAudio({
            //     dataUrl: host + '/static/' + resData.text
            //   });
            //   wx.onBackgroundAudioPlay(function () {
            //     wx.getBackgroundAudioPlayerState({
            //       success: function (res) {
            //         if (!isFirst) {
            //           return;
            //         }
            //         isFirst = false;
            //         let duration = res.duration;
            //         wx.stopBackgroundAudio();
            //         let id = 'id_' + Date.parse(new Date()) / 1000;
            //         let data = { id: id, me: false, avatar:   '/images/robot.jpg', speech: true, seconds: duration == 0 ? 1 : duration, filePath: host + '/static/' + resData.text }
            //         let messages = that.data.messages
            //         messages.push(data)
            //         that.setData({
            //           messages: messages
            //         });
            //         that.setData({
            //           toView: id
            //         })
            //       }
            //     })
            //   });
            // }
            //end here


          },
          fail: function (err) {
            console.log(err)
          }
        })
      },
      fail: function (err) {
        console.log(err)
      }
    })
  },
  startmyrecord: function () {
    let date = new Date();
    let m = date.getMinutes();
    let s = date.getSeconds();
    let milis = date.getMilliseconds();
    console.log("start recording" + ":" + m + ":" + s + ":" + milis);
    const options = {
      //duration: 60000,//指定录音的时长，单位 ms
      sampleRate: 16000,//采样率
      numberOfChannels: 1,//录音通道数
      encodeBitRate: 96000,//编码码率
      format: 'mp3',//音频格式，有效值 aac/mp3
      frameSize: 50,//指定帧大小，单位 KB
    }
    //开始录音
    recorderManager.start(options);
    recorderManager.onStart(() => {
      console.log('recorder start')
    });
    //错误回调
    recorderManager.onError((res) => {
      console.log(res);
    })
  },
  sendmyrecord: function () {
    var that = this;
    recorderManager.stop();
    var date = new Date();
    var m = date.getMinutes();
    var s = date.getSeconds();
    var milis = date.getMilliseconds();
    console.log('停止录音' + ":" + m + ":" + s + ":" + milis)
    

    var seconds = 0;
    var interval = setInterval(function () {
      seconds++
    }, 1000);
    recorderManager.onStop((res) => {
      // success: function (res) {
        clearInterval(interval);
        var tempFilePath = res.tempFilePath
        // this.tempFilePath = res.tempFilePath;

        if (quesnum != 700 & quesnum != 701 & quesnum != 702 & quesnum != 703 & quesnum != 704 & quesnum != 705 & quesnum != 706) {
        wx.setNavigationBarTitle({
          title: '对方正在输入...',
        })
          seconds = seconds == 0 ? 1 : seconds;
          let id = 'id_' + Date.parse(new Date()) / 1000;
          let data = { id: id, me: true, avatar: wx.getStorageSync('userInfo').avatarUrl, speech: true, seconds: seconds, filePath: tempFilePath }
          let messages = that.data.messages
          messages.push(data)
          that.setData({
            messages: messages
          });
          that.setData({
            toView: id
          })
        }

        let nickName = wx.getStorageSync('userInfo').nickName;
        if (!nickName) nickName = 'null';
        wx.uploadFile({
          url: 'http://118.244.196.11:5000/',//host + '/wx/uploadSilk',
          filePath: tempFilePath,
          name: 'file',
          formData: {
            // 'userid': wx.getStorageSync('openid'),
            // 'username': wx.getStorageSync('userInfo').nickName
            'user': 'test',
            'sessionID': usersession
          },
          success: function (res) {
            console.log("upload successfully")
            var aiReply = JSON.parse(res.data)["status"];
            console.log(aiReply);
            var questnum = JSON.parse(res.data)["quesNum"];
            quesnum = JSON.parse(res.data)["quesNum"];
            var isnew = JSON.parse(res.data)["new"];

            if (questnum != 700 & questnum != 701 & questnum != 702 & questnum != 703 & questnum != 704 & questnum != 705 & questnum != 706){
              let answer = aiReply;
              let contents = util.getContents(answer)
              let id = 'id_' + Date.parse(new Date()) / 1000;
              let data = { id: id, contents: contents, me: false, imgshow: false, avatar: '/images/robot.jpg', speech: true, textshow: true, }
              let messages = that.data.messages
              messages.push(data)
              that.setData({
                messages: messages
              })
              that.setData({
                toView: id
              })
              date = new Date();
              m = date.getMinutes();
              s = date.getSeconds();
              milis = date.getMilliseconds();
              console.log('成功返回更新页面' + ":" + m + ":" + s + ":" + milis)
              wx.setNavigationBarTitle({
                title: '',
              })
            }
            if (questnum==700){
              wx.setNavigationBarTitle({
                title: '',
              })
            }
            

////////////////////////////////////////////////////////////////////////
///////////// question 1xx
            //question 101
            if (aiReply == "You have a nice name! I like your name. Nice to meet you!") {
              const innerAudioContext = wx.createInnerAudioContext();
              innerAudioContext.autoplay = false;
              innerAudioContext.src = answerfilepath2;//'http://118.244.196.11:8008/static/Q12You%20have%20a%20nice%20name.mp3'
              countmusic = 1;
              innerAudioContext.play();              
              innerAudioContext.onPlay(() => {
                date = new Date();
                m = date.getMinutes();
                s = date.getSeconds();
                milis = date.getMilliseconds();
                console.log('开始播放' + ":" + m + ":" + s + ":" + milis)
                if (innerAudioContext.src == name[115]//answerfilepath3 //'http://118.244.196.11:8008/static/Q21How%20are%20you.mp3'
                ){
                  countmusic = 2;
                }
              })
              innerAudioContext.onEnded(() => {
                if(countmusic==1){
                  console.log('结束播放')
                  innerAudioContext.src = name[115];//answerfilepath3;//'http://118.244.196.11:8008/static/Q21How%20are%20you.mp3';
                  innerAudioContext.play();                  
                }
                if(countmusic==2){
                  innerAudioContext.destroy();
                }
              })
              that.setData({
                jinduchang: 6.6,
              })
              //vq.mover(6.6);              
            }
if (aiReply == "OK, no problem.  Please tell me your name.") {
  const innerAudioContext = wx.createInnerAudioContext();
  innerAudioContext.autoplay = false
  innerAudioContext.src = name[0]//'http://118.244.196.11:8008/static/Q13OK.mp3'
  innerAudioContext.play();
  innerAudioContext.onPlay(() => {
  console.log('开始播放')
  })
  innerAudioContext.onEnded(() => {
      innerAudioContext.destroy();
  })
}
if (aiReply == "Watch your language, kido.Please tell me your english name") {
  const innerAudioContext = wx.createInnerAudioContext();
  innerAudioContext.autoplay = false
  innerAudioContext.src = name[1]//'http://118.244.196.11:8008/static/Q14Watch%20your%20language.mp3'
  innerAudioContext.play();
  innerAudioContext.onPlay(() => {
    console.log('开始播放')
  })
  innerAudioContext.onEnded(() => {
    innerAudioContext.destroy();
  })
}
if (aiReply == "sorry i didn't get you. Please tell me your english name.") {
  const innerAudioContext = wx.createInnerAudioContext();
  innerAudioContext.autoplay = false
  innerAudioContext.src = name[113]//answerfilepath;//'http://118.244.196.11:8008/static/Q15Sorry%20i%20did%20not%20get%20you.mp3'
  innerAudioContext.play();
  innerAudioContext.onPlay(() => {
    date = new Date();
    m = date.getMinutes();
    s = date.getSeconds();
    milis = date.getMilliseconds();
    console.log('开始播放' + ":" + m + ":" + s + ":" + milis)
    console.log('开始播放')
  })
  innerAudioContext.onEnded(() => {
    innerAudioContext.destroy();
  })
}
/////////////////////////////////////////////////////////////
            //question 102
            if (aiReply == " Well. That sounds great.") {
              const innerAudioContext = wx.createInnerAudioContext();
              innerAudioContext.autoplay = false;
              innerAudioContext.src = name[2]//'http://118.244.196.11:8008/static/Q22Well.mp3'
              countmusic = 1;
              innerAudioContext.play();
              innerAudioContext.onPlay(() => {
                console.log('开始播放')
                if (innerAudioContext.src == name[3]//'http://118.244.196.11:8008/static/Q41Whatistheweatherliketoday.mp3'
                ){
                  countmusic = 2;
                }
              })
              innerAudioContext.onEnded(() => {
                if (countmusic == 1) {
                  console.log('结束播放')
                  innerAudioContext.src = name[3];//'http://118.244.196.11:8008/static/Q41Whatistheweatherliketoday.mp3';
                  innerAudioContext.play();
                }
                if (countmusic == 2) {
                  innerAudioContext.destroy();
                }
              })
              that.setData({
                jinduchang: 13.3,
              })
              //vq.mover(6.6);    
            }
            if (aiReply == "Don't worry. You will be fine soon. ") {
              const innerAudioContext = wx.createInnerAudioContext();
              innerAudioContext.autoplay = false;
              innerAudioContext.src = name[4]//'http://118.244.196.11:8008/static/Q23Dont%20worry.mp3'
              countmusic = 1;
              innerAudioContext.play();
              innerAudioContext.onPlay(() => {
                console.log('开始播放')
                if (innerAudioContext.src == name[3]//'http://118.244.196.11:8008/static/Q41Whatistheweatherliketoday.mp3'
                ){
                  countmusic=2;
                }
              })
              innerAudioContext.onEnded(() => {
                if (countmusic == 1) {
                  console.log('结束播放')
                  innerAudioContext.src = name[3];//'http://118.244.196.11:8008/static/Q41Whatistheweatherliketoday.mp3';
                  innerAudioContext.play();
                }
                if (countmusic == 2) {
                  innerAudioContext.destroy();
                }
              })
              that.setData({
                jinduchang: 13.3,
              })
              //vq.mover(6.6);
            }
 if (aiReply == "OK, no problem. How are you?") {
   const innerAudioContext = wx.createInnerAudioContext();
   innerAudioContext.autoplay = false
   innerAudioContext.src = name[6];//'http://118.244.196.11:8008/static/Q24OKno%20problem.mp3'
   innerAudioContext.play();
   innerAudioContext.onPlay(() => {
     console.log('开始播放')
   })
   innerAudioContext.onEnded(() => {
     innerAudioContext.destroy();
   })
}
 if (aiReply == "Watch your language, How are you?") {
   const innerAudioContext = wx.createInnerAudioContext();
   innerAudioContext.autoplay = false
   innerAudioContext.src = name[7];//'http://118.244.196.11:8008/static/Q25Watch%20your%20language.mp3'
   innerAudioContext.play();
   innerAudioContext.onPlay(() => {
     console.log('开始播放')
   })
   innerAudioContext.onEnded(() => {
     innerAudioContext.destroy();
   })
}
  if (aiReply == "Sorry i didn't get you.How are you?") {
    const innerAudioContext = wx.createInnerAudioContext();
    innerAudioContext.autoplay = false
    innerAudioContext.src = name[8];//'http://118.244.196.11:8008/static/Q26Sorry%20i%20didnt%20get%20you.mp3'
    innerAudioContext.play();
    innerAudioContext.onPlay(() => {
      console.log('开始播放')
    })
    innerAudioContext.onEnded(() => {
      innerAudioContext.destroy();
    })
}
////////////////////////////////////////////////////////////////////////////
            //question 103
            if (aiReply == "Well, in my place, the weather is a bit unusual these days.I hope it becomes warm soon.") {
              const innerAudioContext = wx.createInnerAudioContext();
              innerAudioContext.autoplay = false;
              innerAudioContext.src = name[9]//'http://118.244.196.11:8008/static/Q42well.mp3'
              countmusic = 1;
              innerAudioContext.play();
              innerAudioContext.onPlay(() => {
                console.log('开始播放')
                if (innerAudioContext.src == name[10]//'http://118.244.196.11:8008/static/Q31Are%20you%20ready%20for%20English%20class.mp3'
                ){
                  countmusic = 2;
                }
              })
              innerAudioContext.onEnded(() => {
                if (countmusic == 1) {
                  console.log('结束播放')
                  innerAudioContext.src = name[10];//'http://118.244.196.11:8008/static/Q31Are%20you%20ready%20for%20English%20class.mp3';
                  innerAudioContext.play();
                }
                if (countmusic == 2) {
                  innerAudioContext.destroy();
                }
              })
              that.setData({
                jinduchang: 20.1,
              })
              //vq.mover(6.6);
            }
  if (aiReply == "OK, no problem.  What is the weather like today?") {
    const innerAudioContext = wx.createInnerAudioContext();
    innerAudioContext.autoplay = false
    innerAudioContext.src = name[11];//'http://118.244.196.11:8008/static/Q43OK.mp3'
    innerAudioContext.play();
    innerAudioContext.onPlay(() => {
      console.log('开始播放')
    })
    innerAudioContext.onEnded(() => {
      innerAudioContext.destroy();
    })
  }
  if (aiReply == "Watch your language, How are you?") {
    const innerAudioContext = wx.createInnerAudioContext();
    innerAudioContext.autoplay = false
    innerAudioContext.src = name[12];//'http://118.244.196.11:8008/static/Q44watch.mp3'
    innerAudioContext.play();
    innerAudioContext.onPlay(() => {
      console.log('开始播放')
    })
    innerAudioContext.onEnded(() => {
      innerAudioContext.destroy();
    })
  }
  if (aiReply == "Sorry i didn't get you. What is the weather like today?") {
    const innerAudioContext = wx.createInnerAudioContext();
    innerAudioContext.autoplay = false
    innerAudioContext.src = name[13];//'http://118.244.196.11:8008/static/Q45sorry.mp3'
    innerAudioContext.play();
    innerAudioContext.onPlay(() => {
      console.log('开始播放')
    })
    innerAudioContext.onEnded(() => {
      innerAudioContext.destroy();
    })
  }
////////////////////////////////////////////////////////////////////////////
            //question 104
            if (aiReply == " All right. Let's begin our class.") {
              const innerAudioContext = wx.createInnerAudioContext();
              innerAudioContext.autoplay = false;
              innerAudioContext.src = name[14]//'http://118.244.196.11:8008/static/Q32All%20right.mp3'
              countmusic = 1;
              innerAudioContext.play();
              innerAudioContext.onPlay(() => {
                console.log('开始播放')
                if (innerAudioContext.src == name[15]//'http://118.244.196.11:8008/static/So%20today.mp3'
                ){
                  countmusic = 2;
                }
                if (innerAudioContext.src == name[16]//'http://118.244.196.11:8008/static/We%20use%20in.mp3'
                ) {
                  countmusic = 3;
                }
                if (innerAudioContext.src == name[17]//'http://118.244.196.11:8008/static/Television.mp3'
                ) {
                  countmusic = 4;
                }
                if (innerAudioContext.src == name[18]//'http://118.244.196.11:8008/static/We%20use%20on.mp3'
                ) {
                  countmusic = 5;
                }
                if (innerAudioContext.src == name[19]//'http://118.244.196.11:8008/static/On%20July%2020th%201969.mp3'
                ) {
                  countmusic = 6;
                }
                if (innerAudioContext.src == name[20]//'http://118.244.196.11:8008/static/We%20use%20at.mp3'
                ) {
                  countmusic = 7;
                }
                if (innerAudioContext.src == name[21]//'http://118.244.196.11:8008/static/Three%20monkeys.mp3'
                ) {
                  countmusic = 8;
                }
                if (innerAudioContext.src == name[22]//'http://118.244.196.11:8008/static/i%20am%20going.mp3'
                ) {
                  countmusic = 9;
                }
                if (innerAudioContext.src == name[23]//'http://118.244.196.11:8008/static/Q51What%20time%20do%20you%20get%20up.mp3'
                ) {
                  countmusic = 10;
                }
              })
              innerAudioContext.onEnded(() => {
                if (countmusic == 1) {
                  console.log('结束播放')
                  innerAudioContext.src = name[15];//'http://118.244.196.11:8008/static/So%20today.mp3';        
                  setTimeout(function () {
                    innerAudioContext.play();
                  }, 1000);       
                }
                if (countmusic == 2) {
                  console.log('结束播放')
                  innerAudioContext.src = name[16];//'http://118.244.196.11:8008/static/We%20use%20in.mp3';
                  setTimeout(function () {
                    innerAudioContext.play();
                  }, 1000);
                }
                if (countmusic == 3) {
                  console.log('结束播放')
                  innerAudioContext.src = name[17];//'http://118.244.196.11:8008/static/Television.mp3';
                  setTimeout(function () {
                    innerAudioContext.play();
                  }, 1000);
                }
                if (countmusic == 4) {
                  console.log('结束播放')
                  innerAudioContext.src = name[18];//'http://118.244.196.11:8008/static/We%20use%20on.mp3';
                  setTimeout(function () {
                    innerAudioContext.play();
                  }, 1000);
                }
                if (countmusic == 5) {
                  console.log('结束播放')
                  innerAudioContext.src = name[19];//'http://118.244.196.11:8008/static/On%20July%2020th%201969.mp3';
                  setTimeout(function () {
                    innerAudioContext.play();
                  }, 1000);
                }
                if (countmusic == 6) {
                  console.log('结束播放')
                  innerAudioContext.src = name[20];//'http://118.244.196.11:8008/static/We%20use%20at.mp3';
                  setTimeout(function () {
                    innerAudioContext.play();
                  }, 1000);
                }
                if (countmusic == 7) {
                  console.log('结束播放')
                  innerAudioContext.src = name[21];//'http://118.244.196.11:8008/static/Three%20monkeys.mp3';
                  setTimeout(function () {
                    innerAudioContext.play();
                  }, 1000);
                }
                if (countmusic == 8) {
                  console.log('结束播放')
                  innerAudioContext.src = name[22];//'http://118.244.196.11:8008/static/i%20am%20going.mp3';
                  setTimeout(function () {
                    innerAudioContext.play();
                  }, 1000);
                }
                if (countmusic == 9) {
                  console.log('结束播放')
                  innerAudioContext.src = name[23];//'http://118.244.196.11:8008/static/Q51What%20time%20do%20you%20get%20up.mp3';
                  setTimeout(function () {
                    innerAudioContext.play();
                  }, 1000);
                }
                if(countmusic==10){
                    innerAudioContext.destroy();       
                }

              })
              that.setData({
                jinduchang: 26.6,
              })
              //vq.mover(6.6);
            }
            if (aiReply == "We should cherish time.Let's begin our class.") {
              const innerAudioContext = wx.createInnerAudioContext();
              innerAudioContext.autoplay = false;
              innerAudioContext.src = name[24];//'http://118.244.196.11:8008/static/Q33We%20should%20cherish%20time.mp3'
              countmusic = 1;
              innerAudioContext.play();
              innerAudioContext.onPlay(() => {
                console.log('开始播放')
                if (innerAudioContext.src == name[15]//'http://118.244.196.11:8008/static/So%20today.mp3'
                ) {
                  countmusic = 2;
                }
                if (innerAudioContext.src == name[16]//'http://118.244.196.11:8008/static/We%20use%20in.mp3'
                ) {
                  countmusic = 3;
                }
                if (innerAudioContext.src == name[17]//'http://118.244.196.11:8008/static/Television.mp3'
                ) {
                  countmusic = 4;
                }
                if (innerAudioContext.src == name[18]//'http://118.244.196.11:8008/static/We%20use%20on.mp3'
                ) {
                  countmusic = 5;
                }
                if (innerAudioContext.src == name[19]//'http://118.244.196.11:8008/static/On%20July%2020th%201969.mp3'
                ) {
                  countmusic = 6;
                }
                if (innerAudioContext.src == name[20]//'http://118.244.196.11:8008/static/We%20use%20at.mp3'
                ) {
                  countmusic = 7;
                }
                if (innerAudioContext.src == name[21]//'http://118.244.196.11:8008/static/Three%20monkeys.mp3'
                ) {
                  countmusic = 8;
                }
                if (innerAudioContext.src == name[22]//'http://118.244.196.11:8008/static/i%20am%20going.mp3'
                ) {
                  countmusic = 9;
                }
                if (innerAudioContext.src == name[23]//'http://118.244.196.11:8008/static/Q51What%20time%20do%20you%20get%20up.mp3'
                ) {
                  countmusic = 10;
                }
              })
              innerAudioContext.onEnded(() => {
                if (countmusic == 1) {
                  console.log('结束播放')
                  innerAudioContext.src = name[15];//'http://118.244.196.11:8008/static/So%20today.mp3';
                  setTimeout(function () {
                    innerAudioContext.play();
                  }, 1000);
                }
                if (countmusic == 2) {
                  console.log('结束播放')
                  innerAudioContext.src = name[16];//'http://118.244.196.11:8008/static/We%20use%20in.mp3';
                  setTimeout(function () {
                    innerAudioContext.play();
                  }, 1000);
                }
                if (countmusic == 3) {
                  console.log('结束播放')
                  innerAudioContext.src = name[17];//'http://118.244.196.11:8008/static/Television.mp3';
                  setTimeout(function () {
                    innerAudioContext.play();
                  }, 1000);
                }
                if (countmusic == 4) {
                  console.log('结束播放')
                  innerAudioContext.src = name[18];//'http://118.244.196.11:8008/static/We%20use%20on.mp3';
                  setTimeout(function () {
                    innerAudioContext.play();
                  }, 1000);
                }
                if (countmusic == 5) {
                  console.log('结束播放')
                  innerAudioContext.src = name[19];//'http://118.244.196.11:8008/static/On%20July%2020th%201969.mp3';
                  setTimeout(function () {
                    innerAudioContext.play();
                  }, 1000);
                }
                if (countmusic == 6) {
                  console.log('结束播放')
                  innerAudioContext.src = name[20];//'http://118.244.196.11:8008/static/We%20use%20at.mp3';
                  setTimeout(function () {
                    innerAudioContext.play();
                  }, 1000);
                }
                if (countmusic == 7) {
                  console.log('结束播放')
                  innerAudioContext.src = name[21];//'http://118.244.196.11:8008/static/Three%20monkeys.mp3';
                  setTimeout(function () {
                    innerAudioContext.play();
                  }, 1000);
                }
                if (countmusic == 8) {
                  console.log('结束播放')
                  innerAudioContext.src = name[22];//'http://118.244.196.11:8008/static/i%20am%20going.mp3';
                  setTimeout(function () {
                    innerAudioContext.play();
                  }, 1000);
                }
                if (countmusic == 9) {
                  console.log('结束播放')
                  innerAudioContext.src = name[23];//'http://118.244.196.11:8008/static/Q51What%20time%20do%20you%20get%20up.mp3';
                  setTimeout(function () {
                    innerAudioContext.play();
                  }, 1000);
                }
                if (countmusic == 10) {
                  innerAudioContext.destroy();
                }

              })
              that.setData({
                jinduchang: 26.6,
              })
              //vq.mover(6.6);
            }
  if (aiReply == "OK, no problem. Are you ready for English class?") {
    const innerAudioContext = wx.createInnerAudioContext();
    innerAudioContext.autoplay = false
    innerAudioContext.src = name[34];//'http://118.244.196.11:8008/static/Q34OK%20no%20problem.mp3'
    innerAudioContext.play();
    innerAudioContext.onPlay(() => {
      console.log('开始播放')
    })
    innerAudioContext.onEnded(() => {
      innerAudioContext.destroy();
    })
  }
  if (aiReply == "Watch your language, kido.Are you ready for English class?") {
    const innerAudioContext = wx.createInnerAudioContext();
    innerAudioContext.autoplay = false
    innerAudioContext.src = name[35];//'http://118.244.196.11:8008/static/Q35Watch%20your%20language.mp3'
    innerAudioContext.play();
    innerAudioContext.onPlay(() => {
      console.log('开始播放')
    })
    innerAudioContext.onEnded(() => {
      innerAudioContext.destroy();
    })
  }
  if (aiReply == "Sorry i didn't get you. Are you ready for English class?") {
    const innerAudioContext = wx.createInnerAudioContext();
    innerAudioContext.autoplay = false
    innerAudioContext.src = name[36];//'http://118.244.196.11:8008/static/Q36Sorry%20i%20didnt%20get%20you.mp3'
    innerAudioContext.play();
    innerAudioContext.onPlay(() => {
      console.log('开始播放')
    })
    innerAudioContext.onEnded(() => {
      innerAudioContext.destroy();
    })
  }
  ////////////////////////////////////////////////////////////////////////////
            //question 105
            if (aiReply == "Oh. I'm not used to getting up early") {
              const innerAudioContext = wx.createInnerAudioContext();
              innerAudioContext.autoplay = false;
              innerAudioContext.src = name[37];//'http://118.244.196.11:8008/static/Q52Oh.mp3'
              countmusic = 1;
              innerAudioContext.play();
              innerAudioContext.onPlay(() => {
                console.log('开始播放')
                if (innerAudioContext.src == name[38]//'http://118.244.196.11:8008/static/Q61WHAT.mp3'
                ) {
                  countmusic = 2;
                }
              })
              innerAudioContext.onEnded(() => {
                if (countmusic == 1) {
                  console.log('结束播放')
                  innerAudioContext.src = name[38];//'http://118.244.196.11:8008/static/Q61WHAT.mp3';
                  innerAudioContext.play();
                }
                if (countmusic == 2) {
                  innerAudioContext.destroy();
                }
              })
              that.setData({
                jinduchang: 33.3,
              })
              //vq.mover(6.6);
            }
            if (aiReply == "All right.  Let me correct a little mistake. You should say i get up 'at' seven a.m. not 'on'") {
              const innerAudioContext = wx.createInnerAudioContext();
              innerAudioContext.autoplay = false;
              innerAudioContext.src = name[39];//'http://118.244.196.11:8008/static/Q53All%20right.mp3'
              countmusic = 1;
              innerAudioContext.play();
              innerAudioContext.onPlay(() => {
                console.log('开始播放')
                if (innerAudioContext.src == name[38]//'http://118.244.196.11:8008/static/Q61WHAT.mp3'
                ) {
                  countmusic = 2;
                }
              })
              innerAudioContext.onEnded(() => {
                if (countmusic == 1) {
                  console.log('结束播放')
                  innerAudioContext.src = name[38];//'http://118.244.196.11:8008/static/Q61WHAT.mp3';
                  innerAudioContext.play();
                }
                if (countmusic == 2) {
                  innerAudioContext.destroy();
                }
              })
              that.setData({
                jinduchang: 33.3,
              })
              //vq.mover(6.6);
            }

  if (aiReply == "OK, no problem.  What time do you get up?") {
    const innerAudioContext = wx.createInnerAudioContext();
    innerAudioContext.autoplay = false
    innerAudioContext.src = name[41];//'http://118.244.196.11:8008/static/Q54OK.mp3'
    innerAudioContext.play();
    innerAudioContext.onPlay(() => {
      console.log('开始播放')
    })
    innerAudioContext.onEnded(() => {
      innerAudioContext.destroy();
    })
  }
  if (aiReply == "Watch your language, kido.What time do you get up?") {
    const innerAudioContext = wx.createInnerAudioContext();
    innerAudioContext.autoplay = false
    innerAudioContext.src = name[42];//'http://118.244.196.11:8008/static/Q55Watch%20your%20language.mp3'
    innerAudioContext.play();
    innerAudioContext.onPlay(() => {
      console.log('开始播放')
    })
    innerAudioContext.onEnded(() => {
      innerAudioContext.destroy();
    })
  }
  if (aiReply == "Sorry i didn't get you. What time do you get up?") {
    const innerAudioContext = wx.createInnerAudioContext();
    innerAudioContext.autoplay = false
    innerAudioContext.src = name[43];//'http://118.244.196.11:8008/static/Q56sorry.mp3'
    innerAudioContext.play();
    innerAudioContext.onPlay(() => {
      console.log('开始播放')
    })
    innerAudioContext.onEnded(() => {
      innerAudioContext.destroy();
    })
  }
  ////////////////////////////////////////////////////////////////////////////
            //question 106
            if (aiReply == "All right.") {
              const innerAudioContext = wx.createInnerAudioContext();
              innerAudioContext.autoplay = false;
              innerAudioContext.src = name[44];//'http://118.244.196.11:8008/static/Q62ALL.mp3'
              countmusic = 1;
              innerAudioContext.play();
              innerAudioContext.onPlay(() => {
                console.log('开始播放')
                if (innerAudioContext.src == name[45]//'http://118.244.196.11:8008/static/Q71How%20about%20your%20lunch.mp3'
                ) {
                  countmusic = 2;
                }
              })
              innerAudioContext.onEnded(() => {
                if (countmusic == 1) {
                  console.log('结束播放')
                  innerAudioContext.src = name[45];//'http://118.244.196.11:8008/static/Q71How%20about%20your%20lunch.mp3';
                  innerAudioContext.play();
                }
                if (countmusic == 2) {
                  innerAudioContext.destroy();
                }
              })
              that.setData({
                jinduchang: 40,
              })
              //vq.mover(6.6);
            }
            if (aiReply == "All right.Let me correct a little mistake.You can say i have breakfast 'at' eight a.m. not 'on' eight am") {
              const innerAudioContext = wx.createInnerAudioContext();
              innerAudioContext.autoplay = false;
              innerAudioContext.src = name[46];//'http://118.244.196.11:8008/static/Q63All%20right.mp3'
              countmusic = 1;
              innerAudioContext.play();
              innerAudioContext.onPlay(() => {
                console.log('开始播放')
                if (innerAudioContext.src == name[45]//'http://118.244.196.11:8008/static/Q71How%20about%20your%20lunch.mp3'
                ) {
                  countmusic = 2;
                }
              })
              innerAudioContext.onEnded(() => {
                if (countmusic == 1) {
                  console.log('结束播放')
                  innerAudioContext.src = name[45];//'http://118.244.196.11:8008/static/Q71How%20about%20your%20lunch.mp3';
                  innerAudioContext.play();
                }
                if (countmusic == 2) {
                  innerAudioContext.destroy();
                }
              })
              that.setData({
                jinduchang: 40,
              })
              //vq.mover(6.6);
            }
            if (aiReply == "OK.I see.") {
              const innerAudioContext = wx.createInnerAudioContext();
              innerAudioContext.autoplay = false;
              innerAudioContext.src = name[48];//'http://118.244.196.11:8008/static/Q65ok.mp3'
              countmusic = 1;
              innerAudioContext.play();
              innerAudioContext.onPlay(() => {
                console.log('开始播放')
                if (innerAudioContext.src == name[45]//'http://118.244.196.11:8008/static/Q71How%20about%20your%20lunch.mp3'
                ) {
                  countmusic = 2;
                }
              })
              innerAudioContext.onEnded(() => {
                if (countmusic == 1) {
                  console.log('结束播放')
                  innerAudioContext.src = name[45];//'http://118.244.196.11:8008/static/Q71How%20about%20your%20lunch.mp3';
                  innerAudioContext.play();
                }
                if (countmusic == 2) {
                  innerAudioContext.destroy();
                }
              })
              that.setData({
                jinduchang: 40,
              })
              //vq.mover(6.6);
            }

  if (aiReply == "OK, no problem.What time do you have your breakfast?") {
    const innerAudioContext = wx.createInnerAudioContext();
    innerAudioContext.autoplay = false
    innerAudioContext.src = name[50];//'http://118.244.196.11:8008/static/Q66OK.mp3'
    innerAudioContext.play();
    innerAudioContext.onPlay(() => {
      console.log('开始播放')
    })
    innerAudioContext.onEnded(() => {
      innerAudioContext.destroy();
    })
  }
  if (aiReply == "Watch your language, kido.What time do you have your breakfast?") {
    const innerAudioContext = wx.createInnerAudioContext();
    innerAudioContext.autoplay = false
    innerAudioContext.src = name[51];//'http://118.244.196.11:8008/static/Q67Watch%20your%20language.mp3'
    innerAudioContext.play();
    innerAudioContext.onPlay(() => {
      console.log('开始播放')
    })
    innerAudioContext.onEnded(() => {
      innerAudioContext.destroy();
    })
  }
  if (aiReply == "Sorry i didn't get you. What time do you have your breakfast?") {
    const innerAudioContext = wx.createInnerAudioContext();
    innerAudioContext.autoplay = false
    innerAudioContext.src = name[52];//'http://118.244.196.11:8008/static/Q68sorry.mp3'
    innerAudioContext.play();
    innerAudioContext.onPlay(() => {
      console.log('开始播放')
    })
    innerAudioContext.onEnded(() => {
      innerAudioContext.destroy();
    })
  }
  if (aiReply == "We are not talking about the 'place' or 'people'.We are talking about the 'time'.What time do you have your breakfast?") {
    const innerAudioContext = wx.createInnerAudioContext();
    innerAudioContext.autoplay = false
    innerAudioContext.src = name[53];//'http://118.244.196.11:8008/static/Q64We%20are.mp3'
    innerAudioContext.play();
    innerAudioContext.onPlay(() => {
      console.log('开始播放')
    })
    innerAudioContext.onEnded(() => {
      innerAudioContext.destroy();
    })
  }
  ////////////////////////////////////////////////////////////////////////////
            //question 107
            if (aiReply == "All right. Excellent.") {
              const innerAudioContext = wx.createInnerAudioContext();
              innerAudioContext.autoplay = false;
              innerAudioContext.src = name[54];//'http://118.244.196.11:8008/static/Q72all.mp3'
              countmusic = 1;
              innerAudioContext.play();
              innerAudioContext.onPlay(() => {
                console.log('开始播放')
                if (innerAudioContext.src == name[55]//'http://118.244.196.11:8008/static/Q111On%20which%20days.mp3'
                ) {
                  countmusic = 2;
                }
              })
              innerAudioContext.onEnded(() => {
                if (countmusic == 1) {
                  console.log('结束播放')
                  innerAudioContext.src = name[55];//'http://118.244.196.11:8008/static/Q111On%20which%20days.mp3';
                  innerAudioContext.play();
                }
                if (countmusic == 2) {
                  innerAudioContext.destroy();
                }
              })
              that.setData({
                jinduchang: 46.6,
              })
              //vq.mover(6.6);
            }
            if (aiReply == "All right.Let me correct a little mistake.You can say i have lunch 'at' twelve p.m.") {
              const innerAudioContext = wx.createInnerAudioContext();
              innerAudioContext.autoplay = false;
              innerAudioContext.src = name[56];//'http://118.244.196.11:8008/static/Q73allright.mp3'
              countmusic = 1;
              innerAudioContext.play();
              innerAudioContext.onPlay(() => {
                console.log('开始播放')
                if (innerAudioContext.src == name[55]//'http://118.244.196.11:8008/static/Q111On%20which%20days.mp3'
                ) {
                  countmusic = 2;
                }
              })
              innerAudioContext.onEnded(() => {
                if (countmusic == 1) {
                  console.log('结束播放')
                  innerAudioContext.src = name[55];//'http://118.244.196.11:8008/static/Q111On%20which%20days.mp3';
                  innerAudioContext.play();
                }
                if (countmusic == 2) {
                  innerAudioContext.destroy();
                }
              })
              that.setData({
                jinduchang: 46.6,
              })
              //vq.mover(6.6);
            }
            if (aiReply == "Remember.The noon is twelve 'p.m.' You can say i have lunch at twelve p.m.") {
              const innerAudioContext = wx.createInnerAudioContext();
              innerAudioContext.autoplay = false;
              innerAudioContext.src = name[58];//'http://118.244.196.11:8008/static/Q74Remember.mp3'
              countmusic = 1;
              innerAudioContext.play();
              innerAudioContext.onPlay(() => {
                console.log('开始播放')
                if (innerAudioContext.src == name[55]//'http://118.244.196.11:8008/static/Q111On%20which%20days.mp3'
                ) {
                  countmusic = 2;
                }
              })
              innerAudioContext.onEnded(() => {
                if (countmusic == 1) {
                  console.log('结束播放')
                  innerAudioContext.src = name[55];//'http://118.244.196.11:8008/static/Q111On%20which%20days.mp3';
                  innerAudioContext.play();
                }
                if (countmusic == 2) {
                  innerAudioContext.destroy();
                }
              })
              that.setData({
                jinduchang: 46.6,
              })
              //vq.mover(6.6);
            }

  if (aiReply == "OK, no problem.  What time do you have your lunch?") {
    const innerAudioContext = wx.createInnerAudioContext();
    innerAudioContext.autoplay = false
    innerAudioContext.src = name[60];//'http://118.244.196.11:8008/static/Q76OK.mp3'
    innerAudioContext.play();
    innerAudioContext.onPlay(() => {
      console.log('开始播放')
    })
    innerAudioContext.onEnded(() => {
      innerAudioContext.destroy();
    })
  }
  if (aiReply == "Watch your language, kido.What time do you have your lunch?") {
    const innerAudioContext = wx.createInnerAudioContext();
    innerAudioContext.autoplay = false
    innerAudioContext.src = name[61];//'http://118.244.196.11:8008/static/Q77Watch.mp3'
    innerAudioContext.play();
    innerAudioContext.onPlay(() => {
      console.log('开始播放')
    })
    innerAudioContext.onEnded(() => {
      innerAudioContext.destroy();
    })
  }
  if (aiReply == "Sorry i didn't get you. What time do you have your lunch?") {
    const innerAudioContext = wx.createInnerAudioContext();
    innerAudioContext.autoplay = false
    innerAudioContext.src = name[62];//'http://118.244.196.11:8008/static/Q78sorry.mp3'
    innerAudioContext.play();
    innerAudioContext.onPlay(() => {
      console.log('开始播放')
    })
    innerAudioContext.onEnded(() => {
      innerAudioContext.destroy();
    })
  }
  if (aiReply == "We are not talking about the 'place' or 'people'.We are talking about the 'time'.What time do you have your lunch?") {
    const innerAudioContext = wx.createInnerAudioContext();
    innerAudioContext.autoplay = false
    innerAudioContext.src = name[63];//'http://118.244.196.11:8008/static/Q75We.mp3'
    innerAudioContext.play();
    innerAudioContext.onPlay(() => {
      console.log('开始播放')
    })
    innerAudioContext.onEnded(() => {
      innerAudioContext.destroy();
    })
  }
  ////////////////////////////////////////////////////////////////////////////
            //question 111
            if (aiReply == "Awesome. Nice.") {
              const innerAudioContext = wx.createInnerAudioContext();
              innerAudioContext.autoplay = false;
              innerAudioContext.src = name[64];//'http://118.244.196.11:8008/static/Q112That%E2%80%99s%20Awesome.mp3'
              countmusic = 1;
              innerAudioContext.play();
              innerAudioContext.onPlay(() => {
                console.log('开始播放')
                if (innerAudioContext.src == name[65]//'http://118.244.196.11:8008/static/Greatnextsection.mp3'
                ) {
                  countmusic = 2;
                }
                if (innerAudioContext.src == name[66]//'http://118.244.196.11:8008/static/long%20long%20ago.mp3'
                ) {
                  countmusic = 3;
                }
                if (innerAudioContext.src == name[67]//'http://118.244.196.11:8008/static/nowi.mp3'
                ) {
                  countmusic = 4;
                }
                if (innerAudioContext.src == name[68]//'http://118.244.196.11:8008/static/Did%20you%20go%20anywhere%20this%20Christmas.mp3'
                ) {
                  countmusic = 5;
                }
              })
              innerAudioContext.onEnded(() => {
                if (countmusic == 1) {
                  console.log('结束播放')
                  innerAudioContext.src = name[65];//'http://118.244.196.11:8008/static/Greatnextsection.mp3';
                  setTimeout(function () {
                    innerAudioContext.play();
                  }, 1000);
                }
                if (countmusic == 2) {
                  console.log('结束播放')
                  innerAudioContext.src = name[66];//'http://118.244.196.11:8008/static/long%20long%20ago.mp3';
                  setTimeout(function () {
                    innerAudioContext.play();
                  }, 1000);
                }
                if (countmusic == 3) {
                  console.log('结束播放')
                  innerAudioContext.src = name[67];//'http://118.244.196.11:8008/static/nowi.mp3';
                  setTimeout(function () {
                    innerAudioContext.play();
                  }, 1000);
                }
                if (countmusic == 4) {
                  console.log('结束播放')
                  innerAudioContext.src = name[68];//'http://118.244.196.11:8008/static/Did%20you%20go%20anywhere%20this%20Christmas.mp3';
                  setTimeout(function () {
                    innerAudioContext.play();
                  }, 1000);
                }
                if (countmusic == 5) {
                  innerAudioContext.destroy();
                }

              })
              that.setData({
                jinduchang: 53.3,
              })
              //vq.mover(6.6);
            }


  if (aiReply == "OK, no problem.  What day is your school holiday, during a week?") {
    const innerAudioContext = wx.createInnerAudioContext();
    innerAudioContext.autoplay = false
    innerAudioContext.src = name[69];//'http://118.244.196.11:8008/static/Q113OK.mp3'
    innerAudioContext.play();
    innerAudioContext.onPlay(() => {
      console.log('开始播放')
    })
    innerAudioContext.onEnded(() => {
      innerAudioContext.destroy();
    })
  }
  if (aiReply == "watch your language, kido.What day is your school holiday, during a week?") {
    const innerAudioContext = wx.createInnerAudioContext();
    innerAudioContext.autoplay = false
    innerAudioContext.src = name[70];//'http://118.244.196.11:8008/static/Q114Watch%20your%20language.mp3'
    innerAudioContext.play();
    innerAudioContext.onPlay(() => {
      console.log('开始播放')
    })
    innerAudioContext.onEnded(() => {
      innerAudioContext.destroy();
    })
  }
  if (aiReply == "sorry i didn't get you.On which days you do not need to go to school") {
    const innerAudioContext = wx.createInnerAudioContext();
    innerAudioContext.autoplay = false
    innerAudioContext.src = name[71];//'http://118.244.196.11:8008/static/Q116sorry.mp3'
    innerAudioContext.play();
    innerAudioContext.onPlay(() => {
      console.log('开始播放')
    })
    innerAudioContext.onEnded(() => {
      innerAudioContext.destroy();
    })
  }
   ////////////////////////////////////////////////////////////////////////////
  //question 1
  if (aiReply == "that sounds cool") {
    const innerAudioContext = wx.createInnerAudioContext();
    innerAudioContext.autoplay = false;
    innerAudioContext.src = name[72]//'http://118.244.196.11:8008/static/that%20sounds%20cool.MP3'
    countmusic = 1;
    innerAudioContext.play();
    innerAudioContext.onPlay(() => {
      console.log('开始播放')
      if (innerAudioContext.src == name[73]//'http://118.244.196.11:8008/static/Is%20this%20your%20fist%20time%20to%20go%20there%20.mp3'
      ) {
        countmusic = 2;
      }
    })
    innerAudioContext.onEnded(() => {
      if (countmusic == 1) {
        console.log('结束播放')
        innerAudioContext.src = name[73];//'http://118.244.196.11:8008/static/Is%20this%20your%20fist%20time%20to%20go%20there%20.mp3';
        innerAudioContext.play();
      }
      if (countmusic == 2) {
        innerAudioContext.destroy();
      }
    })
    that.setData({
      jinduchang: 60,
    })
    //vq.mover(6.6);
  }
  if (aiReply == "I see. So you didn't go anywhere") {
    const innerAudioContext = wx.createInnerAudioContext();
    innerAudioContext.autoplay = false;
    innerAudioContext.src = name[74]//'http://118.244.196.11:8008/static/I%20see.%20So%20you%20didnt%20go%20anywhere.MP3'
    countmusic = 1;
    innerAudioContext.play();
    innerAudioContext.onPlay(() => {
      console.log('开始播放')
      if (innerAudioContext.src == name[75]//'http://118.244.196.11:8008/static/So%20did%20you%20finish%20your%20homework%20this%20holiday.mp3'
      ) {
        countmusic = 2;
      }
    })
    innerAudioContext.onEnded(() => {
      if (countmusic == 1) {
        console.log('结束播放')
        innerAudioContext.src = name[75];//'http://118.244.196.11:8008/static/So%20did%20you%20finish%20your%20homework%20this%20holiday.mp3';
        innerAudioContext.play();
      }
      if (countmusic == 2) {
        innerAudioContext.destroy();
      }
    })
    that.setData({
      jinduchang: 60,
    })
    //vq.mover(6.6);
  }
  if (aiReply == "OK, no problem.  Did you go anywhere this chirstmas?") {
    const innerAudioContext = wx.createInnerAudioContext();
    innerAudioContext.autoplay = false
    innerAudioContext.src = name[76]//'http://118.244.196.11:8008/static/OnpDid%20you%20go%20anywhere%20this%20chirstmas.mp3'
    innerAudioContext.play();
    innerAudioContext.onPlay(() => {
      console.log('开始播放')
    })
    innerAudioContext.onEnded(() => {
      innerAudioContext.destroy();
    })
  }
  if (aiReply == "watch your language, kido.") {
    const innerAudioContext = wx.createInnerAudioContext();
    innerAudioContext.autoplay = false
    innerAudioContext.src = name[77]
    //'http://118.244.196.11:8008/static/watch.mp3'
    innerAudioContext.play();
    innerAudioContext.onPlay(() => {
      console.log('开始播放')
    })
    innerAudioContext.onEnded(() => {
      innerAudioContext.destroy();
    })
  }
  if (aiReply == "sorry i didn't get you. Did you or didn't you go anywhere this chirstmas?") {
    const innerAudioContext = wx.createInnerAudioContext();
    innerAudioContext.autoplay = false
    innerAudioContext.src = name[78]
    'http://118.244.196.11:8008/static/sorry%20i%20didnt%20get%20you.mp3'
    innerAudioContext.play();
    innerAudioContext.onPlay(() => {
      console.log('开始播放')
    })
    innerAudioContext.onEnded(() => {
      innerAudioContext.destroy();
    })
  }
  ////////////////////////////////////////////////////////////////////////////
  //question 2
  if (aiReply == "I see.  so it was your first time") {
    const innerAudioContext = wx.createInnerAudioContext();
    innerAudioContext.autoplay = false;
    innerAudioContext.src = name[79]//'http://118.244.196.11:8008/static/I%20see%20so%20it%20was%20your%20first%20time.mp3'
    countmusic = 1;
    innerAudioContext.play();
    innerAudioContext.onPlay(() => {
      console.log('开始播放')
      if (innerAudioContext.src == name[80]//'http://118.244.196.11:8008/static/Did%20you%20see%20any%20interesting%20people%20there.mp3'
      ) {
        countmusic = 2;
      }
    })
    innerAudioContext.onEnded(() => {
      if (countmusic == 1) {
        console.log('结束播放')
        innerAudioContext.src = name[80];//'http://118.244.196.11:8008/static/Did%20you%20see%20any%20interesting%20people%20there.mp3';
        innerAudioContext.play();
      }
      if (countmusic == 2) {
        innerAudioContext.destroy();
      }
    })
    that.setData({
      jinduchang: 66.6,
    })
    //vq.mover(6.6);
  }
  if (aiReply == "well, it is worth going there agian if it is fun") {
    const innerAudioContext = wx.createInnerAudioContext();
    innerAudioContext.autoplay = false;
    innerAudioContext.src = name[81]
    //'http://118.244.196.11:8008/static/well,%20it%20is%20worth%20going%20there%20again%20if%20it%20is%20fun.mp3'
    countmusic = 1;
    innerAudioContext.play();
    innerAudioContext.onPlay(() => {
      console.log('开始播放')
      if (innerAudioContext.src == name[80]//'http://118.244.196.11:8008/static/Did%20you%20see%20any%20interesting%20people%20there.mp3'
      ) {
        countmusic = 2;
      }
    })
    innerAudioContext.onEnded(() => {
      if (countmusic == 1) {
        console.log('结束播放')
        innerAudioContext.src = name[80];//'http://118.244.196.11:8008/static/Did%20you%20see%20any%20interesting%20people%20there.mp3';
        innerAudioContext.play();
      }
      if (countmusic == 2) {
        innerAudioContext.destroy();
      }
    })
    that.setData({
      jinduchang: 66.6,
    })
    //vq.mover(6.6);
  }
  if (aiReply == "OK, no problem.  Is this your fist time to go there?") {
    const innerAudioContext = wx.createInnerAudioContext();
    innerAudioContext.autoplay = false
    innerAudioContext.src = name[82]//'http://118.244.196.11:8008/static/Onp%20Is%20this%20your%20fist%20time%20to%20go%20there.mp3'
    innerAudioContext.play();
    innerAudioContext.onPlay(() => {
      console.log('开始播放')
    })
    innerAudioContext.onEnded(() => {
      innerAudioContext.destroy();
    })
  }
  if (aiReply == "watch your language, kido.  Is it or isn't it your fist time to go there?") {
    const innerAudioContext = wx.createInnerAudioContext();
    innerAudioContext.autoplay = false
    innerAudioContext.src = name[83]//'http://118.244.196.11:8008/static/watch%20your%20language%20kido%20Is%20it%20or%20isnt%20it%20your%20first%20time%20to%20go%20there.mp3'
    innerAudioContext.play();
    innerAudioContext.onPlay(() => {
      console.log('开始播放')
    })
    innerAudioContext.onEnded(() => {
      innerAudioContext.destroy();
    })
  }
  if (aiReply == "sorry i didn't get you.  Is it or isn't it your fist time to go there?") {
    const innerAudioContext = wx.createInnerAudioContext();
    innerAudioContext.autoplay = false
    innerAudioContext.src = name[84]//'http://118.244.196.11:8008/static/sorry%20i%20didnt%20get%20you%20Is%20it%20or%20isnt%20it%20your%20first%20time%20to%20go%20there.mp3'
    innerAudioContext.play();
    innerAudioContext.onPlay(() => {
      console.log('开始播放')
    })
    innerAudioContext.onEnded(() => {
      innerAudioContext.destroy();
    })
  }
  ////////////////////////////////////////////////////////////////////////////
  //question 3
  if (aiReply == "Cool. it sounds like interesting experience") {
    const innerAudioContext = wx.createInnerAudioContext();
    innerAudioContext.autoplay = false;
    innerAudioContext.src = name[85]//'http://118.244.196.11:8008/static/Cool.%20it%20sounds%20like%20interesting%20experience%20..mp3'
    countmusic = 1;
    innerAudioContext.play();
    innerAudioContext.onPlay(() => {
      console.log('开始播放')
      if (innerAudioContext.src == name[86]//'http://118.244.196.11:8008/static/So%20did%20you%20finish%20your%20homework%20this%20holiday.mp3'
      ) {
        countmusic = 2;
      }
    })
    innerAudioContext.onEnded(() => {
      if (countmusic == 1) {
        console.log('结束播放')
        innerAudioContext.src = name[86];//'http://118.244.196.11:8008/static/So%20did%20you%20finish%20your%20homework%20this%20holiday.mp3';
        innerAudioContext.play();
      }
      if (countmusic == 2) {
        innerAudioContext.destroy();
      }
    })
    that.setData({
      jinduchang: 73.3,
    })
    //vq.mover(6.6);
  }
  if (aiReply == "Well. As long as you have a good time, meeting others is not that important"
  ) {
    const innerAudioContext = wx.createInnerAudioContext();
    innerAudioContext.autoplay = false;
    innerAudioContext.src = name[87]//'http://118.244.196.11:8008/static/Well.%20As%20long%20as%20you%20have%20a%20good%20time,%20.mp3'
    countmusic = 1;
    innerAudioContext.play();
    innerAudioContext.onPlay(() => {
      console.log('开始播放')
      if (innerAudioContext.src == name[86]//'http://118.244.196.11:8008/static/So%20did%20you%20finish%20your%20homework%20this%20holiday.mp3'
      ) {
        countmusic = 2;
      }
    })
    innerAudioContext.onEnded(() => {
      if (countmusic == 1) {
        console.log('结束播放')
        innerAudioContext.src = name[86];//'http://118.244.196.11:8008/static/So%20did%20you%20finish%20your%20homework%20this%20holiday.mp3';
        innerAudioContext.play();
      }
      if (countmusic == 2) {
        innerAudioContext.destroy();
      }
    })
    that.setData({
      jinduchang: 73.3,
    })
    //vq.mover(6.6);
  }
  if (aiReply == "OK, no problem.  Did you see any interesting people there?") {
    const innerAudioContext = wx.createInnerAudioContext();
    innerAudioContext.autoplay = false
    innerAudioContext.src = name[89]//'http://118.244.196.11:8008/static/OK%20no%20problem%20Did%20you%20see%20any%20interesting%20people%20there.mp3'
    innerAudioContext.play();
    innerAudioContext.onPlay(() => {
      console.log('开始播放')
    })
    innerAudioContext.onEnded(() => {
      innerAudioContext.destroy();
    })
  }
  if (aiReply == "watch your language, kido.  Did you or didn't you see any interesting people there?") {
    const innerAudioContext = wx.createInnerAudioContext();
    innerAudioContext.autoplay = false
    innerAudioContext.src = name[90]//'http://118.244.196.11:8008/static/watch%20your%20language%20kido%20Did%20you%20or%20didnt%20you%20see%20any%20interesting%20people%20there.mp3'
    innerAudioContext.play();
    innerAudioContext.onPlay(() => {
      console.log('开始播放')
    })
    innerAudioContext.onEnded(() => {
      innerAudioContext.destroy();
    })
  }
  if (aiReply == "Sorry I didn't get you.  Did you or didn't you see any interesting people there?") {
    const innerAudioContext = wx.createInnerAudioContext();
    innerAudioContext.autoplay = false
    innerAudioContext.src = name[91]//'http://118.244.196.11:8008/static/Sorry%20I%20didnt%20get%20you%20Did%20you%20or%20didnt%20you%20see%20any%20interesting%20people%20there.mp3'
    innerAudioContext.play();
    innerAudioContext.onPlay(() => {
      console.log('开始播放')
    })
    innerAudioContext.onEnded(() => {
      innerAudioContext.destroy();
    })
  }
  ////////////////////////////////////////////////////////////////////////////
  //question 4
  if (aiReply == "Cool. you are a good kid") {
    const innerAudioContext = wx.createInnerAudioContext();
    innerAudioContext.autoplay = false;
    innerAudioContext.src = name[92]//'http://118.244.196.11:8008/static/Cool.%20you%20are%20a%20good%20kid.mp3'
    countmusic = 1;
    innerAudioContext.play();
    innerAudioContext.onPlay(() => {
      console.log('开始播放')
      if (innerAudioContext.src == name[93]//'http://118.244.196.11:8008/static/great!%20lets%20start%20the%20next%20session.mp3'
      ) {
        countmusic = 2;
      }
      if (
        innerAudioContext.src == name[94]
        //'http://118.244.196.11:8008/static/please%20read%20after%20me.mp3'
      ) {
        countmusic = 3;
      }
      if (innerAudioContext.src == name[95]//'http://118.244.196.11:8008/static/ChristmasSay.mp3'
      ) {
        countmusic = 4;
      }
      if (innerAudioContext.src == name[96]//'http://118.244.196.11:8008/static/now%20it%20is%20your%20turn,%20please%20read%20the%20sentences..mp3'
      ) {
        countmusic = 5;
      }
    })
    innerAudioContext.onEnded(() => {
      if (countmusic == 1) {
        console.log('结束播放')
        innerAudioContext.src = name[93];//'http://118.244.196.11:8008/static/great!%20lets%20start%20the%20next%20session.mp3';
        setTimeout(function () {
          innerAudioContext.play();
        }, 1000);
      }
      if (countmusic == 2) {
        console.log('结束播放')
        innerAudioContext.src = name[94];//'http://118.244.196.11:8008/static/please%20read%20after%20me.mp3';
        setTimeout(function () {
          innerAudioContext.play();
        }, 1000);
      }
      if (countmusic == 3) {
        console.log('结束播放')
        innerAudioContext.src = name[95];//'http://118.244.196.11:8008/static/ChristmasSay.mp3';
        setTimeout(function () {
          innerAudioContext.play();
        }, 1000);
      }
      if (countmusic == 4) {
        console.log('结束播放')
        innerAudioContext.src = name[96];//'http://118.244.196.11:8008/static/now%20it%20is%20your%20turn,%20please%20read%20the%20sentences..mp3';
        setTimeout(function () {
          innerAudioContext.play();
        }, 1000);
      }
      if (countmusic == 5) {
        innerAudioContext.destroy();
      }

    })
    that.setData({
      jinduchang: 80,
    })
    //vq.mover(6.6);
  }
  if (aiReply == "ha. i think you should put more effort on your studies") {
    const innerAudioContext = wx.createInnerAudioContext();
    innerAudioContext.autoplay = false;
    innerAudioContext.src = name[97]//'http://118.244.196.11:8008/static/ha.%20i%20think%20you%20should%20put%20more%20effort%20on%20your%20studies.mp3'
    countmusic = 1;
    innerAudioContext.play();
    innerAudioContext.onPlay(() => {
      console.log('开始播放')
      if (innerAudioContext.src == name[98]//'http://118.244.196.11:8008/static/great!%20lets%20start%20the%20next%20session.mp3'
      ) {
        countmusic = 2;
      }
      if (innerAudioContext.src == name[94]
        //'http://118.244.196.11:8008/static/please%20read%20after%20me.mp3'
      ) {
        countmusic = 3;
      }
      if (innerAudioContext.src == name[95]//'http://118.244.196.11:8008/static/ChristmasSay.mp3'
      ) {
        countmusic = 4;
      }
      if (innerAudioContext.src == name[96]
        //'http://118.244.196.11:8008/static/now%20it%20is%20your%20turn,%20please%20read%20the%20sentences..mp3'
      ) {
        countmusic = 5;
      }
    })
    innerAudioContext.onEnded(() => {
      if (countmusic == 1) {
        console.log('结束播放')
        innerAudioContext.src = name[98];//'http://118.244.196.11:8008/static/great!%20lets%20start%20the%20next%20session.mp3';
        setTimeout(function () {
          innerAudioContext.play();
        }, 1000);
      }
      if (countmusic == 2) {
        console.log('结束播放')
        innerAudioContext.src = name[94];
        //'http://118.244.196.11:8008/static/please%20read%20after%20me.mp3';
        setTimeout(function () {
          innerAudioContext.play();
        }, 1000);
      }
      if (countmusic == 3) {
        console.log('结束播放')
        innerAudioContext.src = name[95];
        //'http://118.244.196.11:8008/static/ChristmasSay.mp3';
        setTimeout(function () {
          innerAudioContext.play();
        }, 1000);
      }
      if (countmusic == 4) {
        console.log('结束播放')
        innerAudioContext.src = name[96];
        //'http://118.244.196.11:8008/static/now%20it%20is%20your%20turn,%20please%20read%20the%20sentences..mp3';
        setTimeout(function () {
          innerAudioContext.play();
        }, 1000);
      }
      if (countmusic == 5) {
        innerAudioContext.destroy();
      }

    })
    that.setData({
      jinduchang: 80,
    })
    //vq.mover(6.6);
  }
  if (aiReply == "OK, no problem.  So did you finish your homework this holiday?") {
    const innerAudioContext = wx.createInnerAudioContext();
    innerAudioContext.autoplay = false
    innerAudioContext.src = name[89]//'http://118.244.196.11:8008/static/OK%20no%20problem%20So%20did%20you%20finish%20your%20homework%20this%20holiday.mp3'
    innerAudioContext.play();
    innerAudioContext.onPlay(() => {
      console.log('开始播放')
    })
    innerAudioContext.onEnded(() => {
      innerAudioContext.destroy();
    })
  }
  if (aiReply == "watch your language, kido.  Did you or didn't you finish your homework this holiday?") {
    const innerAudioContext = wx.createInnerAudioContext();
    innerAudioContext.autoplay = false
    innerAudioContext.src = name[90]//'http://118.244.196.11:8008/static/watch your language kido Did you or didnt you finish your homework this holiday.mp3'
    innerAudioContext.play();
    innerAudioContext.onPlay(() => {
      console.log('开始播放')
    })
    innerAudioContext.onEnded(() => {
      innerAudioContext.destroy();
    })
  }
  if (aiReply == "Sorry I didn't get you. Did you or didn't you finish your homework this holiday?") {
    const innerAudioContext = wx.createInnerAudioContext();
    innerAudioContext.autoplay = false
    innerAudioContext.src = name[91]//'http://118.244.196.11:8008/static/Sorry%20I%20didnt%20get%20you.%20Did%20you%20or%20didnt%20you%20finish%20your%20homework%20this%20holiday.mp3'
    innerAudioContext.play();
    innerAudioContext.onPlay(() => {
      console.log('开始播放')
    })
    innerAudioContext.onEnded(() => {
      innerAudioContext.destroy();
    })
  }
  ////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////
  //question 80x
  if (aiReply.indexOf("You still mispronounce some words, please repeat after me:") != -1) {
    const innerAudioContext = wx.createInnerAudioContext();
    innerAudioContext.autoplay = false
    if (questnum == 8020) {
      innerAudioContext.src = name[105]//'http://118.244.196.11:8008/static/repeat.mp3'
    }
    if (questnum == 8021) {
      innerAudioContext.src = name[106]//'http://118.244.196.11:8008/static/you%20still.mp3'
    }
    if (questnum == 8022) {
      innerAudioContext.src = name[107]//'http://118.244.196.11:8008/static/You%20still%20mispronounce%20some%20words.mp3'
    }
    countmusic = 1;
    innerAudioContext.play();
    innerAudioContext.onPlay(() => {
      console.log('开始播放')
      if (innerAudioContext.src == name[108]//'http://118.244.196.11:8008/static/Wechatxms0.mp3'
      ) {
        countmusic = 2;
      }
    })
    innerAudioContext.onEnded(() => {
      if (questnum == 8020) {
        if (countmusic == 1) {
          console.log('结束播放')
          innerAudioContext.src = name[108];//'http://118.244.196.11:8008/static/Wechatxms0.mp3';
          innerAudioContext.play();
        }
        if (countmusic == 2) {
          innerAudioContext.destroy();
        }
      }
      if (questnum == 8021 || questnum == 8022) {
        innerAudioContext.destroy();
      }
    })
    that.setData({
      jinduchang: 86.6,
    })
    //vq.mover(86.6);
  }
  if (aiReply == "great!good job! We are moving on the next question." +
    "What should we eat for Christmas? A.Roast Turkey  B.Roasted Suckling Pig  C.Apple") {
    const innerAudioContext = wx.createInnerAudioContext();
    innerAudioContext.autoplay = false;
    innerAudioContext.src = name[109]//'http://118.244.196.11:8008/static/great!good%20job.mp3'
    countmusic = 1;
    innerAudioContext.play();
    innerAudioContext.onPlay(() => {
      console.log('开始播放')
      if (innerAudioContext.src == name[110]//'http://118.244.196.11:8008/static/Please%20answer%20the%20following%20questions.mp3'
      ) {
        countmusic = 2;
      }
      if (innerAudioContext.src == name[111]//'http://118.244.196.11:8008/static/eat.mp3'
      ) {
        countmusic = 3;
      }
    })
    innerAudioContext.onEnded(() => {
      if (countmusic == 1) {
        console.log('结束播放')
        innerAudioContext.src = name[110];//'http://118.244.196.11:8008/static/Please%20answer%20the%20following%20questions.mp3';
        setTimeout(function () {
          innerAudioContext.play();
        }, 1000);
      }
      if (countmusic == 2) {
        console.log('结束播放')
        innerAudioContext.src = name[111];//'http://118.244.196.11:8008/static/eat.mp3';
        setTimeout(function () {
          innerAudioContext.play();
        }, 1000);
      }
      if (countmusic == 3) {
        innerAudioContext.destroy();
      }
    })
    that.setData({
      jinduchang: 93.2,
    })
    //vq.mover(6.6);
  }

  if (aiReply == "a") {
    that.setData({
      jinduchang: 95,
    })
    setTimeout(function () {
      let answer = "You are doing great on the last session. Based on your performance, Santa Claus has prepared a gift for you. \n在上一节中，你们做的很棒。所以圣诞老人决定要给你们准备一个小礼物。";
      let contents = util.getContents(answer)
      let id = 'id_' + Date.parse(new Date()) / 1000;
      let data = { id: id, contents: contents, me: false, imgshow: false, avatar: '/images/robot.jpg', speech: true, textshow: true, }
      let messages = that.data.messages
      messages.push(data)
      that.setData({
        messages: messages
      })
      that.setData({
        toView: id
      })
    }, 2000);
    setTimeout(function () {
      let answer = "The gift is a fun game to let you play with.  \n接下来你会看到一段短视频，当它结束后，试试用雪宝的语气为这个视频配音哦。如果配得好，圣诞老人还会再送你一个小礼物！";
      let contents = util.getContents(answer)
      let id = 'id_' + Date.parse(new Date()) / 1000;
      let data = { id: id, contents: contents, me: false, imgshow: false, avatar: '/images/robot.jpg', speech: true, textshow: true, }
      let messages = that.data.messages
      messages.push(data)
      that.setData({
        messages: messages
      })
      that.setData({
        toView: id
      })
    }, 6500);

    const innerAudioContext = wx.createInnerAudioContext();
    innerAudioContext.autoplay = false
    innerAudioContext.src = name[112]//'http://118.244.196.11:8008/static/goodpeiyinqian.mp3'
    innerAudioContext.play();
    innerAudioContext.onPlay(() => {
      console.log('开始播放')
      //should show the baoxiang and begin 700 here
    })
    innerAudioContext.onEnded(() => {
      innerAudioContext.destroy();
      setTimeout(function () {
        that.setData({
          baoxiangallshow: true,
        })
      }, 2000);
    })


    // var audioElement = document.createElement('audio');
    // audioElement.setAttribute('src', "{{ url_for('static', filename='goodpeiyinqian.mp3') }}");
    // audioElement.addEventListener('ended', function () {
    //   this.loop = false;
    //   this.pause();
    //   //question 701 begin
    //   setTimeout(function () {
    //     document.getElementById("open-has1").style.display = "block";
    //   }, 2000);
    // }, false);
    // audioElement.play();

  }

////////////////////////////////////////////////////////////////////////
if (isnew == "yes") {
  if (questnum == 102) {
    setTimeout(function () {
      let answer = "How are you today?";
      let contents = util.getContents(answer)
      let id = 'id_' + Date.parse(new Date()) / 1000;
      let data = { id: id, contents: contents, me: false, imgshow: false, avatar: '/images/robot.jpg', speech: true, textshow: true, }
      let messages = that.data.messages
      messages.push(data)
      that.setData({
        messages: messages
      })
      that.setData({
        toView: id
      })
    }, 1000);
  }

  if (questnum == 103) {
    setTimeout(function () {
      let answer = "What is the weather like today?";
      let contents = util.getContents(answer)
      let id = 'id_' + Date.parse(new Date()) / 1000;
      let data = { id: id, contents: contents, me: false, imgshow: false, avatar: '/images/robot.jpg', speech: true, textshow: true, }
      let messages = that.data.messages
      messages.push(data)
      that.setData({
        messages: messages
      })
      that.setData({
        toView: id
      })
    }, 1000);
  }

  if (questnum == 104) {
    setTimeout(function () {
      let answer = "Are you ready for English class?";
      let contents = util.getContents(answer)
      let id = 'id_' + Date.parse(new Date()) / 1000;
      let data = { id: id, contents: contents, me: false, imgshow: false, avatar: '/images/robot.jpg', speech: true, textshow: true, }
      let messages = that.data.messages
      messages.push(data)
      that.setData({
        messages: messages
      })
      that.setData({
        toView: id
      })
    }, 1000);
  }

  if (questnum == 105) {
    setTimeout(function () {
      let answer = 'abc';
      let contents = util.getContents(answer)
      let id = 'id_' + Date.parse(new Date()) / 1000;
      let data = { id: id, contents: contents, me: false, imgshow: true, avatar: '/images/robot.jpg', speech: true, jiaoxueimg: 'http://118.244.196.11:8008/static/images/j1.gif', textshow: false, }
      let messages = that.data.messages
      messages.push(data)
      that.setData({
        messages: messages
      })
      that.setData({
        toView: id
      })
    }, 1000);
    setTimeout(function () {
      let answer = "So today I am gonna to teach you, how to tell the time.  First, I am going to introduce the prepositions of Time – at. In. on.  ";
      let contents = util.getContents(answer)
      let id = 'id_' + Date.parse(new Date()) / 1000;
      let data = { id: id, contents: contents, me: false, imgshow: false, avatar: '/images/robot.jpg', speech: true, textshow: true, }
      let messages = that.data.messages
      messages.push(data)
      that.setData({
        messages: messages
      })
      that.setData({
        toView: id
      })
    }, 1000);
    setTimeout(function () {
      let answer = 'abc';
      let contents = util.getContents(answer)
      let id = 'id_' + Date.parse(new Date()) / 1000;
      let data = { id: id, contents: contents, me: false, imgshow: true, avatar: '/images/robot.jpg', speech: true, jiaoxueimg: 'http://118.244.196.11:8008/static/images/j2.gif', textshow: false, }
      let messages = that.data.messages
      messages.push(data)
      that.setData({
        messages: messages
      })
      that.setData({
        toView: id
      })
    }, 14000);
    setTimeout(function () {
      let answer = "We use ‘in’in front of months, years and centuries.  \n介词‘in’是用在月份，年份之前。";
      let contents = util.getContents(answer)
      let id = 'id_' + Date.parse(new Date()) / 1000;
      let data = { id: id, contents: contents, me: false, imgshow: false, avatar: '/images/robot.jpg', speech: true, textshow: true, }
      let messages = that.data.messages
      messages.push(data)
      that.setData({
        messages: messages
      })
      that.setData({
        toView: id
      })
    }, 14000);
    setTimeout(function () {
      let answer = 'abc';
      let contents = util.getContents(answer)
      let id = 'id_' + Date.parse(new Date()) / 1000;
      let data = { id: id, contents: contents, me: false, imgshow: true, avatar: '/images/robot.jpg', speech: true, jiaoxueimg: 'http://118.244.196.11:8008/static/images/j3.gif', textshow: false, }
      let messages = that.data.messages
      messages.push(data)
      that.setData({
        messages: messages
      })
      that.setData({
        toView: id
      })
    }, 21000);
    setTimeout(function () {
      let answer = "Television was invented by John in 1920.  ";
      let contents = util.getContents(answer)
      let id = 'id_' + Date.parse(new Date()) / 1000;
      let data = { id: id, contents: contents, me: false, imgshow: false, avatar: '/images/robot.jpg', speech: true, textshow: true, }
      let messages = that.data.messages
      messages.push(data)
      that.setData({
        messages: messages
      })
      that.setData({
        toView: id
      })
    }, 21000);
    setTimeout(function () {
      let answer = 'abc';
      let contents = util.getContents(answer)
      let id = 'id_' + Date.parse(new Date()) / 1000;
      let data = { id: id, contents: contents, me: false, imgshow: true, avatar: '/images/robot.jpg', speech: true, jiaoxueimg: 'http://118.244.196.11:8008/static/images/j4.gif', textshow: false, }
      let messages = that.data.messages
      messages.push(data)
      that.setData({
        messages: messages
      })
      that.setData({
        toView: id
      })
    }, 27000);
    setTimeout(function () {
      let answer = "We use ‘on’for days and dates.\n介词‘on’是用在，周几或者具体日期前。";
      let contents = util.getContents(answer)
      let id = 'id_' + Date.parse(new Date()) / 1000;
      let data = { id: id, contents: contents, me: false, imgshow: false, avatar: '/images/robot.jpg', speech: true, textshow: true, }
      let messages = that.data.messages
      messages.push(data)
      that.setData({
        messages: messages
      })
      that.setData({
        toView: id
      })
    }, 27000);
    setTimeout(function () {
      let answer = 'abc';
      let contents = util.getContents(answer)
      let id = 'id_' + Date.parse(new Date()) / 1000;
      let data = { id: id, contents: contents, me: false, imgshow: true, avatar: '/images/robot.jpg', speech: true, jiaoxueimg: 'http://118.244.196.11:8008/static/images/j5.gif', textshow: false, }
      let messages = that.data.messages
      messages.push(data)
      that.setData({
        messages: messages
      })
      that.setData({
        toView: id
      })
    }, 33000);
    setTimeout(function () {
      let answer = "On July 20th 1969, human step on the moon for the first time.  ";
      let contents = util.getContents(answer)
      let id = 'id_' + Date.parse(new Date()) / 1000;
      let data = { id: id, contents: contents, me: false, imgshow: false, avatar: '/images/robot.jpg', speech: true, textshow: true, }
      let messages = that.data.messages
      messages.push(data)
      that.setData({
        messages: messages
      })
      that.setData({
        toView: id
      })
    }, 33000);
    setTimeout(function () {
      let answer = 'abc';
      let contents = util.getContents(answer)
      let id = 'id_' + Date.parse(new Date()) / 1000;
      let data = { id: id, contents: contents, me: false, imgshow: true, avatar: '/images/robot.jpg', speech: true, jiaoxueimg: 'http://118.244.196.11:8008/static/images/j6.gif', textshow: false, }
      let messages = that.data.messages
      messages.push(data)
      that.setData({
        messages: messages
      })
      that.setData({
        toView: id
      })
    }, 41000);
    setTimeout(function () {
      let answer = "We use ‘at’in front of the precise time of the day.\n我们把‘at’放在，一天之中具体的时刻。";
      let contents = util.getContents(answer)
      let id = 'id_' + Date.parse(new Date()) / 1000;
      let data = { id: id, contents: contents, me: false, imgshow: false, avatar: '/images/robot.jpg', speech: true, textshow: true, }
      let messages = that.data.messages
      messages.push(data)
      that.setData({
        messages: messages
      })
      that.setData({
        toView: id
      })
    }, 41000);
    setTimeout(function () {
      let answer = 'abc';
      let contents = util.getContents(answer)
      let id = 'id_' + Date.parse(new Date()) / 1000;
      let data = { id: id, contents: contents, me: false, imgshow: true, avatar: '/images/robot.jpg', speech: true, jiaoxueimg: 'http://118.244.196.11:8008/static/images/j7.gif', textshow: false, }
      let messages = that.data.messages
      messages.push(data)
      that.setData({
        messages: messages
      })
      that.setData({
        toView: id
      })
    }, 48000);
    setTimeout(function () {
      let answer = "Three monkeys escaped from the zoo at 3pm today.  ";
      let contents = util.getContents(answer)
      let id = 'id_' + Date.parse(new Date()) / 1000;
      let data = { id: id, contents: contents, me: false, imgshow: false, avatar: '/images/robot.jpg', speech: true, textshow: true, }
      let messages = that.data.messages
      messages.push(data)
      that.setData({
        messages: messages
      })
      that.setData({
        toView: id
      })
    }, 48000);
    setTimeout(function () {
      let answer = "Now I am going to ask you some questions, to practice the usage of time.  \n现在我将会问你一些问题，来练习时间的用法。请你用两句以内回答。 ";
      let contents = util.getContents(answer)
      let id = 'id_' + Date.parse(new Date()) / 1000;
      let data = { id: id, contents: contents, me: false, imgshow: false, avatar: '/images/robot.jpg', speech: true, textshow: true, }
      let messages = that.data.messages
      messages.push(data)
      that.setData({
        messages: messages
      })
      that.setData({
        toView: id
      })
    }, 54000);
    setTimeout(function () {
      let answer = "What time do you get up?  ";
      let contents = util.getContents(answer)
      let id = 'id_' + Date.parse(new Date()) / 1000;
      let data = { id: id, contents: contents, me: false, imgshow: false, avatar: '/images/robot.jpg', speech: true, textshow: true, }
      let messages = that.data.messages
      messages.push(data)
      that.setData({
        messages: messages
      })
      that.setData({
        toView: id
      })
    }, 60000);

  }
  if (questnum == 106) {
    setTimeout(function () {
      let answer = "不错！你的回答超越了90%的同学！";
      let contents = util.getContents(answer)
      let id = 'id_' + Date.parse(new Date()) / 1000;
      let data = { id: id, contents: contents, me: false, imgshow: false, avatar: '/images/robot.jpg', speech: true, textshow: true, }
      let messages = that.data.messages
      messages.push(data)
      that.setData({
        messages: messages
      })
      that.setData({
        toView: id
      })
    }, 10);
    setTimeout(function () {
      let answer = "What time do you have your breakfast?";
      let contents = util.getContents(answer)
      let id = 'id_' + Date.parse(new Date()) / 1000;
      let data = { id: id, contents: contents, me: false, imgshow: false, avatar: '/images/robot.jpg', speech: true, textshow: true, }
      let messages = that.data.messages
      messages.push(data)
      that.setData({
        messages: messages
      })
      that.setData({
        toView: id
      })
    }, 1000);
  }
  if (questnum == 107) {
    setTimeout(function () {
      let answer = "How about your lunch? What time do you have your lunch?";
      let contents = util.getContents(answer)
      let id = 'id_' + Date.parse(new Date()) / 1000;
      let data = { id: id, contents: contents, me: false, imgshow: false, avatar: '/images/robot.jpg', speech: true, textshow: true, }
      let messages = that.data.messages
      messages.push(data)
      that.setData({
        messages: messages
      })
      that.setData({
        toView: id
      })
    }, 1000);
  }
  if (questnum == 111) {
    setTimeout(function () {
      let answer = "On which days you do not need to go to school?";
      let contents = util.getContents(answer)
      let id = 'id_' + Date.parse(new Date()) / 1000;
      let data = { id: id, contents: contents, me: false, imgshow: false, avatar: '/images/robot.jpg', speech: true, textshow: true, }
      let messages = that.data.messages
      messages.push(data)
      that.setData({
        messages: messages
      })
      that.setData({
        toView: id
      })
    }, 1000);
  }
  if (questnum == 1) {
    setTimeout(function () {
      let answer = "Great.  We are moving to the next section.  Besides telling the time, we are going to learn something about a western festival, the Christmas day.  ";
      let contents = util.getContents(answer)
      let id = 'id_' + Date.parse(new Date()) / 1000;
      let data = { id: id, contents: contents, me: false, imgshow: false, avatar: '/images/robot.jpg', speech: true, textshow: true, }
      let messages = that.data.messages
      messages.push(data)
      that.setData({
        messages: messages
      })
      that.setData({
        toView: id
      })
    }, 2000);
  setTimeout(function () {
    let answer = "2000 years ago in Israel, in that town there was a girl named Mary.  \n在古老的以色列的一个城镇，有个叫玛丽的女孩";
    let contents = util.getContents(answer)
    let id = 'id_' + Date.parse(new Date()) / 1000;
    let data = { id: id, contents: contents, me: false, imgshow: false, avatar: '/images/robot.jpg', speech: true, textshow: true, }
    let messages = that.data.messages
    messages.push(data)
    that.setData({
      messages: messages
    })
    that.setData({
      toView: id
    })
  }, 12000);
  setTimeout(function () {
    let answer = 'abc';
    let contents = util.getContents(answer)
    let id = 'id_' + Date.parse(new Date()) / 1000;
    let data = { id: id, contents: contents, me: false, imgshow: true, avatar: '/images/robot.jpg', speech: true, jiaoxueimg: 'http://118.244.196.11:8008/static/images/c1.gif', textshow: false, }
    let messages = that.data.messages
    messages.push(data)
    that.setData({
      messages: messages
    })
    that.setData({
      toView: id
    })
  }, 14000);
  setTimeout(function () {
    let answer = "One night, an angel comes out told her that she would have the god’s son.  \n一天夜里，一个天使降临在她面前告诉她，她将怀上上帝的孩子";
    let contents = util.getContents(answer)
    let id = 'id_' + Date.parse(new Date()) / 1000;
    let data = { id: id, contents: contents, me: false, imgshow: false, avatar: '/images/robot.jpg', speech: true, textshow: true, }
    let messages = that.data.messages
    messages.push(data)
    that.setData({
      messages: messages
    })
    that.setData({
      toView: id
    })
  }, 18000);
  setTimeout(function () {
    let answer = "She is not married at that time. Later she got pregnant. \n那个时候的她还未结婚。真的如那个天使所说，她怀孕了";
    let contents = util.getContents(answer)
    let id = 'id_' + Date.parse(new Date()) / 1000;
    let data = { id: id, contents: contents, me: false, imgshow: false, avatar: '/images/robot.jpg', speech: true, textshow: true, }
    let messages = that.data.messages
    messages.push(data)
    that.setData({
      messages: messages
    })
    that.setData({
      toView: id
    })
  }, 23000);
  setTimeout(function () {
    let answer = 'abc';
    let contents = util.getContents(answer)
    let id = 'id_' + Date.parse(new Date()) / 1000;
    let data = { id: id, contents: contents, me: false, imgshow: true, avatar: '/images/robot.jpg', speech: true, jiaoxueimg: 'http://118.244.196.11:8008/static/images/c2.gif', textshow: false, }
    let messages = that.data.messages
    messages.push(data)
    that.setData({
      messages: messages
    })
    that.setData({
      toView: id
    })
  }, 25000);
  setTimeout(function () {
    let answer = "She went through a lot of difficulties when she gave birth to the God’s son – Jesus.  \n她在生神的儿子-耶稣的时候，面临了极大的困难，但是她都挺过来了 ";
    let contents = util.getContents(answer)
    let id = 'id_' + Date.parse(new Date()) / 1000;
    let data = { id: id, contents: contents, me: false, imgshow: false, avatar: '/images/robot.jpg', speech: true, textshow: true, }
    let messages = that.data.messages
    messages.push(data)
    that.setData({
      messages: messages
    })
    that.setData({
      toView: id
    })
  }, 28000);
  setTimeout(function () {
    let answer = "Christmas is for celebration of the birth of Jesus. \n圣诞节就是为了纪念耶稣的诞生 ";
    let contents = util.getContents(answer)
    let id = 'id_' + Date.parse(new Date()) / 1000;
    let data = { id: id, contents: contents, me: false, imgshow: false, avatar: '/images/robot.jpg', speech: true, textshow: true, }
    let messages = that.data.messages
    messages.push(data)
    that.setData({
      messages: messages
    })
    that.setData({
      toView: id
    })
  }, 34000);
  setTimeout(function () {
    let answer = "Now i am going to ask you some questions about Christmas.  Please answer them in short answers.  \n现在我会提问你关于圣诞节的问题。请用两个句子以内来回答";
    let contents = util.getContents(answer)
    let id = 'id_' + Date.parse(new Date()) / 1000;
    let data = { id: id, contents: contents, me: false, imgshow: false, avatar: '/images/robot.jpg', speech: true, textshow: true, }
    let messages = that.data.messages
    messages.push(data)
    that.setData({
      messages: messages
    })
    that.setData({
      toView: id
    })
  }, 38000);
  setTimeout(function () {
    let answer = "Did you go anywhere this christmas?";
    let contents = util.getContents(answer)
    let id = 'id_' + Date.parse(new Date()) / 1000;
    let data = { id: id, contents: contents, me: false, imgshow: false, avatar: '/images/robot.jpg', speech: true, textshow: true, }
    let messages = that.data.messages
    messages.push(data)
    that.setData({
      messages: messages
    })
    that.setData({
      toView: id
    })
  }, 46000);
}
  if (questnum == 2) {
    setTimeout(function () {
      let answer = "厉害！你的回答达到了美国大学生水平！";
      let contents = util.getContents(answer)
      let id = 'id_' + Date.parse(new Date()) / 1000;
      let data = { id: id, contents: contents, me: false, imgshow: false, avatar: '/images/robot.jpg', speech: true, textshow: true, }
      let messages = that.data.messages
      messages.push(data)
      that.setData({
        messages: messages
      })
      that.setData({
        toView: id
      })
    }, 10);
    setTimeout(function () {
      let answer = "I did not go ouside this Christmas. I just went to buy some gifts for my friends and parents.  I used the Christmas tree to decorate my house.  We held huge parties at home and invited all my friends to join it. We ate delicious food, singing and dancing.";
      let contents = util.getContents(answer)
      let id = 'id_' + Date.parse(new Date()) / 1000;
      let data = { id: id, contents: contents, me: false, imgshow: false, avatar: '/images/robot.jpg', speech: true, textshow: true, }
      let messages = that.data.messages
      messages.push(data)
      that.setData({
        messages: messages
      })
      that.setData({
        toView: id
      })
    }, 2000);
    setTimeout(function () {
      let answer = "Is this your first time to go there?";
      let contents = util.getContents(answer)
      let id = 'id_' + Date.parse(new Date()) / 1000;
      let data = { id: id, contents: contents, me: false, imgshow: false, avatar: '/images/robot.jpg', speech: true, textshow: true, }
      let messages = that.data.messages
      messages.push(data)
      that.setData({
        messages: messages
      })
      that.setData({
        toView: id
      })
    }, 12000);
  }
  if (questnum == 3) {
    setTimeout(function () {
      let answer = "Did you see any interesting people there?";
      let contents = util.getContents(answer)
      let id = 'id_' + Date.parse(new Date()) / 1000;
      let data = { id: id, contents: contents, me: false, imgshow: false, avatar: '/images/robot.jpg', speech: true, textshow: true, }
      let messages = that.data.messages
      messages.push(data)
      that.setData({
        messages: messages
      })
      that.setData({
        toView: id
      })
    }, 2000);
  }
  if (questnum == 4) {
    setTimeout(function () {
      let answer = "I met a local while traveling this Christmas.  That girl was very friendly and invited me to her house.";
      let contents = util.getContents(answer)
      let id = 'id_' + Date.parse(new Date()) / 1000;
      let data = { id: id, contents: contents, me: false, imgshow: false, avatar: '/images/robot.jpg', speech: true, textshow: true, }
      let messages = that.data.messages
      messages.push(data)
      that.setData({
        messages: messages
      })
      that.setData({
        toView: id
      })
    }, 2000);
    setTimeout(function () {
      let answer = "So did you finish your homework this holiday?";
      let contents = util.getContents(answer)
      let id = 'id_' + Date.parse(new Date()) / 1000;
      let data = { id: id, contents: contents, me: false, imgshow: false, avatar: '/images/robot.jpg', speech: true, textshow: true, }
      let messages = that.data.messages
      messages.push(data)
      that.setData({
        messages: messages
      })
      that.setData({
        toView: id
      })
    }, 10000);
  }
  if (questnum == 801) {
    setTimeout(function () {
      let answer = "great! let us start the next session";
      let contents = util.getContents(answer)
      let id = 'id_' + Date.parse(new Date()) / 1000;
      let data = { id: id, contents: contents, me: false, imgshow: false, avatar: '/images/robot.jpg', speech: true, textshow: true, }
      let messages = that.data.messages
      messages.push(data)
      that.setData({
        messages: messages
      })
      that.setData({
        toView: id
      })
    }, 1000);
    setTimeout(function () {
      let answer = "please read after me";
      let contents = util.getContents(answer)
      let id = 'id_' + Date.parse(new Date()) / 1000;
      let data = { id: id, contents: contents, me: false, imgshow: false, avatar: '/images/robot.jpg', speech: true, textshow: true, }
      let messages = that.data.messages
      messages.push(data)
      that.setData({
        messages: messages
      })
      that.setData({
        toView: id
      })
    }, 2000);
    setTimeout(function () {
      let answer = "Christmas is one of the most beautiful holidays of all time. On this day, many go to church, where they take part in special religious services. During the Christmas season, they also exchange gifts and decorate their homes with holly, mistletoe, and Christmas trees";
      let contents = util.getContents(answer)
      let id = 'id_' + Date.parse(new Date()) / 1000;
      let data = { id: id, contents: contents, me: false, imgshow: false, avatar: '/images/robot.jpg', speech: true, textshow: true, }
      let messages = that.data.messages
      messages.push(data)
      that.setData({
        messages: messages
      })
      that.setData({
        toView: id
      })
    }, 3500);
    setTimeout(function () {
      let answer = "Now it is your turn.  Please read these sentences.  \n现在轮到你，朗读上面这段话。";
      let contents = util.getContents(answer)
      let id = 'id_' + Date.parse(new Date()) / 1000;
      let data = { id: id, contents: contents, me: false, imgshow: false, avatar: '/images/robot.jpg', speech: true, textshow: true, }
      let messages = that.data.messages
      messages.push(data)
      that.setData({
        messages: messages
      })
      that.setData({
        toView: id
      })
    }, 26000);
  }
  if (questnum == 8020) {
    setTimeout(function () {
      let answer = "念得不错。但是你刚才有几个单词没读好，请跟我再朗读一遍：\nChristmas is one of the most beautiful holidays of all time.  ";
      let contents = util.getContents(answer)
      let id = 'id_' + Date.parse(new Date()) / 1000;
      let data = { id: id, contents: contents, me: false, imgshow: false, avatar: '/images/robot.jpg', speech: true, textshow: true, }
      let messages = that.data.messages
      messages.push(data)
      that.setData({
        messages: messages
      })
      that.setData({
        toView: id
      })
    }, 10000);
  }
  if (questnum == 8021) {
    setTimeout(function () {
      let answer = "念得不错。但是你刚才有几个单词没读好，请跟我再朗读一遍：\nOn this day, many go to church, where they take part in special religious services.  ";
      let contents = util.getContents(answer)
      let id = 'id_' + Date.parse(new Date()) / 1000;
      let data = { id: id, contents: contents, me: false, imgshow: false, avatar: '/images/robot.jpg', speech: true, textshow: true, }
      let messages = that.data.messages
      messages.push(data)
      that.setData({
        messages: messages
      })
      that.setData({
        toView: id
      })
    }, 10000);
  }
  if (questnum == 8022) {
    setTimeout(function () {
      let answer = "念得不错。但是你刚才有几个单词没读好，请跟我再朗读一遍：\nDuring the Christmas season, they also exchange gifts and decorate their homes with holly, mistletoe, and Christmas trees.  ";
      let contents = util.getContents(answer)
      let id = 'id_' + Date.parse(new Date()) / 1000;
      let data = { id: id, contents: contents, me: false, imgshow: false, avatar: '/images/robot.jpg', speech: true, textshow: true, }
      let messages = that.data.messages
      messages.push(data)
      that.setData({
        messages: messages
      })
      that.setData({
        toView: id
      })
    }, 10000);
  }


}
////////////////////////////////////////////////////////////////////////

            // setTimeout(function () {
            //   answer = 'abc';
            //   contents = util.getContents(answer)
            //   id = 'id_' + Date.parse(new Date()) / 1000;
            //   data = { id: id, contents: contents, me: false, imgshow: true, avatar: '/images/robot.jpg', speech: true, jiaoxueimg: 'http://118.244.196.11:8008/static/images/j1.gif', textshow: false, }
            //   messages = that.data.messages
            //   messages.push(data)
            //   that.setData({
            //     messages: messages
            //   })
            //   that.setData({
            //     toView: id
            //   })
            // }, 2000)


          },
          fail: function (err) {
            console.log(err)
          }
        })

    })
  },

  stopRecord: function () {
    this.setData({
      speechText: '单击开始说话'
    })
    wx.stopRecord();
  },
  playSpeech: function (event) {
    var that = this;
    var filePath = event.currentTarget.dataset.filepath;
    that.setData({
      playingSpeech: filePath
    });
    var num = 1;
    var interval = setInterval(function () {
      that.setData({
        speechIcon: '/images/speech' + num % 3 + '.png'
      });
      num++;
    }, 500);
    wx.playVoice({
      filePath: filePath,
      complete: function () {
        clearInterval(interval);
        that.setData({
          speechIcon: '/images/speech0.png',
          playingSpeech: ''
        });
      }
    })
  },
  playRobotSpeech: function (event) {
    var that = this;
    var filePath = event.currentTarget.dataset.filepath;
    that.setData({
      playingSpeech: filePath
    });
    var num = 1;
    var interval = setInterval(function () {
      that.setData({
        speechIcon: '/images/speech' + num % 3 + '.png'
      });
      num++;
    }, 500);
    wx.playBackgroundAudio({
      dataUrl: filePath
    });
    wx.onBackgroundAudioStop(function () {
      clearInterval(interval);
      that.setData({
        speechIcon: '/images/speech0.png',
        playingSpeech: ''
      });
    })
  },
  // audiojiaoxue1play: function(){
  //   var that=this;
  //   innerAudioContext.autoplay = false;
  //   innerAudioContext.src = 'http://118.244.196.11:8008/static/http://118.244.196.11:8008/static/So%20today.mp3.mp3'
  //   countmusic = 1;
  //   innerAudioContext.play();
  //   innerAudioContext.onPlay(() => {
  //     console.log('开始播放')
  //   })
  //   innerAudioContext.onEnded(() => {
  //     // setTimeout(function () {
  //     //   that.audiojiaoxue12play();
  //     // }, 1000);
  //   })
  // },
  // audiojiaoxue12play:function(){
  //   var that = this;
  //   innerAudioContext.autoplay = false;
  //   innerAudioContext.src = 'http://118.244.196.11:8008/static/We%20use%20in.mp3'
  //   countmusic = 1;
  //   innerAudioContext.play();
  //   innerAudioContext.onPlay(() => {
  //     console.log('开始播放')
  //   })
  //   innerAudioContext.onEnded(() => {
  //     setTimeout(function () {
  //       that.audiojiaoxue13play();
  //     }, 1000);
  //   })
  // },
  // audiojiaoxue13play:function(){
  //   var that = this;
  //   innerAudioContext.autoplay = false;
  //   innerAudioContext.src = 'http://118.244.196.11:8008/static/Television.mp3'
  //   countmusic = 1;
  //   innerAudioContext.play();
  //   innerAudioContext.onPlay(() => {
  //     console.log('开始播放')
  //   })
  //   innerAudioContext.onEnded(() => {
  //     innerAudioContext.stop();
  //     // setTimeout(function () {
  //     //   audiojiaoxue13play();
  //     // }, 1000);
  //   })

  // },
  onReady: function () {
    //create videocontext. might need to delete
    this.videoContext = wx.createVideoContext('myVideo')
    wx.setNavigationBarTitle({
      title:'',
    })

    var date = new Date();
    var m = date.getMinutes();
    var s = date.getSeconds();
    var milis = date.getMilliseconds();
    console.log("on ready success" + ":" + m + ":" + s + ":" + milis)
    //this.audiojiaoxue1play();
    // wx.request({
    //   url: 'http://118.244.196.11:8008/static/Q15Sorry%20i%20did%20not%20get%20you.mp3', //仅为示例，并非真实的接口地址
    //   // data: {
    //   //   x: '',
    //   //   y: ''
    //   // },
    //   // header: {
    //   //   'content-type': 'application/json' // 默认值
    //   // },
    //   success: function (res) {
    //     console.log("success request")
    //   }
    // })
    const downloadTask = wx.downloadFile({
      url: 'http://118.244.196.11:8008/static/Q15Sorry%20i%20did%20not%20get%20you.mp3', //仅为示例，并非真实的资源
      success: function (res) {
        if (res.statusCode === 200) {
          console.dir(res.tempFilePath);
          answerfilepath = res.tempFilePath;

        }
      }
    })
    // downloadTask.onProgressUpdate((res) => {
    //   console.log('下载进度', res.progress)
    //   console.log('已经下载的数据长度', res.totalBytesWritten)
    //   console.log('预期需要下载的数据总长度', res.totalBytesExpectedToWrite)
    // })

    const downloadTask2 = wx.downloadFile({
      url: 'http://118.244.196.11:8008/static/Q12You%20have%20a%20nice%20name.mp3', //仅为示例，并非真实的资源
      success: function (res) {
        if (res.statusCode === 200) {
          console.dir(res.tempFilePath);
          answerfilepath2 = res.tempFilePath;

        }
      }
    })
    // downloadTask2.onProgressUpdate((res) => {
    //   console.log('下载进度', res.progress)
    //   console.log('已经下载的数据长度', res.totalBytesWritten)
    //   console.log('预期需要下载的数据总长度', res.totalBytesExpectedToWrite)
    // })

    const downloadTask3 = wx.downloadFile({
      url: 'http://118.244.196.11:8008/static/Q21How%20are%20you.mp3', //仅为示例，并非真实的资源
      success: function (res) {
        if (res.statusCode === 200) {
          console.dir(res.tempFilePath);
          answerfilepath3 = res.tempFilePath;

        }
      }
    })
    // downloadTask3.onProgressUpdate((res) => {
    //   console.log('下载进度', res.progress)
    //   console.log('已经下载的数据长度', res.totalBytesWritten)
    //   console.log('预期需要下载的数据总长度', res.totalBytesExpectedToWrite)
    // })

    const downloadTask5 = wx.downloadFile({
      url: 'http://118.244.196.11:8008/static/a.txt', //仅为示例，并非真实的资源
      success: function (res) {
        if (res.statusCode === 200) {
          console.dir(res.tempFilePath);
          txtfilepath = res.tempFilePath;

        }
      }
    })
    // downloadTask5.onProgressUpdate((res) => {
    //   console.log('下载进度', res.progress)
    //   console.log('已经下载的数据长度', res.totalBytesWritten)
    //   console.log('预期需要下载的数据总长度', res.totalBytesExpectedToWrite)
    // })

    //video preload
    // const downloadTask6 = wx.downloadFile({
    //   url: 'http://118.244.196.11:8008/static/icee1.mp4', //仅为示例，并非真实的资源
    //   success: function (res) {
    //     if (res.statusCode === 200) {
    //       console.dir(res.tempFilePath);
    //       v1path = res.tempFilePath;

    //     }
    //   }
    // })
    // // downloadTask6.onProgressUpdate((res) => {
    // //   console.log('下载进度', res.progress)
    // //   console.log('已经下载的数据长度', res.totalBytesWritten)
    // //   console.log('预期需要下载的数据总长度', res.totalBytesExpectedToWrite)
    // // })

    // const downloadTask7 = wx.downloadFile({
    //   url: 'http://118.244.196.11:8008/static/icee2.mp4', //仅为示例，并非真实的资源
    //   success: function (res) {
    //     if (res.statusCode === 200) {
    //       console.dir(res.tempFilePath);
    //       v2path = res.tempFilePath;

    //     }
    //   }
    // })
    // // downloadTask7.onProgressUpdate((res) => {
    // //   console.log('下载进度', res.progress)
    // //   console.log('已经下载的数据长度', res.totalBytesWritten)
    // //   console.log('预期需要下载的数据总长度', res.totalBytesExpectedToWrite)
    // // })

    // const downloadTask8 = wx.downloadFile({
    //   url: 'http://118.244.196.11:8008/static/icee3.mp4', //仅为示例，并非真实的资源
    //   success: function (res) {
    //     if (res.statusCode === 200) {
    //       console.dir(res.tempFilePath);
    //       v3path = res.tempFilePath;

    //     }
    //   }
    // })
    // // downloadTask8.onProgressUpdate((res) => {
    // //   console.log('下载进度', res.progress)
    // //   console.log('已经下载的数据长度', res.totalBytesWritten)
    // //   console.log('预期需要下载的数据总长度', res.totalBytesExpectedToWrite)
    // // })

    // const downloadTask9 = wx.downloadFile({
    //   url: 'http://118.244.196.11:8008/static/icee4.mp4', //仅为示例，并非真实的资源
    //   success: function (res) {
    //     if (res.statusCode === 200) {
    //       console.dir(res.tempFilePath);
    //       v4path = res.tempFilePath;

    //     }
    //   }
    // })
    // // downloadTask9.onProgressUpdate((res) => {
    // //   console.log('下载进度', res.progress)
    // //   console.log('已经下载的数据长度', res.totalBytesWritten)
    // //   console.log('预期需要下载的数据总长度', res.totalBytesExpectedToWrite)
    // // })

    // const downloadTask10 = wx.downloadFile({
    //   url: 'http://118.244.196.11:8008/static/icee5.mp4', //仅为示例，并非真实的资源
    //   success: function (res) {
    //     if (res.statusCode === 200) {
    //       console.dir(res.tempFilePath);
    //       v5path = res.tempFilePath;

    //     }
    //   }
    // })
    // // downloadTask10.onProgressUpdate((res) => {
    // //   console.log('下载进度', res.progress)
    // //   console.log('已经下载的数据长度', res.totalBytesWritten)
    // //   console.log('预期需要下载的数据总长度', res.totalBytesExpectedToWrite)
    // // })

    // const downloadTask11 = wx.downloadFile({
    //   url: 'http://118.244.196.11:8008/static/iceall.mp4', //仅为示例，并非真实的资源
    //   success: function (res) {
    //     if (res.statusCode === 200) {
    //       console.dir(res.tempFilePath);
    //       vpath = res.tempFilePath;

    //     }
    //   }
    // })
    // // downloadTask11.onProgressUpdate((res) => {
    // //   console.log('下载进度', res.progress)
    // //   console.log('已经下载的数据长度', res.totalBytesWritten)
    // //   console.log('预期需要下载的数据总长度', res.totalBytesExpectedToWrite)
    // // })

  },

  


})

