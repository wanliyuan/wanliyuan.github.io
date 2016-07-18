define(["jquery"],function($) {

	/**
	 * 判断对象类型是否为函数
	 * @DateTime 2016-01-07
	 * @param    {Object}     obj 待判断对象
	 * @return   {Boolean}        布尔型
	 */
	function isFunction(obj) {
		return Object.prototype.toString.call(obj) === '[object Function]';
	}
	/**
	 * 创建dom对象
	 * @DateTime 2016-01-11
	 * @param    {String}     tag     标签名
	 * @param    {Object}     attrMap 属性对象
	 * @return   {Object}             dom对象
	 */
	function createDom(tag,attrMap){
		var domObj = document.createElement(tag);
		for(var attr in attrMap){
			domObj[attr] = attrMap[attr];
		}
		return domObj;
	}
	/**
	 * 获取指定的cookie值
	 * @DateTime 2016-01-12
	 * @param    {String}     cookieName cookie名称
	 * @return   {String}                cookie值
	 */
	function getCookie(cookieName) {
		var aCookie = document.cookie.split("; ");

		for(var i = 0; i < aCookie.length; i++){
			var arr = aCookie[i].split("=");
			if(cookieName == arr[0]){
				return arr[1];
			}
		}
		return "";
	}

	/**
	 * 调用ajax请求
	 * @method assembleParam
	 * @param    {Object}   para:json的name  ，isAsync
	 */
	function assembleParam(para,isAsync,callbackfn){
		var metaData = {
			url: "../../leauto/"+para+".json?id=201",
			method: "GET",
			async: isAsync,
			tag: "tag1",
			modulename: para,
			operation: "init",
			tokenid: "11111111",
			type: "single",
			fn:callbackfn
		};
		var servicesList = {
			"before": [
				"safeValidater",
				"validater"
			],
			"after": [
				"dataAdapter",
				"validater"
			]
		};
		var data = {};
		return {
			metaData:metaData,
			servicesList:servicesList,
			data:data
		}
	}

	/**
	 * 调用ajax请求
	 * @method assembleBackData
	 * @param    {Object}  调后台的接口，取数据
	 */
	function assembleBackData(modulename,operation,callbackfn){
		var servicesList = {
			"before": [

			],
			"after": [
				"dataAdapter",
				"validater"
			]
		};
		var metaData = {
			url: "../../action_test",
			method: "POST",
			async: false,
			tag: "tag3",
			modulename: modulename,
			operation: operation,
			tokenid: "0faec02c73744e269439e8b3ff5f98",
			type: "single",
			fn:callbackfn
		};
		var data = {};
		return {
			metaData:metaData,
			servicesList:servicesList,
			data:data
		}
	}

	/**
	 * 对象的深复制
	 * @method deepClone
	 * @param  {Object}     obj 源对象
	 * @return {Object}         新对象
	 */
	function deepClone(obj){
		var result = {};
		for(var key in obj){
			if(typeof obj[key] === 'object'){
				deepClone(obj[key]);
			}else{
				result[key] = obj[key];
			}
		}
		return result;
	}

	/**
	 * judgeInterface
	 * @method judgeInterface
	 * @param  {}   开启后台数据或者静态数据的开关
	 * @return {}   html中data-type为1 则开后台通道；不为1则为静态json数据
	 */
	function judgeInterface(){
		if($("html").attr("data-type")!="1"){
			return false;
		}else{
			return true;
		}
	}

	/**
	 * judgeGrade
	 * @method judgeGrade
	 * @param  {}   汽车体检评分是否无障碍的开关
	 * @return {}   html中data-grade为OK 则汽车体检无故障；no则为有故障
	 */
	function judgeGrade(){
		return $("html").attr("data-grade");
	}

	/**
	 * judgeTrouble
	 * @method judgeTrouble
	 * @param  {}   汽车体检评分是否无障碍的开关
	 * @return {}   html中data-grade为OK 则汽车体检无故障；no则为有故障
	 */
	function judgeTrouble(){
		return $("html").attr("data-trouble");
	}

	/**
	 * judgeFence
	 * @method judgeFence
	 * @param  {}   是否跨出电子围栏
	 * @return {}   html中data-fence为1 则跨出；0则为没跨出
	 */
	function judgeFence(){
		return $("html").attr("data-fence");
	}

	/**
	 * judgeMap
	 * @method judgeMap
	 * @param  {}   是否跨出电子围栏
	 * @return {}   html中data-map为scott是高德地图  google是谷歌地图
	 */
	function judgeMap(){
		return $("html").attr("data-map");
	}

	/**
	 * format
	 * @method format
	 * @param  {}  s时间格式化
	 * @return {}
	 */
	function format(){
		var o = {
			"M+": this.getMonth() + 1, //month
			"d+": this.getDate(), //day
			"h+": this.getHours(), //hour
			"m+": this.getMinutes(), //minute
			"s+": this.getSeconds(), //second
			"q+": Math.floor((this.getMonth() + 3) / 3), //quarter
			"S": this.getMilliseconds() //millisecond
		}
		var format = (DateFormat) ? DateFormat : defaultFormat;
		if (/(y+)/.test(format)) {
			format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
		}

		for (var k in o) {
			if (new RegExp("(" + k + ")").test(format)) {
				format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
			}
		}
		return format;
	}

	return {
		isFunction: isFunction,
		createDom: createDom,
		getCookie:getCookie,
		assembleParam:assembleParam,
		assembleBackData:assembleBackData,
		deepClone:deepClone,
		judgeInterface:judgeInterface,
		judgeGrade:judgeGrade,
		judgeTrouble:judgeTrouble,
		judgeFence:judgeFence,
		judgeMap:judgeMap
	}

});