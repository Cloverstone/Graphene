<?php

class ImagesController extends BaseController {
     /**
   * Display the specified resource.
   * GET /apps/{id}
   *
   * @param  int  $id
   * @return Response
   */
  public function index()
  {
    if(isset($_GET['list'])){
      return Image::select('_id', 'name', 'ext')->where("site_id", "=", Config::get('site')['_id'])->get();
    }

    return Image::where("site_id", "=", Config::get('site')['_id'])->get();
  }
  /**
   * Store a newly created resource in storage.
   *
   * @return Response
   */
  public function store()
  {
    $post_data = Input::all();
    $image = new Image();
    $image->fill($post_data);
    //$image->fill($post_data);
    if(Input::hasFile('image_filename')) {
      $file = Input::file('image_filename');
      //$file->move(public_path() . '/uploads/imgs/',$file->getClientOriginalName());
      $file->move(base_path().'/protected/'.Config::get('site')['_id'].'/img/' ,$file->getClientOriginalName());
      $image->name = $file->getClientOriginalName();
      $image->ext = $file->getClientOriginalExtension();
    }
    $image->site_id = Config::get('site')['_id'];
    $image->save();
    return $image;
  }

  // public function display($args){
      /**
   * Display the specified resource.
   * GET /apps/{id}
   *
   * @param  int  $id
   * @return Response
   */
  public function show($id)
  {
    $image = Image::find($id);
    return $image;
  }
  /**
   * Update the specified resource in storage.
   *
   * @param  int  $id
   * @return Response
   */
  public function update($id)
  {
    $post_data = Input::all();
    $image = Image::bySite()->find($id);
    $image->fill($post_data);
    if(Input::hasFile('image_filename')) {
      $file = Input::file('image_filename');
      $file->move(public_path() . '/uploads/imgs/',$file->getClientOriginalName());
      $image->image_filename = $file->getClientOriginalName();

    }
    $image->save();
    return $image;
  }

  public function destroy($id)
  {   
    $image = Image::bySite()->find($id);
    $image->delete();
    return $image;
  }
}
?>