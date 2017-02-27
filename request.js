var request = require('request-promise');
var _ = require('lodash');

const fbMessageRestEndpoint = 'https://graph.facebook.com/v2.6/me/messages';

module.exports.getRequest = (uri, convertResponseToJson = true) => {

	var options = {
		method: 'GET',
		uri: uri,
		json: convertResponseToJson 
	};
	return request(options);	
}

const postRequest = (uri, params, convertResponseToJson = true) => {

	var options = {
		method: 'POST',
		uri: uri,
		json: convertResponseToJson,
		body: params 
	};
	return request(options);	
}
module.exports.postRequest = postRequest;
