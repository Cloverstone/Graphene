<?php
Route::resource('/galleries', 'GalleriesController');
Route::resource('/gallery_items', 'GalleryItemsController');

Route::get('/assets/gallery/{gallery}', function($name){
	//return Serve::file(base_path().'/protected/'.Config::get('site')['_id'].'/img/'.$name);
});

Route::get('/assets/gallery/{gallery}/{image}', function($name){
	//return Serve::file(base_path().'/protected/'.Config::get('site')['_id'].'/img/'.$name);
});