/**
 * bootstrap容器组件，承载每个页面的容器
 * @module container
 */
define(['jquery','initComponent','bindEvent','serviceManager','form'],function($,initComponent,bindEvent,serviceManager,form){
    var comParent = null,comConfig;
	/**
	 * 创建组件-私有方法
	 * @method createComponent
	 * @return {[Object]}     container的dom对象
	 */
	function createComponent(para){
		var com = require('publicUtils').createDom('div',{
			'className':comConfig.className
		});
        com.initChild = function(event){
            if(com.innerHTML!=""){
                com.innerHTML = "";
            }
			//id作为modulename发请求
            var paramObj = require('publicUtils').assembleParam(event.target.id,true,queryItemCallback);
            serviceManager.send(paramObj.servicesList,paramObj.metaData, paramObj.data);
		}
		return com;
	}

    /**
     * 数据请求回调函数
     * @method queryItemCallback
     * @param    {Object}     result 请求返回数据
     */
	function queryItemCallback(result){
		if (result["success"]) {
            var config = result["data"];
            var com = initComponent.checkComponent(comParent, config);
        }
	}

    /**
     * 生成子组件
     * @method createChildren
     * @param   (com, config)
     */
    function createChildren(com, config) {
        return initComponent.checkComponent(com, config);
    }

    /**
     * 添加事件监听
     * @method bindListener
     * @param  {[Object]}     component  事件接受对象
     */
    function bindListener(component) {
        //请求到的事件配置数据
        var eventConfig = [{
            parent: "mainFrame",
            senderEvent: "menu_click",
            receiverFn: "initChild"
        },{
            parent: "mainFrame",
            senderEvent: "button_click",
            receiverFn: "initChild"
        },{
            parent: "mainFrame",
            senderEvent: "enterMap_click",
            receiverFn: "initChild"
        },{
            parent: "mainFrame",
            senderEvent: "backMonitor_click",
            receiverFn: "initChild"
        }];
        if (eventConfig) {
            for (var i = 0; i < eventConfig.length; i++) {
                bindEvent.bindListener(component, eventConfig[i]);
            }
        }
    }

	return {
		name : 'container',
		getComponent: function(parent,config,para){
            comConfig = config.config;
			var com = createComponent(para);
			bindListener(com);
			$(parent).append(com);
            createChildren(com, config);
			comParent = com;
			return comParent;
		}
	}
});