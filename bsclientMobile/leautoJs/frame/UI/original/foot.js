define(['bindEvent', 'initComponent','publicUtils','serviceManager'], function(bindEvent, initComponent,utils,serviceManager) {
    var comParent = null,comConfig;
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
    function loadDatas(datas) {
        var com = utils.createDom('div',{});
        com.className = comConfig.className;
        com.innerHTML = "<em class='arrow-up'></em>" +
            "<h3>"+datas.footTitle+"</h3>" +
            "<p>"+datas.footText+"</p>";
        return com;
    }

    /**
     * 数据请求回调函数
     * @method dataCallback
     * @param    {Object}     result 请求返回数据
     */
    function dataCallback(result) {
        if(result["success"]){
            var menuDatas = result["data"];
            var navObj = loadDatas(menuDatas);
            comParent.appendChild(navObj);
            navObj.className = (utils.judgeGrade()=="ok")?"foot":"foot footErr";
        }
    }

    /**
     * 调用后台listBus数据的函数
     * @method assembleListbusAction
     * @param   无
     */
    function assembleFootbusAction(para){
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
            modulename: "tbox",
            operation: para,
            type:"single",
            tokenid: "0faec02c73744e269439e8b3ff5f98",
            fn:dataCallback
        };
        var data = {};
        serviceManager.send(servicesList, metaData, data);
    }

    /**
     * 调用json数据的函数
     * @method assembleParamStatic
     * @param   无
     */
    function assembleParamStatic(para){
        var paramObj = utils.assembleParam(para,false,dataCallback);
        serviceManager.send(paramObj.servicesList,paramObj.metaData, paramObj.data);
    }

    return {
        name: 'foot',
        getComponent: function(parent, config) {
            comParent = parent;
            comConfig = config.config;
            var footBusType = (utils.judgeGrade()=="ok")?"footBus":"footBusBreak";
            if(utils.judgeInterface()){
                assembleFootbusAction(footBusType);
            }else{
            assembleParamStatic(footBusType);
            }
        }
    }
});