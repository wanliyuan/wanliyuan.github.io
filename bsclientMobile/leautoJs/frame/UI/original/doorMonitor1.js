define(['bindEvent', 'initComponent','serviceManager','publicUtils'], function(bindEvent, initComponent,serviceManager,utils) {
    var comParent = null;
    var comConfig;
    /**
     * 调用initComponent模块，创建子对象
     * @param config 初始化所用的参数
     */
    function createChildren(com, config) {
        return initComponent.checkComponent(com, config);
    }

    /**
     * 菜单数据请求回调函数
     * @DateTime 2016-01-11
     * @param    {Object}     result 请求返回数据
     */
    function dataCallback(result) {
        if(result["success"]){
            var menuDatas = result["data"];
            var navObj = loadDatas(menuDatas);
            comParent.appendChild(navObj);
            bindListener(navObj);
        }
    }

    /**
     * 创建组件，不限制组件类型
     * @param config 初始化所用的参数    // TODO 这部分
     */
    function loadDatas(datas) {
        var doorMonitor = utils.createDom('div',{}),
            busImg = utils.createDom('img',{}),
            btnTitle = utils.createDom('h3',{}),
            btnWrapper = utils.createDom('div',{}),
            btnPanel = utils.createDom('div',{});
        doorMonitor.className = comConfig.doorClass;
        busImg.src = comConfig.busImgSrc;

        doorMonitor.appendChild(busImg);
        btnTitle.innerText = datas.paraTitle;
        doorMonitor.appendChild(btnTitle);
/*       doorMonitor.innerHTML = "<button class='mwui-switch-btn'>" +
            "<span change='开' class='off'>关</span>" +
        "<input type='hidden' name='show_icon' value='0' /></button>";*/
/*            $(doorMonitor).bind("click", function() {
                var btn =  $(doorMonitor).find("span");
                var change = btn.attr("change");
                btn.toggleClass('off');

                if(btn.attr("class") == 'off') {
                    $(doorMonitor).find("input").val("0");
                    btn.attr("change", btn.html());
                    btn.html(change);
                } else {
                    $(doorMonitor).find("input").val("1");
                    btn.attr("change", btn.html());
                    btn.html(change);
                }*/
/*
                return false;
            });*/
        btnWrapper.className = comConfig.wrapClass;
        btnPanel.className = comConfig.panelClass;
        var monitorHtml = "",btnClass = "",btnHtml = "";
        for(var i=0;i<datas.paraDetails.length;i++){
            btnClass = (datas.paraDetails[i].doorType=="1")? comConfig.closeClass:comConfig.openClass;
            btnHtml = "<label>"+ datas.paraDetails[i].paraName+"</label>";
            btnPanel.innerHTML = btnHtml;
            monitorHtml += btnHtml;
        }
        btnWrapper.innerHTML = monitorHtml;
        doorMonitor.appendChild(btnWrapper);
        return doorMonitor;
    }
    function loadButton(datas){
        var btnArray = [],btnClass="";
        var items = datas.paraDetails;
        for(var i=0;i<items.length;i++){
            btnClass = (items[i].doorType=="1")? comConfig.closeClass:comConfig.openClass;
            var btn = utils.createDom('button',{
                'className':btnClass
            });
            btnArray.push(btn);
            //addEvent(li);
        }
        return btnArray;
    }

    /**
     * 进入地图事件绑定enterMap_click
     * @method addEvent
     * @param  {Object}     domObj 绑定事件对象
     */
    function addEvent(domObj){
        $(domObj).bind('click',function(target) {
            if (document.createEvent) {
                var evObj = document.createEvent('MouseEvents');
                evObj.initEvent('switch_click', true, false);
                domObj.dispatchEvent(evObj);
            } else if (document.createEventObject) {
                domObj.fireEvent('switch_click');
            }
        });
    }

    /**
     * 添加事件监听
     * @method bindListener
     * @param  {[Object]}     component  事件接受对象
     */
    function bindListener(component) {
        //请求到的事件配置数据
        var eventConfig = [{
            parent: "mainFrame",
            senderEvent: "switch_click",
            receiverFn: "switch"
        }];
        if (eventConfig) {
            for (var i = 0; i < eventConfig.length; i++) {
                bindEvent.bindListener(component, eventConfig[i]);
            }
        }
    }

    return {
        getComponent: function(parent, config) {
            comParent = parent;
            comConfig = config.config;
            var paramObj = utils.assembleParam('doorMonitor',false,dataCallback);
            serviceManager.send(paramObj.servicesList,paramObj.metaData, paramObj.data);

        }
    }
});