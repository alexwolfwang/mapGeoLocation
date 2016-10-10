/**
 * Created by Alex.W on 2016/10/9.
 */
(function() {
    var app = angular.module('mapApp', []);

    app.directive('mapGeoLocation',function($window) {
       var template = '<p><span id="status">looking up geolocation</span></p><br/>' +
           '<div class="map"></div> ',
           mapContainer = null,
           status = null;

        function link(scope,elem,attrs) {
            status = angular.element($('#status'));
            mapContainer = angular.element($('.map'));
            mapContainer.attr('style','height: ' + scope.height + 'px; width: ' + scope.width +
            'px; margin:' + scope.position);
            $window.navigator.geolocation.getCurrentPosition(mapLocation, geoError)
            //$window.navigator object contains information about the visitor's browser
        };

        function mapLocation(pos) {
            status.html('Found your location! Longitude: ' + pos.coords.longitude + ' Latitude: ' +
            pos.coords.latitude);
            var latlng = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
            var options = {
                zoom:15,
                center: latlng,
                mapTypeControl: true,
                mapTypeId: google.maps.MapTypeId.roadmap
            };

            var map = new google.maps.Map(mapContainer[0],options);
            var marker = new google.maps.Marker({
                position: latlng,
                map: map,
                title: 'You are here!!'
            })
        }

        function geoError(err) {
            status.html("Error: " + err)
        }

        return {
            restrict: 'AE',
            scope: {
                height: '@',
                width: '@',
                position: '@'
            },
            link:link,
            template:template
        }
    });
}());