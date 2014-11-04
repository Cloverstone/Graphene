<?php
Route::resource('/forms', 'FormsController');
Route::resource('/records', 'RecordsController');
Route::get('/form/{name}', 'FormsController@form');