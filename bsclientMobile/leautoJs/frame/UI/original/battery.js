define(['bindEvent', 'initComponent'], function(bindEvent, initComponent) {
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
        var com = require('publicUtils').createDom('div', config);
        com.className = (config.className)?config.className:"";
        com.innerHTML = " <i></i>";
        var i =min = 0;
        var j=0;
        var max = 8;
        function updateBattery(){
            if( i<max && j==0){
                i++;
                com.dataset.charge = i;
            }else if(i==max && j==0){
                j=1;
                i = i-1;
                com.dataset.charge = i;
            }else if(i==min && j==1){
                j=0;
            }
            else if( i<max && j==1){
                i--;
                com.dataset.charge = i;
            }
        }
        setInterval(updateBattery,300);
        return com;
    }

    return {
        getComponent: function(parent, config) {
            var com = createComponent(config.config);
            parent.appendChild(com);
            createChildren(com, config);
        }
    }
});