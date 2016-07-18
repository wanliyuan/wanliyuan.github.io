define(['bindEvent', 'initComponent', 'div','topMenu','ul','check','list','topLight','listBreak','topBus','topMonitor','map',"topCharge","tabItem","mapFence","menu","doorMonitor","detectCar","outerFence","fenceEnterMap","foot"],
    function(bindEvent, initComponent, div,topMenu,ul,check,list,topLight,listBreak,topBus,topMonitor,map,topCharge,tabItem,mapFence,menu,doorMonitor,detectCar,outerFence,fenceEnterMap,foot) {
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
        var com = require('publicUtils').createDom('form', config);
        com.className =  (config.className)? config.className : "";
        return com;
    }

    return {
        getComponent: function(parent, config) {
            var com = createComponent(config.config);
            parent.appendChild(com);
            createChildren(com, config);
        }
    }
});