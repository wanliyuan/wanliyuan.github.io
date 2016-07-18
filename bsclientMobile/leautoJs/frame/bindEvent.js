define(function() {
    //事件触发后调用的对象
    var receiver = [];
    function findParent(com, parentName) {
        if (typeof com.tagName == "undefined" && com.id) {
            com = document.getElementById(com.id);
        }
        function findParentNode(c) {
            if (typeof c == "undefined" || c == null) {
                return false;
            } else if (c.parentNode && (parentName == c.parentNode.name)) {
                return c.parentNode;
            } else {
                return findParentNode(c.parentNode);
            }
        }
        return findParentNode(com);
    }
    
    /**
     * 事件触发统一处理方法
     * @param items 子对象
     * @param e 
     */
    function bindFunction(target) {
        var item, targetParent, receiverParent, parentName;
        for (var i = 0; i < receiver.length; i++) {
            item = receiver[i];
            if (target.type == item.eventName) {
                //存储的父级名
                parentName = item.parentName;
                //触发对象的父级
                targetParent = target.currentTarget;
                //存储对象的父级
                receiverParent = findParent(item.receiver, parentName);
                if (targetParent == receiverParent) {
                    item.receiver[item.receiverFn](target);
                }
            }
        }
    }

    /**
     * 事件触发统一处理方法
     * @param items 子对象
     * @param e 
     */
    function bindExtFunction(target, e, eventName) {
        var item, targetParent, receiverParent, parentName;
        function check(c) {
            return c.name == parentName;
        }
        for (var i = 0; i < receiver.length; i++) {
            item = receiver[i];
            parentName = item.parentType;
            //触发对象的父级
            targetParent = target.findParentBy(check);
            //存储对象的父级
            receiverParent = item.receiver.findParentBy(check);
            if (targetParent == receiverParent && eventName == item.eventName) {
                item.receiver[item.receiverFn](e);
            }
        }
    }
    return {
        bindEvents: function(item, events) {
            for (var i = 0; i < events.length; i++) {
                if (item.tagName) {
                    if(item.addEventListener){ // 所有主流浏览器，除IE8及更早版本
                        item.addEventListener(events[i], function(target) {
                            bindFunction(target);
                        })
                    }else if(item.attachEvent){   //IE 8及其更早版本
                        item.attachEvent(events[i],function(target) {
                            bindFunction(target);
                        });
                    }
                } else {
                    item.on(events[i], function(target, e, eventName) {
                        bindExtFunction(target, e, eventName);
                    });
                }
            }
        },
        bindListener: function(item, eventConfig) {
            receiver.push({
                eventName: eventConfig.senderEvent,
                parentName: eventConfig.parent,
                receiver: item,
                receiverFn: eventConfig.receiverFn
            });
        }
    };
});