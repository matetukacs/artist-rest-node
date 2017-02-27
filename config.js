exports.mongoose = {
  auth: 'mongodb://heroku_xjcf432g:5jrl1mbdgpjbsb2cjqnolpn6tf@ds157799.mlab.com:57799/heroku_xjcf432g',
}

exports.filestack = {
	const api_key=  'A09oJINhT6GQP9jv7ppXAz';
	const store_url = 'https://www.filestackapi.com/api/store/S3';
	const album_container = 'album-covers';
	const access = 'public';

	file_store_url : `${store_url}?key=${api_key}&container=${album_container}&access=${access}`
}