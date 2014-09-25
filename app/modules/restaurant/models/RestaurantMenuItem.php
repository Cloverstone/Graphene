<?php

class RestaurantMenuItem extends BaseModel {
	protected $fillable = ['name', 'restaurant_category_id', 'price', 'description', 'tags'];

	public function category() {
		return $this->belongsTo('RestaurantCategory');
	}
}