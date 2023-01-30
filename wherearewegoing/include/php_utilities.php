<?php

// PHP Utilities

$g_encoding = "UTF-8";

function html_encode($string) {
	return htmlentities($string);
}


// Info Heading
function DrawInfoHeading($heading, $info = "") {
	
	$html = "<h5>" . $heading . "</h5>";
	
	if (strlen($info) != 0) {
		$html .= "<p class=\"more-info info-message\">" . $info . "</p>";
	}
	
	echo $html;
}



// Warning
function show_warning($message) {
	echo '<h4 class="warning-message">' . $message . '</h4>';
}


// Debug message
function debug_message($message) {
	echo '<h4 class="debug-message">' . $message . '</h4>';
}

?>