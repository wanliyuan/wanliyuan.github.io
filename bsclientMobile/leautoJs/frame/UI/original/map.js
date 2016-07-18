define(['bindEvent', 'initComponent','serviceManager','publicUtils'], function(bindEvent, initComponent,serviceManager,utils) {
   /* 'leafletMapProviders',leafletMapProviders,*/
    var comParent = null,
        comConfig,
        latlngs= [],
        polyline,
        marker,
        mapObj;

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
    function loadWrapper(){
        var com = createDom('div', {}),comwrap = createDom('div', {}),
            comfoot = createDom('div', {});
        com.id = isNull(comConfig.id), comwrap.id = isNull(comConfig.wrapId), comfoot.id =isNull(comConfig.footId);
        //正常进入地图界面
        comwrap.appendChild(com);
        if(comConfig.enterStatus=="0"){
             //comfoot.className = isNull(comConfig.footClass);
            //comfoot.innerHTML = "<em class="+ isNull(comConfig.emClass) +"></em><p><span>定位坐标：</span><i></i></p><p>时速：<strong></strong></p>";
            comfoot.className = "topWrap footWrap";
            comfoot.innerHTML = '<div class="topMonitor_coor"><p><span>定位坐标</span><i><em></em><em></em></i></p><p><span>时速：</span><strong style="height: 40px; line-height: 40px;"><em></em>km/h</strong></p></div>';
            var lnkBtn = require('publicUtils').createDom('input', {});
            lnkBtn.className = comConfig.enterMapClass;
            lnkBtn.type = 'button';
            lnkBtn.value = "返回监控页面";
            lnkBtn.id=isNull(comConfig.lnkBtnId);
            addEvent(lnkBtn,"backMonitor_click");
            comfoot.appendChild(lnkBtn);
        }
        //不良监控1进入地图界面
        else if(comConfig.enterStatus=="1"){
            comfoot.className = isNull(comConfig.footName2);
            comfoot.innerHTML = "<em class="+ isNull(comConfig.emClass) +"></em><h3>警告-急加速;</h3>" +
                "<p>您正在不安全驾驶车辆，请注意安全</p>";
        }
        //E-call进入地图界面
        else if(comConfig.enterStatus=="2"){
            comImg =  require('publicUtils').createDom('div', {});
            var delLayer =  utils.createDom('button', {});
            delLayer.innerHTML = "×";
            comImg.innerHTML = isNull(comConfig.imgInnerHTML);
            comImg.className = isNull(comConfig.imgClass);
            comImg.appendChild(delLayer);
            addEvent(delLayer,"delLayer_click");
            comwrap.appendChild(comImg);
            comfoot.className = isNull(comConfig.footName3);
            comfoot.innerHTML = "<span class="+ isNull(comConfig.autoName) +">10s后自动拨打E-call救援</span>" +
                "<span class="+ isNull(comConfig.cancelName) +">取消拨号</span>";
            //清除遮罩层
            comwrap.delLayer = function () {
                comImg.innerHTML = "";
            }
        }
        comwrap.appendChild(comfoot);
        return comwrap;
    }

    function createMap(objectId){
        var minZoom = 0;
        if(utils.judgeMap() != "google"){
            //alert(utils.judgeMap());
            var normalm = new L.MapProvider.GaoDe('RoadMap',{maxZoom:18,minZoom:minZoom});  //切换为高德地图的代码
        }else{
            var normalm = new L.MapProvider.Google('RoadMap',{maxZoom:18,minZoom:minZoom});     //切换为谷歌地图的代码
        }
        var point = new L.LatLng(39.90236,116.40976);
        var mapObj = L.map(objectId,{
            center:point,
            zoom:12,
            layers:[normalm],
            zoomControl:false,
            dragging:true
        });
        L.control.zoom({zoomInTitle:'放大', zoomOutTitle:'缩小'}).addTo(mapObj);
        return mapObj;
    }

    function addEvent(domObj,clickName){
        $(domObj).bind('click',function(target) {
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
            senderEvent: "delLayer_click",
            receiverFn: "delLayer"
        }];
        if (eventConfig) {
            for (var i = 0; i < eventConfig.length; i++) {
                bindEvent.bindListener(component, eventConfig[i]);
            }
        }
    }

    /**
     * 绘线段
     * @method drawLine
     * @param  {mapObj}     mapObj 地图对象
     */

    function drawLine(mapObj,addPara){
        latlngs.push(addPara);
        marker =new L.marker(addPara/*,{icon: myIcon}*/);
        marker.addTo(mapObj);
        if(latlngs.length>1){
            polyline=new L.Polyline(latlngs,{color:"red"});
            polyline.addTo(mapObj);
        }
        mapObj.panTo(addPara);
    }

    /**
     * 数据请求回调函数
     * @method dataCallback
     * @param    {Object}     result 请求返回数据
     */
    function dataCallback(result) {
        //console.log(result);
        //取后台数据
        if(result["track"]){
            //alert(111);
            var menuDatas = result["track"];
            var arr = [],latitude,longitude;
            if(menuDatas){
                latitude= parseFloat(menuDatas[0]["latitude"]).toFixed(6),
                    longitude = parseFloat(menuDatas[0]["longitude"]).toFixed(6);
                    arr.push(parseFloat(latitude));
                    arr.push(parseFloat(longitude));
                    drawLine(mapObj,arr);
                   /*$(comParent).find("i").html(latitude+"//N<br/>"+longitude+"//E");
                    $(comParent).find("strong").html(menuDatas[0]["speed"]);*/
                    $(comParent).find("i em").eq(0).html(latitude+"//N<br/>");
                    $(comParent).find("i em").eq(1).html(longitude+"//E<br/>");
                    $(comParent).find("strong em").eq(0).html(menuDatas[0]["speed"]);
            }
        }
        //取静态json数据
       if(result["success"]){
            var menuDatas = result["data"];
            var i=0;
            var arr = menuDatas[1].coordinate;
            var arr2 = menuDatas[1].speed;
            var timer = setInterval(function(){
                if(i<arr.length){
                    drawLine(mapObj,arr[i]);
                    $(comParent).find("i").html(arr[i][0]+"//N"+"<br>"+arr[i][1]+"//E");
                    $(comParent).find("strong").html(arr2[i]);
                    i++;
                }else{
                    clearInterval(timer);
                    latlngs=[];
                }
            },3000);
        }
    }

    /**
     * 调用json数据的函数
     * @method assembleParamStatic
     * @param   无
     */
    function assembleParamStatic(){
        var paramObj = require('publicUtils').assembleParam('map',false,dataCallback);
        serviceManager.send(paramObj.servicesList,paramObj.metaData, paramObj.data);
    }

    /**
     * 调用后台数据的函数
     * @method assembleParamAction
     * @param   无
     */
    function assembleParamAction(){
        var servicesList = {
            "before": [
                "asyncInfo"
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
            modulename: "messageModule_nologin",
            operation: "query",
            tokenid: "0faec02c73744e269439e8b3ff5f98",
            fn:dataCallback
        };
        var data = {
            type : "track",
            checked : true,
            target_id : "ebac606a-bf42-11e5-bb46-fa163e51eb24",
            client_id : "97c4913e6d2148199daf280cccabb89e"
        };
        serviceManager.send(servicesList, metaData, data);
    }

    return {
        getComponent: function(parent, config) {
            comParent = parent;
            comConfig = config.config;
            var navObj = loadWrapper();
            bindListener(navObj);
            comParent.appendChild(navObj);
            mapObj = createMap('map');
            if(utils.judgeInterface()){
                assembleParamAction();
            }else{
                assembleParamStatic();
            }
        }
    }
});