<?php
class GalleryItemsController extends BaseController {

      /**
   * Display the specified resource.
   * GET /apps/{id}
   *
   * @param  int  $id
   * @return Response
   */
  public function index()
  {
    if(Input::has('gallery_id')) {
      return GalleryItem::orderBy('order', 'ASC')->where('gallery_id', '=', Input::get('gallery_id'))->get();
    }
  }

 
 // public function display($args){
      /**
   * Display the specified resource.
   * GET /apps/{id}
   *
   * @param  int  $id
   * @return Response
   */
  public function show($gallery_id, $id)
  {
      return GalleryItem::find($id);
  }
  /**
   * Store a newly created resource in storage.
   *
   * @return Response
   */
  // public function store($gallery_id)
  // {
  //   $post_data = Input::all();//::orderBy('updated_at', 'ASC')->get();
  //   $gallery = new GalleryItem();
  //   $gallery->fill( $post_data );
  //   $gallery->save();
  //   return $gallery;
  // }
  public function store()
  {
    $post_data = Input::all();
    $gallery = new GalleryItem();
    $gallery->fill($post_data);
    //$image->fill($post_data);
    if(Input::hasFile('image_filename')) {
      $file = Input::file('image_filename');
      $gallery->name = explode('.'.$file->getClientOriginalExtension(),$file->getClientOriginalName())[0];
      $gallery->ext = $file->getClientOriginalExtension();
    }

    $gallery->save();

    if(Input::hasFile('image_filename')) {
      $file->move(public_path() . '/uploads/galleries/',$gallery->_id.'.'.$file->getClientOriginalExtension());
    }
    return $gallery;
  }

  public function update($id)
  {
    $post_data = Input::all();
    $gallery = GalleryItem::find($id);
    $gallery->fill($post_data);
    $gallery->save();
    return $gallery;
  }

  public function destroy($id)
  {   
    $gallery = GalleryItem::find($id);
    $gallery->delete();
    return $gallery;
  }


}
?>