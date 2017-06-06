//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    contentlist: [],
    hiddenTop: true,
    hiddenBottom: true,
    page: 1,
    scrollTop: 0,
    scroll: [],
    scrollmax: 0,
    scrollmin:0
  },
  onLoad: function () {
    var that = this;
    wx.request({
      url: 'https://route.showapi.com/255-1',
      data: {
        page: '1',
        showapi_appid: '39607',
        type: '29',
        showapi_sign: '900283fab48944deb4226dc91c4bdd6d'
      },
      method: 'GET',
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        that.setData({
          contentlist: res.data.showapi_res_body.pagebean.contentlist
        })
      }
    })
  },
  lowerloadmore: function () {
    this.setData({
      hiddenBottom: false,
      page: this.data.page + 1
    });
    var that = this;
    this.requestData(this.data.page, "29", function (res) {
      var list = that.data.contentlist.concat(res.data.showapi_res_body.pagebean.contentlist);
      that.setData({
        contentlist: list,
        hiddenBottom: true,
        scrollTop: that.data.scrollmin
      })
    })
  },
  upperloadmore: function () {
    this.setData({
      hiddenTop: false,
      page: this.data.page + 1,
      scrollTop: 0
    });
    var that = this;
    this.requestData(this.data.page, "29", function (res) {
      var list = res.data.showapi_res_body.pagebean.contentlist.concat(that.data.contentlist);
      that.setData({
        contentlist: list,
        hiddenTop: true,
        scrollTop: that.data.scrollmax
      })
    })
    // console.log(this.data.scrollmax);
  },
  scroll: function (event) {
    this.data.scroll.push(event.detail.scrollTop)
    var temp = 0;
    var max = Math.max.apply(null, this.data.scroll);
    this.setData({
      scrollmax: max,
      scrollmin: this.data.scroll[this.data.scroll.length-1]
    });
  },
  requestData: function (index, type1, fn) {
    wx.request({
      url: 'https://route.showapi.com/255-1',
      data: {
        page: index,
        showapi_appid: '39607',
        type: type1,
        showapi_sign: '900283fab48944deb4226dc91c4bdd6d'
      },
      method: 'GET',
      header: {
        'Content-Type': 'application/json'
      },
      success: fn
    })
  }
})
