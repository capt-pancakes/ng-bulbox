angular.module("app", ["ngBulbox"]).controller("exampleController", [
  "$scope",
  "$log",
  "$ngBulbox",
  function ($scope, $log, $ngBulbox) {
    $scope.userType = "guest";
    $scope.showConfirm = function () {
      var opts = {
        title: "Are you sure??",
        size: 'sm',
        buttons: {
          dismiss: {
            text: 'Cancel',

          }
        },
        templateUrl : "./test.tpl.html"
      }
      // $log.debug("Attempting to call confirm method")
      $ngBulbox.customDialog(opts).then((response) => {
        $log.debug("All is good")
      }, (error) => {
        $log.error("Something broke")
      });
    }
  },
]);
