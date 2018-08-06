let mongoose = require('mongoose');
let Translation = require('../models/translation');

/*
 * GET /translation route to retrieve all the translations.
 */
function getTranslations(req, res) {
	//Query the DB and if no errors, send all the translations
	let query = Translation.find({});
	query.exec((err, translations) => {
		if(err) res.send(err);
		//If no errors, send them back to the client
		res.json(translations);
	});
}

/*
 * POST /translation to save a new translation.
 */
function postTranslation(req, res) {
	//Creates a new translation
	var newTranslation = new Translation(req.body);
	//Save it into the DB.
	newTranslation.save((err,translation) => {
		if(err) {
			res.send(err);
		}
		else { //If no errors, send it back to the client
			res.json({message: "Translation successfully added!", translation });
		}
	});
}

/*
 * GET /translation/:id route to retrieve a translation given its id.
 */
function getTranslation(req, res) {
	Translation.findById(req.params.id, (err, translation) => {
		if(err) res.send(err);
		//If no errors, send it back to the client
		res.json(translation);
	});		
}

/*
 * DELETE /translation/:id to delete a translation given its id.
 */
function deleteTranslation(req, res) {
	Translation.remove({_id : req.params.id}, (err, result) => {
		res.json({ message: "Translation successfully deleted!", result });
	});
}

/*
 * PUT /translation/:id to updatea a translation given its id
 */
function updateTranslation(req, res) {
	Translation.findById({_id: req.params.id}, (err, translation) => {
		if(err) res.send(err);
		Object.assign(translation, req.body).save((err, translation) => {
			if(err) res.send(err);
			res.json({ message: 'Translation updated!', translation });
		});	
	});
}

//export all the functions
module.exports = { getTranslations, postTranslation, getTranslation, deleteTranslation, updateTranslation };
