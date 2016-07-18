define([], function() {
    return {
        name: 'dataAdapter',
        doService: function(data) {
            data.dataAdapter = true;
            return data;
        }
    };
});