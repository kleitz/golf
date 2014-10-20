var app = angular.module('app');

app.controller('GameHomeController',['$filter', 'PlayersGame', '$scope', 'flash', 'Game', 'CurrentUser', '$location', function($filter, PlayersGame, $scope, flash, Game, CurrentUser, $location) {

	$scope.current_user = CurrentUser;
	$scope.flash = flash;

	Game.get().then(function(games){
		$scope.games = $filter("orderBy")(games, 'gameDate');
    angular.forEach(games, function(game, index){
      angular.forEach(game.playersGames, function(pg, i){
        pg.emailHash = $scope.emailHash(pg.user.email)
        if(pg.user.id == $scope.current_user.id){
          game.current_user = $scope.current_user;
        }
      });
    });
	});

	$scope.emailHash = function(email){
		return MD5(email);
	}

  $scope.cancelGame = function(gameId, current_user, gameIndex){
  	var confirmation = confirm("Are you sure that you want to cancel your booking?");
  	if(confirmation){

  		PlayersGame.query({game_id : gameId, user_id: $scope.current_user.id}).then(function(game){
  			game[0].delete().then(function(){
  				angular.forEach($scope.games[gameIndex].playersGames, function(value,index){
						if(value.user.id == current_user.id){
							$scope.games[gameIndex].playersGames.splice(index,1);
							current_user.reserve = value.reserve;
						}
					});
  				if(current_user.reserve == false){
						$scope.games[gameIndex].playersGames = $filter('orderBy')($scope.games[gameIndex].playersGames, '[-reserve, playersGameCreatedAt]');
			  		PlayersGame.get({id: $scope.games[gameIndex].playersGames[0].id}).then(function(player){
			  			player.reserve = false;
			  			$scope.games[gameIndex].playersGames[0].reserve = false;
			  			player.save();
			  		});
			  	}
  			});
  		});
  		$scope.games[gameIndex].current_user = null;
  	}
  }

  $scope.bookGame = function(gameId, current_user, gameIndex){
    new PlayersGame({game_id: gameId, user_id: current_user.id, reserve: false, user_name: current_user.name}).save().then(function(obj){
    	current_user.reserve = false;
	    current_user = obj;
      current_user.emailHash = $scope.emailHash(obj.user.email);
	    $scope.games[gameIndex].playersGames.push(current_user);
	    $scope.games[gameIndex].current_user = current_user;
    });
  }

  $scope.bookReserve = function(gameId, current_user, gameIndex){
  	new PlayersGame({game_id: gameId, user_id: current_user.id, reserve: true, user_name: current_user.name}).save().then(function(obj){
    	current_user.reserve = true;
      current_user = obj;
      current_user.emailHash = $scope.emailHash(obj.user.email);
	    $scope.games[gameIndex].playersGames.push(current_user);
	    $scope.games[gameIndex].current_user = current_user;
    });
  }

}]);