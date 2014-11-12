<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the Closure to execute when that URI is requested.
|
*/

// Route::get('/', function()
// {
// 	return View::make('hello');
// });
Route::get('/login', function()
{
	return View::make('login');
});

Route::group(['before' => 'adminAuth'], function() {

	Route::get('/logout', function()
	{
		Auth::logout();
		return Redirect::to('/login');
	});

	Route::post('/attemptloggin', function()
	{
		return Redirect::guest('/admin');
	});

	Route::get('/admin', function()
	{
		$menuArray = Config::get('menu');
		$menu = View::make('menu' , array("items" => Config::get('menu')));
		$side_menu = View::make('side_menu' , array("items" => Config::get('side_menu')));
		return View::make('index' , array("menu" => $menu, "side_menu" => $side_menu, "content"=>''));

	//	return View::make('index');
	});
	Route::resource('/sites', 'SitesController');

});
Route::get('/', 'PagesController@home');



Route::get('/{id}', 'PagesController@show');