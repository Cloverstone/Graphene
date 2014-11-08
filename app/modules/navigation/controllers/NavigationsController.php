<?php


class NavigationsController extends BaseController {
     /**
   * Display the specified resource.
   * GET /apps/{id}
   *
   * @param  int  $id
   * @return Response
   */
  public function index()
  {
    return Navigation::bySite()->orderBy('order', 'ASC')->get();
  }
  /**
   * Store a newly created resource in storage.
   *
   * @return Response
   */
  public function store()
  {
    $navigation = new Navigation();
    $post_data= Input::all();
    $navigation->fill( $post_data );
    // $navigation->created_by = Auth::user()->id;
    // $navigation->modified_by = Auth::user()->id;
    $navigation->onclick = '';
    $navigation->site_id = Config::get('site')['_id'];
    $navigation->save();
    return $navigation;
  }

  /**
   * Update the specified resource in storage.
   *
   * @param  int  $id
   * @return Response
   */
  public function update($id)
  {
    $navigation = Navigation::bySite()->find($id);
    $post_data= Input::all();
    $navigation->fill( $post_data );
    // $navigation->modified_by = Auth::user()->id;
    $navigation->save();
    return $navigation;
  }
  // public function destroy($id)
  // {   
  //   $page = Navigation::find($id);
  //   $page->delete();
  //   return $page;
  // }
  /**
   * Remove the specified resource from storage.
   *
   * @param  int  $id
   * @return Response
   */
  public function destroy($id)
  {   
    $wn = Navigation::bySite()->find($id);
    //$temp = $wn->parent_id;

    $wns = Navigation::bySite()->where('parent_id', '=', $wn->id)->get();
    foreach($wns as $current_wn){
      $current_wn->parent_id = $wn->parent_id;
      $current_wn->save();
    }

    $wn->delete();
    return Navigation::orderBy('order', 'ASC')->get();
//    return $wn;
  }
  public function order()
  {
    $temp = Input::all();
    foreach($temp['results'] as $key=>$result){
       $navigation = Navigation::bySite()->find($key);
      // $navigation->modified_by = Auth::user()->id;
       $navigation->order = (int) $result['order'];
       $navigation->parent_id =$result['parent_id'];
       $navigation->save();
    }
  }
}
?>