$(document).ready(function() {
	$('tr').hide();
	$('#the_head').show();
	$('#waterbutton').click(function() {
		$('.waterdata').toggle();
		$('.waterline').toggle();
	});
	$('#coffeebutton').click(function() {
		$('.coffeedata').toggle();
		$('.coffeeline').toggle();
	});
	$('#bothbutton').click(function() {
		$('.coffeedata').show();
		$('.coffeeline').show();
		$('.waterdata').show();
		$('.waterline').show();
	});
	$('#tabledatabutton').click(function() {
		$("tr:not(:first-child)").toggle();
	})
})