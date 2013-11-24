var app = angular.module('app');

app.controller('GameHomeController',['$filter', '$scope', 'flash', 'Game', 'User', 'Tee', 'PlayersGame', 'CurrentUser', '$location', function($filter, $scope, flash, Game, User, Tee, PlayersGame, CurrentUser, $location) {

	$scope.current_user = CurrentUser;
	$scope.flash = flash;

	Game.get().then(function(games){
		$scope.games = $filter("orderBy")(games, '-createdAt');
		angular.forEach(games, function(game, gameIndex){
			game.tees = [];
			Tee.query({game_id: game.id}).then(function(tees){
				game.tees = tees; 
			})
			PlayersGame.query({players: game.id}).then(function(players){
				game.players = [];
				angular.forEach(players, function(value, index){
					User.get(value.userId).then(function(player){
						player.reserve = value.reserve;
						player.playersGameId = value.id
						player.playersGameCreatedAt = value.createdAt;
						game.players.push(player);
						if(player.id == $scope.current_user.id){
							game.current_user = $scope.current_user;
						}
					});
				});
			});
		})
	});
	

  $scope.cancelGame = function(gameId, current_user, gameIndex){
  	var confirmation = confirm("Are you sure that you want to cancel your booking?");
  	if(confirmation){
  		PlayersGame.query({game_id : gameId, user_id: current_user.id}).then(function(game){
  			game[0].delete().then(function(){
  				angular.forEach($scope.games[gameIndex].players, function(value,index){
						if(value.id == current_user.id){
							$scope.games[gameIndex].players.splice(index,1);
							current_user.reserve = value.reserve;
						}
					});
  				if(current_user.reserve == false){
						$scope.games[gameIndex].players =  $filter('orderBy')($scope.games[gameIndex].players, '[-reserve, playersGameCreatedAt]'); 
			  		PlayersGame.get($scope.games[gameIndex].players[0].playersGameId).then(function(player){
			  			player.reserve = false;
			  			$scope.games[gameIndex].players[0].reserve = false;
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
	    current_user.playersGameId = obj.id;
	    $scope.games[gameIndex].players.push(current_user);console.log("added player");
	    $scope.games[gameIndex].current_user = current_user;
    });
  }

  $scope.bookReserve = function(gameId, current_user, gameIndex){
  	new PlayersGame({game_id: gameId, user_id: current_user.id, reserve: true, user_name: current_user.name}).save().then(function(obj){
    	current_user.reserve = true;
	    current_user.playersGameId = obj.id;
	    $scope.games[gameIndex].players.push(current_user);console.log("added reserve");
	    $scope.games[gameIndex].current_user = current_user;
    });
  }

}]); 