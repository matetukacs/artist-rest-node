const restify = require('restify'); 
const mongoose = require('mongoose');
const config = require('./config');

const artistApi = require('./api/artist');
const genreApi = require('./api/genre');
const albumApi = require('./api/album');

mongoose.connect(config.mongoose.auth);
mongoose.Promise = global.Promise;

const server = restify.createServer({});

server.use(restify.bodyParser());
server.use(restify.jsonBodyParser({ mapParams: true }));
server.use(restify.fullResponse());

server.listen(process.env.PORT || 5000, () => {
  console.log('running');
});

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



server.get('/artistInfo/:id', artistApi.getArtistInfo);
