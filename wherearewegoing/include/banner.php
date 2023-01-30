<?php
	
// Page Banner
	
Function WriteBanner() {
	// 
	WriteNavigation();
	
}

Function WriteNavigation() {
	?>
	<header>
		<nav>
			<ul id="nav-links">
				<?php
				WriteNavLink("Home", "Home", "./");
				WriteNavLink("About", "About", "about.php");
				WriteNavLink("Blog", "Blog", "blog.php");
				?>
			</ul>
		</nav>
	</header>
	<?php
}

Function WriteNavLink($name, $title, $href) {
	echo "<li><a class=\"bannerLink\" title=\"" . $title . "\" href=\"" . $href . "\" >" . $name . "</a></li>";
}

?>