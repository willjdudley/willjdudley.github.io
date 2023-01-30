<?php
// HTML Utilities


function draw_button($label, $id, $title, $name, $image_src, $type, $value) {
	
	$html = '<button';
	
	if (trim($id) != '') {
		$html .= ' id="' . $id . '"';
	}
	
	if (trim($name) != '') {
		$html .= ' name="' . $name . '"';
	}
	if (trim($value) != '') {
		$html .= ' value="' . $value . '"';
	}
	
	$html .= ' title="' . html_encode($title) . '"';
	
	if (trim($type) == '') {
		$type = 'button';
	}
	
	$html .= ' type="' . $type . '"';
	$html .= '>';
	
	$html .= get_image_html($image_src, "", "");
	
	$html .= $label;
	
	$html .= '</button>';
	
	echo $html;
}

// Draw an image tag, given the source and title
function draw_image($src, $title, $alt) {
	echo get_image_html($src, $title, $alt);
}

// Generate the HTML for an image tag
// Returns nothing if there's no source given
function get_image_html($src, $title, $alt) {
	$html = '';
	if (trim($src) != '') {
		$html = '<img';
		$html .= ' src="' . $src . '"';
		$html .= ' title="' . $title . '"';
		$html .= ' alt="' . $alt . '"';
		$html .= '>';
	}
	return $html;
}

function draw_map($id, $title) {
	
	$html = '';
	
	$html .= '<div';
	if (trim($id) != '') {
		$html .= ' id="' . $id . '"';
	}
	$html .= ' class="map"></div>';
	
	echo $html;
}

?>