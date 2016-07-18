define(['bindEvent', 'initComponent','li'], function(bindEvent, initComponent,li) {
    /**
     * 调用initComponent模块，创建子对象
     * @param config 初始化所用的参数
     */
    function createChildren(com, config) {
        initComponent.checkComponent(com, config);
    }

    /**
     * 创建组件，不限制组件类型
     * @param config 初始化所用的参数
     */
    function createComponent(config) {
        var com  = require('publicUtils').createDom('ul', config);
        com.className =  (config.className)? config.className : "";
        com.innerHTML =  (config.innerHTML)? config.innerHTML : "";
        return com;
    }

    return {
        getComponent: function(parent, config) {
            var com = createComponent(config.config);
            parent.appendChild(com);
            var items = createChildren(com, config);
        }
    }
});