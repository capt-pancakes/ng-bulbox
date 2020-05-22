angular.module("app", ["ngBulbox"]).controller("exampleController", [
  "$scope",
  "$log",
  "$ngBulbox",
  function ($scope, $log, $ngBulbox) {
    $scope.userType = "guest";
    $scope.showConfirm = $ngBulbox.alert;
  },
]);
