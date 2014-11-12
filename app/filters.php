<?php

/*
|--------------------------------------------------------------------------
| Application & Route Filters
|--------------------------------------------------------------------------
|
| Below you will find the "before" and "after" events for the application
| which may be used to do any work before or after a request into your
| application. Here you may also register your custom route filters.
|
*/

App::before(function($request)
{
//   $domain = Config::get('app.domain');
 //  $domain = 'localhost';
 //  preg_match("/^(.*)(\.$domain)$/", Request::getHost(), $parts);
	//Config::set('request.subdomain', $parts[1]);

	Config::set('site', Site::where("domain", "=", Request::getHost())->first());
	if(Config::get('site') == NULL) {
		Config::set('site', array('_id' => '53d6aecacb00e79ded0041a8', 'theme' => 'adams_site', 'homepage' => 'tester'));
	};
});


App::after(function($request, $response)
{
	//
});

/*
|--------------------------------------------------------------------------
| Authentication Filters
|--------------------------------------------------------------------------
|
| The following filters are used to verify that the user of the current
| session is logged into this application. The "basic" filter easily
| integrates HTTP Basic authentication for quick, simple checking.
|
*/

Route::filter('auth', function()
{
	if (Auth::guest())
	{
		if (Request::ajax())
		{
			return Response::make('Unauthorized', 401);
		}
		else
		{
			return Redirect::guest('login');
		}
	}
});


Route::filter('auth.basic', function()
{
	return Auth::basic();
});

Route::filter('adminAuth', function()
{
	//POST Data
	if (!Auth::check()) {
		if (Input::has('email') && Input::has('password') ){
			$credentials = array(
				'email' => Input::get('email'),
				'password' => Input::get('password')
			);
		 	if(Auth::attempt( $credentials )) {
				Session::regenerate();
				//Login successfull :)
				// $agent = new Agent_signin();
				// $agent->signin();
			}
		}else{
			return Redirect::guest('login');
		}	
	} else {
		// $agent = Agent_signin::find(Session::getId());
		// if($agent) {
		// 	$agent->touch();
		// }
	}
});



/*
|--------------------------------------------------------------------------
| Guest Filter
|--------------------------------------------------------------------------
|
| The "guest" filter is the counterpart of the authentication filters as
| it simply checks that the current user is not logged in. A redirect
| response will be issued if they are, which you may freely change.
|
*/

Route::filter('guest', function()
{
	if (Auth::check()) return Redirect::to('/');
});

/*
|--------------------------------------------------------------------------
| CSRF Protection Filter
|--------------------------------------------------------------------------
|
| The CSRF filter is responsible for protecting your application against
| cross-site request forgery attacks. If this special token in a user
| session does not match the one given in this request, we'll bail.
|
*/

Route::filter('csrf', function()
{
	if (Session::token() != Input::get('_token'))
	{
		throw new Illuminate\Session\TokenMismatchException;
	}
});
