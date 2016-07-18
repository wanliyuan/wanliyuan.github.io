define(['bindEvent', 'initComponent','jquery','serviceManager','wrapper','publicUtils'], function(bindEvent, initComponent,$,serviceManager,wrapper,utils) {
    var comParent = null;
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
    function createComponent(config){
        var com = utils.createDom('div', config);
        com.className =  (config.className)? config.className : "";  // checkLight,checkBus,checkFK
        com.innerHTML =  (config.innerHTML)? config.innerHTML : "";
        com.id =  (config.id)? config.id : "";
        var paramObj;
        //alert(com.id);
        setTimeout(function () {
            var paramObj = utils.assembleParam(com.id,true,queryItemCallback);
            serviceManager.send(paramObj.servicesList,paramObj.metaData, paramObj.data);
        },3000);
        return com;
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
        getComponent: function(parent, config) {
            createComponent(config.config);
        }
    }
});