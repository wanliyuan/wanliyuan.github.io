define(function() {
    return {
        /**
         * 初始化内部模块
         * @param config 初始化所用的参数
         */
        checkComponent: function(com, config) {
            var returnComponents = [], comConfig, initConfig, comName, nextConfig;
            if (config && config.items) {
                comConfig = config.items;
                initConfig = config.config;
                for (var i = 0; i < comConfig.length; i++) {
                    comName = comConfig[i].name;
                    nextConfig = comConfig[i];
                    if (require(comName)) {
                        //调用内部模块的初始化方法
                        returnComponents.push(require(comName).getComponent(com, nextConfig));
                    }
                }
            }
            return returnComponents;
        },

        checkComponent2: function(config) {
            var returnComponents = [], comConfig, initConfig, comName, nextConfig;
            if (config && config.items) {
                comConfig = config.items;
                initConfig = config.config;
                for (var i = 0; i < comConfig.length; i++) {
                    comName = comConfig[i].name;
                    nextConfig = comConfig[i];
                    if (require(comName)) {
                        //调用内部模块的初始化方法
                        returnComponents.push(require(comName).getComponent(nextConfig));
                    }

                }
            }
            return returnComponents;
        }
    };
});