var Bitsie = {};

Bitsie.Template = function(templateUrl, vm, callback) {
	$.get(templateUrl, function(source) {
		var template = Handlebars.compile(source);
		var html = template(vm);
		callback(html);
	});
}

Bitsie.Tablesorter = function(container, opts) {

	// **********************************
	//  Description of ALL pager options
	// **********************************
	var pagerOptions = {

		// target the pager markup - see the HTML block below
		container: $(".pager", container),

		// use this url format "http:/mydatabase.com?page={page}&size={size}&{sortList:col}"
		ajaxUrl: opts.ajaxUrl,

		// modify the url after all processing has been applied
		customAjaxUrl: function(table, url) { 
			var th = $('th', table);
			var headers = [];
			for(var i = 0; i < this.currentFilters.length; i++) {
				if (!this.currentFilters[i]) continue;
				var header = $(th[i]).text();
				header = header.toLowerCase().replace(" ", "_");
				url += '&' + header + "=" + this.currentFilters[i];
			}

			return url; 
		},

		// process ajax so that the data object is returned along with the total number of rows
		// example: { "data" : [{ "ID": 1, "Name": "Foo", "Last": "Bar" }], "total_rows" : 100 }
		ajaxProcessing: function(data){
		  if (data && data.hasOwnProperty('rows')) {
		      var r, row, c, d = data.rows,
		      // total number of rows (required)
		      total = data.total_rows,
		      // all rows: array of arrays; each internal array has the table cell data for that row
		      rows = [],

		      // len should match pager set size (c.size)
		      len = d.length;
		      // rows
		      for ( r = 0; r < len; r++ ) {
		        row = []; // new row array
		        // cells
		        for ( c in d[r] ) {
		          if (typeof(c) === "string") {
		            row.push(d[r][c]); // add each table cell data to row array
		          }
		        }
		        opts.processRow(row, d[r]);
		        rows.push(row); // add new row array to rows array
		      }
		      return [ total, rows ]; // or return [ rows, total, headers ] in v2.9+
		    }
		},

		// output string - default is '{page}/{totalPages}'
		// possible variables: {page}, {totalPages}, {filteredPages}, {startRow}, {endRow}, {filteredRows} and {totalRows}
		output: '{startRow} to {endRow} ({totalRows})',

		// apply disabled classname to the pager arrows when the rows at either extreme is visible - default is true
		updateArrows: true,

		// starting page of the pager (zero based index)
		page: 0,

		// Number of visible rows - default is 10
		size: 10,

		// Save pager page & size if the storage script is loaded (requires $.tablesorter.storage in jquery.tablesorter.widgets.js)
		savePages : true,

		//defines custom storage key
		storageKey:'tablesorter-pager',

		// if true, the table will remain the same height no matter how many records are displayed. The space is made up by an empty
		// table row set to a height to compensate; default is false
		fixedHeight: true,

		// remove rows from the table to speed up the sort of large tables.
		// setting this to false, only hides the non-visible rows; needed if you plan to add/remove rows with the pager enabled.
		removeRows: false,

		// css class names of pager arrows
		cssNext: '.next', // next page arrow
		cssPrev: '.prev', // previous page arrow
		cssFirst: '.first', // go to first page arrow
		cssLast: '.last', // go to last page arrow
		cssGoto: '.gotoPage', // select dropdown to allow choosing a page

		cssPageDisplay: '.pagedisplay', // location of where the "output" is displayed
		cssPageSize: '.pagesize', // page size selector - select dropdown that sets the "size" option

		// class added to arrows when at the extremes (i.e. prev/first arrows are "disabled" when on the first page)
		cssDisabled: 'disabled', // Note there is no period "." in front of this class name
		cssErrorRow: 'tablesorter-errorRow' // ajax error information row

	};

	// Disable sorting
	$("table thead th", container).data("sorter", false);

	$("table", container)

	// Initialize tablesorter
	// ***********************
	.tablesorter({
	  theme: 'blue',
	  widthFixed: true,
	  widgets: ['zebra', 'filter'],
	  widgetOptions : {
		  // filter_anyMatch replaced! Instead use the filter_external option
		  // Set to use a jQuery selector (or jQuery object) pointing to the
		  // external filter (column specific or any match)
		  filter_external : '.search',
		  // include column filters
		  filter_columnFilters: true,
		  filter_placeholder: { search : 'Search...' },
		  filter_saveFilters : true,
		  filter_reset: '.reset'
		}
	}).bind("filterEnd", function(event) {
		var search = event.target.config.lastSearch;
		var cols = [];
		for(var i = 0; i < search.length; i++) {
			if (search[i].length > 0) cols.push(i);
		}
		var th = $('th', event.target);
		var headers = [];
		for(var i = 0; i < cols.length; i++) {
			headers.push($(th[cols[i]]).text());
		}
		//console.log(headers);
    })

	// initialize the pager plugin
	// ****************************
	.tablesorterPager(pagerOptions);

	// Delete a row
	// *************
	$('table', container).delegate('button.remove', 'click' ,function(){
	  var t = $('table');
	  // disabling the pager will restore all table rows
	  // t.trigger('disable.pager');
	  // remove chosen row
	  $(this).closest('tr').remove();
	  // restore pager
	  // t.trigger('enable.pager');
	  t.trigger('update');
	  return false;
	});

	// Destroy pager / Restore pager
	// **************
	$('button:contains(Destroy)', container).click(function(){
	  // Exterminate, annhilate, destroy! http://www.youtube.com/watch?v=LOqn8FxuyFs
	  var $t = $(this);
	  if (/Destroy/.test( $t.text() )){
	    $('table').trigger('destroy.pager');
	    $t.text('Restore Pager');
	  } else {
	    $('table').tablesorterPager(pagerOptions);
	    $t.text('Destroy Pager');
	  }
	  return false;
	});


}