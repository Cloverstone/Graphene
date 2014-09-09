<?php
class GalleriesController extends BaseController {

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
      return Gallery::select('_id', 'name')->get();
    }
    return Gallery::all();
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
      return Gallery::find($id);
  }
  /**
   * Store a newly created resource in storage.
   *
   * @return Response
   */
  public function store()
  {
    $post_data = Input::all();//::orderBy('updated_at', 'ASC')->get();
    $gallery = new Gallery();
    $gallery->fill( $post_data );
    $gallery->save();
    return $gallery;
  }

  public function update($id)
  {
    $post_data = Input::all();
    $gallery = Gallery::find($id);
    $gallery->fill($post_data);
    $gallery->save();
    return $gallery;
  }

  public function destroy($id)
  {   
    $gallery = Gallery::find($id);
    $gallery->delete();
    return $gallery;
  }


}
?>