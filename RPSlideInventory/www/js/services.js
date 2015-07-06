angular.module('starter.services', [])
    .factory('getSlides', function($q, $http, $cordovaBarcodeScanner) {
        return {
            getSlide: function(allSlides) {
                var deferred = $q.defer();
                $cordovaBarcodeScanner.scan().then(function(imageData) {
                    $http({
                        url: 'https://www.coastalpath.com/webservices/rapidtrackapi/Api/SlideInventory',
                        method: "GET",
                        params: { id: imageData.text, allSlides: allSlides, user: userName }
                    }).success(function(data, status, headers, config) {
                        deferred.resolve(data);
                    }).error(function(data, status, headers, config) {
                        console.log(status);
                    });
                }), function(error) {
                    console.log("An error happened -> " + error);
                };
                return deferred.promise;
            }
        };
    })
    .factory('slidesOut', function($q, $http) {
        return {
            sendSlide: function(sjson) {
                var deferred = $q.defer();
                $http.post('https://www.coastalpath.com/webservices/rapidtrackapi/Api/SlideInventory', sjson).
                    success(function(data, status, headers, config) {
                        if (status === 200) {
                            console.log('Success');
                            console.log(data);
                        }
                    }).
                    error(function(data, status, headers, config) {
                        console.log(status);
                    });
                return deferred.promise;
            }
        };
    })
    .factory('slidesIn', function($q, $http) {
        return {
            inSlide: function(sjson) {
                var deferred = $q.defer();
                $http.put('https://www.coastalpath.com/webservices/rapidtrackapi/Api/SlideInventory/5', sjson).
                    success(function(data, status, headers, config) {
                        if (status === 200) {
                            console.log('Success');
                            console.log(data);
                        }
                    }).
                    error(function(data, status, headers, config) {
                        console.log(status);
                    });
                return deferred.promise;
            }
        };
    });


