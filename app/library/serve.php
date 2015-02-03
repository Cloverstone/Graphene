<?php

class Serve
{
  private static function getType($filename){
    $filename = basename($filename);
    $filename = explode('.', $filename);
    $filename = $filename[count($filename)-1];
    return static::find_type(strtolower($filename));
  }

  private static function find_type($ext){
    $mimetypes = static::mime_array();
    if (isset($mimetypes[$ext])) {
      return $mimetypes[$ext];
    }
    else {
      return 'application/octet-stream';
    }
  }

  private static function mime_array(){
    return array(
         "ico" => "image/x-icon",
         "ez" => "application/andrew-inset",
         "hqx" => "application/mac-binhex40",
         "cpt" => "application/mac-compactpro",
         "doc" => "application/msword",
         "bin" => "application/octet-stream",
         "dms" => "application/octet-stream",
         "lha" => "application/octet-stream",
         "lzh" => "application/octet-stream",
         "exe" => "application/octet-stream",
         "class" => "application/octet-stream",
         "so" => "application/octet-stream",
         "dll" => "application/octet-stream",
         "oda" => "application/oda",
         "pdf" => "application/pdf",
         "ai" => "application/postscript",
         "eps" => "application/postscript",
         "ps" => "application/postscript",
         "smi" => "application/smil",
         "smil" => "application/smil",
         "wbxml" => "application/vnd.wap.wbxml",
         "wmlc" => "application/vnd.wap.wmlc",
         "wmlsc" => "application/vnd.wap.wmlscriptc",
         "bcpio" => "application/x-bcpio",
         "vcd" => "application/x-cdlink",
         "pgn" => "application/x-chess-pgn",
         "cpio" => "application/x-cpio",
         "csh" => "application/x-csh",
         "dcr" => "application/x-director",
         "dir" => "application/x-director",
         "dxr" => "application/x-director",
         "dvi" => "application/x-dvi",
         "spl" => "application/x-futuresplash",
         "gtar" => "application/x-gtar",
         "hdf" => "application/x-hdf",
         "js" => "application/x-javascript",
         "skp" => "application/x-koan",
         "skd" => "application/x-koan",
         "skt" => "application/x-koan",
         "skm" => "application/x-koan",
         "latex" => "application/x-latex",
         "nc" => "application/x-netcdf",
         "cdf" => "application/x-netcdf",
         "sh" => "application/x-sh",
         "shar" => "application/x-shar",
         "swf" => "application/x-shockwave-flash",
         "sit" => "application/x-stuffit",
         "sv4cpio" => "application/x-sv4cpio",
         "sv4crc" => "application/x-sv4crc",
         "tar" => "application/x-tar",
         "tcl" => "application/x-tcl",
         "tex" => "application/x-tex",
         "texinfo" => "application/x-texinfo",
         "texi" => "application/x-texinfo",
         "t" => "application/x-troff",
         "tr" => "application/x-troff",
         "roff" => "application/x-troff",
         "man" => "application/x-troff-man",
         "me" => "application/x-troff-me",
         "ms" => "application/x-troff-ms",
         "ustar" => "application/x-ustar",
         "src" => "application/x-wais-source",
         "xhtml" => "application/xhtml+xml",
         "xht" => "application/xhtml+xml",
         "zip" => "application/zip",
         "au" => "audio/basic",
         "snd" => "audio/basic",
         "mid" => "audio/midi",
         "midi" => "audio/midi",
         "kar" => "audio/midi",
         "mpga" => "audio/mpeg",
         "mp2" => "audio/mpeg",
         "mp3" => "audio/mpeg",
         "aif" => "audio/x-aiff",
         "aiff" => "audio/x-aiff",
         "aifc" => "audio/x-aiff",
         "m3u" => "audio/x-mpegurl",
         "ram" => "audio/x-pn-realaudio",
         "rm" => "audio/x-pn-realaudio",
         "rpm" => "audio/x-pn-realaudio-plugin",
         "ra" => "audio/x-realaudio",
         "wav" => "audio/x-wav",
         "pdb" => "chemical/x-pdb",
         "xyz" => "chemical/x-xyz",
         "bmp" => "image/bmp",
         "gif" => "image/gif",
         "ief" => "image/ief",
         "jpeg" => "image/jpeg",
         "jpg" => "image/jpeg",
         "jpe" => "image/jpeg",
         "png" => "image/png",
         "tiff" => "image/tiff",
         "tif" => "image/tif",
         "djvu" => "image/vnd.djvu",
         "djv" => "image/vnd.djvu",
         "wbmp" => "image/vnd.wap.wbmp",
         "ras" => "image/x-cmu-raster",
         "pnm" => "image/x-portable-anymap",
         "pbm" => "image/x-portable-bitmap",
         "pgm" => "image/x-portable-graymap",
         "ppm" => "image/x-portable-pixmap",
         "rgb" => "image/x-rgb",
         "xbm" => "image/x-xbitmap",
         "xpm" => "image/x-xpixmap",
         "xwd" => "image/x-windowdump",
         "igs" => "model/iges",
         "iges" => "model/iges",
         "msh" => "model/mesh",
         "mesh" => "model/mesh",
         "silo" => "model/mesh",
         "wrl" => "model/vrml",
         "vrml" => "model/vrml",
         "css" => "text/css",
         "html" => "text/html",
         "htm" => "text/html",
         "asc" => "text/plain",
         "txt" => "text/plain",
         "rtx" => "text/richtext",
         "rtf" => "text/rtf",
         "sgml" => "text/sgml",
         "sgm" => "text/sgml",
         "tsv" => "text/tab-seperated-values",
         "wml" => "text/vnd.wap.wml",
         "wmls" => "text/vnd.wap.wmlscript",
         "etx" => "text/x-setext",
         "xml" => "text/xml",
         "xsl" => "text/xml",
         "mpeg" => "video/mpeg",
         "mpg" => "video/mpeg",
         "mpe" => "video/mpeg",
         "qt" => "video/quicktime",
         "mov" => "video/quicktime",
         "mxu" => "video/vnd.mpegurl",
         "avi" => "video/x-msvideo",
         "movie" => "video/x-sgi-movie",
         "ice" => "x-conference-xcooltalk"
    );
  }

