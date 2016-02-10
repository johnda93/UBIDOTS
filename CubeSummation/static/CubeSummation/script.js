$(document).ready(function () {
	$('select').material_select();
});

$('#go_btn').on('click', function () {
	if ($('#test_cases').hasClass('invalid')) {
		Materialize.toast('Please select a valid number of test cases', 4000, 'rounded toast_error');
	} else {
		$('#go_btn').addClass('disabled');
		$('#reset_btn').removeClass('disabled');
		$('main .container .styled').show();
	}
});