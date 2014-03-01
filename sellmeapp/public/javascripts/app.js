angular.module('sellmeapp', ['caseServices'])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.
      when('/list', { templateUrl: 'partials/list.html', controller: CaseListCtrl }).
      when('/case/:caseId', { templateUrl: 'partials/item.html', controller: CaseItemCtrl }).
      when('/new', { templateUrl: 'partials/new.html', controller: CaseNewCtrl }).
      otherwise({ redirectTo: '/list' });
  }]);
