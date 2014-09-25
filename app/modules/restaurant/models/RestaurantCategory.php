<?php

class RestaurantCategory extends BaseModel {
	protected $fillable = ['text', 'link'];

	public function items() {
		return $this->hasMany('RestaurantMenuItem');
	}
}