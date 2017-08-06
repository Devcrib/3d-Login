const formAnim = {
	$form: $('#form'),
	animClasses: ['face-up-left', 'face-up-right', 'face-down-left', 'face-down-right', 'form-complete', 'form-error'],
	resetClasses: function() {
		const $form = this.$form;

		$.each(this.animClasses, function(i, c) {
			$form.removeClass(c);
		});
	},
	faceDirection: function(d) {
		this.resetClasses();

		d = parseInt(d) < this.animClasses.length? d : -1;

		if(d >= 0)
			this.$form.addClass(this.animClasses[d]);
	}
}

const $input = $('#username, #password'),
		$submit = $('#submit');
let focused = false,
		completed = false;


$input.on('focus', function() {
	focused = true;

	if(completed)
		formAnim.faceDirection(1); // face-up-right
	else
		formAnim.faceDirection(0); // face-up-left
});

$input.blur(function() {
	formAnim.resetClasses();
});

$input.on('input paste keyup', function() {
	completed = true;
	// check if the inputs are empty (username & password)
	$input.each(function() {
		if(this.value === '')
			completed = false;
	});

	if(completed)
		formAnim.faceDirection(1); // face-up-right
	else
		formAnim.faceDirection(0); // face-up-left

});

$submit.on('click', function() {
	focused = true;
	formAnim.resetClasses();

	if(completed) { // all fields are filled
		$submit.css('cursor', 'default');
		setTimeout(function() {
			formAnim.faceDirection(4); // form-complete
			$input.val('');
			completed = false;

			setTimeout(function() {
				$submit.css('cursor', 'pointer');
				formAnim.resetClasses();
			}, 2000);
		}, 1000);
	} else {
		setTimeout(function() { // all fields aren't filled
			formAnim.faceDirection(5); // form-error

			setTimeout(function() {
				formAnim.resetClasses();
			}, 2000);
		}, 1000);
	}
});

$(function() {
	setTimeout(function() {
		if(!focused)
			$input.eq(0).focus();
	}, 2000);
});
