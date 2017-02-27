var request = require('request-promise');
var _ = require('lodash');

module.exports.postRequest = (uri, params, convertResponseToJson = true) => {

	var options = {
		method: 'POST',
		uri: uri,
		json: convertResponseToJson,
		body: params 
	};
	return request(options);	
}