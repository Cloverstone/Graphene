<?php
class SitesController extends BaseController {
  /**
   * Display the specified resource.
   * GET /apps/{id}
   *
   * @param  int  $id
   * @return Response
   */
  public function index()
  {
    return Site::orderBy('updated_at', 'ASC')->get();
  }
  /**
   * Store a newly created resource in storage.
   *
   * @return Response
   */
  public function store()
  {
    $site = new Site();
    $post_data= Input::all();
    $site->fill( $post_data );
    $site->save();
    return $site;
  }

  /**
   * Update the specified resource in storage.
   *
   * @param  int  $id
   * @return Response
   */
  public function update($id)
  {
    $site = Site::find($id);
    $post_data= Input::all();
    $site->fill( $post_data );

    $site->save();
    return $site;
  }

  /**
   * Remove the specified resource from storage.
   *
   * @param  int  $id
   * @return Response
   */
  public function destroy($id)
  {   
    $site = Site::find($id);
    $site->delete();
    return $site;
  }

}
?>