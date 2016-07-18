define(['bootstrap','bindEvent', 'initComponent','serviceManager','publicUtils'], function(bootstrap,bindEvent, initComponent,serviceManager,utils) {
    var comParent = null,comConfig;
    /**
     * 调用initComponent模块，创建子对象
     * @param config 初始化所用的参数
     */
    function createChildren(com, config) {
        return initComponent.checkComponent(com, config);
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
        }
    }

    /**
     * listBreak数据请求回调函数
     * @method dataCallback
     * @param    {Object}     result 请求返回数据
     */
    function dataBreakCallback(result) {
        if(result["success"]){
            var menuDatas = result["data"];
            var navObj = loadBreakDatas(menuDatas);
            comParent.appendChild(navObj);
        }
    }

    /**
     * 简单判断下非空
     * @method isNull
     * @param   (parameter)  传进来的参数
     */
    function isNull(parameter){
        return (parameter)? parameter : "";
    }

    /**
     * 创建组件，不限制组件类型
     * @param config 初始化所用的参数
     */
    function loadDatas(datas)  {
        var list = require('publicUtils').createDom('div', {});
        list.className = isNull(comConfig.listClass);
        var listUl = require('publicUtils').createDom('ul', {});
        listUl.className = isNull(comConfig.listUlClass);
        var dataPara = datas.paraDetails;
        var ulhtml = "";
        if (dataPara[0].hasOwnProperty("tel") ) {
            for (var i = 0; i < dataPara.length; i++) {
                var index = 1 + i;
                var li = "<li class="+ isNull(comConfig.listliClass) +"><i>" + index + "</i><span>" + dataPara[i].paraName + "</span><em>" + dataPara[i].paraNum + "</em><a href="+"tel:"+dataPara[i].tel+"><img src='/leautoImg/phone.png'></a></li>";
                ulhtml += li;
            }
        }
        else if (comConfig.id=="listLight") {
            for (var i = 0; i < dataPara.length; i++) {
                var index = 1 + i;
                var li = "<li class="+ isNull(comConfig.listliClass) +"><i>" + index + "</i><span>" + dataPara[i].paraName + "</span><b><small style='width:"+dataPara[i].paraNum+"'></small></b><em>" + dataPara[i].paraNum + "</em></li>";
                ulhtml += li;
            }
        }
        else {
            var listTitle = document.createElement('h3');
            listTitle.innerHTML = datas.listTitle;
            list.appendChild(listTitle);
            for (var i = 0; i < dataPara.length; i++) {
                var index = 1 + i;
                var li = "<li class="+ isNull(comConfig.listliClass) +"><i>" + index + "</i><span>" + dataPara[i].paraName + "</span><em>" + dataPara[i].paraNum + "</em></li>";
                ulhtml += li;
            }
        }
        listUl.innerHTML = ulhtml;
        list.appendChild(listUl);
        return list;
    }

    /**
     * 创建组件，不限制组件类型
     * @param config 初始化所用的参数
     */
    function loadBreakDatas(datas) {
        var list = utils.createDom('div',{}),
            listTitle = utils.createDom('h3',{}),
            shopTitle = utils.createDom('h3', {});
        list.className = isNull(comConfig.listClass);
        listTitle.innerHTML = isNull(datas.listTitle);
        shopTitle.innerHTML = isNull(datas.shopTitle);
        shopTitle.className =isNull(comConfig.shopTitleClass);
        list.appendChild(listTitle);
        var listParaUl = utils.createDom('ul',{}),
            listShopUl = utils.createDom('ul',{});
        listParaUl.className = listShopUl.className =  isNull(comConfig.listUlClass);
        var dataPara =  datas.paraDetails,
            dataShop =  datas.shopDetails;
        var paraUl = "",shopUl = "";
        for(var i=0;i<dataPara.length;i++){
            var index = 1+i;
            var li = "<li><i>"+ index +"</i><span>"+ dataPara[i].paraName +"</span><em>"+ dataPara[i].paraNum +"</em></li>";
            paraUl += li;
        }
        listParaUl.innerHTML = paraUl;
        for(var i=0;i<dataShop.length;i++){
            var index = 1+i;
            var li = "<li><i>"+ index +"</i><span>"+ dataShop[i].shopName +"</span><em>"+ dataShop[i].distance +"</em></li>";
            shopUl += li;
        }
        listShopUl.innerHTML = shopUl;
        list.appendChild(listParaUl);
        list.appendChild(shopTitle);
        list.appendChild(listShopUl);
        return list;
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

    /**
     * 调用后台listBus数据的函数
     * @method assembleListbusAction
     * @param   无
     */
    function assembleListbusAction(para){
        var resultCallback = (para=="listBus")?dataCallback:dataBreakCallback;
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
            fn:resultCallback
        };
        var data = {};
        serviceManager.send(servicesList, metaData, data);
    }

    /**
     * 调用listBus的json数据的函数
     * @method assembleStatic
     * @param   para  参数
     */
    function assembleBusStatic(para){
        var resultCallback = (para=="listBus")?dataCallback:dataBreakCallback;
        var paramO = utils.assembleParam(para,false,resultCallback);
        serviceManager.send(paramO.servicesList,paramO.metaData,paramO.data);
    }

    /**
     * 调用其他list的json数据的函数
     * @method assembleStatic
     * @param   para  参数
     */
    function assembleOtherStatic(para){
        var paramO = utils.assembleParam(para,false,dataCallback);
        serviceManager.send(paramO.servicesList,paramO.metaData,paramO.data);
    }

    /**
     * 调用listMonitor后台数据的函数
     * @method assembleParamAction
     * @param   无
     */
    function assembleMonitorAction(){
        var paramObj = utils.assembleBackData('tbox','listMonitor',dataCallback);
        serviceManager.send(paramObj.servicesList,paramObj.metaData, paramObj.data);
    }

    return {
        getComponent: function(parent, config) {
            comParent = parent;
            comConfig = config.config;
            //判断是否是进入汽车体检的list
            if(config.config.id=="listBus"){
                var paraBus;
                //判断是否出故障，没出故障则进入下一页面。
                if(utils.judgeGrade()=="ok"){
                    paraBus = "listBus";
                    setTimeout(function () {
                        var paramObj = require('publicUtils').assembleParam("busMonitor",true,queryItemCallback);
                        serviceManager.send(paramObj.servicesList,paramObj.metaData, paramObj.data);
                    },3000) ;
                }else{
                    paraBus = "listBreak";
                }
                //判断是否开后台通道。
                if(utils.judgeInterface()){
                    assembleListbusAction(paraBus);
                }else{
                    assembleBusStatic(paraBus);
                }
            }
            else if(config.config.id=="listMonitor"){
                //判断是否开后台通道。
                if(utils.judgeInterface()){
                    assembleMonitorAction(config.config.id);
                }else{
                    assembleOtherStatic(config.config.id);
                }
            }
            else{
                assembleOtherStatic(config.config.id);
            }
        }
    }
});