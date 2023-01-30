
// UI, widgets and all that jazz
(function() {
	
	$.fn.switchDisplay = function(options) {
		
		var settings = $.extend({
				slide: false,
				slideDuration: 250,
				complete: function() {}
			}, options);
		
		return this.each(function() {
			
			var self = $(this);
			if (self.is(':visible')) {
				if (settings.slide) {
					self.slideUp(settings.slideDuration, settings.complete());
				}
				else {
					self.hide();
					settings.complete();
				}
			}
			else {
				if (settings.slide) {
					self.slideDown(settings.slideDuration, settings.complete());
				}
				else {
					self.show();
					settings.complete();
				}
			}
			
		});
		
	};
	
	$.fn.radioSelector = function(params) {
		
		if (params) {
			
			var $elm = $(this), $parentElm = params.container ? params.container : $elm.parent(),
				items = params.items, i, $ul, $li, value;
			
			if (items && items.length) {
				$ul =
					$('<ul></ul>')
						.appendTo($parentElm)
						.attr({
							id: params.id ? params.id : '',
							class: ''
						});
				
				for (i = 0; i < items.length; i++) {
					
					var item = items[i], value = item.value;
					
					$li =
						$('<li></li>')
							.appendTo($ul)
							.attr('title', item.title)
							.attr('data-value', value)
							.click(function(e) {
								if ($(this).attr('data-value')) {
									$elm.val($(this).attr('data-value'));
								}
								$('.selected-type').removeClass('selected-type')
								$(this).addClass('selected-type');
							});
					
					if (i === 0) {
						$li.addClass('selected-type');
						$elm.val($li.attr('data-value'));
					}
					
					var src = item.icon, $img;
					
					if (src) {
						$img =
							$('<img />')
								.attr({
									src: src,
									alt: '',
									title: item.title
								})
								.appendTo($li);
					}
					
					var $label =
						$('<label>' + item.label + '</label>')
							.appendTo($li)
					
					
					
				}
			}
			$elm.hide();
		}
		
	};

} (jQuery));