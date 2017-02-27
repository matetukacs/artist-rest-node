const { model } = require('mongoose');
const schema = require('./../schema');

const Genre = model('Genre', schema.Genre); 

module.exports.findAll = (req, res, next) => {
	Genre.find().then( sendResponseAndNext(res, next) );
}

module.exports.findById = ({ params }, res, next) => {
	Genre.findById(params.id).then( sendResponseAndNext(res, next) );
}

module.exports.create = ({ params }, res, next) => {
	const newGenre = new Genre();
	newGenre.name = params.name;

	newGenre.save().then( sendEmptyResponseAndNext(res, next) );
}

module.exports.update = ({ params, body }, res, next) => {
	Genre.findById(params.id).then( genre => {
		genre.name = body.name;

		genre.save().then( sendEmptyResponseAndNext(res, next) );
	});
}

module.exports.delete = ({ params }, res, next) => {
	Genre.findByIdAndRemove(params.id).then( sendEmptyResponseAndNext(res, next) );
}