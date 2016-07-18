define(['bindEvent', 'initComponent','publicUtils',"serviceManager"], function(bindEvent, initComponent,utils,serviceManager) {
    /**
     * 调用initComponent模块，创建子对象
     * @param config 初始化所用的参数
     */
    function createChildren(com, config) {
        return initComponent.checkComponent(com, config);
    }

    /**
     * 创建组件，不限制组件类型
     * @param config 初始化所用的参数
     */
    function createComponent(config) {
        var com = utils.createDom('div', config),
            outerFenceObj =  utils.createDom('div', config),
            footObj =  utils.createDom('div', config);
        outerFenceObj.className = config.fenceClass;
        outerFenceObj.innerHTML = config.fenceText;
        footObj.className = config.footClass;
        footObj.innerHTML = config.footText;
        addEvent(footObj);
        com.appendChild(outerFenceObj);
        com.appendChild(footObj);
        return com;
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
            senderEvent: "cancel_click",
            receiverFn: "cancelEnterMap"
        }];
        if (eventConfig) {
            for (var i = 0; i < eventConfig.length; i++) {
                bindEvent.bindListener(component, eventConfig[i]);
            }
        }
    }

    /**
     * menu菜单绑定menu_click
     * @method addEvent
     * @param  {Object}     domObj 绑定事件对象
     */
    function addEvent(domObj){
        $(domObj).bind('click',function(target) {
            if (document.createEvent) {
                var evObj = document.createEvent('MouseEvents');
                evObj.initEvent("cancel_click", true, false);
                domObj.dispatchEvent(evObj);
            } else if (document.createEventObject) {
                domObj.fireEvent("cancel_click");
            }
        });
    }

    /**
     * 数据请求回调函数
     * @method queryItemCallback
     * @param    {Object}     result 请求返回数据
     */
    function queryItemCallback(result) {
      if (result["success"]) {
            var config = result["data"];
            document.getElementsByTagName("body")[0].innerHTML = "";
            var com = initComponent.checkComponent(document.getElementsByTagName("body")[0], config);
        }
    }

    return {
        name: 'outerFence',
        getComponent: function(parent, config) {
            var com = createComponent(config.config);
            parent.appendChild(com);

            //跨出围栏实时监控
             var timer = setTimeout(function () {
                var paramObj = utils.assembleParam("fenceMap",true,queryItemCallback);
                serviceManager.send(paramObj.servicesList, paramObj.metaData, paramObj.data);
             },3000) ;
            com.cancelEnterMap = function () {
                alert("已取消");
                clearTimeout(timer);
            }
            bindListener(com);
            createChildren(com, config);
        }
    }
});