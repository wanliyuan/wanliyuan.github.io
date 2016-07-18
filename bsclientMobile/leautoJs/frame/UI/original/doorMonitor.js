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
     * 生成车门状态
     * @param    {Array}     datas 菜单返回数据
     * @return {[Object]}     menu的dom对象
     */
    function loadDatas(datas) {
        var doorMonitor = utils.createDom('div',{}),
            busImg = utils.createDom('img',{}),
            btnTitle = utils.createDom('h3',{}),
            btnWrapper = utils.createDom('div',{});
        doorMonitor.className = comConfig.doorClass;
        busImg.src = comConfig.busImgSrc;
        doorMonitor.appendChild(busImg);
        btnTitle.innerText = datas.paraTitle;
        doorMonitor.appendChild(btnTitle);
        btnWrapper.className = comConfig.wrapClass;
        var menuLiArr = assembleTopMenu(datas);
        for(var i=0;i<menuLiArr.length;i++){
            btnWrapper.appendChild(menuLiArr[i]);
        }
        doorMonitor.appendChild(btnWrapper);
        doorMonitor.switch = function (e) {
            var targetClass = e.target.className;
            var controlType = $(e.target).attr("data-cmd");
            if(utils.judgeInterface()){
                assembleParamAction(controlType);  //反控的功能
            }
            //data-cmd 0 4 6代表开命令   1 5 7 代表关命令
            //data-type 0代表开的状态  1代表关状态
            if(targetClass==comConfig.closeClass){
                e.target.className = comConfig.openClass;
                $(e.target).attr("data-type","0");
                $(e.target).attr("data-cmd",(parseInt(controlType)+1).toString());
            }else{
                e.target.className = comConfig.closeClass;
                $(e.target).attr("data-type","1");
                $(e.target).attr("data-cmd",(parseInt(controlType)-1).toString());
            }
        }
        return doorMonitor;
    }

    /**
     *  生成每个车门状态
     * @param    {Array}     datas 一级菜单数组
     * @return   {Array}           dom对象数组
     */
    function assembleTopMenu(datas){
        var liArray = [];
        for(var i=0;i<datas.paraDetails.length;i++){
            var oLi = utils.createDom('div',{
                'className':comConfig.panelClass,
                'innerHTML': "<label>"+ datas.paraDetails[i].paraName+"</label>"
            });
            var oBtn = utils.createDom('button',{});
            oBtn.className = (datas.paraDetails[i].doorType=="1")? comConfig.closeClass:comConfig.openClass;
            $(oBtn).attr("data-Type",parseInt(datas.paraDetails[i].doorType));
            $(oBtn).attr("data-cmd",parseInt(datas.paraDetails[i].cmdType));
            addEvent(oBtn);
            oLi.appendChild(oBtn);
            liArray.push(oLi);
        }
        return liArray;
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

    /**
     * 调用反控的函数
     * @method assembleParamAction
     * @param   无
     */
    function assembleParamAction(type){
        var servicesList = {
            "before": [

            ],
            "after": [
                "dataAdapter",
                "validater"
            ]
        };
        var metaData = {
            url: "../../action_test",
            method: "POST",
            async: false,
            tag: "tag3",
            modulename: "tbox",
            operation: "call",
            tokenid: "0faec02c73744e269439e8b3ff5f98",
            type: "single",
            fn:function(){
                console.log(2222);
            }
        };
        var data = {
            "terminalName": "le_tbox_demo",
            "param":type
        };
        serviceManager.send(servicesList, metaData, data);
    }

    /**
     * 调用静态json的函数
     * @method assembleParamStatic
     * @param   无
     */
    function assembleParamStatic(){
        var paramObj = utils.assembleParam('doorMonitor',false,dataCallback);
        serviceManager.send(paramObj.servicesList,paramObj.metaData, paramObj.data);
    }

    /**
     * 调用后台数据的函数
     * @method assembleParamDynamic
     * @param   无
     */
    function assembleParamDynamic(){
        var paramObj = utils.assembleBackData('tbox','doorMonitor',dataCallback);
        serviceManager.send(paramObj.servicesList,paramObj.metaData, paramObj.data);
    }

    return {
        getComponent: function(parent, config) {
            comParent = parent;
            comConfig = config.config;
            if(utils.judgeInterface()){
                assembleParamDynamic();
            }else{
                assembleParamStatic();
            }

        }
    }
});