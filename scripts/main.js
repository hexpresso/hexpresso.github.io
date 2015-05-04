$(function () {
	$('pre.hl').each(function() {
		console.log($(this).data('lang'));
		$(this).snippet($(this).data('lang'), {style: "whitengrey"});
	});
});