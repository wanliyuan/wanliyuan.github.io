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
        var data = {
            expanded: true,
            children: [{
                text: 'Menu Option 11',
                leaf: true
            }, {
                text: 'Menu Option 12',
                leaf: true
            }, {
                text: 'Menu Option 13',
                leaf: true
            }]
        };
        var treePanel = new Ext.tree.TreePanel(Ext.apply({
            name: "treePanel",
            width: 200,
            autoScroll: true,
            split: true,
            loader: new Ext.tree.TreeLoader(),
            root: new Ext.tree.AsyncTreeNode(data),
            contextMenu: new Ext.menu.Menu({
                items: [{
                    id: 'delete-node',
                    text: 'Delete Node'
                }]
            })
        }));
        //事件
        return treePanel;
    }

    function bind(com) {
        var treeDom = document.getElementById(com.id);
        com.on({
            'expandnode': {
                fn: function(node, e) {
                    var date = new Date();
                    console.log('send' + date.getUTCMinutes() + '   ' + date.getUTCMilliseconds());
                    if (document.createEvent) {
                        var evObj = document.createEvent('MouseEvents');
                        evObj.initEvent('treePanel_expandnode', true, false);
                        treeDom.dispatchEvent(evObj);
                    } else if (document.createEventObject) {
                        treeDom.fireEvent('treePanel_expandnode');
                    }
                }
            }
        });
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
            bind(com);
        }
    };
});