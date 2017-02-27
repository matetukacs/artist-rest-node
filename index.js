const restify = require('restify'); 
const mongoose = require('mongoose');
const config = require('./config');

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

server.get('/artists', (a, res, next) => {
	Artist.find().then( data => res.send(data) );
});

server.post('/artist', ({ params }, res, next) => {

	const newArtist = new Artist();
	newArtist.name = params.name;
	newArtist.genres = params.genres;
	newArtist.albums = params.albums;

	newArtist.save().then( data => res.send(data) );
});

server.get('/artist/:id', ({ params }, res, next) => {
	Artist.findById(params.id).then( data => res.send(data) );
});

server.put('/artist/:id', ({ params, body }, res, next) => {
	Artist.findById(params.id).then( artist => {
		artist.name = body.name;
		artist.genres = body.genres;
		artist.albums = body.albums;

		artist.save().then( () => res.send() );
	});
});

server.del('/artist/:id', ({ params }, res, next) => {
	Artist.findByIdAndRemove(params.id).then( data => res.send(data) );
});


const Genre = mongoose.model('Genre', GenreSchema); 

server.get('/genres', (a, res, next) => {
	Genre.find().then( data => res.send(data) );
});

server.post('/genre', ({ params }, res, next) => {

	const newGenre = new Genre();
	newGenre.name = params.name;

	newGenre.save().then( data => res.send(data) );
});

server.get('/genre/:id', ({ params }, res, next) => {
	Genre.findById(params.id).then( data => res.send(data) );
});

server.put('/genre/:id', ({ params, body }, res, next) => {
	Genre.findById(params.id).then( genre => {
		genre.name = body.name;

		genre.save().then( () => res.send() );
	});
});

server.del('/genre/:id', ({ params }, res, next) => {
	Genre.findByIdAndRemove(params.id).then( data => res.send(data) );
});



const Album = mongoose.model('Album', AlbumSchema); 

server.get('/albums', (a, res, next) => {
	Album.find().then( data => res.send(data) );
});

server.post('/album', ({ params }, res, next) => {

	const newAlbum = new Genre();
	newAlbum.name = params.name;
	newAlbum.imageUrl = params.imageUrl;

	newAlbum.save().then( data => res.send(data) );
});

server.get('/album/:id', ({ params }, res, next) => {
	Album.findById(params.id).then( data => res.send(data) );
});

server.put('/album/:id', ({ params, body }, res, next) => {
	Album.findById(params.id).then( album => {
		album.name = body.name;
		album.imageUrl = body.imageUrl;

		album.save().then( () => res.send() );
	});
});

server.del('/album/:id', ({ params }, res, next) => {
	Album.findByIdAndRemove(params.id).then( data => res.send(data) );
});
// 		