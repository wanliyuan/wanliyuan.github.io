/**
 * 主界面组件
 * @module mainFrame
 */
define(['bindEvent', 'initComponent','wrapper'], function(bindEvent, initComponent,wrapper) {

    /**
     * 调用initComponent模块，创建子对象
     * @param config 初始化所用的参数
     * @return {[Array]}     组件对象数组
     */
    function createChildren(com, config) {
        return initComponent.checkComponent(com, config);
    }

    /**
     * 创建组件，不限制组件类型
     * @param config 初始化所用的参数
     * @return {[Object]}     dom对象
     */
    function createComponent(config) {
        var com = require('publicUtils').createDom('div', config);
        return com;
    }

    /**
     * 注册事件
     * @method bindEvents
     * @param  {[Object]}     component  事件注册对象
     */
    function bindEvents(component) {
        //请求到的事件参数
        var eventConfig = ['menu_click',"button_click","enterMap_click","backMonitor_click","autoDraw_click","manualDraw_click","switch_click","cancel_click",
        "chargeLi_change","countLi_change","countLi_keyup","stopcharge_click","delLayer_click"];
        bindEvent.bindEvents(component, eventConfig);
    }

    return {
        getComponent: function(parent, config) {
            var com = createComponent(config.config);
            bindEvents(com);
            parent.appendChild(com);
            createChildren(com, config);
        }
    }
});