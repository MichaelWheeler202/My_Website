
var isDrawing = false;
var color = 'rgb(0, 0, 0)';

var row_input = 28 // width
var col_input = 28 // height

$(document).ready(function () {

	// suppress select events
    $(window).bind('selectstart', function(event) {
        event.preventDefault();
    });


	// init
	// --------------------------------------------------------------------------------------------------------
	
	//build the grid
	for (var i = 1; i <= row_input; i++) { 
	  $('table').append("<tr></tr>"); // This loop creates a row of cells
	  
	  for (var j = 1; j <= col_input; j++) {
		$('tr:last').append("<td></td>"); // This loop adds a cell after every row
		$('td').attr("class", 'cells') // For every 'td', a class of 'cells' is created
	  }
	  
	}

    //reset grid to white
     resetGrid();

	// --------------------------------------------------------------------------------------------------------	


	// listeners
	// --------------------------------------------------------------------------------------------------------		
	document.addEventListener('mousedown', onMouseDown, false );

	function onMouseDown(grid) {
		
		grid.preventDefault(); //prevents browser to follow links or move images
	
		isDrawing = true;
		
		current_color = $(event.target).css('background-color');

        var target_name = $(event.target)[0].getAttribute('class');

        if (target_name == 'cells'){

            if (current_color == 'rgb(0, 0, 0)'){
                color = 'rgb(255, 255, 255)';
            } else {
                color = 'rgb(0, 0, 0)';
            }

            var x = $(event.target.cellIndex)[0];
            var y = $(event.target.parentNode.rowIndex)[0];

            var tbl = $('table tr');

            if (typeof x == 'undefined'){
                x = 0
            }

            if (typeof y == 'undefined'){
                y = 0
            }

            $(tbl[y].childNodes[x]).css('background-color', color);

            if (x < col_input - 1) {
                $(tbl[y].childNodes[x+1]).css('background-color', color);
            }

            if (x > 0) {
                $(tbl[y].childNodes[x-1]).css('background-color', color);
            }

            if (y < row_input - 1) {
                $(tbl[y+1].childNodes[x]).css('background-color', color);
            }

            if (y > 0) {
                $(tbl[y-1].childNodes[x]).css('background-color', color);
            }
        }
	}


	document.addEventListener( 'mouseup', onMouseUp, false );

	function onMouseUp(grid) {
		
		grid.preventDefault(); //prevents browser to follow links or move images
		isDrawing = false;
		
	}


	$('.cells').mousemove(function (event) { // The function allows the user to color a cell on click
		
		if (isDrawing == true) {
			$(event.target).css('background-color', color); // Lets the chosen color on a click event to be added to the grid

            var x = $(event.target.cellIndex)[0];
            var y = $(event.target.parentNode.rowIndex)[0];

            if (typeof x == 'undefined'){
                x = 0
            }

            if (typeof y == 'undefined'){
                y = 0
            }

            var tbl = $('table tr');

            $(tbl[y].childNodes[x]).css('background-color', color);

            if (x < col_input - 1) {
                $(tbl[y].childNodes[x+1]).css('background-color', color);
            }

            if (x > 0) {
                $(tbl[y].childNodes[x-1]).css('background-color', color);
            }

            if (y < row_input - 1) {
                $(tbl[y+1].childNodes[x]).css('background-color', color);
            }

            if (y > 0) {
                $(tbl[y-1].childNodes[x]).css('background-color', color);
            }

		}

	});
	// --------------------------------------------------------------------------------------------------------	

	$('#ClearDrawing').submit(function makeGrid(grid) {  // Creates the grid upon clicking the button 'Submit'
    
		// prevent refresh on form submit
		grid.preventDefault();  

        //reset grid to white
        resetGrid();

	});


	$('#JudgeDrawing').submit(function makeGrid(grid) {  // Creates the grid upon clicking the button 'Submit'

		// prevent refresh on form submit
		grid.preventDefault();

        var csrftoken = getCookie('csrftoken');
		var your_number = 1;

        var tbl = $('table tr');
		var row;
		var cell;
		var jObject = {}

		for (var i = 0; i < row_input; i++){
			row = $(tbl[i].childNodes);
			for (var j = 0; j < col_input; j++){
				cell = $(row[j]);
				//black (1) or white (0)
				if (cell.css('background-color') == 'rgb(0, 0, 0)'){
				    jObject['row_' + i + '_col_' + j] = 1;
				} else {
				    jObject['row_' + i + '_col_' + j] = 0;
				}

			}
		}

		jObject = JSON.stringify(jObject);

        //send pixel array to python script to read number.
        $.ajax({
           type: "POST",
           url: '/Read-Number/',
           datatype: "json",
           data: { csrfmiddlewaretoken: csrftoken, grid: jObject},
           success: function callback(response){
                        your_number = response;
                        var your_number_label = document.getElementById("your_number");
	                    your_number_label.innerHTML = "Your number is: " + your_number.toString();
                    }
        });



	});


	function resetGrid(){
	    var tbl = $('table tr');
		var row;
		var cell;


		// reset grid to white
		for (var i = 0; i < row_input; i++){
			row = $(tbl[i].childNodes);
			for (var j = 0; j < col_input; j++){
				cell = $(row[j]);
				cell.css('background-color', 'rgb(255, 255, 255)');
			}
		}

		var your_number_label = document.getElementById("your_number");
		your_number_label.innerHTML = "Your number is: ";
	}

    function getCookie(name) {
        var cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = cookies[i].trim();
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }


});
