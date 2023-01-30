<?php
	// Global Header File

function WriteHeader($bots) {
	
	// Move this
	$google_key = "AIzaSyCvzOhPMEDIYZGz-50XY-EQkE8pdMzcW0o";
	
	$html = "<head>";
	
	// Character Encoding
	$html .= "<meta charset=\"utf-8\" />";
	
	// Bots?
	if ($bots) {
		$html .= "<meta name=\"robots\" content=\"noindex\"/>";
	}
	
	// For mobile
	$html .= "<meta name=\"viewport\" content=\"initial-scale=1.0; maximum-scale=1.0;\" />";
	
	// Page Title
	// To be changed
	$html .= "<title>Where are we going?</title>";
	
	// CSS
	$html .= addHeaderStyle("styles/reset.css");
	$html .= addHeaderStyle("styles/styles.css");
	$html .= addHeaderStyle("styles/styles-2.css");	// Built using SCSS
	
	// jQuery UI styles
	$html .= addHeaderStyle("styles/jquery-ui.css");
	
	// jQuery library
	$html .= addHeaderScript("//ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js");
	
	// jQuery UI library
	$html .= addHeaderScript("//ajax.googleapis.com/ajax/libs/jqueryui/1.11.0/jquery-ui.js");

	// AngularJS
	$html .= addHeaderScript("http://ajax.googleapis.com/ajax/libs/angularjs/1.2.26/angular.min.js");
	
	// Google location APIs
	$html .= addHeaderScript("http://maps.googleapis.com/maps/api/js?key=" . $google_key . "&sensor=false&libraries=places");
	
	// JavaScript
	$html .= addHeaderScript("js/utilities.js");
	$html .= addHeaderScript("js/load.js");
	$html .= addHeaderScript("js/location_finder.js");
	$html .= addHeaderScript("js/list.js");
	$html .= addHeaderScript("js/ui.js");
	
	$html .= "</head>";
	
	echo $html;
}

// Add CSS file to the header
function addHeaderStyle($file_name) {
	return "<link rel=\"stylesheet\" href=\"" . $file_name . "\" />";
}

// Add JavaScript file to the header
function addHeaderScript($file_name) {
	return "<script type=\"text/javascript\" src=\"" . $file_name . "\"></script>";
}

?>
