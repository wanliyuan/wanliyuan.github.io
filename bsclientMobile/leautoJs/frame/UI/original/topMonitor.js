define(['bindEvent', 'initComponent','serviceManager','jquery','publicUtils'], function(bindEvent, initComponent,serviceManager,$,utils) {

    var comParent = null,comConfig,isNormal,defaultPara="busMonitor";

    /**
     * 调用initComponent模块，创建子对象
     * @param config 初始化所用的参数
     */
    function createChildren(com, config) {
        return initComponent.checkComponent(com, config);
    }

    /**
     * 简化createDom
     * @method createDom
     * @param   (tag,attrMap)
     */
    function createDom(tag,attrMap){
        return  require('publicUtils').createDom(tag, attrMap);
    }

    /**
     * 简单判断下非空
     * @method isNull
     * @param   (parameter)  传进来的参数
     */
    function isNull(parameter){
        return (parameter)? parameter : "";
    }

    /**
     * 创建组件，不限制组件类型
     * @param config 初始化所用的参数
     */
    function loadDatas(datas) {
        var topMonitor = createDom('div',{}),
            topWrap_status = createDom('div',{}),
            topMonitor_coor = createDom('div',{}),
            topMonitor_coor_t = createDom('p',{}),
            topMonitor_coor_ti = createDom('i',{}),
            topMonitor_coor_b = createDom('p',{}),
            enterMap = createDom('input', {});
        topWrap_status.className = comConfig.statusClass;
        topMonitor_coor.className = comConfig.coorClass;
        topMonitor.className = comConfig.monitorClass;
        topWrap_status.innerHTML = "<p>定时驾驶监控：</p><span>"+ isNull(datas.busState) +"</span>";
/*        topMonitor_coor.innerHTML = "<p><span>定位坐标</span><i><em>"+ isNull(datas.longitude)  +"//E</em><em>"
            + isNull(datas.latitude) +"//E</em></i></p><p><span>时速：</span><strong><em>"+ isNull(datas.speed) +"</em>km/h</strong></p>";*/
        topMonitor_coor_t.innerHTML ="<span>定位坐标</span>";
        topMonitor_coor_ti.innerHTML = "<em>"+ isNull(datas.longitude)  +"//E</em><em>"
            + isNull(datas.latitude) +"//N</em>";
        enterMap.type = 'button';
        enterMap.id = ((!isNormal)?defaultPara: isNormal)+ "_mainMap";
        enterMap.className = isNull(comConfig.enterMapClass);
        enterMap.value = isNull(comConfig.enterMapValue);
        addEvent(enterMap);
        topMonitor_coor_ti.appendChild(enterMap);
        topMonitor_coor_t.appendChild(topMonitor_coor_ti);
        topMonitor_coor_b.innerHTML = "<span>时速：</span><strong><em>"+ isNull(datas.speed) +"</em>km/h</strong>";
        topMonitor_coor.appendChild(topMonitor_coor_t);
        topMonitor_coor.appendChild(topMonitor_coor_b);
        topMonitor.appendChild(topWrap_status);
        topMonitor.appendChild(topMonitor_coor);
        return topMonitor;
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
                evObj.initEvent('enterMap_click', true, false);
                domObj.dispatchEvent(evObj);
            } else if (document.createEventObject) {
                domObj.fireEvent('enterMap_click');
            }
        });
    }

    /**
     * 行驶中监控的调ajax请求的函数
     * @method queryItemCallback
     * @param    {Object}     result 请求返回数据
     */
    function monitorDrive(para){
        var paramObj = utils.assembleParam(para,true,queryItemCallback);
        serviceManager.send(paramObj.servicesList, paramObj.metaData, paramObj.data, queryItemCallback);
    }

    /**
     * 刚进入实时监控的请求回调函数
     * @method dataCallback
     * @param    {Object}     result 请求返回数据
     */
    function dataCallback(result) {
        if(result["success"]){
            var menuDatas = result["data"];
            var navObj = loadDatas(menuDatas);
            comParent.appendChild(navObj);
            var iHeight = $(navObj).find("i").css("height");
            $(navObj).find("input").css("height",iHeight);
            $(navObj).find("strong").css({"height":iHeight,"lineHeight":iHeight});
        }
    }

    /**
     * 行驶中监控的请求回调函数，重新渲染
     * @method queryItemCallback
     * @param    {Object}     result 请求返回数据
     */
    function queryItemCallback(result) {
        if (result["success"]) {
            var config = result["data"];
            document.getElementsByTagName("body")[0].innerHTML = "";
            var com = initComponent.checkComponent(document.getElementsByTagName("body")[0], config);
        }
    }

    /**
     * 调用json数据的函数
     * @method assembleParamStatic
     * @param   无
     */
    function assembleParamStatic(){
        var paramO = utils.assembleParam('topMonitor',false,dataCallback);
        serviceManager.send(paramO.servicesList,paramO.metaData, paramO.data);
    }

    /**
     * 调用后台数据的函数
     * @method assembleParamAction
     * @param   无
     */
    function assembleParamAction(){
        var paramObj = utils.assembleBackData('tbox','topMonitor',dataCallback);
        serviceManager.send(paramObj.servicesList,paramObj.metaData, paramObj.data);
    }

    return {
        getComponent: function(parent, config) {
            comParent = parent;
            comConfig = config.config;
            //设置Ajax请求参数，需设置成同步
            if(utils.judgeInterface()){
                assembleParamAction();
            }else{
                assembleParamStatic();
            }

            if(comConfig.isNormal!=defaultPara){
                isNormal = comConfig.isNormal;
                setTimeout(function () {
                    monitorDrive(isNormal);
                },3000) ;
            }
        }
    }
});