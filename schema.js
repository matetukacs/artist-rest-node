const { Schema } = require('mongoose');

module.exports.Artist = new Schema({
  id: Schema.ObjectId,
  name: String,
  genres: Array,
  albums: Array
});

module.exports.Genre = new Schema({
  id: Schema.ObjectId,
  name: String
});

module.exports.Album = new Schema({
  id: Schema.ObjectId,
  name: String,
  imageUrl: String
});