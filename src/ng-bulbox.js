angular.module('ngBulbox', [])
.factory('$ngBulbox', ["$q", "$templateCache", "$compile", "$rootScope", "$http", "$window", function ($q, $templateCache, $compile, $rootScope, $http, $window) {
    return {
      alert: function (msg) {
        var deferred = $q.defer();
        function _callback() {
          deferred.resolve();
        }
        if (typeof (msg) === "object")
        {
          $window.bulbox.alert(
            angular.merge(msg, { callback: _callback })
          );
        }
        else
        {
          $window.bulbox.alert(msg, _callback);
        }
        $compile(document);
        return deferred.promise;
      },
      confirm: function (msg) {
        var deferred = $q.defer();
        function _callback(result) {
          if (result) {
            deferred.resolve();
          }
          else {
            deferred.reject();
          }
        }
        if (typeof (msg) === "object")
        {
          window.bulbox.confirm(angular.merge(msg, { callback: _callback }));
        }
        else
        {
          window.bulbox.confirm(msg, _callback);
        }
        
        return deferred.promise;
      },
      prompt: function (msg, value, selectAllOnFocus) {
        var deferred = $q.defer();
        $window.bulbox.prompt({
          title: msg,
          value: value || '',
          selectAllOnFocus: selectAllOnFocus || false,
          callback: function (result) {
            if (result !== null) {
              deferred.resolve(result);
            }
            else {
              deferred.reject();
            }
          }
        });
        return deferred.promise;
      },
      customDialog: function (options) {
        if (options.templateUrl) {
          getTemplate(options.templateUrl)
            .then(function (template) {
              options.scope = options.scope || $rootScope;
              options.body = $compile(template)(options.scope);
              $window.bulbox.dialog(options);
            }, function () { //Show default dialog if no template could be found
              $window.bulbox.dialog(options);
            });
        }
        else {
          $window.bulbox.dialog(options);
        }
      },
      setDefaults: function (options) {
        $window.bulbox.setDefaults(options);
      },
      hideAll: function () {
        $window.bulbox.hideAll();
      },
      setLocale: function (name) {
        $window.bulbox.setLocale(name);
      },
      addLocale: function (name, values) {
        $window.bulbox.addLocale(name, values);
      },
      removeLocale: function (name) {
        $window.bulbox.removeLocale(name);
      },
      dismiss: function(){
          window.bulbox.dismiss();
      }
    };

    function getTemplate(templateId) {
      var def = $q.defer();
      var template = $templateCache.get(templateId);
      if (typeof template === "undefined") {
        $http.get(templateId)
          .then(function (response) {
            var data = response.data;
            $templateCache.put(templateId, data);
            def.resolve(data);
          });
      } else {
        def.resolve(template);
      }
      return def.promise;
    }
  }]);