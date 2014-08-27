var svcMod = angular.module( "linksApp.services", [] );
var gui = require('nw.gui');


svcMod.factory( "applyScope", [ "$rootScope",
    function ( $rootScope ) {
        return function ( err, data, done ) {
            $rootScope.$apply( function () {
                if ( err ) {
                    return done( err );
                }
                return done( null, data );
            } );
        };
    } ] );


svcMod.factory( "DB", [ "$rootScope",
    function ( $rootScope ) {

        var db = new PouchDB( "linksDB" );

        if ( $rootScope.syncEnabled ) {
            // TODO
        }

        return db;

    } ] );


svcMod.factory( "GUI", [ function () {

    var gui = require('nw.gui');

    return gui;

} ] );


svcMod.factory( "CopyPaste", [ "GUI", function ( GUI ) {

    var copyOption = {
        key: "Ctrl+C",
        active: function () {
            console.log("COPY!!!");
            document.execCommand("copy");
        },
        failed : function( msg ) {
            console.log( msg );
        }
    };

    var pasteOption = {
        key: "Ctrl+V",
        active: function () {
            console.log("PASTE!!!");
            document.execCommand("paste");
        },
        failed : function( msg ) {
            console.log( msg );
        }
    };

    var copy = new GUI.Shortcut( copyOption );
    var paste = new GUI.Shortcut( pasteOption );

} ] );


svcMod.factory( "Folder", [ "DB", "applyScope",
    function ( DB, applyScope ) {
        return {
            add: function ( doc, done ) {

                doc.type = "folder";
                doc.links = [];
                DB.post( doc, function ( err, res ) {
                    return applyScope( err, res, done );
                } );

            },
            list: function ( done ) {

                var options = {
                    include_docs: true,
                    descending: true
                };

                DB.allDocs( options, function( err, data ) {
                    return applyScope( err, data, done );
                } );

            },
            read: function ( folderId, done ) {

                DB.get( folderId, function ( err, data ) {
                    return applyScope( err, data, done );
                } );

            },
            addLink: function ( linkDoc, folderDoc, done ) {

                folderDoc.links.push( linkDoc );
                DB.put( folderDoc, function ( err, data ) {
                    return applyScope( err, data, done );
                } );

            }
        };
    } ] );
