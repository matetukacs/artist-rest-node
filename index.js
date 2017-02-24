const restify = require('restify');  
const server = restify.createServer();
const mongoose = require('mongoose/');
const config = require('./config');
const db = mongoose.connect(config.creds.mongoose_auth);
const Schema = mongoose.Schema;

server.use(restify.bodyParser());

var ArtistSchema = new Schema({
  id: ObjectId,
  name: String,
  genres: Array,
  albums: Array
});

const Artist = mongoose.model('Artist', ArtistSchema); 

var newArtist = new Artist({ 
	id: "adadas",
  	name: "John Lenon",
  	genres: [g1, g2, g3],
  	albums: [a1, a2, a3] });

var ArtistCollection = Backbone.Collection.extend({
    model: Artist
    , url: '/artists'
});

app.get('/a/', (req, res) => {
	res.sendStatus(200);
});