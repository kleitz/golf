var app = angular.module('app');

app.controller('GameIndexController',['$filter','$scope', 'flash', 'Game', 'CurrentUser', '$routeParams', '$location', function($filter, $scope, flash, Game, CurrentUser, $routeParams, $location) {

	Game.get().then(function(games){
		$scope.games = $filter("orderBy")(games, 'gameDate');
		angular.forEach(games, function(game, gameIndex){
			game.players = $filter('filter')(game.playersGames, {reserve: 'false'}, true);
			game.reserves = $filter('filter')(game.playersGames, {reserve: 'true'}, true);
		});
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
	      });
	    });
	  }
  }


}]);