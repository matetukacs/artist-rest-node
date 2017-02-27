
module.exports.findAll = (req, res, next) => {
	Artist.find().then( sendResponseAndNext(res, next) );
}

module.exports.findById = ({ params }, res, next) => {
	Artist.findById(params.id).then( sendResponseAndNext(res, next) );
}

module.exports.create = ({ params }, res, next) => {

	const newArtist = new Artist();
	newArtist.name = params.name;
	newArtist.genres = params.genres;
	newArtist.albums = params.albums;

	newArtist.save().then( sendEmptyResponseAndNext(res, next) );
}

module.exports.update = ({ params, body }, res, next) => {
	Artist.findById(params.id).then( artist => {
		artist.name = body.name;
		artist.genres = body.genres;
		artist.albums = body.albums;

		artist.save().then( sendEmptyResponseAndNext(res, next) );
	});
}

module.exports.delete = ({ params }, res, next) => {
	Artist.findByIdAndRemove(params.id).then( sendEmptyResponseAndNext(res, next) );
}