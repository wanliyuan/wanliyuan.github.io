define(["jqueryAjax"],function(jqueryAjax){

	var scope = null;

	/**
	 * 轮询Ajax请求
	 * @method pollingRequest
	 * @param  {Object}     metaData 请求元数据
	 * @param  {Object}     data     请求参数
	 */
	function pollingRequest(metaData,data){
		scope.callbackMatrix[metaData["tag"]] = metaData;
		if(!data.started || !scope.callbackMatrix[metaData["tag"]]){
			return;
		}
		var	retime = metaData.interval || 3000;
		scope.register(metaData);
		jqueryAjax.send(metaData,data,function(result){
			scope.processInfo(result);
			if(!result.success){
				retime = 1000;
			}
			setTimeout(function(){ //循环请求
				pollingRequest(metaData,data);
			},retime);
		});
	}

	return {
		callbackMatrix : {},
		sendqueue : [],  //消息发送队列
		/**
		 * 调用jqueryAjax组件模块的方法，发起ajax请求
		 * @method send
		 * @param    {Object}     metaData 参数基础数据
		 * @param    {Object}     data     请求参数
		 * @return   {Object}              请求元数据
		 */
		send : function(metaData, data, callback){
			scope = this;
			if (!metaData || !metaData.tag || !metaData.fn) {
				return null;
			}
			if(metaData.type == "single"){ //单次请求
				this.register(metaData); //注册回调
				jqueryAjax.send(metaData,data,callback); //发送请求
				return;
			}
			if(metaData.type == "cycle"){  //循环请求
				pollingRequest(metaData,data);
			}
			scope.sendqueue.push({
				data : data,
				metaData : metaData
			});
			return metaData;
		},

		/**
		 * 执行回到函数
		 * @method processInfo
		 * @param  {Object}     info 请求返回数据
		 */
		processInfo : function(info){
			if(!info){
				return;
			}
			var matrix = this.callbackMatrix;
			var metaData = matrix[info["tag"]];
			if(!metaData){
				return;
			}
			try {
				metaData.fn(info.success ? info.data : info,metaData,info.success);
			} catch (e) {
				var text = ["调用回调函数时出现错误!\n","处理类型:",info["tag"],"出错原因：",e,"\n回调函数:",metaData.fn];
				console.log(text.join(""));
			}
			if(metaData.type=="single"){ // 清理注册
				this.unregister(metaData);
			}
		},

		/**
		 * 注册请求
		 * @method register
		 * @param  {Object}     metaData 请求元数据
		 * @return {Object}              请求元数据
		 */
		register : function(metaData){
			if(!metaData || !metaData.tag){
				return;
			}
			var tag = metaData.tag;
			if(!this.callbackMatrix[tag]){
				metaData.requestTime = new Date();
				this.callbackMatrix[tag] = metaData;
			}
			return metaData;
		},

		/**
		 * 清理注册
		 * @method unregister
		 * @param  {Object}     metaData 请求元数据
		 */
		unregister : function(metaData){
			if (!metaData || !metaData.tag) {
				return false;
			}
			var tag = metaData.tag;
			if(this.callbackMatrix[tag]){ //列表中存在，则从列表中删除相应tag
				delete this.callbackMatrix[tag];
			}
		}
	};
});