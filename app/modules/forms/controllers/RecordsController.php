<?php
class RecordsController extends BaseController {

  /**
   * Display the specified resource.
   * GET /apps/{id}
   *
   * @param  int  $id
   * @return Response
   */
  public function index()
  {
    $CustomForm = CustomFormSubmission::where('form', '=', $_GET['form_id'])->get();//::orderBy('updated_at', 'DEC')->get();;
    return $CustomForm;
    if (Request::wantsJson()) {

    } else {
    }
  }
  /**
   * Display the specified resource.
   * GET /apps/{id}
   *
   * @param  int  $id
   * @return Response
   */
  // public function show($id)
  // {
  //     $CustomForm = CustomFormSubmission::find($id);
  //     return $CustomForm;
  // }
  /**
   * Store a newly created resource in storage.
   *
   * @return Response
   */
  public function store()
  {
    $post_data = Input::all();
    $submission = new CustomFormSubmission();
    $submission->fill( $post_data );
    $submission->save();
    return Redirect::back();
  }

  // public function update($id)
  // {
  //   $post_data = Input::all();
  //   $CustomForm = CustomFormSubmission::find($id);
  //   $CustomForm->fill($post_data);
  //   $CustomForm->slug = str_replace('/ ', '_', strtolower($CustomForm->title));
  //   $CustomForm->save();
  //   return $CustomForm;
  // }


  // public function destroy($id)
  // {   
  //   $CustomForm = CustomFormSubmission::find($id);
  //   $CustomForm->delete();
  //   return $CustomForm;
  // }




}
?>