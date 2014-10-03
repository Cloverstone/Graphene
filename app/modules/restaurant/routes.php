<?php

Route::resource('/restaurant/categories', 'RestaurantCategoryController');
Route::post('/restaurant/categories_order', 'RestaurantCategoryController@order');

Route::resource('/restaurant/menu_items', 'RestaurantMenuItemController');

Route::get('/restaurant/menu', function(){

$categories = RestaurantCategory::with('items')->bySite()->select('text')->get();

foreach($categories as $cat){
	$odd = true;
	$count = 1;
	$max = count($cat['items']);
	foreach($cat['items'] as $item){
		$item->odd = $odd;
		$item->first = ($count == 1);
		$item->second = ($count == 2);
if($odd){
		$item->penultimate = ((($max -1) == $count)||($max == $count));
}else{
		$item->last = ($max == $count);
}

		$odd = !$odd;
		$count++;
	}

}
			$content = View::make('themes/'.Config::get('site')['theme'].'/restaurant_menu' ,array("categories" =>  $categories ));

			$page = (object) array('content'=>  $content, 'title'=>'Menu');//;

      $menu = View::make('themes/'.Config::get('site')['theme'].'/menu' , array("items" => Navigation::bySite()->select('text', 'target')->get())); 

      //$menuArray = Config::get('menu');
      //$menu = View::make('menu' , array("items" => Config::get('menu')));
      $side_menu = View::make('side_menu' , array("items" => Config::get('side_menu')));
//      $content = View::make('content' , $page);
      //dreturn $menu;
      return View::make('themes/'.Config::get('site')['theme'].'/home' , array("menu" => $menu, "side_menu" => $side_menu, "page"=>$page));

});