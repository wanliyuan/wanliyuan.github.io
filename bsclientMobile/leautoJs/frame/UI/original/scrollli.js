define(['bindEvent', 'initComponent','mobiscroll',"serviceManager","publicUtils"], function(bindEvent, initComponent,mobiscroll,serviceManager,utils) {
    var countTime = "";
    var deadDate = "",countdown;
    var pcount=0;
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
        if (countdown == 0) {
            clearTimeout(timer);
            //开始充电
            if(utils.judgeInterface()){
                assembleParamAction();
            }else{
                //alert("没连后台服务");
            }
        }else {
            countdown--;
            timer = setTimeout(function() {
                setTime()
            },1000)
        }
        console.log(countdown);
    }

    function getDate(strDate) {
        var st = strDate;
        var a = st.split(" ");
        var b = a[0].split("-");
        var c = a[1].split(":");
        var date = new Date(b[0], b[1], b[2], c[0], c[1], c[2])
        return date;
    }

    return {
        getComponent: function(parent, config) {
            var com = createComponent(config.config);
            parent.getElementsByTagName('ul')[0].appendChild(com);
            createChildren(com, config);
            var chargeLi = parent.getElementsByTagName('ul')[0].getElementsByTagName("li")[0];
            var countLi = parent.getElementsByTagName('ul')[0].getElementsByTagName("li")[1];
            //定时充电
            $(chargeLi).find("input").on("change",function() {
                pcount++;
                if (pcount % 2 == 1) { //单数的允许执行
                    var strTime = new Date().getFullYear() + "-"
                        + (new Date().getMonth()) + "-"
                        + new Date().getDate() + " " + $(this).val() + ":00";
                    countTime = Math.round(TimeDifference(new Date(), getDate(strTime)));
                    countdown = countTime;
                    setTime(countTime);
                }
            })
            //充电倒计时
            $(countLi).find("input").on("change",function(){
                countTime = parseFloat($(this).val())*3600;
                countdown = countTime;
                setTime(countTime);
            })
            //停止充电
            $(countLi).find("button").on("click",function(){
                if(utils.judgeInterface()){
                    assembleStopAction();
                }
            })
        }
    }
});