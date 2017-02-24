const restify = require('restify'); 
const mongoose = require('mongoose');
const backbone = require('backbone');
const config = require('./config');

const server = restify.createServer();
const db = mongoose.connect(config.creds.mongoose_auth);
const Schema = mongoose.Schema;

server.use(restify.bodyParser());

var ArtistSchema = new Schema({
  id: mongoose.Schema.ObjectId,
  name: String,
  genres: Array,
  albums: Array
});

const Artist = mongoose.model('Artist', ArtistSchema); 

var newArtist = new Artist({ 
	id: "adadas",
  	name: "John Lenon",
  	genres: ["g1", "g2", "g3"],
  	albums: ["a1", "a2", "a3"] });

var ArtistCollection = backbone.Collection.extend({
    model: Artist
    , url: '/artists'
});

server.get('/a', (req, res) => {
	res.sendStatus(200);
});