var app = angular.module('app');

app.controller("SessionsController", function($scope , CurrentUser, $http, $location) {
 
  $scope.current_user = CurrentUser;

  if(CurrentUser == null){
    $location.path("/");
    
  }

	$scope.signOut = function() {
    $http({
      method: "DELETE",
      url: "/users/sign_out",
      headers: {
        'X-CSRF-Token': $('meta[name=csrf-token]').attr('content')
      }
    }).success(function(data) {
      $scope.current_user = null;
      $scope.loggedIn = false;
      $('meta[name=current_user]').prop('content', 'null');
      console.log('deleted session');
      $location.path('/users/sign_in');
    }).error(function(data, status) {
      return alert("Error: " + status + ".\n" + data);
    });
  };

  $scope.signIn = function() {
	  var authData;
	  $scope.authErrors = [];
	  authData = {
	    user: {
	      email: $scope.email,
	      password: $scope.password
	    }
	  };
	  $http({
	    method: "POST",
	    url: "/users/sign_in",
	    headers: {
	      'X-CSRF-Token': $('meta[name=csrf-token]').attr('content')
	    },
	    data: authData
	  }).success(function(data) {
	    $scope.current_user = angular.toJson(data);
      $scope.loggedIn = true;
	    $('meta[name=current_user]').prop('content', $scope.current_user);
	    $location.path("/");
	  }).error(function(data, status) {
	    $scope.authErrors = data['error'];
	  });
	};

	$scope.getClass = function(path) {
    if ($location.path().substr(0, path.length) == path) {
      return "active"
    } else {
      return ""
    }
  }	
}); 