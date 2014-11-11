<?php
class PageViewsController extends BaseController {
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

}
?>