<?php

use Jenssegers\Mongodb\Model as Eloquent;
class BaseModel extends Eloquent {
	
  public function scopeCreatedBetween($query, $start, $end)
  {
		$query->where('created_at', '>', $start)
			->where('created_at', '<', $end.'23:59:59');
  }	
  public function scopeBySite($query)
  {
		$query->where("site_id", "=", Config::get('site')['_id']);
	}
}
