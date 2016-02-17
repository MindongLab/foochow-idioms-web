(function () {
    "use strict";
    angular.module('app', ['ngRoute'])
    .constant("SERVER_API_URL","http://fiapi.radiumz.org:2052/api")
    .constant("SERVER_AUDIO_URL","http://idioms.mindong.asia/assets/audio/")
    
    .config(['$routeProvider',function ($routeProvider) {  
        $routeProvider  
            .when('/', {  
                templateUrl: 'app/views/welcome.tpl.html',  
                controller: 'homeCtrl'  
            })  
            .when('/idiom/:idiomtext*', {  
                templateUrl: 'app/views/showDetails.tpl.html',  
                controller: 'detailsCtrl',
                caseInsensitiveMatch: true
            })
            .when('/help', {  
                templateUrl: 'app/views/help.tpl.html' 
               // controller: 'mainCtrl'  
            })
            .when('/tags', {
                templateUrl: 'app/views/tags.tpl.html' ,
                controller: 'tagsCtrl'
            })
            .when('/apps', {  
                templateUrl: 'app/views/apps.tpl.html'
            })      
            .otherwise({  
                redirectTo: '/'  
            });  
    }]); 
    
}());

