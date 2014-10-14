<?php
Route::resource('/forms', 'FormsController');
Route::post('/submit', 'FormsController@submit');