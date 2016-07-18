define(['bindEvent', 'initComponent','battery',"button"], function(bindEvent, initComponent,battery,button) {
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
        var com = require('publicUtils').createDom('div', config);
        return com;
    }

    return {
        name: 'div',
        getComponent: function(parent, config) {
            var com = createComponent(config.config);
            parent.appendChild(com);
            createChildren(com, config);
        }
    }
});