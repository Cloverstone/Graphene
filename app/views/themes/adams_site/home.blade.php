<?php
	Assets::add('jquery.min.js' , '//ajax.googleapis.com/ajax/libs/jquery/2.0.2/');
	Assets::add('jquery-ui.min.js' , '//ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/');
	Assets::add('font-awesome.min.css','//netdna.bootstrapcdn.com/font-awesome/4.1.0/css/');

	Assets::add('jquery.oembed.all.css');
	//Assets::add("bootstrap_newhome.css");
	// Assets::add("bsammend.php");
	Assets::add('theme.css', '/assets/themes/newhome/css/');
	Assets::add('style.css', '/assets/themes/newhome/css/');

	// Assets::add('pen.css');
	// Assets::add('pen.js');
	// Assets::add('markdown.js');
	//Assets::add('editor.css');
	// Assets::add('menu.css');
	// Assets::add('grande.js');
?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta charset="utf-8">
<title>{{ $page->title }}</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<!-- @todo: fill with your company info or remove -->
<meta name="description" content="">
<meta name="author" content="Adam Smallcomb">
<?=Assets::styles()?>

<!-- Le HTML5 shim, for IE6-8 support of HTML5 elements -->
<!--[if lt IE 9]>
      <script src="/assets/js/html5.js"></script>
    <![endif]-->

<!-- Le fav and touch icons - @todo: fill with your icons or remove -->
<link rel="shortcut icon" href="/img/icons/favicon.png">
<link rel="apple-touch-icon-precomposed" sizes="114x114" href="img/icons/114x114.png">
<link rel="apple-touch-icon-precomposed" sizes="72x72" href="img/icons/72x72.png">
<link rel="apple-touch-icon-precomposed" href="img/icons/default.png">
<link href='http://fonts.googleapis.com/css?family=Monda:400,700' rel='stylesheet' type='text/css'>

</head>



<body class="has-navbar-fixed-top page-services has-highlighted" name="{{ $page->slug }}">

	<!-- Main Navbar -->
	<nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
		<div class="container">
			<div class="navbar-header">
				<button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-main-collapse">
					<span class="sr-only">Toggle navigation</span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
				</button>
				<a class="navbar-brand" href="/" style="line-height: 43px;">
					<img src="/assets/img/adamsmallcomb.png" alt="Adam Smallcomb Logo">
				</a>
			</div>
			<!--div class="collapse navbar-collapse navbar-main-collapse">
				<ul class="nav navbar-nav">
					<li class="active"><a href="#home">Home</a></li>
					<li><a href="#about">About</a></li>
					<li><a href="#services">Services</a></li>
					<li><a href="#portfolio">Portfolio</a></li>
					<li><a href="#team">Team</a></li>
					<li><a href="#pricing">Pricing</a></li>
					<li><a href="#contact">Contact</a></li>
				</ul>
			</div-->
{{! $menu }}
		</div>
	</nav>

	<!-- Main Conent -->
	<section class="wrapper-sm">
		<div class="container">
			<div class="row">
