var angMod = angular.module( "starNotes", [
    "ngRoute",
    "starNotes.controllers",
    "starNotes.services"
] );


angMod.config( [
    "$routeProvider",
    "$locationProvider",
    "$sceDelegateProvider",
    function ( $routeProvider, $locationProvider, $sceDelegateProvider ) {

        var resolve = {
            checkLogin: function ( Login ) {
                return Login.checkLogin();
            }
        };

        $routeProvider.when( "/", {
            templateUrl: "templates/home.html",
            controller: "Home"
        } );

        $routeProvider.when( "/settings", {
            templateUrl: "templates/settings.html",
            controller: "Settings"
        } );

        $routeProvider.otherwise( {
            redirectTo: "/"
        } );

} ] );
