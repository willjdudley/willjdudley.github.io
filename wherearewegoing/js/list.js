
// Location List

$(document).ready(function() {
	sideList.onLoad();
});

var sideList = {
	
	_places: null,
	_containerElm: null,
	_listElm: null,
	
	_items: [],
	_selectedItem: null,
	
	// Classes
	_clsEmphasise: 'place-emphasise',
	_clsSelect: 'place-selected',
	
	onLoad: function() {
		this._onLoad();
	},
	
	_onLoad: function() {
		
		this._containerElm =
			$('<div id="places-container"></div>')
				.appendTo($('#results'))
				.hide();
		
		// Add the Google API icon
		this._addGoogleLogo();
	},
	
	showList: function(places) {
		this._initialise(places);
		this._draw();
	},
	
	getItem: function(pos) {
		return this._items[pos];
	},
	
	deselectAll: function() {
		if (this._selectedItem) {
			this._selectedItem.deselect();
		}
	},
	
	shrinkAll: function() {
		this._listElm.find('.place-details:visible').slideUp(200);
	},
	
	_initialise: function(places) {
		
		// Remove the old list, if applicable
		this._cleanUp();
		
		this._places = places;
		
	},
	
	_draw: function() {
		
		var i, place, $li;
		this._listElm = $('<ul id="place-list"></ul>');
		
		for (i = 0; i < this._places.length; i++) {
			place = this._places[i];
			this._addListItem(place);
		}
		
		this._containerElm
			.prepend(this._listElm)
			.show();
	},
	
	Add: function($elm) {
		this._listElm.append($elm);
	},
	
	_addListItem: function(place) {
		var item = new this.item(place, this);
		item.draw();
	},
	
	
	// item object constructor function
	
	item: function(place, container) {
		this.place = place;
		this.container = container;
		this.selected = false;
		this.container._items.push(this);
	},
	
	
	// Clean up
	
	cleanUp: function() {
		this._cleanUp();
	},
	
	_cleanUp: function() {
		if (this._listElm) {
			this._listElm.remove();
		}
		
		this._items = [];
	},
	
	// Powered by Google
	
	_addGoogleLogo: function() {
		$('<img/>', {
				src: 'powered-by-google/desktop/powered-by-google-on-non-white.png',
				alt: '',
				id: 'powered-by-google',
				title: 'powered by Google'
			})
			.appendTo(this._containerElm);
	}
};

(function(){
	
	var item = sideList.item;
	
	
	// Add methods to sideList.item object prototype
	
	item.prototype.draw = function() {
		
		var $name, self = this, place = self.place;
		this._elm = $('<li></li>');
		
		
		// Add place name
		$name = $('<h4 class="place-name">' + place.name + '</h4>').appendTo(this._elm);
		
		// Add the icon for the place, if applicable
		if (place.icon) {
			$('<img class="place-icon" src="' + place.icon + '" alt=""></img>').prependTo($name);
		}
		
		// Add vicinity (address)
		$('<p class="place-vicinity">' + place.vicinity + '</p>').appendTo(this._elm);
		
		// Add rating
		if (place.rating) {
			$('<label class="place-rating">' + place.rating + '</span>').appendTo($name);
		}
		
		// Add details sections
		
		// Types
		if (place.types) {
			this.addDetail("Labels: " + place.types.join(', ').replace(/_/g, ' '));	// replace underscores
		}
		
		// Opening hours
		if (place.opening_hours) {
			this.addDetail(place.opening_hours.open_now ? "Open" : "Closed");
		}
		
		// On click...
		this._elm.click(function(e) {
			if (!self.selected) {
				self.select();
			}
			else {
				self.deselect();
			}
		});
		
		this.container.Add(this._elm);
	};
	
	item.prototype.addDetail = function(detail) {
		$('<p class="place-details">' + detail + '</p>').appendTo(this._elm);
	};
	
	item.prototype.emphasise = function() {
		this._elm.addClass(this.container._clsEmphasise);
	};
	item.prototype.unemphasise = function() {
		this._elm.removeClass(this.container._clsEmphasise);
	};
	
	item.prototype.setMarker = function(marker) {
		this.marker = marker;
	};
	
	item.prototype.showDetails = function() {
		var elm = this._elm;
		$('.place-details:visible').slideUp(200);
		this.findDetails().slideDown(200);
	};
	
	item.prototype.hideDetails = function() {
		this.findDetails().slideUp(200);
		if (this.marker) {
			this.marker.hideInfo();
		}
	};
	
	item.prototype.findDetails = function() {
		return this._elm.find('.place-details');
	};
	
	
	item.prototype.select = function() {
		if (this.selected) {
			return;
		}
		this.container.deselectAll();
		this._elm.addClass(this.container._clsSelect);
		this.showDetails();
		
		if (this.marker) {
			this.marker.showInfo();
		}
		
		this.selected = true;
		this.container._selectedItem = this;
	};
	
	item.prototype.deselect = function() {
		this._elm.removeClass(this.container._clsSelect);
		this.hideDetails();
		this.selected = false;
		this.container._selectedItem = null;
	};
	
})();

