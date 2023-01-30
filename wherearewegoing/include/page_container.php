<?php

// Page Container

// Begin page HTML
function StartPage($bots = false) {
	
	// Header declarations
	header("Expires: Mon, 15 Jun 1994 06:00:00 GMT");
	header("Cache-Control: no-cache");
	header("Pragma: no-cache");
	
	// Document Type
	include "docType.php";
	
	?>
	<html data-ng-app="">
	<?php
	
	// Draw the HTML header
	WriteHeader($bots);
}

// End page HTML
function EndPage() {
	
	// Draw the HTML footer
	WriteFooter();
	
	?>
	</html>
	<?php
}

?>