<?php
Route::resource('/navs', 'NavigationsController');
Route::post('/nav_order', 'NavigationsController@order');