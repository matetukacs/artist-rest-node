exports.mongoose = {
  auth: 'mongodb://heroku_xjcf432g:5jrl1mbdgpjbsb2cjqnolpn6tf@ds157799.mlab.com:57799/heroku_xjcf432g'
}

const fs_api_key=  'A09oJINhT6GQP9jv7ppXAz';
const fs_store_url = 'https://www.filestackapi.com/api/store/S3';
const fs_album_container = 'album-covers';
const fs_access = 'public';

exports.file_store_request_url = `${fs_store_url}?key=${fs_api_key}&container=${fs_album_container}&access=${fs_access}`;