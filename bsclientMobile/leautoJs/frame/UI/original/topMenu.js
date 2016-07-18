define(['bindEvent', 'initComponent','jquery','circleProgress','serviceManager','publicUtils'], function(bindEvent, initComponent,$,circleProgress,serviceManager,utils) {

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
            var circleSize1 = parseInt($("."+comConfig.wrapClass1).css("width"))*0.85;
            var circleSize2 = parseInt($("."+comConfig.wrapClass2).css("width"))*0.85;
            $("."+comConfig.numClass1).css("width",circleSize1+"px");
            $("."+comConfig.numClass2).css("width",circleSize2+"px");
            circleProgress($("#"+comConfig.circleId1),isNull(menuDatas.circleNum1),circleSize1,isNull(comConfig.circleColor1));
            circleProgress($("#"+comConfig.circleId2),isNull(menuDatas.circleNum2),circleSize2,isNull(comConfig.circleColor2) );

        }
    }


    /**
     * 进度条的动画函数
     * @method circleProgress
     * @param    {obj,val,size}     obj:动画对象  val：进度值  size：圆的大小  color:颜色
     */
    function circleProgress(obj,val,size,color){
        obj.circleProgress({
            value: val,
            size: size,
            startAngle:140,
            emptyFill:"rgba(255, 255, 255,1)",
            fill: {
                gradient: [color]
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
        var topMenu = createDom('div',{}),
            topMenu_status = createDom('div',{}),
            topMenu_canvas = createDom('div',{}),
            canvas_circle1 = createDom('div',{}),
            canvas_circle2 = createDom('div',{}),
            topMenu_canvas = createDom('div',{}),
            circle_wrap1 = createDom('div',{}),
            circle_num1 = createDom('div',{}),
            circle_num2 = createDom('div',{}),
            circle_wrap2 = createDom('div',{}),
            topMenu_Num = createDom('div',{});
        topMenu_status.innerHTML = "<i>查询结果：</i><p>"+ isNull(datas.seekTime) +"</p>"
            +"<span>"+ isNull(datas.busState) +"</span>";
        topMenu_status.className = isNull(comConfig.statusClass);
        topMenu_canvas.className = isNull(comConfig.canvasClass);
        canvas_circle2.innerHTML = canvas_circle1.innerHTML = "<strong></strong>";
        canvas_circle1.className = isNull(comConfig.circleClass1);
        canvas_circle2.className = isNull(comConfig.circleClass2);
        canvas_circle1.id = isNull(comConfig.circleId1);
        canvas_circle2.id = isNull(comConfig.circleId2);
        circle_wrap1.className = isNull(comConfig.wrapClass1);
        circle_wrap2.className = isNull(comConfig.wrapClass2);
        circle_num1.className = isNull(comConfig.numClass1);
        circle_num2.className = isNull(comConfig.numClass2);
/*        topMenu_Num.innerHTML = "<p>预计驾驶里程：<span>"+ isNull(datas.pre_driveMile) +"</span>" +
            "　　已驾驶里程：<span>"+ isNull(datas.drivedmile) +"</span></p>";*/
        circle_num1.innerHTML = "<span>剩余电量</span><em>"+ isNull(datas.pre_driveMile) +"</em><i>km</i><b>预计驾驶里程</b>";
        circle_num2.innerHTML = "<span>行驶里程</span><em>"+ isNull(datas.drivedmile) +"</em><i>km</i><b>已驾驶里程</b>";
        topMenu_Num.className = isNull(comConfig.topMenu_NumClass);
        topMenu.className =  isNull(comConfig.topMenuClass);
        topMenu.appendChild(topMenu_status);
        circle_wrap1.appendChild(canvas_circle1);
        circle_wrap1.appendChild(circle_num1);
        circle_wrap2.appendChild(canvas_circle2);
        circle_wrap2.appendChild(circle_num2);
        topMenu_canvas.appendChild(circle_wrap1);
        topMenu_canvas.appendChild(circle_wrap2);
        topMenu.appendChild(topMenu_canvas);
/*        topMenu.appendChild(topMenu_Num);*/

      return topMenu;
    }

    /**
     * 调用后台数据的函数
     * @method assembleParamAction
     * @param   无
     */
    function assembleParamAction(){
        var paramObj = utils.assembleBackData('tbox','topMenu',dataCallback);
        serviceManager.send(paramObj.servicesList,paramObj.metaData, paramObj.data);
    }

    /**
     * 调用json数据的函数
     * @method assembleParamStatic
     * @param   无
     */
    function assembleParamStatic(){
        var paramObj = utils.assembleParam('topMenu',false,dataCallback);
        serviceManager.send(paramObj.servicesList,paramObj.metaData, paramObj.data);
    }

    return {
        getComponent: function(parent, config) {
            comParent = parent;
            comConfig = config.config;
            if(utils.judgeInterface()){
                assembleParamAction();
            }else{
                assembleParamStatic();
            }
        }
    }
});