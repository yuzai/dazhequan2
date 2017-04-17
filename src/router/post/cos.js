var bucket = 'dazhequan';
var appid = '1253553408';
var sid = 'AKIDW9bBev5vfEtUu9Q3hTJ4g7MXbcT86sxq';
var skey = 'pSvDMOFuRmvscAWgfVArPp381jFblkX8';
var region = 'tj';
//初始化逻辑
var cos = new CosCloud({
    appid: appid,// APPID 必填参数
    bucket: bucket,//bucketName 必填参数
    region: region,//地域信息 必填参数 华南地区填gz 华东填sh 华北填tj
    getAppSign: function (callback) {//获取签名 必填参数
        var self = this;
        var random = parseInt(Math.random() * Math.pow(2, 32));
        var now = parseInt(new Date().getTime() / 1000);
        var e = now + 60; //签名过期时间为当前+60s
        var path = '';//多次签名这里填空
        var str = 'a=' + self.appid + '&k=' + sid + '&e=' + e + '&t=' + now + '&r=' + random +
                '&f=' + path + '&b=' + self.bucket;

        var sha1Res = CryptoJS.HmacSHA1(str, skey);//这里使用CryptoJS计算sha1值，你也可以用其他开源库或自己实现
        var strWordArray = CryptoJS.enc.Utf8.parse(str);
        var resWordArray = sha1Res.concat(strWordArray);
        var res = resWordArray.toString(CryptoJS.enc.Base64);

        setTimeout(function () {//setTimeout模拟一下网络延迟的情况
            callback(res);
        }, 1000);


        //3.直接复用别人算好的签名字符串, 一般在调试阶段使用
        //callback('YOUR_SIGN_STR')


    },
    getAppSignOnce: function (callback) {//单次签名，参考上面的注释即可
        var self = this;
        var random = parseInt(Math.random() * Math.pow(2, 32));
        var now = parseInt(new Date().getTime() / 1000);
        var e = 0; //单次签名 expire==0
        var path = self.path;
        var str = 'a=' + self.appid + '&k=' + sid + '&e=' + e + '&t=' + now + '&r=' + random +
                '&f=' + path + '&b=' + self.bucket;

        var sha1Res = CryptoJS.HmacSHA1(str, skey);//这里使用CryptoJS计算sha1值，你也可以用其他开源库或自己实现
        var strWordArray = CryptoJS.enc.Utf8.parse(str);
        var resWordArray = sha1Res.concat(strWordArray);
        var res = resWordArray.toString(CryptoJS.enc.Base64);

        setTimeout(function () {//setTimeout模拟一下网络延迟的情况
            callback(res);
        }, 1000);
    }
});
export default cos;
export {bucket};
