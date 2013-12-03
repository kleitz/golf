var app = angular.module('app');

app.controller('GameIndexController',['$filter','$scope', 'flash', 'Game', 'User', 'PlayersGame', 'CurrentUser', '$routeParams', '$location', function($filter, $scope, flash, Game, User, PlayersGame, CurrentUser, $routeParams, $location) {

	Game.get().then(function(games){
		$scope.games = $filter("orderBy")(games, 'gameDate');
		angular.forEach(games, function(game, gameIndex){
			PlayersGame.query({players: game.id}).then(function(players){
				game.players = [];
				game.reserves = [];
				angular.forEach(players, function(value, index){					
					if(value.reserve == false){
						game.players.push(value);
					}else{
						game.reserves.push(value);
					}
				});
			});
		})
	});


	$scope.flash = flash;

	$scope.destroy = function(index){
		var confirmation = confirm("Are you sure that you want to delete this game?");
    if(confirmation){
	    Game.get({id : $scope.games[index].id}).then(function(game){
	      game.delete().then(function(){
	        var games = $scope.games;
	        games.splice(index, 1);
	        $scope.message = "The game has been successfully removed";
	        console.log("deleted game");
	      });
	    });
	  }
  }


}]); 