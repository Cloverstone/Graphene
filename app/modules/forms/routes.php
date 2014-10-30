<?php
Route::resource('/forms', 'FormsController');
Route::get('/submit/{_id}', 'FormsController@submit');