
'use strict';

var app = angular.module('app');

app.controller('GameController',['$window', '$scope', 'flash', 'doubleClick', 'Game', 'User', 'PlayersGame', 'Tee', 
	'CurrentUser', '$routeParams', '$location', 
	function($window, $scope, flash, doubleClick, Game, User, PlayersGame, Tee, CurrentUser, $routeParams, $location) {

	$scope.game = {};

  $scope.players = [];
  $scope.reserves = [];
  $scope.game.tees = [];
  $scope.users = [];
  $scope.flash = flash;
  $scope.doubleClick = doubleClick;

  $scope.title = "Create Game"
  User.get().then(function(u){
    $scope.users = u;
  });

	$scope.addPlayer = function(index,player){
		User.query({id:player.id}).then(function(user){
			$scope.player = user;
      $scope.player.user = {};
      $scope.player.user.name = user.name;
			if($scope.players.length >= 8){
				$scope.reserves.push($scope.player);
				$scope.users.splice(index,1);
			}else{
				$scope.players.push($scope.player);
				$scope.users.splice(index,1);
			}
		});
	}
	
	$scope.addTee = function(time, venue){
		if(time == null){
			$scope.teeTimes.$error.teeTimeError = true;
		}
		if($scope.teeTimes.$valid && time != null ){
			var tee = {};
			tee["time"] = time;
			tee["venue"] = venue;
			$scope.game.tees.push(tee);
			$scope.teeTimes.$error.teeTimeError = false;
			$scope.game.teeTime = '';
			$scope.teeTimes.$setPristine();
		}
	}

	$scope.destroyTee = function(index, tee){
		$scope.game.tees.splice(index,1);
	}

	$scope.destroy = function(index,player){
		if($scope.reserves.length > 0){
			var reserve = $scope.reserves[0];
			$scope.reserves.splice(0,1);
			$scope.players.push(reserve);
		}
    $scope.players.splice(index, 1);
    $scope.users.push(player);
  }

  $scope.destroyReserve = function(index,player){
    $scope.reserves.splice(index, 1);
    $scope.users.push(player);
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


