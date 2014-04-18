var writerApp = angular.module('writerApp', ['ngRoute', 'ngResource', 'angularBootstrapNavTree']);

writerApp.factory('Writing', ['$resource',
    function($resource){
        return $resource('/writings/:writingId', {writingId: '@id'}, {
            query: {method:'GET', isArray:true, transformResponse: function(body) { return JSON.parse(body)._items; }},
            delete: {method:'DELETE'}
        });
    }]
);

writerApp.controller('WriterCtrl', function ($scope, $rootScope, $routeParams, Writing) {
    $scope.writing = {chapters: []};
    Writing.get({writingId: $routeParams.writingId}, function(w) {
        $scope.writing = w;
    });
});

writerApp.controller('ListCtrl', function ($scope, Writing) {
    $scope.writings = Writing.query();

    $scope.deleteWriting = function(idx) {
        var writing = $scope.writings[idx];
        writing.$delete({writingId: writing._id}, function() {
            $scope.writings.splice(idx, 1);
        });
    }

    $scope.createWriting = function() {
        var writing_data = {
            title: 'The Catcher in the Rye',
            chapters: [
                {'label': 'Intro'},
                {'label': 'Chapter 2'},
                {'label': 'Chapter 3', children: ['Jade', 'Less', 'Coffeescript']},
                {'label': 'Outtro'}
            ],
            heroes: [
                {'label': 'John Smith'},
                {'label': 'Ivan Ivanoff'},
                {'label': 'Juan Pedro'}
            ],
            places: [
                {'label': 'St. Petersburg'},
                {'label': 'Moscow'},
                {'label': 'Quito'}
            ],
            events: [
                {'label': 'Old Year'},
                {'label': 'New Year'},
                {'label': 'Old new Year'}
            ]
        };
        var writing = new Writing(writing_data);
        writing.$save(function(w) {
            _.merge(w, writing_data);
            $scope.writings.push(w);
        });
    }
});

writerApp.config(function($routeProvider, $locationProvider) {
    $routeProvider.when('/editor/:writingId', {
        templateUrl: '/media/templates/editor.html',
        controller: 'WriterCtrl'
    }).when('/', {
        templateUrl: '/media/templates/list.html',
        controller: 'ListCtrl'
    }).otherwise({
        redirectTo: '/'
    });
});

$('.editor-editable').hallo({
    plugins: {
        'halloformat': {}
    }
});