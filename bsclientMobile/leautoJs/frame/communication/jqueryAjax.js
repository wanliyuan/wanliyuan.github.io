/**
 * jquery的ajax组件
 * @module jqueryAjax
 */
define(['jquery'],function($){

	/**
	 * 处理Ajax请求回调函数，私有方法
	 * @method responseProcess
	 * @param    {Function}   callback 回调函数
	 */
	function responseProcess(callback){
		return function(data){
			var res = data;
			res.success = res.status > -100 ? true : false;
			callback.call(this,res);
		}
	}

	return {
		send : function(metaData, data, callback){

			var seqParam = {
				modulename : metaData["modulename"],
				tag		   : metaData["tag"],
				operation  : metaData["operation"],
				tokenid    : metaData["tokenid"],
				data	   : data
			};
			var repFun = responseProcess.call(this,callback);

			$.ajax({
				url : metaData["url"],
				method : metaData["method"],
				async  : metaData["async"],//ajax是否异步
				dataType : 'json',
				data : {
					parameter: JSON.stringify(seqParam)
				},
				success : repFun
			});
		}
	};

});