angular.module('exceptionOverride', []).factory('$exceptionHandler', function() {
    return function(exception, cause) {
        alert(exception.message + ' (caused by "' + cause + '")');
    };
});