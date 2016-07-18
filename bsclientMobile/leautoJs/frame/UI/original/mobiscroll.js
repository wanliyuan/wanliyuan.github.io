define(['mobiscrollJs','bindEvent', 'initComponent','mobiscrollDate'], function(mobiscrollJs,bindEvent, initComponent,datetime) {
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
        var input = require('publicUtils').createDom('input', config);
        input.type = "text";
        input.placeholder ="点击可选择时间";
        input.readOnly = "readOnly";
        return input;
    }

    return {
        getComponent: function(parent, config) {
            var com = createComponent(config.config);
            parent.appendChild(com);
            createChildren(com, config);
            var opt={};
            opt.date = {preset : 'date'};
            opt.datetime = {preset : 'datetime'};
            opt.time = {preset : 'time'};
            opt.default = {
                theme: 'android-ics light', //皮肤样式
                display: 'modal', //显示方式
                mode: 'scroller', //日期选择模式
                lang:'zh'
            };
            var optTime = $.extend(opt['time'], opt['default']);
            $(com).mobiscroll(optTime).time(optTime);
        }
    }
});