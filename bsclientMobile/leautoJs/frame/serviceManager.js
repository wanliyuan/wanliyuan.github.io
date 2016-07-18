define(['dataAdapter', "validater", "safeValidater", "AOP","asyncInfo"], function(dataAdapter, validater, safeValidater, AOP, asyncInfo) {
    var innerCallback, filterList;
    function doFilter(servicesList, metaData, data) {
        for (var i = 0; i < servicesList.length; i++) {
            var comName = servicesList[i];
            if (require(comName)) {
                //调用内部模块的初始化方法
                require(comName).doService(metaData,data);
            }
        }
    }

    return {
        send: function(servicesList, metaData, data) {
            innerCallback = metaData["fn"];
            filterList = servicesList;
            //请求前的处理
            doFilter(servicesList.before, metaData, data);
            //console.log(data);
            AOP.send(metaData, data, this.callback);
        },
        callback: function(result) {
            var resultNew = result;
            //请求后的处理
            doFilter(filterList.after, resultNew);
            console.log(result);
            innerCallback(result);
        }
    };
});