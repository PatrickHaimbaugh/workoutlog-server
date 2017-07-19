var router = require('express').Router();
var sequelize = require('../db.js');
var Log = sequelize.import('../models/log.js');
var User = sequelize.import('../models/user.js');
var Definition = sequelize.import('../models/definition.js');

router.post('/', function(req, res) {
	var description = req.body.log.desc;
	var result = req.body.log.result;
	var user = req.user;
	var definition = req.body.log.def;


	Log 
		.create({
			description: description,
			result: result,
			owner: user.id,
			def: definition
		})
		.then(
			function createSuccess(log){
				res.json(log);
			},
			function createError(err){
				res.send(500, err.message);
			}
		);
});

router.get('/', function(req, res) {
	var userid = req.user.id;
	Log
		.findAll({
			where: {owner: userid }
		})
		.then(
			function findAllSuccess(data) {
				res.json(data);
			},
			function findAllError(err){
				res.send(500, err.message);
			}
		);
});

router.get('/:id', function(req, res) {
	var data = req.params.id;

	Log
		.findOne({
			where: {id: data}
		}).then(
			function getSucces(updateData) {
				res.json(updateData);
			},
			function getError(err){
				res.send(500, err.message);
			}
		);
});

router.put('/', function(req, res) {
	var description = req.body.log.desc;
	var result = req.body.log.result;
	var data = req.body.log.id;
	var definition = req.body.log.def.description;
	console.log(req.body.log);
	Log 
		.update({
			description: description,
			result: result,
			def: definition
		},
		{where: {id: data}}
		).then(
			function updateSuccess(updatedLog){
				res.json(updatedLog);
			},
			function updateError(err){
				res.status(500).send(err.message);
			}
		)
});

router.delete('/', function(req, res) {
	var userid = req.user.id;
	console.log("req.body.log.id: " + req.body.log.id);
	// res.json(req);
	Log
		.destroy({
			where: {
				id: req.body.log.id,
				owner: userid
			}
		})
		.then(
			function deleteSuccess(data){
				res.json(data);
			},
			function deleteFail(err){
				console.log(req.body.log.id);
				res.send(500, req)
			}
		);

});

module.exports = router;

