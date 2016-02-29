d3.csv("data/Coffee_Data.csv", function(datas) {
	var data = {};
		data.name = [];
		data.date = [];
		data.quantity = [];
		data.time_of_day = [];
		for (i=0; i<datas.length; i++) {
			data.name.push(datas[i]['Coffee Name']);
			data.date.push(datas[i]['Date']);
			data.quantity.push(datas[i]['Quantity (cups)']);
			data.time_of_day.push(datas[i]['Time']);
		}
		console.log(data.name.length);
		$('.table').find('thead')
			.append($('<tr>')
				.append($('<th>').text('Type of Coffee'))
				.append($('<th>').text('Date'))
				.append($('<th>').text('Quantity (cups)'))
				.append($('<th>').text('Time'))
				);
		for (i=0; i<data.name.length; i++) {
		$(".table").find('tbody')
		    .append($('<tr>')
		        .append($('<td>').text(data.name[i]))
		        .append($('<td>').text(data.date[i]))
		        .append($('<td>').text(data.quantity[i]))
		        .append($('<td>').text(data.time_of_day[i]))
		    );
		};
});