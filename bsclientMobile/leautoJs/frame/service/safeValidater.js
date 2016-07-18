define([], function() {
    return {
    	name: 'safeValidater',
        doService: function(data) {
        	data.safeValidater = true;
            return data;
        }
    };
});