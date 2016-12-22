@include('includes')
<!DOCTYPE html>
<html lang="en" style="overflow: hidden;"><head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<meta name="description" content="">
		<meta name="author" content="Mosaddek">
		<meta name="keyword" content="FlatLab, Dashboard, Bootstrap, Admin, Template, Theme, Responsive, Fluid, Retina">
		<link rel="shortcut icon" href="/assets/img/favicon.png">
		
		<title>Graphene</title>
		<?=Assets::styles();?>
	<style type="text/css"></style></head>

	<body style="">

	<section id="container" class="">
			<!--header start-->
			<header class="header white-bg">
					<div class="sidebar-toggle-box">
							<div data-original-title="Toggle Navigation" data-placement="right" class="fa fa-bars tooltips"></div>
					</div>
					<!--logo start-->
					<a href="#" class="logo" style="margin-top: 12px;"><img src="/assets/img/graphene.png" /></span></a>
					<!--logo end-->
					<div class="horizontal-menu navbar-collapse collapse ">
						<ul class="nav navbar-nav">
<!-- 							<li><a href="#/Apps"><i class="fa-btn fa fa-cubes"></i> My Apps</a></li>
							<li><a href="#/Settings"><i class="fa-btn fa fa-cogs"></i> Settings</a></li>
							<li><a href="#/Discover"><i class="fa-btn fa fa-rocket"></i> Discover</a></li>
							<li><a href="#/New"><i class="fa-btn fa fa-cube"></i> New App</a></li> -->
							<!--li class="dropdown">
								<a data-toggle="dropdown" data-hover="dropdown" class="dropdown-toggle" href="#">UI Element <b class=" fa fa-angle-down"></b></a>
								<ul class="dropdown-menu">
									<li><a href="general.html">General</a></li>
								</ul>
							</li-->
						</ul>
					</div>

					<div class="top-nav ">
							<ul class="nav pull-right top-menu">
									<li>
											<input type="text" class="form-control search" placeholder="Search">
									</li>
									<!-- user login dropdown start-->
									<li class="dropdown">
											<a data-toggle="dropdown" class="dropdown-toggle" href="#">
													<img alt="" style="max-width:29px" src="/images/none.png">
													<span class="username">TEMP </span>
													<b class="caret"></b>
											</a>
											<ul class="dropdown-menu extended logout">
													<div class="log-arrow-up"></div>
													<li><a href="#"><i class="fa fa-cog"></i> Settings</a></li>
													<li><a href="#"><i class="fa fa-tasks"></i> Activity</a></li>
													<li><a href="#/My Profile"><i class=" fa fa-suitcase"></i>Profile</a></li>
													<li><a href="logout"><i class="fa fa-key"></i> Log Out</a></li>
											</ul>
									</li>
									<!-- user login dropdown end -->
							</ul>
					</div>
			</header>
			<!--header end-->
			<!--sidebar start-->
			<aside>
					<div id="sidebar" class="nav-collapse " style="overflow: hidden; outline: none;" tabindex="5000">
						<img src="/assets/img/cb.png" style="color: #fff;position: fixed;top: 160px;left: 15px;opacity: .03;-webkit-transform: rotate(15deg);"/>
{{ $side_menu }}
					</div>
			</aside>
			<!--sidebar end-->
			<!--main content start-->
			<section id="main-content">
					<section class="wrapper site-min-height">							
						<div class="row">
								<div class="col-lg-12">
									<!--breadcrumbs start -->
									<!--ul class="breadcrumb">
									</ul-->
									<!--breadcrumbs end -->
								</div>
							</div>
			<div id="content">
				{{ $content }}
			</div>
					</section>
			</section>
			<!--main content end-->
			<!--footer start-->
<!-- 			<footer class="site-footer">
					<div class="text-center">
							Powered by BerryJS.
							<a href="#" class="go-top">
									<i class="fa fa-angle-up"></i>
							</a>
					</div>
			</footer> -->
			<!--footer end-->
	</section>

		<!-- js placed at the end of the document so the pages load faster -->
		<!--script src="js/jquery.js"></script>
		<script src="js/bootstrap.min.js"></script>
		<script class="include" type="text/javascript" src="js/jquery.dcjqaccordion.2.7.js"></script>
		<script src="js/jquery.scrollTo.min.js"></script>
		<script src="js/jquery.nicescroll.js" type="text/javascript"></script>
		<script src="js/respond.min.js"></script-->

		<!--common script for all pages-->
		<!--script src="js/common-scripts.js"></script--><div id="ascrail2000" class="nicescroll-rails" style="width: 3px; z-index: auto; background-color: rgb(64, 64, 64); cursor: default; position: fixed; height: 390px; opacity: 0; background-position: initial initial; background-repeat: initial initial;"><div style="position: relative; top: 0px; float: right; width: 3px; height: 401px; background-color: rgb(232, 64, 63); background-clip: padding-box; border-top-left-radius: 10px; border-top-right-radius: 10px; border-bottom-right-radius: 10px; border-bottom-left-radius: 10px;"></div></div><div id="ascrail2000-hr" class="nicescroll-rails" style="height: 3px; z-index: auto; background-color: rgb(64, 64, 64); position: fixed; cursor: default; display: none; width: 207px; opacity: 0; background-position: initial initial; background-repeat: initial initial;"><div style="position: relative; top: 0px; height: 3px; width: 210px; background-color: rgb(232, 64, 63); background-clip: padding-box; border-top-left-radius: 10px; border-top-right-radius: 10px; border-bottom-right-radius: 10px; border-bottom-left-radius: 10px;"></div></div><div id="ascrail2001" class="nicescroll-rails" style="width: 6px; z-index: 1000; background-color: rgb(64, 64, 64); cursor: default; position: fixed; top: 0px; height: 100%; right: 0px; opacity: 0; background-position: initial initial; background-repeat: initial initial;"><div style="position: relative; top: 0px; float: right; width: 6px; height: 462px; background-color: rgb(232, 64, 63); background-clip: padding-box; border-top-left-radius: 10px; border-top-right-radius: 10px; border-bottom-right-radius: 10px; border-bottom-left-radius: 10px;"></div></div><div id="ascrail2001-hr" class="nicescroll-rails" style="height: 6px; z-index: 1000; background-color: rgb(64, 64, 64); position: fixed; left: 0px; width: 100%; bottom: 0px; cursor: default; display: none; opacity: 0; background-position: initial initial; background-repeat: initial initial;"><div style="position: relative; top: 0px; height: 6px; width: 1279px; background-color: rgb(232, 64, 63); background-clip: padding-box; border-top-left-radius: 10px; border-top-right-radius: 10px; border-bottom-right-radius: 10px; border-bottom-left-radius: 10px;"></div></div>


		<?=Assets::scripts();?>
		<?=Assets::templates()?>

	

</body></html>