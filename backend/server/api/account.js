const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const Helpers = require('./../helpers/helpers');

let helpers = Helpers.getInstance("Account");


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

// get all account
app.get("/api/accounts", (req, res, next) => {
	helpers.list((err, entities) => {
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
	helpers.create(data, (err, entities) => {
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
	helpers.update(data.id, data, (err, entities) => {
		if (err) {
			next(err);
			return;
		}
		res.send(entities);
	})
	
})

module.exports = app;