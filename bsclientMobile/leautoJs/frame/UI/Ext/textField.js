define(['bindEvent', 'initComponent'], function(bindEvent, initComponent) {
    /**
     * 调用initComponent模块，创建子对象
     * @param config 初始化所用的参数
     */
    function createChildren(com, config) {
        return initComponent.checkComponent(com, config);
    }

    /**
     * 调用bindEvent模块绑定事件
     * @param component
     */
    function bindListener(component) {
        //请求到的事件配置数据
        var eventConfig = [{
            parent: "parent",
            senderEvent: "button_click",
            receiverFn: "setButtonValue"
        },{
            parent: "parent2",
            senderEvent: "treePanel_expandnode",
            receiverFn: "setTreeValue"
        }];
        if (eventConfig) {
            for (var i = 0; i < eventConfig.length; i++) {
                bindEvent.bindListener(component, eventConfig[i]);
            }
        }
    }
    /**
     * 创建组件，不限制组件类型
     * @param config 初始化所用的参数
     */
    function createComponent(config) {
        var textfield = new Ext.form.TextField(Ext.apply({
            name: "textField",
            blankText: "请输入数据",
            emptyText: "Ext输入框"
        }));
        textfield.setButtonValue = function(){
            textfield.setValue("button_click");
        }
        textfield.setTreeValue = function(){
            textfield.setValue("treePanel_expandnode");
        }
        return textfield;
    }

    return {
        name: 'textField',
        getComponent: function(parent, config) {
            var com = createComponent(config);
            if (parent.tagName) {
                com.render(parent);
            } else {
                parent.add(com);
                parent.doLayout(); 
            }
            createChildren(com, config);
            bindListener(com);
        }
    };
});