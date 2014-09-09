<?php

Route::resource('/restaurant/categories', 'RestaurantCategoryController');
Route::post('/restaurant/categories_order', 'RestaurantCategoryController@order');

Route::resource('/restaurant/menu_items', 'RestaurantMenuItemController');