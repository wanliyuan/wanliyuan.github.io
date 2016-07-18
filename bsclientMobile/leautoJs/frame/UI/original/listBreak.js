define(['bindEvent', 'initComponent','serviceManager'], function(bindEvent, initComponent,serviceManager) {
    var comParent = null,comConfig;
    /**
     * 调用initComponent模块，创建子对象
     * @param config 初始化所用的参数
     */
    function createChildren(com, config) {
        return initComponent.checkComponent(com, config);
    }

    /**
     * 简化createDom
     * @method createDom
     * @param   (tag,attrMap)
     */
    function createDom(tag,attrMap){
        return  require('publicUtils').createDom(tag, attrMap);
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
    function loadDatas(datas) {
        var list = createDom('div',{}),listTitle = createDom('h3',{}),
            shopTitle = createDom('h3', {});
        list.className = isNull(comConfig.listClass);
        listTitle.innerHTML = isNull(datas.listTitle);
        shopTitle.innerHTML = isNull(datas.shopTitle);
        shopTitle.className =isNull(comConfig.shopTitleClass);
        list.appendChild(listTitle);
        var listParaUl = createDom('ul',{}),listShopUl = createDom('ul',{});
        listParaUl.className = listShopUl.className =  isNull(comConfig.listUlClass);
        var dataPara =  datas.paraDetails,dataShop =  datas.shopDetails;
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

    return {
        getComponent: function(parent, config) {
            comParent = parent;
            comConfig = config.config;
            var paramO = require('publicUtils').assembleParam("listBreak",false,dataCallback);
            serviceManager.send(paramO.servicesList,paramO.metaData,paramO.data);
        }
    }
});