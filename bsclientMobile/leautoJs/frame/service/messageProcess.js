/**
 * 消息处理模块
 * @module messageProcess
 */
define(["AOP","publicUtils"],function(AOP,util){
	var scope = null;
	/**
	 * 循环处理发送队列
	 * @method cycleRequest
	 */
	function cycleRequest() {
		if(!scope.started){
			return;
		}
		if(AOP.sendqueue.length > 0){ //发送队列中有消息
			var seq = AOP.sendqueue.shift(),
				metaData = seq.metaData,
				data = seq.data,
				retime = AOP.sendqueue.length > 0 ? 10 : 1000;

			AOP.send(metaData,data,function(result){
				scope.queue.push(result);
				if(!result.success){
					retime = 1000;
				}
				setTimeout(function(){ //循环请求
					cycleRequest();
				},retime);
			});
		}else { //发送队列为空
			setTimeout(function(){ //循环请求
				cycleRequest();
			},1000);			
		}
	}

	/**
	 * 循环处理消息队列
	 * @method processPolling
	 */
	function processPolling(){
		if(!scope.started){
			return;
		}
		var selfFn = arguments.callee;
		if(scope.queue.length > 0){
			var info = scope.queue.shift();
			AOP.processInfo(info); 
			if(scope.queue.length > 0){
				setTimeout(function(){
					processPolling();
				},5);
			}
		}
		setTimeout(function(){
			processPolling();
		},1000);
	}

	/**
	 * 超时检测
	 * @method checkAsyncTimeOut
	 */
	function checkAsyncTimeOut(){
		var t = 150,
			matrix = AOP.callbackMatrix,
			now = new Date();
		for(var tag in matrix){
			var metaData = matrix[tag];
			if(metaData && (now - metaData.requestTime) >= (metaData.timeout || t*1000) && metaData.type == "single"){
				metaData.fn.call(metaData.scope || scope,{success : false,msg : "请求超时！",type : "timeout"},false);
				AOP.unregister(metaData);
			}
		}
		setTimeout(function(){
			checkAsyncTimeOut()
		},2000);
	}

	/**
	 * 更改服务处理状态
	 * @method changedStatus
	 * @param  {String}     status 状态
	 */
	function changedStatus(status){
		if(scope.status != status) {
			scope.status = status;
		}
		scope.status = status;		
	}

	return {
		status : 'stop', //处理状态
		started : false, //启动标志
		queue : [],		 //消息处理队列

		/**
		 * 启动消息处理服务
		 * @method start
		 */
		start : function() { 
			scope = this;
			if(scope.started) {
				console.log("消息处理服务已经启动！");
				return;
			}
			scope.started = true;
			cycleRequest();
			processPolling();
			checkAsyncTimeOut();
			changedStatus('start');
		},
		stop : function(){
			this.started = false;
			changedStatus('stop');
		},
		doService : function(metaData,data){
			data.started = this.started;
			return data;
		}
	}
})