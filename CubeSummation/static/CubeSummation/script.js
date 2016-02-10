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
		$('main .container .styled').show();
	}
});