var app = angular.module('app');

app.controller('GameUpdateController',['$window', '$scope', 'flash', 'doubleClick', 'Game', 'User', 'PlayersGame', 
	'Tee', 'CurrentUser', '$routeParams', '$location', 
	function($window, $scope, flash, doubleClick, Game, User, PlayersGame, Tee, CurrentUser, $routeParams, $location) {

	$scope.title = "Edit game"

	User.get().then(function(u){
		$scope.users = u;
	});

	$scope.players = [];
	$scope.reserves = [];
	$scope.doubleClick = doubleClick;

	Game.query({id: $routeParams.id}).then(function(game){
		$scope.game = game;
		PlayersGame.query({players: $routeParams.id}).then(function(players){
			angular.forEach(players, function(value, index){
				User.query({id: value.userId}).then(function(user){
					if(value.reserve == false){
						user.playersGameId = value.id;
						$scope.players.push(user);
						$scope.removeUser(user);
					}else{
						user.playersGameId = value.id;
						$scope.reserves.push(user);
						$scope.removeUser(user);
					}
				});
			});
		});
		Tee.query({game_id: game.id}).then(function(tees){
			$scope.tees = tees;
		});		
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
				$scope.reserves.push(user);console.log("player added to reserve list");
				new PlayersGame({game_id: $routeParams.id, user_id: user.id, reserve: true, user_name: user.name}).save();
				var spliced = $scope.users.splice(index,1);
			}else{
				$scope.players.push(user);console.log("player added to list");
				new PlayersGame({game_id: $routeParams.id, user_id: user.id, reserve: false, user_name: user.name}).save();
				var spliced = $scope.users.splice(index,1);
			}
		});
	}

	$scope.addTee = function(time,venue){
		$scope.dirty = false;
		if($scope.teeTimes.$valid){
			var tee = {};
			tee["time"] = time;
			tee["venue"] = venue;
			$scope.tees.push(tee);
			new Tee({time: time, venue: venue, game_id: $routeParams.id}).save();
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
			game.game_date = $scope.game.gameDate; console.log("saved date");
			game.save();
		});
  	flash.set("The game has been updated successfully");
  	$window.location.href = "/#/games";
  }

	$scope.destroy = function(index,player){
		if($scope.reserves.length > 0){
			
			var reserve = $scope.reserves[$scope.reserves.length-1];
			$scope.reserves.splice($scope.reserves.length-1, 1);
			PlayersGame.get(reserve.playersGameId).then(function(player){
				player.reserve = false;
				player.save();
				$scope.players.push(reserve);
			});
			
		}
		PlayersGame.get(player.playersGameId).then(function(player){
			player.delete();console.log("removed player from db")
		});
    $scope.players.splice(index, 1);
    $scope.users.push(player);
    console.log("removed player from list");
	  
  }

  $scope.destroyReserve = function(index,player){
  	PlayersGame.get(player.playersGameId).then(function(player){
			player.delete();console.log("removed reserve from db")
		});
    $scope.reserves.splice(index, 1);
    $scope.users.push(player);
    console.log("removed reserve from list");
  }


}]); 


