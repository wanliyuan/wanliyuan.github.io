define(['bindEvent', 'initComponent','serviceManager'], function(bindEvent, initComponent,serviceManager) {
    var comParent = null,circle,polyline,point = new L.LatLng(39.90131,116.40976),isCircle=false,isPolygon=false;
    var myIcon = L.icon({
        iconUrl: '/leautoImg/my_icon.png',
        iconSize: [33, 30]
    });

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
        return comParent;
    }

    /**
     * 创建地图对象
     * @method createMap
     * @param  {objectId}     objectId 地图的加载对象id
     */
    function createMap(objectId){
        var minZoom = 0;
        var normalm = new L.MapProvider.MapABC('RoadMap',{maxZoom:18,minZoom:minZoom});  //切换为高德地图的代码
        //var normalm = new L.MapProvider.Google('RoadMap',{maxZoom:18,minZoom:minZoom});     //切换为谷歌地图的代码
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


    return {
        getComponent: function(parent, config) {
            var com = createComponent(config.config);
            parent.appendChild(com);
            var mapObj = createMap('map');
            //Todo 地图设置围栏
            var newPolygon;
            var manualDraw = document.getElementById("manualDraw");
            manualDraw.onclick = function(){
                newPolygon = new L.Draw.PolygonTouch(mapObj);
                newPolygon.enable();
                mapObj.on('draw:created', function (e) {
                    var type = e.layerType;
                    layer = e.layer;
                    mapObj.addLayer(layer);
                    newPolygon = new L.Draw.PolygonTouch(mapObj);
                    newPolygon.enable();
                });
            }
        }
    }
});