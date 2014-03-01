// Managing the list of cases
function CaseListCtrl($scope, Case) {
  // $scope.caseItems = model?
  $scope.caseItems = Case.query();
}

// Viewing case
function CaseItemCtrl($scope, $routeParams, Case) {
  // $routeParams.caseId ----> :caseId
  // i.e. select
  $scope.caseItem = Case.get({caseId: $routeParams.caseId});
  $scope.vote = function() {};
}

function generalCheck(caseItem) {
  return ((caseItem.userid.length != 0)
    && (caseItem.casetitle.length != 0)
    && (caseItem.casetype.length != 0));
}

// Creating a new case
function CaseNewCtrl($scope, $location, Case) {
  // Template of an item?
  $scope.caseItem = {
    userid: 'temp_user'
    , casetype: ''
    , casetitle:  ''
    , remarks: ''
  };

  $scope.mobileSubItem = {
    clientType: 'personal'
    , serviceType: ''
    , planType: ''
    , voiceMinutes: 'minute1'
    , dataVolume: 'data1'
    , deviceCounts: 1
  };

  $scope.insuranceSubItem = {
    destination: 'destChina'
    , datestr: ''
    , triptype: 'typeSelf'
    , adultcount: 1
    , childcount: 0
  };

  // Seems somewhere that executes on client?
  // $scope.addChoice = function() {
  //   $scope.caseItem.choices.push({ text: '' });
  // };

  $scope.createInsuranceCase = function() {
    var caseItem = $scope.caseItem;
    var insuranceItem = $scope.insuranceSubItem;
    console.log('insurance item');
    caseItem.casetype = 'insurance';
    caseItem.casetitle = 'Travel Insurance for x days';
    var verifyResult = generalCheck(caseItem);
    if (verifyResult) {
      caseItem.insurancecontent = insuranceItem;
      var newCase = new Case(caseItem);
      newCase.$save(function(p, resp) {
        if(!p.error) {
          // redirect to list?
          console.log(p);
          console.log(resp);
          $location.path('list');
        } else {
          alert('Could not create the case');
        }
      });
    }
  };

  $scope.createMobileCase = function() {
    var caseItem = $scope.caseItem;
    var mobileItem = $scope.mobileSubItem;
    caseItem.casetype = 'mobile';
    caseItem.casetitle = 'Mobile Service Plan for user';
    var verifyResult = generalCheck(caseItem);
    if (verifyResult) {
      caseItem.mobilecontent = mobileItem;
      var newCase = new Case(caseItem);
      newCase.$save(function(p, resp) {
        if(!p.error) {
          // redirect to list?
          $location.path('list');
        } else {
          alert('Could not create the case');
        }
      });
    }
  };

  $scope.createCase = function() {
    var caseItem = $scope.caseItem;
    var verifyResult = generalCheck(caseItem);
    if  (verifyResult) {
        var newCase = new Case(caseItem);
        newCase.$save(function(p, resp) {
          if(!p.error) {
            // redirect to list?
            $location.path('list');
          } else {
            alert('Could not create the case');
          }
        });
    }
  };
}
