define(['bindEvent', 'initComponent','serviceManager','publicUtils'], function(bindEvent, initComponent,serviceManager,utils) {
    var comParent = null,comConfig,paraType;
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
            if(menuDatas.param =="ok"){
                $(navObj).removeClass("topWrapBreak");
            }else{
                $(navObj).addClass("topWrapBreak");
            }
        }
    }

    /**
     * 静态json数据请求回调函数
     * @method dataCallbackStatic
     * @param    {Object}     result 请求返回数据
     */
    function dataCallbackStatic(result) {
        if(result["success"]){
            var menuDatas = result["data"];
            var navObj = loadDatas(menuDatas);
            comParent.appendChild(navObj);
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
        var topBus = utils.createDom('div', {}),
            topBus_Status = utils.createDom('div', {}),
            topBus_Num = utils.createDom('div', {}),
            topBus_Img = utils.createDom('div', {}),
            topBus_Circle = utils.createDom('div', {}),
            bus_Circle = utils.createDom('div', {}),
            bus_Text = utils.createDom('div', {});
        topBus.className = isNull(comConfig.className);
        topBus_Status.className = isNull(comConfig.wrapStatusClass);
        topBus_Status.innerHTML = "<i>查询结果：</i><p>"+ isNull(datas.seekTime) +"</p>" +
            "<span>"+ isNull(datas.busState) +"</span>";
        topBus_Num.className = isNull(comConfig.lightNumClass);
        topBus_Img.className = isNull(comConfig.imgWrap);
        topBus_Img.innerHTML = "<img src="+isNull(comConfig.imgSrc)+">";
        topBus_Circle.className = isNull(comConfig.scoreWrap);
        bus_Text.innerHTML = "<span>汽车评分</span>";
        bus_Circle.innerHTML = "<strong></strong>";
        bus_Circle.className = isNull(comConfig.busCircleClass);
        bus_Text.className = isNull(comConfig.busTextClass);
        topBus_Circle.appendChild(bus_Circle);
        topBus_Circle.appendChild(bus_Text);
        topBus_Num.appendChild(topBus_Img);
        topBus_Num.appendChild(topBus_Circle);
        topBus.appendChild(topBus_Status);
        topBus.appendChild(topBus_Num);
        circleProgress($(bus_Circle),isNull(datas.testScore),isNull(comConfig.circleSize1),(paraType =="ok")?isNull(comConfig.circleColor1):isNull(comConfig.circleColor2));
        return topBus;
    }

    /**
     * 调用后台数据的函数
     * @method assembleParamAction
     * @param   无
     */
    function assembleParamAction(para){
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
            operation: "check",
            type:"single",
            tokenid: "0faec02c73744e269439e8b3ff5f98",
            fn:dataCallback
        };
        var data = {
            "param":para
        };
        serviceManager.send(servicesList, metaData, data);
    }

    /**
     * 调用json数据的函数
     * @method assembleParamStatic
     * @param   无
     */
    function assembleParamStatic(){
        var paramObj = utils.assembleParam(comConfig.id,false,dataCallbackStatic);
        serviceManager.send(paramObj.servicesList, paramObj.metaData, paramObj.data);
    }

    return {
        getComponent: function(parent, config) {
            comParent = parent;
            comConfig = config.config;
            var grade = utils.judgeGrade();
            paraType = grade;
            if(utils.judgeInterface()){
                assembleParamAction(grade);
            }else{
                assembleParamStatic();
            }
        }
    }
});