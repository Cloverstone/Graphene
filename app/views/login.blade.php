<?php

	Assets::add("font-awesome.min.css");
	Assets::add("bootstrap.min.css",'/vendor/flatlab/css/');
	Assets::add("bootstrap-reset.css" , "/vendor/flatlab/css/");
	Assets::add("style-responsive.css" , "/vendor/flatlab/css/");
	Assets::add("flatlab/css/style.css" , "/vendor/");
?>
<html lang="en"><head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="">
    <meta name="author" content="Mosaddek">
    <meta name="keyword" content="FlatLab, Dashboard, Bootstrap, Admin, Template, Theme, Responsive, Fluid, Retina">
    <link rel="shortcut icon" href="img/favicon.png">

    <title>Graphene</title>


    <!-- HTML5 shim and Respond.js IE8 support of HTML5 tooltipss and media queries -->
    <!--[if lt IE 9]>
    <script src="js/html5shiv.js"></script>
    <script src="js/respond.min.js"></script>
    <![endif]-->
    <?=Assets::styles()?>
<style type="text/css"></style></head>

  <body class="login-body" style="">

    <div class="container">

      <form class="form-signin" action="/attemptloggin" method="post">
        <h2 class="form-signin-heading">sign in now</h2>
        <div class="login-wrap">
            <input type="text" name="email" class="form-control" placeholder="Email" autofocus="">
            <input type="password" name="password" class="form-control" placeholder="Password">
            <label class="checkbox">
                <input type="checkbox" value="remember"> Remember me
                <span class="pull-right">
                    <a data-toggle="modal" href="#myModal"> Forgot Password?</a>

                </span>
            </label>
            <button class="btn btn-lg btn-info btn-block" type="submit"><i class="fa fa-sign-in"></i> Sign in</button>

            <!--div class="registration">
                Don't have an account yet?
                <a class="" href="registration.html">
                    Create an account
                </a>
            </div-->

        </div>

          <!-- Modal -->
          <div aria-hidden="true" aria-labelledby="myModalLabel" role="dialog" tabindex="-1" id="myModal" class="modal fade">
              <div class="modal-dialog">
                  <div class="modal-content">
                      <div class="modal-header">
                          <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                          <h4 class="modal-title">Forgot Password ?</h4>
                      </div>
                      <!--div class="modal-body">
                          <p>Enter your e-mail address below to reset your password.</p>
                          <input type="text" name="email-reset" placeholder="Email" autocomplete="off" class="form-control placeholder-no-fix">

                      </div-->
                      <div class="modal-footer">
                          <button data-dismiss="modal" class="btn btn-default" type="button">Cancel</button>
                          <button class="btn btn-success" type="button">Submit</button>
                      </div>
                  </div>
              </div>
          </div>
          <!-- modal -->

      </form>

    </div>

  

</body></html>