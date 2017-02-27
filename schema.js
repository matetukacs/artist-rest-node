const { Schema } = require('mongoose');

module.export.Artist = new Schema({
  id: Schema.ObjectId,
  name: String,
  genres: Array,
  albums: Array
});

module.export.Genre = new Schema({
  id: Schema.ObjectId,
  name: String
});

module.export.Album = new Schema({
  id: Schema.ObjectId,
  name: String,
  imageUrl: String
});