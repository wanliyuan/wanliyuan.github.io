define(['initComponent'], function(initComponent) {
    /**
     * 调用initComponent模块，创建子对象
     * @param config 初始化所用的参数
     */
    function createChildren(com, config) {
        return initComponent.checkComponent(com, config);
    }

    /**
     * 创建组件，不限制组件类型
     * @param items 子对象
     * @param config 初始化所用的参数
     */
    function createComponent(items, config) {
        var container = new Ext.Container(Ext.apply({
            name: "container",
            width: 200
        }));
        return container;
    }

    return {
        getComponent: function(parent, config) {
            var com = createComponent(config);
            if (parent.tagName) {
                com.render(parent);
            } else {
                parent.add(com);
                parent.doLayout(); 
            }
            createChildren(com, config);
        }
    };
});