define(['bindEvent', 'initComponent','scrollli','jquery','jquerytouchSlider'], function(bindEvent, initComponent, scrollli,$,touchSlider) {
    var comConfig;
    /**
     * 调用initComponent模块，创建子对象
     * @param config 初始化所用的参数
     */
    function createChildren(com, config) {
        return initComponent.checkComponent(com, config);
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
    function createComponent(config) {
        var com = require('publicUtils').createDom('div', config),
            comTabTip = require('publicUtils').createDom('div', config),
            comTabTipInner = require('publicUtils').createDom('div', config),
            comTabCon = require('publicUtils').createDom('div', config);
        com.className = isNull(config.comClass);
        comTabTipInner.className = isNull(config.comTabTipInnerClass);
        comTabTipInner.id = isNull(config.comTabTipInnerId);
        comTabTipInner.innerHTML = "<a href='javascript:void(0);'></a><a href='javascript:void(0);'></a>";
        comTabTip.className = isNull(config.comTabTipClass);
        comTabCon.className = isNull(config.comTabConClass);
        comTabCon.id = isNull(config.comTabConId);
        comTabCon.innerHTML = "<ul></ul>";
        comTabTip.appendChild(comTabTipInner);
        com.appendChild(comTabTip);
        com.appendChild(comTabTip);
        com.appendChild(comTabCon);
        return com;
    }

    /**
     * tabItems的滑动切换的效果
     * @param objId:被切换的对象,parentElesId：用于切换的标识tip的父级,curClass：用于切换的标识tip的当前class
     */
    function tabAnimate(objId,parentElesId,curClass){
        $dragBln = false;
       $("#"+objId).touchSlider({
            flexible : true,
            speed : 200,
            paging :$("#"+ parentElesId).find("a"),
            counter : function (e) {
                $("#"+ parentElesId).find("a").removeClass(curClass).eq(e.current-1).addClass(curClass);
            }
        });
    }

    return {
        getComponent: function(parent, config) {
            var com = createComponent(config.config);
            comConfig = config.config;
            createChildren(com,config);
            parent.appendChild(com);
            tabAnimate(comConfig.comTabConId,comConfig.comTabTipInnerId,comConfig.tipCurClass);
        }
    }
});