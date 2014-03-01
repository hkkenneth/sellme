angular.module('caseServices', ['ngResource']).
  // service? resource?
  factory('Case', function($resource) {
    return $resource('cases/:caseId', {}, {
      // 'list' is the default?
      query: { method: 'GET', params: { caseId: 'list' }, isArray: true }
    })
  });
