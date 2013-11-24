
angular.module("filters", [])
	.filter('current_user_playing', function (user,current_user) {
	  return function (user,current_user) {
	    if(user.id == current_user.id){console.log("something");
	      return user;
	    }
	  };
	});
