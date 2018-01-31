const express = require("express");
const bodyParser = require("body-parser");
const app = express();

function getModel() {
	return require('./../helpers/data');
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

// get all data
app.get("/api/data", (req, res, next) => {
	let id = Number(req.query.id);
	getModel().list(id, (err, entities) => {
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
	getModel().create(data, (err, entities) => {
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
	getModel().update(data.id, data, (err, entities) => {
		if (err) {
			next(err);
			return;
		}
		res.send(entities);
	})
	
})

module.exports = app;