const restify = require('restify'); 
const mongoose = require('mongoose');
const config = require('./config');
const _ = require('lodash');

const r = require('./request');

const server = restify.createServer({});
const db = mongoose.connect(config.creds.mongoose_auth);
const Schema = mongoose.Schema;

server.use(restify.bodyParser());
server.use(restify.jsonBodyParser({ mapParams: true }));
server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser({ mapParams: true }));
server.use(restify.fullResponse());

server.listen(process.env.PORT || 5000, () => {
  console.log('running');
});

mongoose.Promise = global.Promise;

const ArtistSchema = new Schema({
  id: mongoose.Schema.ObjectId,
  name: String,
  genres: Array,
  albums: Array
});

const GenreSchema = new Schema({
  id: mongoose.Schema.ObjectId,
  name: String
});

const AlbumSchema = new Schema({
  id: mongoose.Schema.ObjectId,
  name: String,
  imageUrl: String
});

const Artist = mongoose.model('Artist', ArtistSchema); 

server.get('/artists', (req, res, next) => {
	Artist.find().then( sendResponseAndNext(res, next) );
});

server.post('/artist', ({ params }, res, next) => {

	const newArtist = new Artist();
	newArtist.name = params.name;
	newArtist.genres = params.genres;
	newArtist.albums = params.albums;

	newArtist.save().then( sendEmptyResponseAndNext(res, next) );
});

server.get('/artist/:id', ({ params }, res, next) => {
	Artist.findById(params.id).then( sendResponseAndNext(res, next) );
});

server.put('/artist/:id', ({ params, body }, res, next) => {
	Artist.findById(params.id).then( artist => {
		artist.name = body.name;
		artist.genres = body.genres;
		artist.albums = body.albums;

		artist.save().then( sendEmptyResponseAndNext(res, next) );
	});
});

server.del('/artist/:id', ({ params }, res, next) => {
	Artist.findByIdAndRemove(params.id).then( sendEmptyResponseAndNext(res, next) );
});


const Genre = mongoose.model('Genre', GenreSchema); 

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



const Album = mongoose.model('Album', AlbumSchema); 

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
	
	const fileStoreUrl = 'https://www.filestackapi.com/api/store/S3?key='+config.creds.filestack_api_key+'container='+config.filestack.albums_container;

	r.postRequest(fileStoreUrl, {fileUpload: files.image, container: })
	.then(console.log);

	//  ( { url } ) => saveAlbum(params.name)(url) )
	// .then( sendEmptyResponseAndNext(res, next) );
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
// 		