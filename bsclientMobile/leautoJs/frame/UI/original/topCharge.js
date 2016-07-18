define(['bindEvent', 'initComponent','jquery','circleProgress','serviceManager'], function(bindEvent, initComponent,$,circleProgress,serviceManager) {
    var comParent = null,comConfig;
    /**
     * 调用initComponent模块，创建子对象
     * @param config 初始化所用的参数
     */
    function createChildren(com, config) {
        return initComponent.checkComponent(com, config);
    }

    /**
     * 数据请求回调函数
     * @method dataCallback
     * @param    {Object}     result 请求返回数据
     */
    function dataCallback(result) {
        if(result["success"]){
            var menuDatas = result["data"];
            var navObj = loadDatas(menuDatas);
            comParent.appendChild(navObj);
        }
    }

    /**
     * 进度条的动画函数
     * @method circleProgress
     * @param    {obj,val,size}     obj:动画对象  val：进度值  size：圆的大小
     */
    function circleProgress(obj,val,size){
        obj.circleProgress({
            value: val,
            size: size,
            startAngle:140,
            emptyFill:"rgba(255, 255, 255,1)",
            fill: {
                gradient: ["#a2d683"]
            }
        }).on('circle-animation-progress', function(event, progress, stepValue) {
            $(this).find('strong').html(parseInt(100 * stepValue) + '<i>%</i>');
        });
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
     * @method loadDatas
     * @param datas 取到的数据
     */
    function loadDatas(datas) {
        var topMenu = createDom('div',{}),topMenu_status = createDom('div',{}),
            topMenu_canvas = createDom('div',{}),canvas_circle = createDom('div',{}),
            topMenu_Num = createDom('div', {});
        canvas_circle.innerHTML = "<strong></strong>";
        canvas_circle.className = isNull(comConfig.circleClass);
        topMenu_status.innerHTML = "<p>"+ isNull(datas.seekTime) +"</p><p>查询结果：</p>" +
            "<span>"+ isNull(datas.busState) +"</span>";
        topMenu_status.className = isNull(comConfig.statusClass);
        topMenu_canvas.className = isNull(comConfig.canvasClass);
        topMenu_Num.innerHTML = "<p>剩余电量</p><p>预计充电时间"+ isNull(datas.chargeTime) +"</p>" +
            "<p>预计充电费用"+ isNull(datas.chargeFee) +"</p>";
        topMenu_Num.className = isNull(comConfig.numClass);
        topMenu.className = isNull(comConfig.className);
        topMenu.appendChild(topMenu_status);
        topMenu_canvas.appendChild(canvas_circle);
        topMenu.appendChild(topMenu_canvas);
        topMenu.appendChild(topMenu_Num);
        circleProgress($(canvas_circle),isNull(datas.circleNum),isNull(datas.circleSize));
        return topMenu;
    }

    return {
        getComponent: function(parent, config) {
            comParent = parent;
            comConfig = config.config;
            var paramObj = require('publicUtils').assembleParam('topCharge',false,dataCallback);
            serviceManager.send(paramObj.servicesList,paramObj.metaData, paramObj.data);
        }
    }
});