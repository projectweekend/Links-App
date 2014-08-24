var angMod = angular.module( "linksApp", [
    "ngRoute",
    "linksApp.controllers",
    "linksApp.services"
] );


angMod.config( [
    "$routeProvider",
    "$locationProvider",
    "$sceDelegateProvider",
    function ( $routeProvider, $locationProvider, $sceDelegateProvider ) {

        $routeProvider.when( "/add-link", {
            templateUrl: "templates/add-link.html",
            controller: "AddLink"
        } );

        $routeProvider.when( "/add-folder", {
            templateUrl: "templates/add-folder.html",
            controller: "AddFolder"
        } );

        $routeProvider.when( "/list", {
            templateUrl: "templates/list.html",
            controller: "List"
        } );

        $routeProvider.when( "/sync-setup", {
            templateUrl: "templates/sync-setup.html",
            controller: "SyncSetup"
        } );

        $routeProvider.otherwise( {
            redirectTo: "/add-link"
        } );

} ] );
