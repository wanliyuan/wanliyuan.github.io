define([], function() {
    return {
    	name: 'validater',
        doService: function(data) {
        	data.validater = true;
            return data;
        }
    };
});