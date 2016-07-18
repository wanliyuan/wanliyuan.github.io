define(['bindEvent', 'initComponent'], function(bindEvent, initComponent) {

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
        var button = require('publicUtils').createDom('input', config);
        button.type = 'button';
        button.className = config.className?config.className:"";
        button.addEventListener('click', function(target, e, eventName) {
            if (document.createEvent) {
                var evObj = document.createEvent('MouseEvents');
                evObj.initEvent('button_click', true, false);
                button.dispatchEvent(evObj);
            } else if (document.createEventObject) {
                button.fireEvent('button_click');
            }
        });
        return button;
    }

    return {
        getComponent: function(parent, config) {
            var com = createComponent(config.config);
            parent.appendChild(com);
            createChildren(com, config);
        }
    }
});