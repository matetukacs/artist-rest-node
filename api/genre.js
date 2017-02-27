const mongoose = require('mongoose');
const schema = require('./../schema');
const api = require('./api');

const Genre = mongoose.model('Genre', schema.Genre); 

module.exports.findAll = (req, res, next) => {
	Genre.find().then( api.sendResponseAndNext(res, next) );
}

module.exports.findById = ({ params }, res, next) => {
	Genre.findById(params.id).then( api.sendResponseAndNext(res, next) )
	.catch( () => api.sendResponseAndNext(res, next)({}) );
}

module.exports.create = ({ params }, res, next) => {
	const newGenre = new Genre();
	newGenre.name = params.name;

	newGenre.save().then( api.sendEmptyResponseAndNext(res, next) );
}

module.exports.update = ({ params, body }, res, next) => {
	Genre.findById(params.id).then( genre => {
		genre.name = body.name;

		genre.save().then( api.sendEmptyResponseAndNext(res, next) );
	});
}

module.exports.delete = ({ params }, res, next) => {
	Genre.findByIdAndRemove(params.id).then( api.sendEmptyResponseAndNext(res, next) );
}