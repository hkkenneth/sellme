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
      when('/box', { templateUrl: 'partials/box.html', controller: CaseListCtrl }).
      when('/member/new', { templateUrl: 'partials/new-member.html', controller: MemberNewCtrl }).
      otherwise({ redirectTo: '/list' });
  }]);
