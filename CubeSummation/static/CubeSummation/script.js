$(document).ready(function () {

	//Activate the Reset modal functionality
	$('.modal-trigger').leanModal();
});

$('#go_btn').on('click', function () {
	$test_cases = $('#test_cases');
	$test_cases_label = $test_cases.parent().parent().parent().find('label');

	//These are validations for the Number of Test Cases Input
	//The adding or removal of classes and attributes are for the special effects of the input fields
	if ($test_cases.val().length === 0) {
		$test_cases.addClass('invalid');
        $test_cases_label.addClass('active');
        $test_cases_label.attr('data-error', "Required");

        Materialize.toast('Please enter a valid number of test cases', 4000, 'rounded toast_error');
	} else if ($test_cases.hasClass('invalid')) {
		$test_cases_label.attr('data-error', "Invalid");

		Materialize.toast('Please enter a valid number of test cases', 4000, 'rounded toast_error');
	} else {
		$test_cases.attr('readonly', true);
		$('#go_btn').addClass('disabled');
		$('#reset_btn').removeClass('disabled');

		createTestCases($('#test_cases').val());
	}
});

//This is the function where the containers for the test cases are created, and the results container as well
//The "actived" class if used to know which test case is the one visible at the time
function createTestCases (number_test_cases) {
	$row_test_cases = $('#row_test_cases');

	for (var i = 1; i <= number_test_cases; i++) {
		$aux_class = '';

		if (i === 1) {
			$aux_class = 'actived';
		}

		$div_test_case = '<div class="col l5 s12">' +
	  						'<div id="test_case_' + i + '" class="' + $aux_class + ' styled container">' +
	  							'<h5>' + 
	  								'<a class="prev_btn" href="#"><i class="material-icons center">chevron_left</i></a>' +
		  							'Test Case #' + i +
			  						'<a class="next_btn" href="#"><i class="material-icons center">chevron_right</i></a>' +
			  					'</h5>' +
			  					'<div class="row">' +
			  						'<div class="input-field col s12">' +
					  					'<input placeholder="" id="matrix_size_' + i + '" type="number" min="1" max="100" class="validate">' +
		          						'<label for="matrix_size">3-D Matrix Size</label>' +
	          						'</div>' +
	          						'<div class="input-field col s12">' +
		          						'<input placeholder="" id="op_number_' + i + '" type="number" min="1" max="1000" class="validate">' +
		          						'<label for="op_number">Number of operations</label>' +
	          						'</div>' +
	          						'<div class="input-field col s12">' +
		          						'<textarea id="operations_' + i + '" class="materialize-textarea"></textarea>' +
		          						'<label for="operations">Operations</label>' +
	          						'</div>' +
          						'</div>' +
	  						'</div>' +
	  					  '</div>';

		$row_test_cases.append($div_test_case);
	}

	$div_test_case = '<div class="col l5 offset-l2 s12">' +
	  					'<div id="results_div" class="styled container">' +
	  						'<h5>Results!</h5>' + 
	  						'<div class="row">' +
		  						'<div class="input-field col s12">' +
			          				'<textarea id="results" class="materialize-textarea"></textarea>' +
			          				'<label for="results">Results</label>' +
		          				'</div>' +
	          				'</div>'
	  					'</div>' +
	  				 '</div>';

	$row_test_cases.append($div_test_case);

	$('#test_case_1').show();
	$('#results_div').show();
	$('#resolve').show();
}

//Arrow button functionality to navigate through test cases
$('#row_test_cases').on('click', '.actived .prev_btn', function (event) {
	event.preventDefault();

	$active_test_case = $('.actived');
	$id = $active_test_case.attr('id');

	if ($id === "test_case_1") {
		return;
	} else {
		$active_test_case.removeClass('actived');
		$active_test_case.hide();

		$next_number = parseInt($id.split("_")[2]);

		$next_test_case = $('#test_case_' + --$next_number);
		$next_test_case.addClass('actived');
		$next_test_case.show();
	}
});

//Arrow button functionality to navigate through test cases
$('#row_test_cases').on('click', '.actived .next_btn', function (event) {
	event.preventDefault();

	$active_test_case = $('.actived');
	$id = $active_test_case.attr('id');
	$number_test_cases = $('#test_cases').val();

	if ($id === "test_case_" + $number_test_cases) {
		return;
	} else {
		$active_test_case.removeClass('actived');
		$active_test_case.hide();

		$next_number = parseInt($id.split("_")[2]);

		$next_test_case = $('#test_case_' + ++$next_number);
		$next_test_case.addClass('actived');
		$next_test_case.show();
	}
});

//Resolve! button functionality
//For each test case, a foreach loop is implemented for each of the operations identified by the split function
//Next, if the operation is an UPDATE, the coords and the values are stored in an array of JSON objects
//Or, if the operation is a QUERY, the array of JSON coords are analyzed to see if they are in the threshold given in the QUERY
//and decide if it will be sumed or not. Finally, the results textarea is updated
$('#resolve').on('click', function (event) {
	event.preventDefault();
	$number_test_cases = $('#test_cases').val();
	$final_string = "";

	for (var i = 1; i <= $number_test_cases; i++) {
		$operations = $('#operations_' + i).val().split("\n");
		$update_array = [];

		$.each($operations, function (index, operation) {
            $operation_tokens = operation.split(" ");

            if ($operation_tokens[0] === "UPDATE") {
            	$update_array.push({
            		x : parseInt($operation_tokens[1]),
            		y : parseInt($operation_tokens[2]),
            		z : parseInt($operation_tokens[3]),
            		value : parseInt($operation_tokens[4])
            	});
            } else {
            	$total_sum = 0;

            	$.each($update_array, function (index, coordinate) {
            		$x1 = parseInt($operation_tokens[1]);
            		$y1 = parseInt($operation_tokens[2]);
            		$z1 = parseInt($operation_tokens[3]);
            		$x2 = parseInt($operation_tokens[4]);
            		$y2 = parseInt($operation_tokens[5]);
            		$z2 = parseInt($operation_tokens[6]);

            		if ((coordinate.x >= $x1 && coordinate.x <= $x2) && (coordinate.y >= $y1 && coordinate.y <= $y2) && (coordinate.z >= $z1 && coordinate.z <= $z2)) {
            			$total_sum += coordinate.value;
            		}
            	});

            	$final_string += $total_sum + "\n";
            }
        });
	}

	$('#results').val($final_string);
	$('#results').trigger('autoresize');
	$('#results').parent().find('label').addClass('active');
});

//Modal confirmation for resetting the application. Returns to the initial state
$('#modal_reset').on('click', '#confirm_reset', function () {
	$('#row_test_cases').html("");
	$test_cases.attr('readonly', false);
	$('#go_btn').removeClass('disabled');
	$('#reset_btn').addClass('disabled');
	$('#resolve').hide();
});