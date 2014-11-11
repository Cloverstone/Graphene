<?php

class Tracking{
	
  public static function pageView($module, $id){
      $tempView = new PageView();
      $tempView->url = Request::path();
      $tempView->module = $module;
      $tempView->id = $id;
      $tempView->client_ip = Request::getClientIp();
      $tempView->user_id = "";
      $tempView->save();
  }

}