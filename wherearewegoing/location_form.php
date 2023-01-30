<?php
	// Form for entering locations
	
	// ## Features to add:
	// - Ability to just specify the central location
	// - Retain people in memory
	// - (advanced) Use road/other travel methods rather than direct distance
	
	// Included file
	include "include/inc_location.php";
	
	initialise_location();
?>

<form id="location-form" name="location-form" method="post">
	
	<div id="user-input">
		
		<div id="user-locations">
			
			<?php
			
			// Info heading
			DrawInfoHeading("Your Locations:", "Where are you all coming from?");
			
			// Add input elements
			draw_location_inputs();
			
			?>
			
			<button id="add-location" type="button" title="...add another location to the list">Add another</button>
			
		</div>
		
		<div id="user-location-type">
			
			<?php DrawInfoHeading("Location Type:", "What sort of place do you want to meet at?"); ?>
			
			<select id="type">
				<option value="pub">Pub</option>
				<option value="cafe">Cafe</option>
				<option value="restaurant">Restaurant</option>
			</select>
		</div>
	</div>
	
	<button type="button" id="get-dest">Find a place</button>
	
</form>

