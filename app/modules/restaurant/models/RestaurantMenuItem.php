<?php

class RestaurantMenuItem extends BaseModel {
	protected $fillable = ['name', 'category_id', 'price', 'description', 'tags'];
}