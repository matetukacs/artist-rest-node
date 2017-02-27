const _ = require('lodash');

module.exports.sendResponseAndNext = (res, next) => _.flow(sendResponse(res), next);

module.exports.sendResponse = (res) => {
	return (data = "") => res.send(data);
}

module.exports.sendEmptyResponseAndNext = (res, next) => _.flow(sendEmptyResponse(res), next);

module.exports.sendEmptyResponse = (res) => {
	return () => res.send();
}	
}