  private static function doc_root_path_exists($file_path){
    if ($file_path != "/" && is_file('doc_root/'.$file_path) && is_readable('doc_root/'.$file_path)){
      return true;
    }
    return false;
  }

  private static function show_doc_root($file_path){
    $file_path = 'doc_root/'.$file_path;
    if(pathinfo($file_path, PATHINFO_EXTENSION) == 'php') {
      include_once($file_path);
    }else{
      static::dump_file($file_path, 0);
    }
    exit();
  }
  public static function dump_file($file_path,$cache_seconds=0,$file_name = NULL){

    if (!file_exists($file_path)){
      header("HTTP/1.1 404 Not Found");
    } else if (!is_readable($file_path) || !is_file($file_path)){
      header("HTTP/1.1 403 Forbidden");
    } else {
      $file_path_array = explode('/',$file_path);
      header('Content-Description: File Transfer');
      header('Content-Type: '.static::gettype($file_path));
      header('Content-Length: ' . filesize($file_path));
      if ($file_name != NULL){
       	header('Content-Disposition: inline; filename=' . $file_name);
      }
      $ts = gmdate("D, d M Y H:i:s", time() + $cache_seconds) . " GMT";
      header("Expires: $ts");
      header("Pragma: cache");
      header("Cache-Control: max-age=$cache_seconds");
      readfile($file_path);

    }


  }

  public static function file( $file_path ){
    static::dump_file($file_path, 0);
  }

//   public function raw(){
//     global $PWD;
//     $filename = end($PWD);
//     $file = explode('.',$filename);
//     $ext = end($file);
//     unset($PWD[count($PWD)-1]);
//     $file_path = '../public/'.implode('/',$PWD).'/'.$filename;

//     if($PWD[0] == 'assets'){
//      $temp_path =  '../themes/'.session::$site["theme"].'/'.implode('/',$PWD).'/'.$filename;
//      if(file_exists($temp_path)){$file_path = $temp_path;}
//     }
//     if ($ext == 'php'){
// //      $file_path = '../public/'.implode('/',$PWD);
// //      chdir($file_path);
//       $_SERVER['SCRIPT_FILENAME'] = $file_path;
//       include($file_path);
//     } else {
//       if ($ext == 'js') {
//         static::dump_file($file_path,0);
//       }
//       else {
// 	// Cache for 12 hours
//         static::dump_file($file_path,43200);
//       }
//     }
//   }

}
?>
