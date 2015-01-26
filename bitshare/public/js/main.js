/*************************************
 * SHARED FUNCTIONS
 *************************************/
/**
 * Retrieve current market price of 1 BTC
 */
function getPrice(callback) {
	$.getJSON('/api/price', function(price) {
		callback(price);
	});
}

function addCommas(nStr) {
    nStr += '';
    var x = nStr.split('.');
    var x1 = x[0];
    var x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
}

function updatePrices() {
	getPrice(function(price) {
		$('.amount').each(function() {
			var val = $(this).val();
			var sibling = $(this).siblings('.btc');
			if (isNaN(val)) {
				sibling.html('');
				return;
			}

			var btc = (val / price).toFixed(9);
			sibling.html('฿ ' + btc);
		});
	});
}

function showErrors(errors, element) {
	if (!element) element = '#errors';
	var html = '<p>Please correct the following:</p><ul>';
	for (var i = 0; i < errors.length; i++) {
		html += '<li>' + errors[i] + '</li>';
	}
	html += '</ul>';
	$(element).html(html).show();
}

/*************************************
 * ACTIONS BELOW
 *************************************/

// Index page
$(document).on('pageinit', '#index', function() {
	$('.scroll').click(function(e) {
		e.preventDefault();
		var a = this.hash;
		$('html, body').animate({
	        scrollTop: $(a).offset().top
	    }, 600);
	})
});

// Start page
$(document).on('pageinit', '#start', function() {

	updatePrices();

	$('textarea[name="description"]').keyup(function() {
		var len = $(this).val().length;
		$('#characters').text(1000 - len);
	})

	$('.amount').keydown(function() {
		updatePrices();
	});

	$('.browse').click(function(e) {
		e.preventDefault();
		selectFile();
	});

	$('#myFile').change(function() {
		if ($(this).val() != '') {
			var path = $(this).val().split("\\");
		  $('.browse').val(path[path.length-1]);
		}
	});

	$('#accept-payment input').click(function(e) {
		if ($(this).is(":checked")) $('#form-advanced .toggle').slideDown();
		else $('#form-advanced .toggle').slideUp();
	});

	$('#form-upload').submit(function(e) {
		e.preventDefault();
		if (validate()) {
			uploadFile();
		}
	});

	function validate() {
		var err = [];

		var files = document.getElementById('myFile').files;

		if (files.length == 0) {
			err.push("You must select a file to upload.");
		}

		//if ($('input[name="accept_payment"]').is(":checked")) {
			if (!$('input[name="title"]').val()) err.push("Title is required.")
			var amount = $('input[name="price"]').val();
			if (isNaN(amount)) err.push("Invalid price entered.");
			else if (amount < .001) err.push("Price must be at least .001 BTC.");
			if (!$('input[name="address"]').val()) err.push("Payment address is required.")
		//}

		if (err.length > 0) {
			showErrors(err);
		}
		return err.length == 0;
	}

	function selectFile() {
		$("#myFile").trigger("click");
	}

	function resetForm() {
		$('.message-uploading').hide();
		$('.progress').hide();
		$('#submit').show();
	}

	function uploadFile() {

		$('.message-uploading').show();
		$('.progress').show();
		$('#submit').hide();

		var formData = new FormData();
		var file = document.getElementById('myFile').files[0];
		formData.append('myFile', file);

		if ($('input[name="accept_payment"]').is(":checked")) formData.append("accept_payment", "1");
		formData.append("price", $('input[name="price"]').val());
		formData.append("address", $('input[name="address"]').val());
		formData.append("title", $('input[name="title"]').val());
		formData.append("description", $('textarea[name="description"]').val());
		formData.append("author", $('input[name="author"]').val());
		formData.append("email", $('input[name="email"]').val());
		formData.append("code", $('input[name="code"]').val());

		var xhr = new XMLHttpRequest();

		xhr.open('post', '/api/upload', true);

		xhr.upload.onprogress = function(e) {

		  if (e.lengthComputable) {
			var percentage = (e.loaded / e.total) * 100;
			$('.progress-bar').css('width', percentage + '%');
			$('.progress-bar .sr-only').text(percentage + '%');
		  }

		};

		xhr.onerror = function(e) {
			showErrors(['An error occurred while submitting the form.']);
			resetForm();
		};

		xhr.onload = function() {
				var data = null;

				try {
					data = JSON.parse(xhr.responseText);
				} catch(ex) {
					showErrors([data.message]);
					resetForm();
					return;
				}

				if (!data.success) {
					showErrors([data.message]);
					resetForm();
					return;
				}

				window.location = '/confirmation/' + data.upload.slug + '?key=' + data.upload.key;
		};

		xhr.send(formData);

	};
});


// Confirmation page
$(document).on('pageinit', '#confirmation', function() {
	$('#upload-delete').click(function(e) {
		e.preventDefault();
		var lnk = $(this).attr("href");
		var c = confirm("Are you sure you want to do delete this file? This action cannot be undone!");
		if (c) {
			window.location = lnk;
		}
	})
});

$(function() {
	// Fire page-specific JS
	$('[data-role="page"]').trigger("pageinit");
});