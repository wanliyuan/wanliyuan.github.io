define(['bindEvent', 'initComponent','serviceManager','publicUtils'], function(bindEvent, initComponent,serviceManager,utils) {
    var comParent = null,circle,mapObj,polygon,point = new L.LatLng(39.90131,116.40976),isCircle=false,isPolygon=false,layer;
    var myIcon = L.icon({
        iconUrl: '/leautoImg/my_icon.png',
        iconSize: [33, 30]
    });


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
    function createComponent(config) {
        var com = createDom('div', config),comParent = createDom('div', config),
            comfoot = createDom('div', config),autoDraw = createDom('a', config),
            manualDraw = createDom('a', config);
        com.id = isNull(config.id);
        comParent.id = isNull(config.parentId);
        comfoot.id = isNull(config.footId);
        autoDraw.id = autoDraw.className  = isNull(config.autoDrawId);
        manualDraw.id = manualDraw.className  = isNull(config.manualDrawId);
        autoDraw.innerText = isNull(config.autoDrawText);
        manualDraw.innerText = isNull(config.manualDrawText);
        comfoot.className = isNull(config.footClass);
        comfoot.appendChild(autoDraw);
        comfoot.appendChild(manualDraw);
        comParent.appendChild(com);
        comParent.appendChild(comfoot);
        addEvent(autoDraw,"autoDraw_click");
        addEvent(manualDraw,"manualDraw_click");
        return comParent;
    }

    /**
     * 创建地图对象
     * @method createMap
     * @param  {objectId}     objectId 地图的加载对象id
     */
    function createMap(objectId){
        var minZoom = 0;
        if(utils.judgeMap() != "google"){
            var normalm = new L.MapProvider.GaoDe('RoadMap',{maxZoom:18,minZoom:minZoom});  //切换为高德地图的代码
        }else{
            var normalm = new L.MapProvider.Google('RoadMap',{maxZoom:18,minZoom:minZoom});     //切换为谷歌地图的代码
        }
        var mapObj = L.map(objectId,{
            center:point,
            zoom:12,
            layers:[normalm],
            dragging:true
        });
        L.control.zoom({zoomInTitle:'放大', zoomOutTitle:'缩小'}).addTo(mapObj);
        var marker =new L.marker(point,{icon: myIcon});
        marker.addTo(mapObj);
        mapObj.panTo(point);
        return mapObj;
    }

    /**
     * 手绘多边形
     * @method drawPolygon
     * @param  {mapObj}     mapObj 地图对象
     */
    function drawPolygon(mapObj){
        polygon = new L.Draw.PolygonTouch(mapObj,{repeatMode:true});
        polygon.enable();
        mapObj.on('draw:created', function (e) {
            var type = e.layerType;
                layer = e.layer;
            mapObj.addLayer(layer);
            isPolygon = true;
        });
    }

    /**
     * menu菜单绑定menu_click
     * @method addEvent
     * @param  {Object}     domObj 绑定事件对象
     */
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
     * 自动绘圆
     * @method drawCircle
     * @param  {mapObj}     mapObj 地图对象
     */
    function drawCircle(mapObj){
        circle = new L.circle(point, 2000, {color: "red"});
        circle.addTo(mapObj);
        var marker = new L.marker(point, {icon: myIcon});
        marker.addTo(mapObj);
        mapObj.panTo(point);
        isCircle = true;
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
            senderEvent: "autoDraw_click",
            receiverFn: "drawCircle"
        },{
            parent: "mainFrame",
            senderEvent: "manualDraw_click",
            receiverFn: "drawPolygon"
        }];
        if (eventConfig) {
            for (var i = 0; i < eventConfig.length; i++) {
                bindEvent.bindListener(component, eventConfig[i]);
            }
        }
    }

    /**
     * 设置汽车围栏之后，当跨出围栏时的请求回调函数，重新渲染
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

    return {
        getComponent: function(parent, config) {
            var com = createComponent(config.config);
            parent.appendChild(com);
            var mapObj = createMap('map');
            polygon = new L.Draw.PolygonTouch(mapObj,{repeatMode:true});
            polygon.enable();
            mapObj.on('draw:created', function (e) {
                var type = e.layerType;
                layer = e.layer;
                mapObj.addLayer(layer);
                isPolygon = true;
            });

            //Todo 地图设置围栏
            com.drawCircle = function(){
                polygon.disable();
               if(isPolygon){
                    mapObj.removeLayer(layer);
                    isPolygon = false;
                }
                if(!isCircle){
                    drawCircle(mapObj);
                }
            }
            com.drawPolygon = function(){
                polygon.enable();
                if(isCircle) {
                    mapObj.removeLayer(circle);
                    isCircle=false;
                }
            }
            bindListener(com);
            createChildren(com, config);


            //车跨出围栏
/*           */
            if(utils.judgeFence()=="1"){
                //alert("跨出");
                setTimeout(function () {
                    var paramObj = utils.assembleParam("beyondFence",true,queryItemCallback);
                    serviceManager.send(paramObj.servicesList, paramObj.metaData, paramObj.data);
                },12000) ;
            }else{
                //alert("没跨出");
            }
        }
    }
});