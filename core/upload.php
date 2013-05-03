<?
class Upload
{
  public function __construct(){}
  public function filename(){return $_FILES['uploadedfile']['name'];}
  public function move($path, $filename){
    if(!isset($filename)){
      $filename = $_FILES['uploadedfile']['name'];
    }
    if(move_uploaded_file($_FILES['uploadedfile']['tmp_name'], $path.$filename)){
      return $_FILES['uploadedfile']['name'];
    }else{return false;}

  }
}
?>
