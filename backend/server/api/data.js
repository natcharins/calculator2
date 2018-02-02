const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const Helpers = require('./../helpers/helpers');

let helpers = Helpers.getInstance("Data");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

// get all data
app.get("/api/data", (req, res, next) => {
	let id = req.query.id;
	helpers.listById(id, (err, entities) => {
		if (err) {
			next(err);
			return;
		}
		res.send(entities);
	})
})
// create new data
app.post("/api/data", (req, res, next) => {
	const data = req.body;
	helpers.create(data, (err, entities) => {
		if (err) {
			next(err);
			return;
		}
		res.send(entities);
	})
})
// update data
app.post("/api/data/update", (req, res, next) => {
	const data = req.body;
	helpers.update(data.id, data, (err, entities) => {
		if (err) {
			next(err);
			return;
		}
		res.send(entities);
	})
	
})

module.exports = app;