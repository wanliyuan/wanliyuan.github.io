/**
 * 消息订阅模块
 * @module asyncInfo
 */
define(["AOP","messageProcess","publicUtils"],function(AOP, messageProcess, util){
	var innerMetaData = {};
	var innerData = {};
	var handler = null;
	/**
	 * 建立消息通道
	 * @method registerToSrv
	 * @param  {Object}     metaData 请求元数据
	 */
	function registerToSrv(metaData) {
		var meta = {
			url : metaData["url"],
			method : metaData["method"],
			modulename : metaData["modulename"],
			operation : "query",
			async: metaData["async"],
			type : "single",
			tag : metaData["tag"],
			tokenid : metaData["tokenid"],
			client_id : metaData["tokenid"],
			fn : function(result){
				if (result["success"]) {
					registerToAOP();
				}			
			}		
		}
		var data = {
			tag : metaData.tag,
			client_id : metaData.tokenid
		}
		AOP.send(meta,data,meta.fn); //发送通道请求
	}

	/**
	 * 轮询请求并执行回调函数
	 * @method registerToAOP
	 */
	function registerToAOP() {		
		handler = AOP.send({
			url : innerMetaData["url"],
			method : innerMetaData["method"],
			modulename : innerMetaData["modulename"],
			operation : "query",
			async: innerMetaData["async"],
			type : "cycle",
			tag : innerMetaData["tag"],
			tokenid : innerMetaData["tokenid"],
			fn : innerMetaData["fn"]    //实际需要执行的回调函数
		},innerData,new Function());
	}

	/**
	 * 断开通道
	 * @method unregisterToSrv
	 */
	function unregisterToSrv(){
		AOP.send({
			url : innerMetaData["url"],
			method : innerMetaData["method"],
			modulename : innerMetaData["modulename"],
			operation : "query",
			async: innerMetaData["async"],
			type : "single",
			tag : Ext.id(),
			fn : null
		},{},new Function());
	}

	return {
		/**
		 * 启动消息处理方法并建立通道--服务层统一入口方法
		 * @method {methodname}
		 * @param  {Object}     metaData 请求元数据
		 * @param  {Object}     data     请求参数
		 */
		doService : function(metaData, data){
			messageProcess.start(); //启动消息处理服务
			data.started = messageProcess.started; //获取启动标志

			innerMetaData = util.deepClone(metaData);
			innerData = util.deepClone(data);

			registerToSrv(metaData);	//建通道
			this.subscription(metaData,data); //发送消息订阅
		},
		/**
		 * 发送消息订阅
		 * @method subscription
		 * @param  {Object}     metaData 请求元数据
		 * @param  {Object}     data     请求参数
		 */		
		subscription : function(metaData,data){
			data.tag = metaData.tag;
			metaData["type"] = "single";
			metaData["operation"] = data.checked ? "retr" : "unretr"; //retr消息订阅，unretr取消消息订阅
			metaData["tag"] = (metaData["operation"] == "retr" ? "info" : "uninfo");
			metaData["client_id"] = data["client_id"];
				
			AOP.send(metaData,data,new Function());
		},
		/**
		 * 取消注册
		 * @method onDispose
		 */
		onDispose : function(){
			unregisterToSrv();
			try{
				AOP.unregister(handler);
			}catch(e){}
		}
	}
})