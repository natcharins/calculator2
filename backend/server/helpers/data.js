const Datastore = require("@google-cloud/datastore");
const projectId = "calculator-193402";
const datastore = new Datastore({
	keyFilename: "./config.json"
});

const kind = 'Data';

function fromDatastore(obj) {
	obj.id = obj[Datastore.KEY].id;
	return obj;
}

function toDatastore(obj, nonIndexed) {
	nonIndexed = nonIndexed || [];
	const results = [];
	Object.keys(obj).forEach((k) => {
		if (obj[k] === undefined) {
			return;
		}
		results.push({
			name: k,
			value: obj[k],
			excludeFromIndexes: nonIndexed.indexOf(k) !== -1
		});
	});
	return results;
}

function list(id, cb) {
	const q = datastore.createQuery([kind]).filter("ownerId", "=", Number(id));

	datastore.runQuery(q, (err, entities) => {
		if (err) {
			cb(err);
			return;
		}
		cb(null, entities);
	});
}

function update(id, data, cb) {
	let key;
	if (id) {
		key = datastore.key([kind, parseInt(id, 10)]);
	} else {
		key = datastore.key(kind);
	}

	const entity = {
		key: key,
		data: toDatastore(data, ['description'])
	};

	datastore.save(
		entity,
		(err) => {
			data.id = entity.key.id;
			cb(err, err ? null : data);
		}
	);
}

function create(data, cb) {
	update(null, data, cb);
}

module.exports = {
	create,
	update,
	list
};