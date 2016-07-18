define(['bindEvent', 'initComponent','serviceManager','publicUtils'], function(bindEvent, initComponent,serviceManager,utils) {
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
            var circleSize = parseInt($("."+comConfig.circleClass).parent().css("width"))*0.45;
            $("."+comConfig.circleClass).css("width",circleSize+"px");
            circleProgress($("."+comConfig.circleClass),isNull(menuDatas.circleNum),circleSize,isNull(comConfig.circleColor));
        }
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
     * 创建组件，不限制组件类型
     * @method loadDatas
     * @param datas 取到的数据
     */
    function loadDatas(datas) {
        var topLight = utils.createDom('div',{}),
            topLight_status = utils.createDom('div',{}),
            topLight_canvas = utils.createDom('div',{}),
            canvas_circle = utils.createDom('div',{}),
            topLight_Num = utils.createDom('div', {});
        canvas_circle.innerHTML = "<strong></strong>";
        canvas_circle.className = isNull(comConfig.circleClass);
        topLight_status.innerHTML = "<i>查询结果：</i><p>"+ isNull(datas.seekTime) +"</p>" +
            "<span>"+ isNull(datas.busState) +"</span>";
        topLight_status.className = isNull(comConfig.statusClass);
        topLight_canvas.className = isNull(comConfig.canvasClass);
        topLight_Num.innerHTML = "<p><span>剩余电量</span></p><p>预计驾驶里程:<em>"+ isNull(datas.pre_driveMile) +"</em>km</p>";
        topLight_Num.className = isNull(comConfig.numClass);
        topLight.className = isNull(comConfig.className);
        topLight.appendChild(topLight_status);
        topLight_canvas.appendChild(canvas_circle);
        topLight.appendChild(topLight_canvas);
        topLight.appendChild(topLight_Num);

        return topLight;
    }

    /**
     * 调用后台数据的函数
     * @method assembleParamAction
     * @param   无
     */
    function assembleParamAction(){
        var paramObj = utils.assembleBackData('tbox','topLight',dataCallback);
        serviceManager.send(paramObj.servicesList,paramObj.metaData, paramObj.data);
    }

    /**
     * 调用json数据的函数
     * @method assembleParamStatic
     * @param   无
     */
    function assembleParamStatic(){
        var paramObj = utils.assembleParam('topLight',false,dataCallback);
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