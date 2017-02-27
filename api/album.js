const mongoose = require('mongoose');
const schema = require('./../schema');
const api = require('./api');

const Album = mongoose.model('Album', schema.Album);

module.exports.findAll = (req, res, next) => {
	Album.find().then( api.sendResponseAndNext(res, next) );
}

module.exports.findById = ({ params }, res, next) => {
	Album.findById(params.id).then( api.sendResponseAndNext(res, next) );
}

module.exports.create = ({ params, files }, res, next) => {

	const saveAlbum = (name) => {
		return (url) => {
			const newAlbum = new Album();
			newAlbum.name = name;
			newAlbum.imageUrl = url;
			return newAlbum.save();
		}
	}
	
	r.postRequest(config.file_store_request_url, {fileUpload: files.image})
	.then(( { url } ) => saveAlbum(params.name)(url) )
	.then( api.sendEmptyResponseAndNext(res, next) );
}

module.exports.update = ({ params, body }, res, next) => {
	Album.findById(params.id).then( album => {
		album.name = body.name;
		album.imageUrl = body.imageUrl;

		album.save().then( api.sendEmptyResponseAndNext(res, next) );
	});
}

module.exports.delete = ({ params }, res, next) => {
	Album.findByIdAndRemove(params.id).then( api.sendEmptyResponseAndNext(res, next) );
}