define(['bindEvent', 'initComponent','mobiscroll',"serviceManager","publicUtils"], function(bindEvent, initComponent,mobiscroll,serviceManager,utils) {
    var countTime = "";
    var deadDate = "",countdown;
    var isStopExecuted = false,isChargeExecuted = false,isCountExecuted = false;
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
        var com = require('publicUtils').createDom('li', config);
　　    com.innerHTML = config.innerHTML;
　　    com.className = config.className;
        return com;
    }

    /**
     * 调用后台数据的函数
     * @method assembleParamAction
     * @param   无
     */
    function assembleParamAction(){
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
                //console.log(2222);
                //alert("充电成功");
            }
        };
        var data = {
            "terminalName": "le_tbox_demo",
            "param":"2"
        };
        serviceManager.send(servicesList, metaData, data);
    }

    /**
     * 调用停止充电的调令
     * @method assembleParamAction
     * @param   无
     */
    function assembleStopAction(){
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
                //console.log(333);
                //alert(3333);
            }
        };
        var data = {
            "terminalName": "le_tbox_demo",
            "param":"3"
        };
        serviceManager.send(servicesList, metaData, data);
    }

    /**
     * 计算时间差的秒数
     * @method TimeDifference
     * @param   无
     */
    function TimeDifference(date1,date2){
        var date1=new Date(date1);
        var date2=new Date(date2);
        return (date2.getTime()-date1.getTime())/1000;
    }

    /**
     * 定时去执行开始充电的函数
     * @method setTime
     * @param   无
     */
    function setTime() {
        var timer;
        //if(countdown) {
            if (countdown == 0) {
                //alert("开始充电");
                clearTimeout(timer);
                //开始充电
                if (utils.judgeInterface()) {
                    assembleParamAction();
                } else {
                    //alert("没连后台服务");
                }
            } else {
                countdown--;
                timer = setTimeout(function () {
                    setTime()
                }, 1000)
            }
       // }
        console.log(countdown);
    }

    /**
     * 取日期的函数
     * @method getDate
     * @param   strDate  日期的字符串
     */
    function getDate(strDate) {
        var st = strDate;
        var a = st.split(" ");
        var b = a[0].split("-");
        var c = a[1].split(":");
        var date = new Date(b[0], b[1], b[2], c[0], c[1], c[2])
        return date;
    }

    /**
     * 倒计时输入框中只能输入整数或者小数点后两位
     * @method clearNoNum
     * @param   obj  输入框对象
     */
    function clearNoNum(obj){
        obj.value = obj.value.replace(/[^\d.]/g,""); //清除"数字"和"."以外的字符
        obj.value = obj.value.replace(/^\./g,""); //验证第一个字符是数字而不是
        obj.value = obj.value.replace(/\.{2,}/g,"."); //只保留第一个. 清除多余的
        obj.value = obj.value.replace(".","$#$").replace(/\./g,"").replace("$#$",".");
        obj.value = obj.value.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3'); //只能输入两个小数
    }

    /**
     * 绑定事件
     * @method addEvent
     * @param  {Object}     domObj 绑定事件对象，clickName 事件名称如chargeLi_change  funType 事件类型如change
     */
    function addEvent(domObj,funType,clickName){
        $(domObj).bind(funType,function(target) {
            if (document.createEvent) {
                var evObj = document.createEvent('MouseEvents');
                evObj.initEvent(clickName, true, false);
                domObj.dispatchEvent(evObj);
            } else if (document.createEventObject) {
                domObj.fireEvent(clickName);
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
            senderEvent: "chargeLi_change",
            receiverFn: "chargeLiChange"
        },{
            parent: "mainFrame",
            senderEvent: "countLi_change",
            receiverFn: "countLiChange"
        },{
            parent: "mainFrame",
            senderEvent: "stopcharge_click",
            receiverFn: "stopCharge"
        },{
            parent: "mainFrame",
            senderEvent: "countLi_keyup",
            receiverFn: "chargeNum"
        }];
        if (eventConfig) {
            for (var i = 0; i < eventConfig.length; i++) {
                bindEvent.bindListener(component, eventConfig[i]);
            }
        }
    }

    function getObj(parentObj,type,index){
        return parentObj.getElementsByTagName(type)[index];
    }

    return {
        getComponent: function(parent, config) {
            var com = createComponent(config.config);
            parent.getElementsByTagName('ul')[0].appendChild(com);
            createChildren(com, config);
            bindListener(com);
            //var chargeLi = parent.getElementsByTagName('ul')[0].getElementsByTagName("li")[0];
            /*var countLi = parent.getElementsByTagName('ul')[0].getElementsByTagName("li")[1];*/
            var chargeLi = getObj(getObj(parent,'ul',0),"li",0);
            var countLi = getObj(getObj(parent,'ul',0),"li",1);
            addEvent(getObj(chargeLi,'input',0),"change","chargeLi_change");
            addEvent(getObj(chargeLi,'button',0),"click","stopcharge_click");
            if($(countLi).html()){
                addEvent(getObj(countLi,'input',0),"change","countLi_change");
                addEvent(getObj(countLi,'input',0),"keyup","countLi_keyup");
                addEvent(getObj(countLi,'button',0),"click","stopcharge_click");
            }
            //倒计时充电只能输入小数点两位
            com.chargeNum = function () {
                if($(countLi).html()) {
                    clearNoNum(getObj(countLi,'input',0));
                }
            }

            //定时充电
            com.chargeLiChange = function(){
                //if(!isChargeExecuted) {
                    var curDate = new Date();
                    var strTime = curDate.getFullYear() + "-"
                        + (curDate.getMonth()) + "-"
                        + curDate.getDate() + " " + getObj(chargeLi,'input',0).value + ":00";
                    countTime = Math.round(TimeDifference(new Date(), getDate(strTime)));
                    countdown = countTime;
                    setTime(countTime);
                    //isChargeExecuted = true;
               // }
            }

            //充电倒计时
            com.countLiChange = function () {
                //if(!isCountExecuted){
                    if($(countLi).html() && getObj(countLi,'input',0).value!=""){
                        countTime = parseFloat(getObj(countLi,'input',0).value) * 3600;
                        countdown = countTime;
                        setTime(countTime);
                        isCountExecuted = true;
                    }
                //}
            }

            //停止充电
            com.stopCharge = function () {
                alert("stop");
                //if(!isStopExecuted){
                    if(utils.judgeInterface()){
                        assembleStopAction();
                        //isStopExecuted = true;
                    }
                //}
            }

        }
    }
});