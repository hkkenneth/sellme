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

// Creating a new case
function CaseNewCtrl($scope, $location, Case) {
  // Template of an item?
  $scope.caseItem = {
    question: '',
    choices: [ { text: '' }, { text: '' }, { text: '' }]
  };

  // Seems somewhere that executes on client?
  $scope.addChoice = function() {
    $scope.caseItem.choices.push({ text: '' });
  };

  $scope.createCase = function() {
    var caseItem = $scope.caseItem;

    // some verification
    if(caseItem.question.length > 0) {
      var choiceCount = 0;
      for(var i = 0, ln = caseItem.choices.length; i < ln; i++) {
        var choice = caseItem.choices[i];        
        if(choice.text.length > 0) {
          choiceCount++
        }
      }
      if(choiceCount > 1) {
        // Create the object
        var newCase = new Case(caseItem); 
        // What's p      
        newCase.$save(function(p, resp) {
          if(!p.error) {
            // redirect to list?
            $location.path('list');
          } else {
            alert('Could not create the case');
          }
        });
      } else {
        alert('You must enter at least two choices');
      }
    } else {
      alert('You must enter a question');
    }
  };
}
