$(document).ready(function() {
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
		$("tbody").children().toggle();
	})
})