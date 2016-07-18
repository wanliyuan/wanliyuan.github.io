require.config({
    baseUrl: 'leautoJs/frame/UI/original',
    paths: {
        jquery:'../../../../jQuery/jquery-1.9.1',
        bootstrap: '../../bootstrap/js/bootstrap.min',
        circleProgress:'../../../../leaflet/circle-progress',
        jquerytouchSlider:"../../../../jQuery/jquery.touchSlider",
        bootstrap: '../../../../bootstrap/js/bootstrap.min',
        //展示层框架
        initComponent: '../../initComponent',
        //服务层框架
        bindEvent: '../../bindEvent',
        serviceManager: '../../serviceManager',
        //通讯层框架
        AOP: '../../AOP',
        //服务层组件
        dataAdapter: '../../service/dataAdapter',
        validater: '../../service/validater',
        safeValidater: '../../service/safeValidater',
        asyncInfo: '../../service/asyncInfo',
        messageProcess: '../../service/messageProcess',
        //通讯层组件
        jqueryAjax: '../../communication/jqueryAjax',
        publicUtils: '../../../publicUtils',
        mobiscrollJs:'../../../../mobiscroll/mobiscroll.core-2.5.2',
        mobiscrollDate:'../../../../mobiscroll/mobiscroll.datetime-2.5.1',
        mobiscrollAndroid:'../../../../mobiscroll/mobiscroll.android-ics-2.5.2',
        testM:"https://static.xx.fbcdn.net//rsrc.php//v2i-Zw3//yH//l//zh_TW//kGXyTJNoi6f"
/*        ,leafletSrc:'../../../../dist/leaflet-src',
        leafletDraw:'../../../../leaflet/leaflet.draw-src',
        google:"../../../../leaflet/google",
        leafletMapProviders:'../../../../leaflet/LeafletMapProviders'*/
    },
    map: {
     '*': {
        'css': '../../../../requireJS/css'
      }
    },
    shim: {
        'bootstrap': ['jquery', 'css!../../../../bootstrap/css/bootstrap'],
        'jquerytouchSlider':['jquery','css!../../../../leautoCss/touchSlider'],
        'mobiscrollDate':["mobiscrollJs"],
        'mobiscrollAndroid':["mobiscrollJs"],
        'mobiscrollJs':['jquery','css!../../../../mobiscroll/mobiscroll.core-2.5.2','css!../../../../mobiscroll/mobiscroll.animation-2.5.2','css!../../../../mobiscroll/mobiscroll.android-ics-2.5.2.css']
/*        ,'leafletDraw':['leafletSrc'],
        'leafletMapProviders':['leafletDraw','google','css!../../../../leaflet/leaflet']*/
    }
});

require(['bootstrap','initComponent', 'publicUtils', 'serviceManager','form','mainFrame'], function(bootstrap,initComponent,utils, serviceManager, form,mainFrame) {
    //原生js框架
    var paramObj = utils.assembleParam("main",true,initCallback);
    function initCallback(result) {
        if (result["success"]) {
            var config = result["data"];
            var com = initComponent.checkComponent(document.getElementsByTagName("body")[0], config);
        }
    }
    serviceManager.send(paramObj.servicesList, paramObj.metaData, paramObj.data);
    setTimeout(function(){

    },4000);
});