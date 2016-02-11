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
			$aux_class = ' active';
		}

		$div_test_case = '<div class="col l5 s12' + $aux_class + '">' +
	  						'<div id="test_case_' + i + '" class="styled container">' +
	  							'<h5>Test Case #' + i +
	  								'<div>' + 
	  									'<a id="next_btn" href="#"><i class="material-icons center">chevron_left</i></a>' +
	  									'1 / ' + number_test_cases +
	  									'<a id="prev_btn" href="#"><i class="material-icons center">chevron_right</i></a>' + 
	  								'</div>' + 
	  							'</h5>'
	  						'</div>' +
	  					  '</div>';

		$row_test_cases.append($div_test_case);
	}

	$div_test_case = '<div class="col l5 offset-l2 s12">' +
	  					'<div id="results" class="styled container">' +
	  						'<h5>Results!</h5>' + 
	  					'</div>' +
	  				 '</div>';

	$row_test_cases.append($div_test_case);

	$('#test_case_1').show();
	$('#results').show();
}