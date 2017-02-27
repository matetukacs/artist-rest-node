const restify = require('restify'); 
const mongoose = require('mongoose');
const config = require('./config');
const _ = require('lodash');

const r = require('./request');
const schema = require('./schema');
const artistApi = require('./api/artist');
const genreApi = require('./api/genre');
const albumApi = require('./api/album');

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

server.get('/artist/:id', artistApi.findById);

server.post('/artist', artistApi.create);

server.put('/artist/:id', artistApi.update);

server.del('/artist/:id', artistApi.delete);



server.get('/genres', genreApi.findAll);

server.get('/genre/:id', genreApi.findById);

server.post('/genre', genreApi.create);

server.put('/genre/:id', genreApi.update);

server.del('/genre/:id', genreApi.delete);

 

server.get('/albums', albumApi.findAll);

server.get('/album/:id', albumApi.findById);

server.post('/album', albumApi.create);

server.put('/album/:id', albumApi.update);

server.del('/album/:id', albumApi.delete);



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