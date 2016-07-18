define(['bindEvent', 'initComponent','publicUtils'], function(bindEvent, initComponent,utils) {
    /**
     * 调用initComponent模块，创建子对象
     * @param config 初始化所用的参数
     */
    function createChildren(com, config) {
        return initComponent.checkComponent(com, config);
    }

    /**
     * 创建组件，不限制组件类型
     * @param config 初始化所用的参数
     */
    function createComponent(config) {
        var com = utils.createDom('div', config),
            comCar2 = utils.createDom('div', config),
            comCar3 = utils.createDom('div', config),
            comLine = utils.createDom('i', config);
        com.className = (config.comClass)?config.comClass:"";
        com.innerHTML = config.carHTML1;
        comCar2.innerHTML =  config.carHTML2;
        comCar3.innerHTML =  config.carHTML3;
        comCar2.className = config.wrapClass;
        comCar2.appendChild(comLine);
        comLine.className = "";
        com.appendChild(comCar2);
        com.appendChild(comCar3);
        var i =min = 0;
        var j=0;
        var max = 10;
        function updateBattery(){
            if( i<max && j==0){
                i++;
                comLine.style.top = i*10+"%";
            }else if(i==max && j==0){
                j=1;
                i = i-1;
                comLine.style.top = i*10+"%";
            }else if(i==min && j==1){
                j=0;
            }
            else if( i<max && j==1){
                i--;
                comLine.style.top = i*10+"%";
            }
        }
        setInterval(updateBattery,300);
        return com;
    }


    return {
        getComponent: function(parent, config) {
            var com = createComponent(config.config);
            parent.appendChild(com);
        }
    }
});