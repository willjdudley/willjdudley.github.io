<?php

// Included utilities for the location form

// ## TO DO:
// Defind the following objects:
// - location_finder
// - location_collection
// - object for each location (id, GPS positions, description ...)

$location_elements;


// Functions

// Initialises values for the location form
function initialise_location() {
	
	global $location_elements;
	
	// Get form values to determine
	// - whether existing inputs should be added
	// - what the values of the inputs are
	
	if (!empty($_POST)) {
		
		// Get the form location elements in an array
		$location_elements = $_POST['location'];
		
		// Do the whole location finding thing
		do_location();
	}
}

// Draws the location input HTML
function draw_location_inputs() {
	
	global $location_elements;
	
	//echo "<fieldset>";
	echo "<ul id=\"locations-list\">";
	
	if ($location_elements == null) {
		// Default: 2 blank boxes
		draw_location_input("location[0]", "");
		draw_location_input("location[1]", "");
	}
	else {
		// Redraw the submitted boxes
		// ## Replace this with the location_collection values ##
		foreach ($location_elements as $key => $value) {
			draw_location_input("location[" . $key . "]", $value);
		}
	}
	
	if (!empty($_POST) && $_POST['location-button'] == 'add') {
		$index = $key ? $key : 2;
		$index++;
		draw_location_input("location[" . $index . "]", "");
	}
	
	echo "</ul>";
	//echo "</fieldset>";
}

// Draws the location inputs
// Will require the changes to work with the Google APIs etc
function draw_location_input($id, $value) {
	
	$value = html_encode($value);
	
	$html = "<li>";
	$html .= '<input id="' . $id . '" name="' . $id . '" type="text" value="' . $value . '" class="loc-input"></input>';
	$html .= "</li>";
	//$html .= '<br/>';
	
	echo $html;
}


// Form Post Validation

function checkLocations() {
	// :: TO DO ::
}



// Location Finding...

function do_location() {
	
	global $location_elements;
	
	if ($location_elements != null) {
		
		// Calculate location
		
		
		$destination = "London"; // change
		
		// Draw location
		show_location($destination);
	}
}

function show_location($location) {
	
	// Draws a map or whatever
	
	echo "<p>Go to " . html_encode($location) . " or something.</p>";
	
}

?>
