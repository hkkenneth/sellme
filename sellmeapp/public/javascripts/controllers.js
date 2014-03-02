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
    , serviceType: 'x'
    , planType: 'x'
    , voiceMinutes: 'minute3'
    , dataVolume: 'data3'
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
    caseItem.casetype = 'insurance';
    caseItem.casetitle = 'Travel Insurance';
    var verifyResult = generalCheck(caseItem);
    if (verifyResult) {
      caseItem.insurancecontent = insuranceItem;
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

  $scope.createMobileCase = function() {
    var caseItem = $scope.caseItem;
    var mobileItem = $scope.mobileSubItem;
    console.log(mobileItem);
    caseItem.casetype = 'mobile';
    caseItem.casetitle = 'Mobile Service Plan';
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
}


function generalMemberCheck(memberItem) {
  return ((memberItem.userid.length != 0)
    && (memberItem.password.length != 0)
    && (memberItem.displayname.length != 0));
}

// Creating a new member
function MemberNewCtrl($scope, $location, Member) {
  // Template of a member
  $scope.memberItem = {
      userid: ''
    , usertype: 'customer'
  };

  $scope.salesSubItem = {

  };

  $scope.createMember = function() {
    var memberItem = $scope.memberItem;
    var salesSubItem = $scope.salesSubItem;
    var verifyResult = generalMemberCheck(memberItem);
    if (verifyResult) {
      if ( memberItem.usertype == 'sales') {
        memberItem.salesinfo = salesSubItem;
      }

      var newMember = new Member(memberItem);
      newMember.$save(function(p, resp) {
        if(!p.error) {
          // redirect to list?
          $location.path('list');
        } else {
          alert('Could not create the member');
        }
      });
    }
  };
}