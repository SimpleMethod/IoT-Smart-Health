var app = angular.module('myApp', ['ngRoute']);

app.config(function($routeProvider) {
    $routeProvider

        .when('/', {
            templateUrl : 'pages/home.html',
            controller  : 'HomeController'
        })

        .when('/createtable', {
            templateUrl : 'pages/createtable.html',
            controller  : 'CreatetableController'
        })

        .when('/droptable', {
            templateUrl : 'pages/droptable.html',
            controller  : 'DroptableController'
        })

        .when('/insertintotable', {
            templateUrl : 'pages/insertintotable.html',
            controller  : 'InsertintotableController'
        })

        .when('/deletefromtable', {
            templateUrl : 'pages/deletefromtable.html',
            controller  : 'DeletefromtableController'
        })
        .when('/selectfromtable', {
            templateUrl : 'pages/selectfromtable.html',
            controller  : 'SelectfromtableController'
        })
        .when('/executeorder66', {
            templateUrl : 'pages/executesql.html',
            controller  : 'Executeorder66Controller'
        })
        .when('/sequences', {
            templateUrl : 'pages/sequences.html',
            controller  : 'SequencesController'
        })
        .when('/createfunction', {
            templateUrl : 'pages/createfunction.html',
            controller  : 'CreatefunctionController'
        })
        .when('/createprocedures', {
            templateUrl : 'pages/createprocedures.html',
            controller  : 'CreateproceduresController'
        })
        .when('/executefunction', {
            templateUrl : 'pages/executefunction.html',
            controller  : 'ExecutefunctionController'
        })
        .when('/executeprocedures', {
            templateUrl : 'pages/executeprocedures.html',
            controller  : 'ExecuteproceduresController'
        })
        .when('/updatefromtable', {
            templateUrl : 'pages/updatefromtable.html',
            controller  : 'UpdatefromtableController'
        })
        .when('/viewselect', {
            templateUrl : 'pages/viewselect.html',
            controller  : 'ViewselectController'
        })


        .otherwise({redirectTo: '/'});
});

app.controller('Executeorder66Controller', function($scope) {
    $scope.message = 'Wykonanie dowolnego kodu SQL';
});

app.controller('ExecuteproceduresController', function($scope) {
    $scope.message = 'Uruchamianie procedur';
});

app.controller('ExecutefunctionController', function($scope) {
    $scope.message = 'Uruchamianie funkcji';
});

app.controller('CreatefunctionController', function($scope) {
    $scope.message = 'Tworzenie funkcji';
});

app.controller('CreateproceduresController', function($scope) {
    $scope.message = 'Tworzenie procedur';
});

app.controller('SequencesController', function($scope) {
    $scope.message = 'Tworzenie sekwencji';
});

app.controller('SelectfromtableController', function($scope) {
    $scope.message = 'Wyszukiwanie z tabel';
});

app.controller('UpdatefromtableController', function($scope) {
    $scope.message = 'Aktualizacja rekordów';
});

app.controller('DeletefromtableController', function($scope) {
    $scope.message = 'Usuwanie rekordów';
});

app.controller('InsertintotableController', function($scope) {
    $scope.message = 'Dodawanie rekordów';
});

app.controller('InsertintotableController', function($scope) {
    $scope.message = 'Dodawanie rekordów';
});

app.controller('CreatetableController', function($scope) {
    $scope.message = 'Tworzenie tabel';
});

app.controller('DroptableController', function($scope) {
    $scope.message = 'Usuwanie tabel';
});

app.controller('ViewselectController', function($scope) {
    $scope.message = 'Wyświetlanie widoków';
});



