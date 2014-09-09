<?php


class RestaurantCategoryController extends BaseController {

     /**
   * Display the specified resource.
   * GET /apps/{id}
   *
   * @param  int  $id
   * @return Response
   */
  public function index()
  {
    return RestaurantCategory::bySite()->orderBy('order', 'ASC')->get();
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
    if (Request::wantsJson()) {
     return RestaurantCategory::bySite()->find($id);
    }
  }
  /**
   * Store a newly created resource in storage.
   *
   * @return Response
   */
  public function store()
  {
    $post_data = Input::all();//::orderBy('updated_at', 'ASC')->get();
    $cat = new RestaurantCategory();
    // $page->website_id = 0;
    // $page->agent_id = Auth::user()->id;
    // $page->office_id = Auth::user()->office_id;
    $cat->fill( $post_data );
    $cat->site_id = Config::get('site')['_id'];
    $cat->save();
    return $cat;
  }
  /**
   * Update the specified resource in storage.
   *
   * @param  int  $id
   * @return Response
   */
  public function update($id)
  {
    $cat = RestaurantCategory::bySite()->find($id);
    $post_data= Input::all();
    $cat->fill( $post_data );
    $cat->save();
    return $cat;
  }
  /**
   * Remove the specified resource from storage.
   *
   * @param  int  $id
   * @return Response
   */
  public function destroy($id)
  {   
    $wn = RestaurantCategory::bySite()->find($id);
    //$temp = $wn->parent_id;

    $wns = RestaurantCategory::bySite()->where('parent_id', '=', $wn->id)->get();
    foreach($wns as $current_wn){
      $current_wn->parent_id = $wn->parent_id;
      $current_wn->save();
    }

    $wn->delete();
    return RestaurantCategory::orderBy('order', 'ASC')->get();
//    return $wn;
  }
  public function order()
  {
    $temp = Input::all();
    foreach($temp['results'] as $key=>$result){
       $navigation = RestaurantCategory::bySite()->find($key);
      // $navigation->modified_by = Auth::user()->id;
       $navigation->order = $result['order'];
       $navigation->parent_id =$result['parent_id'];
       $navigation->save();
    }
  }
}
?>