<div id="content">
{{ $page->content }}
</div>
			</div><!-- /.row -->
		</div><!-- /.container -->
	</section>

	<!-- Footer -->
	<footer class="footer-main">
		<div class="wrapper-sm">
			<div class="container">
				<div class="row">
					<div class="col-sm-6 col-md-3">
						<h3>Recent Projects</h3>
						<p>What I have been working on</p>
						<ul class="list-unstyled">
							<li><i class="fa fa-check"></i> <a href="http://graphene.adamsmallcomb.com">Graphene</a></li>
							<li><i class="fa fa-check"></i> <a href="/formaljs">Formal.js</a></li>
						</ul>
					</div>
					<div class="col-sm-6 col-md-3">
						<!--h3>Image Stream List</h3>
						<p>Custom Component</p>
						<ul class="list-img-stream">
							<li><a href="#"><img data-src="holder.js/55x55" alt="55x55" style="width: 55px; height: 55px;" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADcAAAA3CAYAAACo29JGAAACVklEQVRoQ+2Y26tpURTGP8mlPCC3KEqSJMrlAS/+dikpUrwISZFckjyQ5Hb2mMXpiLXHsqm5T3OWF2Osb33f+M01Vy3DarW64D9dBhXul5JV5H4pOChyipyEE1DbUkIoLEuKHGtMEjYpchJCYVlS5FhjkrBJkZMQCsuSIscak4RNipyEUFiWFLnrmIbDIUajEYxGo/jrdDohn8/DYrFAq6Y15k9oXu+ni1ytVsNms4HVahXXHw4HFItFEU6rphXuE5q6wxGlSqUiaGUyGZjNZthsthvBZ7VWq4X1eo1gMIhwOIxGo4Htdot4PA632/2SJuuB+2pik9vtdqhWq7hc/n6g9nq9SKVS0KpRMApEi8Isl0tBnojv9/uXNN8e7uvLNJrNJux2OwKBAPr9Po7HI9LpNAwGw9Oay+VCt9vFeDy+eSoUCoL6TzQ5Adnk7sUGg4E4RBKJBPx+/z/l+xpt5XK5jPP5DKfTiWw2+9CbHs23hptOpyJMJBKBz+dDr9cTJyeFo/WsRsHvyeVyOTgcDvxE863hFosF2u22eA14PB7MZjOhT1uMDohnNdq69XpdbF16RufzudAolUri+XtF83qQfRdQ17bsdDqYTCY3zWQyKSjSelSjMHQI0YETjUYRCoXEK4OGQadnLBZ7eJ2W5rX2XTCq6wpHFxAJ+plMptvL/HojrZqWmU9ovhSOMzFZenSTk8U4x4cKx5mSjD2KnIxUOJ4UOc6UZOxR5GSkwvGkyHGmJGOPIicjFY4nRY4zJRl7FDkZqXA8KXKcKcnYo8jJSIXj6Q9uuVyFsHLRPwAAAABJRU5ErkJggg=="></a></li>
							<li><a href="#"><img data-src="holder.js/55x55" alt="55x55" style="width: 55px; height: 55px;" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADcAAAA3CAYAAACo29JGAAACVklEQVRoQ+2Y26tpURTGP8mlPCC3KEqSJMrlAS/+dikpUrwISZFckjyQ5Hb2mMXpiLXHsqm5T3OWF2Osb33f+M01Vy3DarW64D9dBhXul5JV5H4pOChyipyEE1DbUkIoLEuKHGtMEjYpchJCYVlS5FhjkrBJkZMQCsuSIscak4RNipyEUFiWFLnrmIbDIUajEYxGo/jrdDohn8/DYrFAq6Y15k9oXu+ni1ytVsNms4HVahXXHw4HFItFEU6rphXuE5q6wxGlSqUiaGUyGZjNZthsthvBZ7VWq4X1eo1gMIhwOIxGo4Htdot4PA632/2SJuuB+2pik9vtdqhWq7hc/n6g9nq9SKVS0KpRMApEi8Isl0tBnojv9/uXNN8e7uvLNJrNJux2OwKBAPr9Po7HI9LpNAwGw9Oay+VCt9vFeDy+eSoUCoL6TzQ5Adnk7sUGg4E4RBKJBPx+/z/l+xpt5XK5jPP5DKfTiWw2+9CbHs23hptOpyJMJBKBz+dDr9cTJyeFo/WsRsHvyeVyOTgcDvxE863hFosF2u22eA14PB7MZjOhT1uMDohnNdq69XpdbF16RufzudAolUri+XtF83qQfRdQ17bsdDqYTCY3zWQyKSjSelSjMHQI0YETjUYRCoXEK4OGQadnLBZ7eJ2W5rX2XTCq6wpHFxAJ+plMptvL/HojrZqWmU9ovhSOMzFZenSTk8U4x4cKx5mSjD2KnIxUOJ4UOc6UZOxR5GSkwvGkyHGmJGOPIicjFY4nRY4zJRl7FDkZqXA8KXKcKcnYo8jJSIXj6Q9uuVyFsHLRPwAAAABJRU5ErkJggg=="></a></li>
							<li><a href="#"><img data-src="holder.js/55x55" alt="55x55" style="width: 55px; height: 55px;" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADcAAAA3CAYAAACo29JGAAACVklEQVRoQ+2Y26tpURTGP8mlPCC3KEqSJMrlAS/+dikpUrwISZFckjyQ5Hb2mMXpiLXHsqm5T3OWF2Osb33f+M01Vy3DarW64D9dBhXul5JV5H4pOChyipyEE1DbUkIoLEuKHGtMEjYpchJCYVlS5FhjkrBJkZMQCsuSIscak4RNipyEUFiWFLnrmIbDIUajEYxGo/jrdDohn8/DYrFAq6Y15k9oXu+ni1ytVsNms4HVahXXHw4HFItFEU6rphXuE5q6wxGlSqUiaGUyGZjNZthsthvBZ7VWq4X1eo1gMIhwOIxGo4Htdot4PA632/2SJuuB+2pik9vtdqhWq7hc/n6g9nq9SKVS0KpRMApEi8Isl0tBnojv9/uXNN8e7uvLNJrNJux2OwKBAPr9Po7HI9LpNAwGw9Oay+VCt9vFeDy+eSoUCoL6TzQ5Adnk7sUGg4E4RBKJBPx+/z/l+xpt5XK5jPP5DKfTiWw2+9CbHs23hptOpyJMJBKBz+dDr9cTJyeFo/WsRsHvyeVyOTgcDvxE863hFosF2u22eA14PB7MZjOhT1uMDohnNdq69XpdbF16RufzudAolUri+XtF83qQfRdQ17bsdDqYTCY3zWQyKSjSelSjMHQI0YETjUYRCoXEK4OGQadnLBZ7eJ2W5rX2XTCq6wpHFxAJ+plMptvL/HojrZqWmU9ovhSOMzFZenSTk8U4x4cKx5mSjD2KnIxUOJ4UOc6UZOxR5GSkwvGkyHGmJGOPIicjFY4nRY4zJRl7FDkZqXA8KXKcKcnYo8jJSIXj6Q9uuVyFsHLRPwAAAABJRU5ErkJggg=="></a></li>
							<li><a href="#"><img data-src="holder.js/55x55" alt="55x55" style="width: 55px; height: 55px;" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADcAAAA3CAYAAACo29JGAAACVklEQVRoQ+2Y26tpURTGP8mlPCC3KEqSJMrlAS/+dikpUrwISZFckjyQ5Hb2mMXpiLXHsqm5T3OWF2Osb33f+M01Vy3DarW64D9dBhXul5JV5H4pOChyipyEE1DbUkIoLEuKHGtMEjYpchJCYVlS5FhjkrBJkZMQCsuSIscak4RNipyEUFiWFLnrmIbDIUajEYxGo/jrdDohn8/DYrFAq6Y15k9oXu+ni1ytVsNms4HVahXXHw4HFItFEU6rphXuE5q6wxGlSqUiaGUyGZjNZthsthvBZ7VWq4X1eo1gMIhwOIxGo4Htdot4PA632/2SJuuB+2pik9vtdqhWq7hc/n6g9nq9SKVS0KpRMApEi8Isl0tBnojv9/uXNN8e7uvLNJrNJux2OwKBAPr9Po7HI9LpNAwGw9Oay+VCt9vFeDy+eSoUCoL6TzQ5Adnk7sUGg4E4RBKJBPx+/z/l+xpt5XK5jPP5DKfTiWw2+9CbHs23hptOpyJMJBKBz+dDr9cTJyeFo/WsRsHvyeVyOTgcDvxE863hFosF2u22eA14PB7MZjOhT1uMDohnNdq69XpdbF16RufzudAolUri+XtF83qQfRdQ17bsdDqYTCY3zWQyKSjSelSjMHQI0YETjUYRCoXEK4OGQadnLBZ7eJ2W5rX2XTCq6wpHFxAJ+plMptvL/HojrZqWmU9ovhSOMzFZenSTk8U4x4cKx5mSjD2KnIxUOJ4UOc6UZOxR5GSkwvGkyHGmJGOPIicjFY4nRY4zJRl7FDkZqXA8KXKcKcnYo8jJSIXj6Q9uuVyFsHLRPwAAAABJRU5ErkJggg=="></a></li>
							<li><a href="#"><img data-src="holder.js/55x55" alt="55x55" style="width: 55px; height: 55px;" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADcAAAA3CAYAAACo29JGAAACVklEQVRoQ+2Y26tpURTGP8mlPCC3KEqSJMrlAS/+dikpUrwISZFckjyQ5Hb2mMXpiLXHsqm5T3OWF2Osb33f+M01Vy3DarW64D9dBhXul5JV5H4pOChyipyEE1DbUkIoLEuKHGtMEjYpchJCYVlS5FhjkrBJkZMQCsuSIscak4RNipyEUFiWFLnrmIbDIUajEYxGo/jrdDohn8/DYrFAq6Y15k9oXu+ni1ytVsNms4HVahXXHw4HFItFEU6rphXuE5q6wxGlSqUiaGUyGZjNZthsthvBZ7VWq4X1eo1gMIhwOIxGo4Htdot4PA632/2SJuuB+2pik9vtdqhWq7hc/n6g9nq9SKVS0KpRMApEi8Isl0tBnojv9/uXNN8e7uvLNJrNJux2OwKBAPr9Po7HI9LpNAwGw9Oay+VCt9vFeDy+eSoUCoL6TzQ5Adnk7sUGg4E4RBKJBPx+/z/l+xpt5XK5jPP5DKfTiWw2+9CbHs23hptOpyJMJBKBz+dDr9cTJyeFo/WsRsHvyeVyOTgcDvxE863hFosF2u22eA14PB7MZjOhT1uMDohnNdq69XpdbF16RufzudAolUri+XtF83qQfRdQ17bsdDqYTCY3zWQyKSjSelSjMHQI0YETjUYRCoXEK4OGQadnLBZ7eJ2W5rX2XTCq6wpHFxAJ+plMptvL/HojrZqWmU9ovhSOMzFZenSTk8U4x4cKx5mSjD2KnIxUOJ4UOc6UZOxR5GSkwvGkyHGmJGOPIicjFY4nRY4zJRl7FDkZqXA8KXKcKcnYo8jJSIXj6Q9uuVyFsHLRPwAAAABJRU5ErkJggg=="></a></li>
							<li><a href="#"><img data-src="holder.js/55x55" alt="55x55" style="width: 55px; height: 55px;" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADcAAAA3CAYAAACo29JGAAACVklEQVRoQ+2Y26tpURTGP8mlPCC3KEqSJMrlAS/+dikpUrwISZFckjyQ5Hb2mMXpiLXHsqm5T3OWF2Osb33f+M01Vy3DarW64D9dBhXul5JV5H4pOChyipyEE1DbUkIoLEuKHGtMEjYpchJCYVlS5FhjkrBJkZMQCsuSIscak4RNipyEUFiWFLnrmIbDIUajEYxGo/jrdDohn8/DYrFAq6Y15k9oXu+ni1ytVsNms4HVahXXHw4HFItFEU6rphXuE5q6wxGlSqUiaGUyGZjNZthsthvBZ7VWq4X1eo1gMIhwOIxGo4Htdot4PA632/2SJuuB+2pik9vtdqhWq7hc/n6g9nq9SKVS0KpRMApEi8Isl0tBnojv9/uXNN8e7uvLNJrNJux2OwKBAPr9Po7HI9LpNAwGw9Oay+VCt9vFeDy+eSoUCoL6TzQ5Adnk7sUGg4E4RBKJBPx+/z/l+xpt5XK5jPP5DKfTiWw2+9CbHs23hptOpyJMJBKBz+dDr9cTJyeFo/WsRsHvyeVyOTgcDvxE863hFosF2u22eA14PB7MZjOhT1uMDohnNdq69XpdbF16RufzudAolUri+XtF83qQfRdQ17bsdDqYTCY3zWQyKSjSelSjMHQI0YETjUYRCoXEK4OGQadnLBZ7eJ2W5rX2XTCq6wpHFxAJ+plMptvL/HojrZqWmU9ovhSOMzFZenSTk8U4x4cKx5mSjD2KnIxUOJ4UOc6UZOxR5GSkwvGkyHGmJGOPIicjFY4nRY4zJRl7FDkZqXA8KXKcKcnYo8jJSIXj6Q9uuVyFsHLRPwAAAABJRU5ErkJggg=="></a></li>
							<li><a href="#"><img data-src="holder.js/55x55" alt="55x55" style="width: 55px; height: 55px;" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADcAAAA3CAYAAACo29JGAAACVklEQVRoQ+2Y26tpURTGP8mlPCC3KEqSJMrlAS/+dikpUrwISZFckjyQ5Hb2mMXpiLXHsqm5T3OWF2Osb33f+M01Vy3DarW64D9dBhXul5JV5H4pOChyipyEE1DbUkIoLEuKHGtMEjYpchJCYVlS5FhjkrBJkZMQCsuSIscak4RNipyEUFiWFLnrmIbDIUajEYxGo/jrdDohn8/DYrFAq6Y15k9oXu+ni1ytVsNms4HVahXXHw4HFItFEU6rphXuE5q6wxGlSqUiaGUyGZjNZthsthvBZ7VWq4X1eo1gMIhwOIxGo4Htdot4PA632/2SJuuB+2pik9vtdqhWq7hc/n6g9nq9SKVS0KpRMApEi8Isl0tBnojv9/uXNN8e7uvLNJrNJux2OwKBAPr9Po7HI9LpNAwGw9Oay+VCt9vFeDy+eSoUCoL6TzQ5Adnk7sUGg4E4RBKJBPx+/z/l+xpt5XK5jPP5DKfTiWw2+9CbHs23hptOpyJMJBKBz+dDr9cTJyeFo/WsRsHvyeVyOTgcDvxE863hFosF2u22eA14PB7MZjOhT1uMDohnNdq69XpdbF16RufzudAolUri+XtF83qQfRdQ17bsdDqYTCY3zWQyKSjSelSjMHQI0YETjUYRCoXEK4OGQadnLBZ7eJ2W5rX2XTCq6wpHFxAJ+plMptvL/HojrZqWmU9ovhSOMzFZenSTk8U4x4cKx5mSjD2KnIxUOJ4UOc6UZOxR5GSkwvGkyHGmJGOPIicjFY4nRY4zJRl7FDkZqXA8KXKcKcnYo8jJSIXj6Q9uuVyFsHLRPwAAAABJRU5ErkJggg=="></a></li>
							<li><a href="#"><img data-src="holder.js/55x55" alt="55x55" style="width: 55px; height: 55px;" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADcAAAA3CAYAAACo29JGAAACVklEQVRoQ+2Y26tpURTGP8mlPCC3KEqSJMrlAS/+dikpUrwISZFckjyQ5Hb2mMXpiLXHsqm5T3OWF2Osb33f+M01Vy3DarW64D9dBhXul5JV5H4pOChyipyEE1DbUkIoLEuKHGtMEjYpchJCYVlS5FhjkrBJkZMQCsuSIscak4RNipyEUFiWFLnrmIbDIUajEYxGo/jrdDohn8/DYrFAq6Y15k9oXu+ni1ytVsNms4HVahXXHw4HFItFEU6rphXuE5q6wxGlSqUiaGUyGZjNZthsthvBZ7VWq4X1eo1gMIhwOIxGo4Htdot4PA632/2SJuuB+2pik9vtdqhWq7hc/n6g9nq9SKVS0KpRMApEi8Isl0tBnojv9/uXNN8e7uvLNJrNJux2OwKBAPr9Po7HI9LpNAwGw9Oay+VCt9vFeDy+eSoUCoL6TzQ5Adnk7sUGg4E4RBKJBPx+/z/l+xpt5XK5jPP5DKfTiWw2+9CbHs23hptOpyJMJBKBz+dDr9cTJyeFo/WsRsHvyeVyOTgcDvxE863hFosF2u22eA14PB7MZjOhT1uMDohnNdq69XpdbF16RufzudAolUri+XtF83qQfRdQ17bsdDqYTCY3zWQyKSjSelSjMHQI0YETjUYRCoXEK4OGQadnLBZ7eJ2W5rX2XTCq6wpHFxAJ+plMptvL/HojrZqWmU9ovhSOMzFZenSTk8U4x4cKx5mSjD2KnIxUOJ4UOc6UZOxR5GSkwvGkyHGmJGOPIicjFY4nRY4zJRl7FDkZqXA8KXKcKcnYo8jJSIXj6Q9uuVyFsHLRPwAAAABJRU5ErkJggg=="></a></li>
						</ul-->
					</div>
					<div class="col-sm-6 col-md-3">
						<!--h3>Hyperlinks List</h3>
						<ul class="list-unstyled">
							<li><i class="fa fa-angle-right"></i> <a href="#">9am-6pm ET Mon-Fri</a></li>
							<li><i class="fa fa-angle-right"></i> <a href="#">US (877) 977-8732</a></li>
							<li><i class="fa fa-angle-right"></i> <a href="#">International +1 646 490 1679</a></li>
						</ul-->
					</div>

				</div><!-- /.row -->
			</div><!-- /.container -->
		</div><!-- /.wrapper-sm -->
		<div class="wrapper-sm footer-bottom">
			<div class="container">
				<div class="row">
					<div class="col-lg-12">
						<!--p>All Rights Reserved ® Designed by <a href="http://twitter.com/graphikaria" target="_blank">@Graphikaria</a></p-->
    <p>&copy; 2013 Adam Smallcomb - All rights reserved</p>
      <!--span id="social">
        <a href="http://www.linkedin.com/in/adamsmallcomb"><img alt="facebook" src="/assets/img/social/linkedin-gray.png"></a>
        <a href="http://www.facebook.com/adam.smallcomb"><img alt="facebook" src="/assets/img/social/facebook-gray.png"></a>
      </span-->
      <a href="http://graphene.adamsmallcomb.com"><img src="/assets/img/graphenepowered2.png"></a>
					</div>
				</div><!-- /.row -->
			</div><!-- /.container -->
		</div><!-- /.wrapper-sm.footer-bottom -->
	</footer>



</body>
<?=Assets::scripts()?>
<?=Assets::templates()?>
</body>
</html>