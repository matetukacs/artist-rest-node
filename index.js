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
assert.equal(query.exec().constructor, global.Promise);

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

server.get('/artists', (a, res, next) => {
	Artist.find()..then( data => res.send(data) );
});

server.get('/artist/:id', ({ params }, res, next) => {
	Artist.findOne({ id: params.id }).then( data => res.send(data) );
});

// 		