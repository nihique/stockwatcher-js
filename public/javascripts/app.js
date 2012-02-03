var App = Em.Application.create();

App.constants = {
	stocksUrlTemplate: "/stocks/{tickers}"
};

App.Stock = Em.Object.extend({
	ticker: '',
  name: '',
  property1: '',
  property2: '',
  property3: '',
  property4: '',
  property5: '',
  property7: '',
  property8: '',
  property9: '',
  property10: '',
  property11: '',
  property12: ''
});

App.stocks = [
  App.Stock.create({ ticker: "AAPL" }),
  App.Stock.create({ ticker: "AMZN" }),
  App.Stock.create({ ticker: "GOOG" }),
  App.Stock.create({ ticker: "INTC" }),
  App.Stock.create({ ticker: "MSFT" })
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

    var stocks = csvObject.map(function (item, index, self) {
      return App.Stock.create({
        ticker: item[0],
        name: item[6],
        property1: item[1],
        property2: item[2],
        property3: item[3],
        property4: item[4],
        property5: item[5],
        property7: item[7],
        property8: item[8],
        property9: item[9],
        property10: item[10],
        property11: item[11],
        property12: item[12]
      });
    });

    App.stocksController.content.replace(0, App.stocksController.content.length, stocks);

    return csvObject;
  }
});