<?php
Route::resource('/images', 'ImagesController');

Route::get('/assets/img/{name}', function($name){
	return Serve::file(base_path().'/protected/'.Config::get('site')['_id'].'/img/'.$name);
});