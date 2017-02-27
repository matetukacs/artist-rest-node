const _ = require('lodash');

module.exports.sendResponseAndNext = (res, next) => _.flow(sendResponse(res), next);

const sendResponse = (res) => {
	return (data = "") => res.send(data);
}

module.exports.sendEmptyResponseAndNext = (res, next) => _.flow(sendEmptyResponse(res), next);

const sendEmptyResponse = (res) => {
	return () => res.send();
}	
