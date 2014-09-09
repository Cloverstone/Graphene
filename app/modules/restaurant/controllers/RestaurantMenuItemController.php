<?php


class RestaurantMenuItemController extends BaseController {

     /**
   * Display the specified resource.
   * GET /apps/{id}
   *
   * @param  int  $id
   * @return Response
   */
  public function index()
  {
    return RestaurantMenuItem::bySite()->get();//orderBy('order', 'ASC')->get();
  }
  /**
   * Store a newly created resource in storage.
   *
   * @return Response
   */
  public function store()
  {
    $menuItem = new RestaurantMenuItem();
    $post_data= Input::all();
    $menuItem->fill( $post_data );
    $menuItem->site_id = Config::get('site')['_id'];
    $menuItem->save();
    return $menuItem;
  }

  /**
   * Update the specified resource in storage.
   *
   * @param  int  $id
   * @return Response
   */
  public function update($id)
  {
    $menuItem = RestaurantMenuItem::bySite()->find($id);
    $post_data= Input::all();
    $menuItem->fill($post_data);
    // $navigation->modified_by = Auth::user()->id;
    $menuItem->save();
    return $menuItem;
  }
  /**
   * Remove the specified resource from storage.
   *
   * @param  int  $id
   * @return Response
   */
  public function destroy($id)
  {   
    $menuItem = RestaurantMenuItem::bySite()->find($id);
    $menuItem->delete();
    return $menuItem;
  }
}
?>