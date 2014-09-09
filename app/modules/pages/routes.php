<?php
// Route::get('/stuff',  function()
// {

// 	$menuArray = Config::get('menu');
// 	$menu = View::make('menu' , array("items" => Config::get('menu')));
// 	$side_menu = View::make('side_menu', array("items" => Config::get('side_menu')));
// 	$content = 'hello';
// 	return View::make('index', array("menu" => $menu, "side_menu" => $side_menu, "content" => $content));

// //	return View::make('index');
// });


Route::resource('/pages', 'PagesController');
// Route::get('hello', function()
// {
// 	//dd( Config::get('request.subdomain')  );
// 	return View::make('hello');
// });

// Modules::register('page');
// Router::add_route('/page/*','page','display');
// Router::get('/publish/page/*','page','publish','is_approved');
// Router::get('/publish/page','page','publish','is_approved');
// Router::add_route('/fetch/page/*','page','fetch','is_approved');
// Router::add_route('/fetch/page_json/*','page','fetch_json');
// Router::add_route('/fetch/page','page','fetch','is_approved');
// Router::delete('/pages/*','page','delete','is_approved');
// Router::add_route('/remove/page/*','page','delete','is_approved');
// Router::get('/admin/pages','page','admin','is_approved');
// Router::get('/admin/migrate_pages','page','migrate','is_approved');
// Router::get('/admin/migrate_recieve','page','migrate_recieve','is_approved');
