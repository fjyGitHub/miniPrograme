const app = getApp()

Page({
    data: {
        skinStyle: '',
        goodsList: []
    },
    onLoad: function (options) {
        console.log(options)
        options.coupon_id = 1
        const { coupon_id } = options
        this.setData({
            skinStyle: app.globalData.skinStyle
        })
        this.getPageData(coupon_id)
    },
    getPageData: function (params) {
        const that = this
        wx.showLoading()
        wx.request({
			url: app.globalData.http + `/mpa/coupons/${params}/coupon_goods`,
			method: 'GET',
			dataType: 'json',
			header: {
				"Api-Key": app.globalData.apiKey,
				"Api-Secret": app.globalData.apiSecret,
				'Api-Ext': app.globalData.apiExt
            },
			success: function (data) {
				if (data.statusCode === 200) {
                    wx.hideLoading()
                    that.setData({
                        goodsList: data.data
                    })
				}
			}
		})
    }
})