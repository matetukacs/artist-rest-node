const restify = require('restify'); 
const mongoose = require('mongoose');
const config = require('./config');

const server = restify.createServer({});
const db = mongoose.connect(config.creds.mongoose_auth);
const Schema = mongoose.Schema;

server.use(restify.bodyParser());

server.listen(process.env.PORT || 5000, () => {
  console.log('running');
});

mongoose.Promise = global.Promise;

var ArtistSchema = new Schema({
  id: mongoose.Schema.ObjectId,
  name: String,
  genres: Array,
  albums: Array
});

const Artist = mongoose.model('Artist', ArtistSchema); 

var newArtist = new Artist({ 
  	name: "John Lenon",
  	genres: ["g1", "g2", "g3"],
  	albums: ["a1", "a2", "a3"] });

newArtist.save();

server.use(restify.jsonBodyParser({ mapParams: true }))
server.use(restify.acceptParser(server.acceptable))
server.use(restify.queryParser({ mapParams: true }))
server.use(restify.fullResponse())

server.get('/artist', (a, res, next) => {


	res.send("asd");

	Artist.find().exec().then(console.log);
});

// 		