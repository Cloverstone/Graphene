<?php
Router::get('/sitemap.xml','Sitemap','getmap');
Router::get('/robots.txt','Sitemap','robots');
class Sitemap {
  public static function getmap(){
    response::using("empty");
    header ("Content-Type:text/xml; charset=utf-8");

    response::$_content = '<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
';
    response::$_content .= stencil::render('sitemap_template.php',array(
      "url"=>"http://".session::$site['domain'],
      "frequency"=>"daily",
      "priority"=>"1.0"
    ));
    Widgets::execute('sitemap');
    response::$_content .= '</urlset>';
  }

  public static function robots(){
    response::using("empty");
    header ("Content-Type:text; charset=utf-8");
    response::$_content = 'User-agent: *
';
    Widgets::execute('robots');
    response::$_content .= 'Sitemap: http://'.session::$site['domain'].'/sitemap.xml';
  }
}
?>
