require 'spec_helper'

describe GamesController do
	include Devise::TestHelpers

	let(:admin) { create(:user, name: 'Jason Carty', password: 'password', email: 'admin@email.com', confirmed_at: '2013-01-01', admin: true) }
	let(:user) { create(:user, name: 'Jason Carty', password: 'password', email: 'example@emaill.com', confirmed_at: '2013-01-01') }
	let(:game) { create(:game, game_date: '2013-01-01', name: 'Game1') }

	describe 'GET #index' do
		it 'redirects to log in if user is not logged in' do
			xhr :get, :index
			response.should redirect_to(new_user_session_path)
		end

		it 'shows a 200 if user is looged in' do
			sign_in user
			xhr :get, :index
			response.status.should == 200
		end
	end

	describe 'GET #edit' do
		it 'redirects non admin to root' do
			sign_in user
			xhr :get, :edit, id: game.id
			response.should redirect_to(:root)
		end

		it 'responds with 200 for admin users' do
			sign_in admin
			xhr :get, :edit, id: game.id
			response.status.should == 200
		end

		it 'redirects to login for non logged in users' do
			xhr :get, :edit, id: game.id
			response.should redirect_to(new_user_session_path)
		end
	end

	describe 'POST #create' do
		it 'redirects non admin to root' do
			sign_in user
			xhr :post, :create, game: {game_date: '2013-10-12'}
			response.should redirect_to(:root)
		end

		it 'admin can create games' do
			sign_in admin
			count = Game.count
			xhr :post, :create, game: {game_date: '2013-10-12'}
			Game.count.should == count + 1
		end
	end

	describe 'PATCH #update' do 
		it 'non admin get redirected to root' do
			sign_in user
			xhr :patch, :update, id: game.id, game: {game_date: '2013-10-12'}
			response.should redirect_to(:root)
		end

		it 'admin can update' do
			sign_in admin
			xhr :patch, :update, id: game.id, game: {name: 'updated game'}
			game.reload
			game.name.should == "updated game"
		end
	end

	describe 'GET #show' do
		it 'redirects non logged in users to login' do
			xhr :get, :show, id: game.id
			response.should redirect_to(new_user_session_path)
		end

		it 'users can view the game' do
			sign_in user
			xhr :get, :show, id: game.id
			response.status.should == 200
		end

		it 'admin can view the game' do
			sign_in admin
			xhr :get, :show, id: game.id
			response.status.should == 200
		end
	end

	describe '#DELETE destroy' do
		it 'non logged in users get redirected to login' do
			xhr :delete, :destroy, id: game.id
			response.should redirect_to(new_user_session_path)
		end

	  it 'users get redirected to root' do
	  	sign_in user
	  	xhr :delete, :destroy, id: game.id
			response.should redirect_to(:root)
	  end

	  it 'admin can delete games' do
	  	sign_in admin
	  	game
	  	count = Game.count
	  	xhr :delete, :destroy, id: game.id
	  	Game.count.should == count - 1
	  end

	  it 'deletes all players_games that are connected' do
	  	sign_in admin
	  	pg = game.players_games.create(user_id: 1, reserve: true)
	  	xhr :delete, :destroy, id: game.id
	  	PlayersGame.count.should == 0
	  end

	  it 'delets all tees that are conected' do
	  	sign_in admin
	  	tee = game.tees.create(time: '11:00')
	  	xhr :delete, :destroy, id: game.id
	  	Tee.count.should == 0
	  end
	end

end