var App = Em.Application.create();

App.constants = {
	stocksUrlTemplate: "/stocks/{tickers}"
};

App.Stock = Em.Object.extend({
	ticker: ''	
});

App.stocks = [
	App.Stock.create({ ticker: "MSFT" }),
	App.Stock.create({ ticker: "AMZN" })
];

App.stocksController = Em.ArrayProxy.create({
	content: App.stocks,

	update: function() {
		$.ajax(this.getDataUrl(), {
			success: this.parseCsv,
			error: function(data, status, error) {
				console.log("Could not get the CSV file", data, status, error);
				alert("Couldn't get the CSV file");
			}
		});	
	},

	getDataUrl: function() {
		var tickers = App.stocks.getEach("ticker").join('+');
		var url = App.constants.stocksUrlTemplate.replace("{tickers}", tickers);
		console.log("Yahoo url: ", url);
		return url;
	},

    parseCsv: function(data) {
        console.log("CSV data: ", data);
		var csvObject = CSV.csvToArray(data);
		console.log("CSV object: ", csvObject);
		return csvObject;
	}
});