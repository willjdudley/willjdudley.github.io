
// Generic page load functionality

$(document).ready(function() {
	
	
	// Type List
	
	$('#type').radioSelector({
		id: 'type-selector',
		items: [
			{ icon: 'icons/64/pub.png', label: 'Pub', title: 'Pub', value: 'pub' },
			{ icon: 'icons/64/restaurant_food.png', label: 'Restaurant', title: 'Restaurant', value: 'restaurant' },
			{ icon: 'icons/64/cafe.png', label: 'Cafe', title: 'Cafe', value: 'cafe' }
		]
	});
	
	
	
	// Cookie Message
	
	var msgCookie = utilities.getCookie('cookie-msg');
	if (!msgCookie || msgCookie !== 'shown') {
		
		// Show the message
		var $msgDiv = $('<div id="cookie-message" class="page-message">This site uses cookies to improve the experience.</div>').appendTo('body');
		$('<button id="cookie-acknowledge" type="button" class="msg-button">Close</button>')
			.appendTo($msgDiv)
			.click(function(e) {
				
				// Remove div
				$msgDiv.remove();
				
				// When removed, add the cookie
				utilities.addCookie('cookie-msg', 'shown');
			});
		
	}
	
	
	
	// Buttons
	
	// Add another
	
	var $locationInputs = $('#locations-list');
	
	$('#add-location').click(function(e) {
		
		var $li = $('<li></li>');
		var $input = $('<input type="text" class="loc-input"></input>').appendTo($li);
		
		$('<button></button>', {
			tabindex: -1,
			class: 'small-button btn-remove',
			type: 'button',
			title: 'Remove Location',
			click: function() {
				$(this).parent().remove();
			}
		}).appendTo($li);
		
		$li.appendTo($locationInputs);
		
		// Add autocomplete to input
		locationFinder.bindAutocomplete($input[0]);
	});
	
	
	// More Info
	
	$('h5').each(function() {
		
		var $next = $(this).next();
		
		if ($next.hasClass('more-info')) {
			
			$img = 
				$('<img class="more-info-img" src="icons/info.png" alt="Info"></img>')
					.appendTo(this)
					.click(function() {
						$next.switchDisplay("slide", 100);
					});
			
		}
	});
	
	
	// Resize
	
	$('input[name=map-size]').change(function() {
		locationFinder.resize($(this).val());
	});
	
});
