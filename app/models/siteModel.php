<?php

use Jenssegers\Mongodb\Model as Eloquent;
class Site extends Eloquent {
	protected $fillable = ['domain', 'homepage', 'theme'];
}