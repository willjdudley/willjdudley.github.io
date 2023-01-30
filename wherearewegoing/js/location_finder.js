
function initialize() {
	
	locationFinder.init();
}
google.maps.event.addDomListener(window, 'load', initialize);


$(document).ready(function() {
	$('#get-dest').click(function() {
		locationFinder.findPlaces();
	});
});

var locationFinder = {
	
	geocoder: null,
	
	locations: [],
	destination: null,
	places: null,
	map: null,
	markers: [],
	
	infoWindow: new google.maps.InfoWindow(),
	closeInfoWindows: this._removeInfoWindow,
	
	_container: null,
	_outerContainer: null,
	_sizes: {
		'normal': {'class': 'map-normal'},
		'large': {'class': 'map-large'},
		'full-screen': {'class': 'map-full-screen'}
	},
	
	// Status enumeration
	status: {
		success: 'success',
		partial: 'partial',
		failure: 'failure'
	},
	
	cls_msgInformation: 'map-msg-information',
	cls_msgWarning: 'map-msg-warning',
	cls_msgError: 'map-msg-error',
	
	api_key: 'AIzaSyCvzOhPMEDIYZGz-50XY-EQkE8pdMzcW0o',
	
	init: function() {
		
		// Initialise geocoder
		this.geocoder = new google.maps.Geocoder();
		
		this._container = $('#map-inner-container');
		this._outerContainer = $('#map-outer-container');
		
		// Add autocomplete
		this.bindAutocomplete($('.loc-input').get());
		
		//this.progressbar.init().hide();
	},
	
	
	// Add autocomplete to an input
	// Accepts single input or an array
	bindAutocomplete: function(input) {
		
		if (typeof input === 'object' && input.length) {	// Array of inputs
			for (var i = 0; i < input.length; i++) {
				this._addAutocompleteToInput(input[i]);
			}
		}
		else {	// Single input element
			this._addAutocompleteToInput(input);
		}
	},
	
	_addAutocompleteToInput: function(input) {
		var autocomplete = new google.maps.places.Autocomplete(input, ['geocode']);
		
		// Remove classes on change
		google.maps.event.addListener(autocomplete, 'place_changed', function() {
			$(input).removeClass('loc-input-invalid');
		});
	},
	
	populate: function() {
		
		var aElms = document.getElementsByClassName('loc-input');
		
		// Empty the existing array
		this.locations = [];
		
		// Refill it
		for (i = 0; i < aElms.length; i++) {
			this.locations.push(new this.location(aElms[i]));
		}
	},
	
	findPlaces: function() {
		
		this.setLoading();
		
		this.populate();
		
		var self = this, i = 0, j = locationCount = self.locations.length, successCount = 0, lf_status;
		
		// Hide the map
		self._hideMap();
		
		// Clear messages
		self._clearMessages();
		
		if (!this._validateInputs()) {
			this._showMessage('No Locations Provided', 'Please enter the locations and try again.', 'error');
			return;
		}
		
		self.geolocations = [];
		
		// clean up the list
		sideList.cleanUp();
		
		// Get each GPS position / API object
		for (; i < locationCount; i++) {
			
			var loc = self.locations[i];
			
			loc.generateGeolocation(function(result, status) {
				
				j--;	// decremented whenever a request is completed
				
				if (status === google.maps.GeocoderStatus.OK) {
					successCount++;
				} else {
					// error handling
					if (console.log) {
						console.log(status.toString());
					}
				}
				
				if (j === 0) {	// finished?
					
					if (locationCount === successCount) {
						lf_status = self.status.success;
					} else if (successCount > 0) {
						lf_status = self.status.partial;
					} else {
						lf_status = self.status.failure;
					}
					
					if (lf_status !== self.status.failure) {	// Don't show map or locations if this failed
						
						self.setReady();
						
						self._getMeanLocation();
						self._getLocationDetails();
						self._showOptions();
					}
					
					self._showStatus(lf_status);
					
				}
			});
		}
	},
	
	resize: function(size) {
		
		this._container
				.removeClass('map-normal map-large map-full-screen')	// change
				.addClass(this._sizes[size].class);
		
		// Tell the map that it's resized
		google.maps.event.trigger(this.map, 'resize');
		
		// Re-center map
		this.map.setCenter(this.destination);
		
		// Scroll to the top of the map
		if (window.scrollTo) {
			window.scrollTo(0, $('#results').offset().top);
		}
	},
	
	// Get the average location
	_getMeanLocation: function() {
		
		var i = 0, geolocation, loc,
			aLatitudes = [],
			aLongitudes = [];
		
		for (; i < this.locations.length; i++) {
			
			geolocation = this.locations[i].geolocation;
			
			if (geolocation && geolocation.length !== 0) {
				loc = geolocation[0].geometry.location;
				
				aLatitudes.push(loc.lat());
				aLongitudes.push(loc.lng());
			}
		}
		
		// get averages
		var x = this._getArrayMean(aLongitudes),
			y = this._getArrayMean(aLatitudes);
		
		// set the destination to the lat/lang object thing
		this.destination = {lng: x, lat: y};
		
		// set the map centre
		this._showMap(this.destination);
		
	},
	
	_getLocationDetails: function() {
		
		if (this.destination) {
			
			var keyword = this._getType(), // change
				radius = 500; // change
			
			var placeDetailsRequest = {
				location: this.destination,
				keyword: keyword,
				radius: radius
			};
			
			var self = this, service = new google.maps.places.PlacesService(this.map);
			
			service.nearbySearch(placeDetailsRequest, function(searchResults, searchStatus) {
				self.places = searchResults;
				
				self._drawList();
				self._showMarkers();
			});
		}
	},
	
	_showMap: function() {
		
		var self = this;
		
		this._outerContainer.show();
		
		if (this.map) {		// map already exists
			this.map.setCenter(this.destination);
		}
		else {	// create new map
			var mapOptions = {
				center: this.destination,
				zoom: 14
			};
			this.map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
		}
		
		var mapTopPosition = this._container.offset().top;
		
		$(window).on('scroll', function() {
			if ($(document).scrollTop() > mapTopPosition) {
				self._container.addClass('map-fix-to-top');
			}
			else {
				self._container.removeClass('map-fix-to-top');
			}
		});
	},
	
	// Hide the map (note: does not alter its content)
	_hideMap: function() {
		this._outerContainer.hide();	// find a way to remove the map "contents"?
	},
	
	// Note: this will remove all the markers from the JS
	_showMarkers: function() {
		
		var ev = google.maps.event;
		
		// remove the old markers
		this._removeMarkers();
		
		var i, mk, len = this.places.length, self = this;
		for (i = 0; i < len; i++) {
			
			var place = this.places[i];
			mk = this.markers[this.markers.length] = new google.maps.Marker({
				map: this.map,
				position: place.geometry.location,
				title: place.name,
				
				// Custom properties:
				listItem: sideList.getItem(i),
				listPosition: i,
				showInfo: self._showInfoBox,
				hideInfo: self._removeInfoWindow
			});
			
			ev.addListener(mk, 'click', function() {
				// Show the info popup
				this.showInfo(self);
				
				// Select / expand related list item
				this.listItem.select();
			});
			
			ev.addListener(mk, 'mouseover', function() {
				// Highlight the related list item
				this.listItem.emphasise();
			});
			ev.addListener(mk, 'mouseout', function() {
				// De-highlight
				this.listItem.unemphasise();
			});
			
			mk.listItem.setMarker(mk);
		}
	},
	
	// Show an InfoWindow
	_showInfoBox: function() {
		
		var lf = locationFinder;
		
		// Hide any existing ones
		lf._removeInfoWindow();
		
		// Create a new one
		this.InfoWindow = lf.InfoWindow = new google.maps.InfoWindow({
			content: this.title
		});
		
		// Open
		this.InfoWindow.open(lf.map, this);
		
		// on close event handler
		google.maps.event.addListener(lf.InfoWindow, 'closeclick', function() {
			sideList.deselectAll();	// deselect list item
		});
	},
	
	// Remove an InfoWindow
	_removeInfoWindow: function() {
		if (this.InfoWindow) {
			this.InfoWindow.setMap(null);
		}
	},
	
	// Remove markers from the map
	_removeMarkers: function(){
		var i, len = this.markers.length;
		for (i = 0; i < len; i++) {
			this.markers[i].setMap(null);
		}
		this.markers = [];	// reset
	},
	
	// Draw the list of locations
	_drawList: function() {
		if (sideList) {
			sideList.showList(this.places);
		}
	},
	
	// Show the map display options box
	_showOptions: function() {
		$('#map-options').show();
	},
	
	// Messages, status etc.
	_showStatus: function(status) {
		if (status === this.status.failure) {
			this._showMessage('Error', 'Unable to calculate a mean location from the locations given.', 'error');;
		} else if (status ===  this.status.partial) {
			this._showMessage('Missing Locations', 'One or more locations were not found.  These have been ignored.', 'warning');
		}
		else {
			// All is well...
		}
	},
	
	_showMessage: function(title, message, type) {
		
		var cls_message;
		switch(type.toLowerCase()) {
			case 'error':
				cls_message = this.cls_msgError;
				break;
			case 'warning':
				cls_message = this.cls_msgWarning;
				break;
			default:
				cls_message = this.cls_msgInformation;	// Default case: information
		}
		
		this._clearMessages();
		
		this._messageElm = $('<div></div>', {
			id: 'map-msg',
			class: 'page-msg ' + cls_message,
			html: (title ? '<h3>' + title + '</h3>' : '') + '<p>' + message + '</p>'
		}).prependTo('#results');
		
	},
	
	// Clear the messages listed on screen
	_clearMessages: function() {
		if (this._messageElm) {
			this._messageElm.remove();
		}
	},
	
	
	// Loading / Ready
	
	setLoading: function() {
		this.progressbar.show();
	},
	
	setReady: function() {
		this.progressbar.hide();
	},
	
	progressbar: {
		_elm: null,
		init: function() {
			
			this._elm = $('<div></div>', {
				id: 'map-loading-bar'
			}).progressbar({
				value: false
			}).appendTo('#results');
			
			return this;
		},
		show: function() {
			if (this._elm) {
				this._elm.show();
			}
			return this;
		},
		hide: function() {
			if (this._elm) {
				this._elm.hide();
			}
			return this;
		}
	},
	
	
	// Get the location type that we are looking for
	_getType: function() {
		return $('#type').val();
	},
	
	
	// Checks whether the inputs contain values
	_validateInputs: function() {
		
		var i = 0, len = this.locations.length, loc, bVal = false;
		
		for (; i < len; i++) {
			loc = this.locations[i];
			if (loc.validate()) {	// input is valid
				bVal = true;
			}
			else {
				loc.ShowInvalid();
			}
		}
		return bVal;
	},
	
	
	_getArrayMean: function(aList) {
		
		var total = 0, len = 0, i = 0;
		
		for (; i < aList.length; i++) {
			try {
				total += Number(aList[i]);
				len++;
			}
			catch (e) {
				// carry on
			}
		}
		
		return total / (len === 0 ? 1 : len);
	},
	
	_getGeoLocation: function(address, fnCallBack) {
		
		// TO DO:
		//  - Handle database cacheing
		
		this.geocoder.geocode({address: address}, fnCallBack);
	}
	
	
};

(function(){
	
	var location = locationFinder.location = function(input) {
		this.input = input;
		this.description = input.value;
		this.geolocation = [];
	};
	
	location.prototype.cls_invalid = 'loc-input-invalid';
	
	location.prototype.validate = function() {
		return !(utilities.trim(this.input.value) === 0);	// Check for empty input
	};
	
	location.prototype.ShowInvalid = function() {
		$(this.input).addClass(this.cls_invalid);
	};
	
	location.prototype.generateGeolocation = function(fnCallback) {
		var self = this;
		try {
			locationFinder._getGeoLocation(self.description, function(result, status) {
				self.geolocation = result;
				if (fnCallback) {
					fnCallback(result, status);
				}
			});
		}
		catch(e) {
			self.geolocation = [];
			if (fnCallback) {
				fnCallback();
			}
		}
	};
	
	
})();
