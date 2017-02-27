const restify = require('restify'); 
const mongoose = require('mongoose');
const config = require('./config');
const _ = require('lodash');

const r = require('./request');
const schema = require('./schema');
const artistApi = require('./api/artist');

const server = restify.createServer({});
const db = mongoose.connect(config.mongoose.auth);

server.use(restify.bodyParser());
server.use(restify.jsonBodyParser({ mapParams: true }));
server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser({ mapParams: true }));
server.use(restify.fullResponse());

server.listen(process.env.PORT || 5000, () => {
  console.log('running');
});

mongoose.Promise = global.Promise;

server.get('/artists', artistApi.findAll);

server.post('/artist', artistApi.create);

server.get('/artist/:id', artistApi.findById);

server.put('/artist/:id', artistApi.update);

server.del('/artist/:id', artistApi.delete);


server.get('/genres', (req, res, next) => {
	Genre.find().then( sendResponseAndNext(res, next) );
});

server.post('/genre', ({ params }, res, next) => {

	const newGenre = new Genre();
	newGenre.name = params.name;

	newGenre.save().then( sendEmptyResponseAndNext(res, next) );
});

server.get('/genre/:id', ({ params }, res, next) => {
	Genre.findById(params.id).then( sendResponseAndNext(res, next) );
});

server.put('/genre/:id', ({ params, body }, res, next) => {
	Genre.findById(params.id).then( genre => {
		genre.name = body.name;

		genre.save().then( sendEmptyResponseAndNext(res, next) );
	});
});

server.del('/genre/:id', ({ params }, res, next) => {
	Genre.findByIdAndRemove(params.id).then( sendEmptyResponseAndNext(res, next) );
});



const Album = mongoose.model('Album', schema.Album); 

server.get('/albums', (req, res, next) => {
	Album.find().then( sendResponseAndNext(res, next) );
});
 
server.post('/album', ({ params, files }, res, next) => {

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
	.then( sendEmptyResponseAndNext(res, next) );
});

server.get('/album/:id', ({ params }, res, next) => {
	Album.findById(params.id).then( sendResponseAndNext(res, next) );
});

server.put('/album/:id', ({ params, body }, res, next) => {
	Album.findById(params.id).then( album => {
		album.name = body.name;
		album.imageUrl = body.imageUrl;

		album.save().then( sendEmptyResponseAndNext(res, next) );
	});
});

server.del('/album/:id', ({ params }, res, next) => {
	Album.findByIdAndRemove(params.id).then( sendEmptyResponseAndNext(res, next) );
});

server.get('/artistInfo/:id', ({ params }, res, next) => {

	const loadArtistGenres = artist => loadGenres(artist.genres).then( genres => {
		artist.genres = genres;
		return artist;
	});

	const loadArtistAlbums = artist => loadAlbums(artist.albums).then( albums => {
		artist.albums = albums;
		return artist;
	});

	Artist.findById(params.id)
	.then(loadArtistGenres)
	.then(loadArtistAlbums)
	.then( sendResponse(res), next );
});

const loadGenres = (ids) => {
	return Promise.all( ids.map( gid => Genre.findById(gid) ) );
}

const loadAlbums = (ids) => {
	return Promise.all( ids.map( aid => Album.findById(aid) ) );
}

const sendResponseAndNext = (res, next) => _.flow(sendResponse(res), next);

const sendResponse = (res) => {
	return (data = "") => res.send(data);
}

const sendEmptyResponseAndNext = (res, next) => _.flow(sendEmptyResponse(res), next);

const sendEmptyResponse = (res) => {
	return () => res.send();
}	