angular.module('sellmeapp', ['caseServices'])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.
      when('/list', { templateUrl: 'partials/list.html', controller: CaseListCtrl }).
      when('/case/:caseId', { templateUrl: 'partials/item.html', controller: CaseItemCtrl }).
      when('/new', { templateUrl: 'partials/new.html', controller: CaseNewCtrl }).
      when('/new/insurance', { templateUrl: 'partials/new-insurance.html', controller: CaseNewCtrl }).
      when('/new/mobile', { templateUrl: 'partials/new-mobile.html', controller: CaseNewCtrl }).
      when('/new/boardband', { templateUrl: 'partials/new.html', controller: CaseNewCtrl }).
      when('/new/other', { templateUrl: 'partials/new.html', controller: CaseNewCtrl }).
      otherwise({ redirectTo: '/list' });
  }]);
