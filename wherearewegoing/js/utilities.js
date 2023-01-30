
// JavaScript Utility Library

var utilities = {
	
	// String utilities
	
	trim: function(s) {
		if (!window.trim) {	// Backwards compatibility
			return s.replace(/^\s+|\s+$/gm,'');
		}
		else {
			return window.trim(s);
		}
	},
	
	
	// Cookies
	
	// Add a cookie
	addCookie: function(name, value, days, path) {
		days = days || 365;
		//path = path || "/";	// Not used
		document.cookie = name + "=" + value + "; " + this.getExpiry(days);// + "; path=" + path;
	},
	
	// Retrieve a cookie
	getCookie: function(name) {
		name += '=';
		var ca = document.cookie.split(';');
		for (var i = 0; i < ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0) === ' ') {
				c = c.substring(1);
			}
			if (c.indexOf(name) === 0) {
				return c.substring(name.length, c.length);
			}
		}
		return '';
	},
	
	// Remove a cookie
	removeCookie: function(name) {
		document.cookie = name + "=; " + this.getExpiry(-1);
	},
	
	// Get the expiry date string
	getExpiry: function(days) {
		var date = new Date();
		date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
		return "expiry=" + date.toUTCString();
	}
	
};
