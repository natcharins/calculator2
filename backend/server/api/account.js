const express = require("express");
const bodyParser = require("body-parser");
const app = express();

function getModel() {
	return require('./../helpers/account');
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

// get all account
app.get("/api/accounts", (req, res, next) => {
	getModel().list((err, entities) => {
		if (err) {
			next(err);
			return;
		}
		res.send(entities);
	})
})
// create new account
app.post("/api/account", (req, res, next) => {
	const data = req.body;
	getModel().create(data, (err, entities) => {
		if (err) {
			next(err);
			return;
		}
		res.send(entities);
	})
})
// update account
app.post("/api/account/update", (req, res, next) => {
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