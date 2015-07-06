angular.module('starter.controllers', ['ngCordova'])
    .controller('ScaninCtrl', function ($scope, $state, getSlides, slidesIn) {
        if (userName === null) {
            $state.go("login");
        }
        $scope.hide = true;
        $scope.checked = false;
        $scope.scanBarcode = function() {
            getSlides.getSlide(false).then(function(data) {
                console.log(data);
                if (data.length > 0) {
                    $scope.devList = data;
                    $scope.remaining = data[0].CaseNumber;
                    $scope.hide = false;
                }
            });
            $scope.checkAll = function() {
                $scope.checked = !$scope.checked;
            };
            $scope.saveAll = function(item) {
                console.log(item);
                slidesIn.inSlide(JSON.stringify(item));
                $scope.hide = true;
                $scope.checked = false;
                $scope.devList = "";
                $scope.remaining = "";
            };
        };


    })
    .controller('ScanOutCtrl', function($scope, $state, getSlides, slidesOut) {
        if (userName === null) {
            $state.go("login");
            return;
        }
        $scope.hide = true;
        $scope.checked = false;
        $scope.scanBarcode = function() {
            getSlides.getSlide(true).then(function(data) {
                console.log(data);
                if (data.length > 0) {
                    $scope.devList = data;
                    $scope.remaining = data[0].CaseNumber;
                    $scope.hide = false;
                }
            });
            $scope.checkAll = function() {
                $scope.checked = !$scope.checked;
            };
            $scope.saveAll = function(item) {
                console.log(item);
                slidesOut.sendSlide(JSON.stringify(item));
                $scope.hide = true;
                $scope.checked = false;
                $scope.devList = "";
                $scope.remaining = "";
            };
        };
    })
.controller('LogInCtrl', function ($scope, $state) {
        console.log('Here');
    $scope.signIn = function (user) {
        if (user.username) {
            userName = user.username;
            $state.go("tab.scanout");
        }

    };
});


