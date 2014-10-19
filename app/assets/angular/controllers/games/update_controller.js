var app = angular.module('app');

app.controller('GameUpdateController',['$window', '$filter', '$scope', 'flash', 'doubleClick', 'Game', 'User', 'PlayersGame', 
	'Tee', 'CurrentUser', '$routeParams', '$location', 
	function($window, $filter, $scope, flash, doubleClick, Game, User, PlayersGame, Tee, CurrentUser, $routeParams, $location) {

	$scope.title = "Edit game"
	$scope.users = [];
	$scope.doubleClick = doubleClick;
	$scope.players = [];
	$scope.reserves = [];
	
	User.get().then(function(u){
		for(var i = 0; i < u.length; i ++){
			if(u[i].playersGames.length > 0){
				for(var x = 0; x < u[i].playersGames.length; x ++){
					if(u[i].playersGames[x].gameId != $routeParams.id){
						$scope.users.push(u[i]);
					}					
				}
			}else{
				$scope.users.push(u[i]);
			}
		}
	});

	Game.query({id: $routeParams.id}).then(function(game){
		$scope.game = game;
		$scope.players = $filter('filter')(game.playersGames, {reserve: 'false'}, true);
		$scope.reserves = $filter('filter')(game.playersGames, {reserve: 'true'}, true);
	});

	$scope.removeUser = function(player){
		angular.forEach($scope.users, function(user, userIndex){
			if(player.id == user.id){
				$scope.users.splice(userIndex,1);
			}
		});
	}

	$scope.addPlayer = function(index,player){
		User.query({id:player.id}).then(function(user){
			$scope.player = user;
			if($scope.players.length >= 8){
				new PlayersGame({game_id: $routeParams.id, user_id: user.id, reserve: true, user_name: user.name}).save().then(function(player){
					$scope.reserves.push(player);
				});
				var spliced = $scope.users.splice(index,1);
			}else{
				new PlayersGame({game_id: $routeParams.id, user_id: user.id, reserve: false, user_name: user.name}).save().then(function(player){
					$scope.players.push(player);
				});
				var spliced = $scope.users.splice(index,1);
			}
		});
	}

	$scope.addTee = function(time,venue){
		$scope.dirty = false;
		if(time == null){
			$scope.teeTimes.$error.teeTimeError = true;
		}
		if($scope.teeTimes.$valid && time != null ){
			var tee = {};
			tee["time"] = time;
			tee["venue"] = venue;
			$scope.tees.push(tee);
			new Tee({time: time, venue: venue, game_id: $routeParams.id}).save();
			$scope.teeTimes.$error.teeTimeError = false;
			$scope.game.teeTime = '';
			$scope.teeTimes.$setPristine();
		}else{
			$scope.dirty = true;
		}
	}

	$scope.destroyTee = function(index, tee){
		Tee.get(tee.id).then(function(tee){
			tee.delete();
		});
		$scope.tees.splice(index,1);
	}


	$scope.saveGame = function(){
		Game.get({id: $routeParams.id}).then(function(game){
			game.game_date = $scope.game.gameDate; 
			game.save();
		});
  	flash.set("The game has been updated successfully");
  	$window.location.href = "/#/games";
  }

	$scope.destroy = function(index,player){
		
		var user = User.query({id:player.user.id});
		if($scope.reserves.length > 0){
			var reserve = $scope.reserves[0];
			$scope.reserves.splice(0, 1);
			PlayersGame.get(reserve.id).then(function(player){
				player.reserve = false;
				player.save();
				$scope.players.push(reserve);
			});
		}
		PlayersGame.get(player.id).then(function(player){
			player.delete();
		});
    $scope.players.splice(index, 1);
    $scope.users.push(user);
    
  }

  $scope.destroyReserve = function(index,player){
  	var user = User.query({id:player.user.id});
  	PlayersGame.get(player.id).then(function(player){
			player.delete();
		});
    $scope.reserves.splice(index, 1);
    $scope.users.push(user);
  }


}]); 


