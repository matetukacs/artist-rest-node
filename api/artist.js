const mongoose = require('mongoose');
const schema = require('./../schema');
const api = require('./api');

const Artist = mongoose.model('Artist', schema.Artist); 

module.exports.findAll = (req, res, next) => {
	Artist.find().then( api.sendResponseAndNext(res, next) );
}

module.exports.findById = ({ params }, res, next) => {
	Artist.findById(params.id).then( api.sendResponseAndNext(res, next) );
}

module.exports.create = ({ params }, res, next) => {

	const newArtist = new Artist();
	newArtist.name = params.name;
	newArtist.genres = params.genres;
	newArtist.albums = params.albums;

	newArtist.save().then( api.sendEmptyResponseAndNext(res, next) );
}

module.exports.update = ({ params, body }, res, next) => {
	Artist.findById(params.id).then( artist => {
		artist.name = body.name;
		artist.genres = body.genres;
		artist.albums = body.albums;

		artist.save().then( api.sendEmptyResponseAndNext(res, next) );
	});
}

module.exports.delete = ({ params }, res, next) => {
	Artist.findByIdAndRemove(params.id).then( api.sendEmptyResponseAndNext(res, next) );
}