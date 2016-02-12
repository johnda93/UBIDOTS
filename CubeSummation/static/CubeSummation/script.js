$(document).ready(function () {
	$('select').material_select();
});

$('#go_btn').on('click', function () {
	$test_cases = $('#test_cases');
	$test_cases_label = $test_cases.parent().parent().parent().find('label');

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
					  					'<input placeholder="" id="matrix_size" type="number" min="1" max="100" class="validate">' +
		          						'<label for="matrix_size">3-D Matrix Size</label>' +
	          						'</div>' +
	          						'<div class="input-field col s12">' +
		          						'<input placeholder="" id="op_number" type="number" min="1" max="1000" class="validate">' +
		          						'<label for="op_number">Number of operations</label>' +
	          						'</div>' +
	          						'<div class="input-field col s12">' +
		          						'<textarea id="operations" class="materialize-textarea"></textarea>' +
		          						'<label for="operations">Operations</label>' +
	          						'</div>' +
          						'</div>' +
	  						'</div>' +
	  					  '</div>';

		$row_test_cases.append($div_test_case);
	}

	$div_test_case = '</form>' +
					 '<div class="col l5 offset-l2 s12">' +
	  					'<div id="results" class="styled container">' +
	  						'<h5>Results!</h5>' + 
	  					'</div>' +
	  				 '</div>';

	$row_test_cases.append($div_test_case);

	$('#test_case_1').show();
	$('#results').show();
}

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