<?php
	// Home page
	
	include "include/include.php";
	
	StartPage();
	
	?>
	
	<body>
		
		<?php WriteBanner(); ?>
		
		<main>
			
			<h1>Trying to find a common place to meet?</h1>
			
			<h2>Simply enter your locations into the form below and let <span class="site-name">Where Are We Going?</span> show you what's on offer.</h2>
			
			<?php
			// Location form
			include "location_form.php";
			?>
			
			<section id="results">
				<div id="map-outer-container">
					
					<div id="map-inner-container" class="map-normal">
						<div id="map-canvas" class="map"></div>
					</div>
					
					<div id="map-options">
						
						<h5>Map Size:</h5>
						<ul id="map-size">
							<li>
								<input id="map-size-normal" name="map-size" type="radio" value="normal" checked="checked" />
								<label for="map-size-normal">Normal</label>
							</li>
							<li>
								<input id="map-size-large" name="map-size" type="radio" value="large" />
								<label for="map-size-large">Large</label>
							</li>
							<li>
								<input id="map-size-fullscreen" name="map-size" type="radio" value="full-screen" />
								<label for="map-size-fullscreen">Full Screen</label>
							</li>
						</ul>
					</div>
				</div>
				
			</section>
			
		</main>
		
	</body>
	
<?php EndPage(); ?>

