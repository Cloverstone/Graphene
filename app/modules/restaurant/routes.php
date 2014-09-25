<?php

Route::resource('/restaurant/categories', 'RestaurantCategoryController');
Route::post('/restaurant/categories_order', 'RestaurantCategoryController@order');

Route::resource('/restaurant/menu_items', 'RestaurantMenuItemController');

Route::get('/restaurant/menu', function(){

			$page = (object) array('content'=>RestaurantCategory::with('items')->bySite()->select('text')->get(), 'title'=>'Menu');//;

      $menu = View::make('themes/'.Config::get('site')['theme'].'/menu' , array("items" => Navigation::bySite()->select('text', 'target')->get())); 

      //$menuArray = Config::get('menu');
      //$menu = View::make('menu' , array("items" => Config::get('menu')));
      $side_menu = View::make('side_menu' , array("items" => Config::get('side_menu')));
//      $content = View::make('content' , $page);
      //dreturn $menu;
      return View::make('themes/'.Config::get('site')['theme'].'/home' , array("menu" => $menu, "side_menu" => $side_menu, "page"=>$page));

});