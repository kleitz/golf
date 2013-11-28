
'use strict';

var app = angular.module('app');

app.controller('GameController',['$window', '$scope', 'flash', 'doubleClick', 'Game', 'User', 'PlayersGame', 'Tee', 
	'CurrentUser', '$routeParams', '$location', 
	function($window, $scope, flash, doubleClick, Game, User, PlayersGame, Tee, CurrentUser, $routeParams, $location) {

	$scope.title = "Create Game"

	User.get().then(function(u){
		$scope.users = u;
	});

	$scope.players = [];
	$scope.reserves = [];
	$scope.tees = [];
	$scope.flash = flash;
	$scope.doubleClick = doubleClick;

	$scope.addPlayer = function(index,player){console.log(player);
		User.query({id:player.id}).then(function(user){
			$scope.player = user;console.log($scope.players.length);
			if($scope.players.length >= 8){
				$scope.reserves.push(user);console.log("player added to reserve list");
				$scope.users.splice(index,1);
			}else{
				$scope.players.push(user);console.log("player added to list");
				$scope.users.splice(index,1);
			}
		});
	}
	
	$scope.addTee = function(time, venue){
		$scope.dirty = false;
		if($scope.teeTimes.$valid){
			var tee = {};
			tee["time"] = time;
			tee["venue"] = venue;
			$scope.tees.push(tee);
		}else{
			$scope.dirty = true;
		}
	}

	$scope.destroyTee = function(index, tee){
		$scope.tees.splice(index,1);
	}

	$scope.destroy = function(index,player){
		if($scope.reserves.length > 0){
			var reserve = $scope.reserves[$scope.reserves.length-1];
			$scope.reserves.splice($scope.reserves.length-1,1);
			$scope.players.push(reserve);
		}
    $scope.players.splice(index, 1);
    $scope.users.push(player);
    console.log("removed player from list");
  }

  $scope.destroyReserve = function(index,player){
    $scope.reserves.splice(index, 1);
    $scope.users.push(player);
    console.log("removed reserve from list");
  }

  
  $scope.saveGame = function(){
  	new Game({game_date: String($scope.game.gameDate)}).save().then(function(obj){
  		for(var i = 0; i<$scope.players.length; i++){
  			new PlayersGame({game_id: obj.id, user_id: $scope.players[i].id, reserve: false, user_name: $scope.players[i].name}).save();
  		}
  		for(var i = 0; i<$scope.reserves.length; i++){
  			new PlayersGame({game_id: obj.id, user_id: $scope.reserves[i].id, reserve: true, user_name: $scope.reserves[i].name}).save();
  		}
  		for(var i = 0; i<$scope.tees.length; i++){
  			new Tee({game_id: obj.id, time: $scope.tees[i].time, venue: $scope.tees[i].venue}).save();
  		}
  	});
  	flash.set("The game has been created successfully");
  	$window.location.href = "/#/games";
  }

}]);  


