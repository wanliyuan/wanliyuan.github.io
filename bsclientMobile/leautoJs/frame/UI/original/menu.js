/**
 * bootstrap菜单组件
 * @module menu
 */
define(['jquery','initComponent','serviceManager','bindEvent','publicUtils'],function($,initComponent,serviceManager,bindEvent,utils){

    var menuParent = null,comConfig;


    /**
     * 生成菜单
     * @method loadMenu
     * @param   (datas)
     */
    function loadMenu(datas) {
        var nav = utils.createDom('nav',{});
        nav.className = isNull(comConfig.navClass);
        var ulLeft = utils.createDom('ul',{});
        ulLeft.className = isNull(comConfig.ulLeftClass);
        var menuLiArr = assembleTopMenu(datas);//生成一级菜单
        for(var i=0;i<menuLiArr.length;i++){
            ulLeft.appendChild(menuLiArr[i]);
        }
        nav.appendChild(ulLeft);
        return nav;
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
     * 生成菜单
     * @method assembleTopMenu
     * @param   (datas)
     */
    function assembleTopMenu(datas){
        var liArray = [];
        var items = datas.items;
        for(var i=0;i<items.length;i++){
            var disnoneClass = (items[i]["num"])?"":"disnone";
            var li = utils.createDom('li',{
                'className':comConfig.liClass,
                'id' : items[i].name,
                'innerHTML': '<a href="javascript:void(0);" class='+ comConfig.aClass +'">'
                + items[i]["displayname"] +'<span class='+disnoneClass+'>' + items[i]["num"] +'</span></a>'
            });
            liArray.push(li);
            addEvent(li);
        }
        return liArray;
    }

    /**
     * 菜单数据请求回调函数
     * @method menuCallback
     * @param   (result)
     */
    function menuCallback(result) {
        if(result["success"]){
            var menuDatas = result["data"];
            var navObj = loadMenu(menuDatas);
            menuParent.appendChild(navObj);
            $(".menu").css("height",$(document).height()-$(".head").height()-$(".topWrap").height());
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
                evObj.initEvent('menu_click', true, false);
                domObj.dispatchEvent(evObj);
            } else if (document.createEventObject) {
                domObj.fireEvent('menu_click');
            }
        });
    }

	return {
        name: 'menu',
        getComponent: function(parent,config) {
            menuParent = parent;
            comConfig = config.config;
            var paramObj = utils.assembleParam('menu',false,menuCallback);
            serviceManager.send(paramObj.servicesList,paramObj.metaData, paramObj.data);
        }
    }
});
