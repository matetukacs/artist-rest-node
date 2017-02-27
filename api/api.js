const _ = require('lodash');

module.exports.sendResponseAndNext = (res, next) => _.flow(sendResponse(res), next, Promise.resolve);

const sendResponse = (res) => {
	return (data = "") => res.send(data);
}

module.exports.sendEmptyResponseAndNext = (res, next) => _.flow(sendEmptyResponse(res), next, Promise.resolve);

const sendEmptyResponse = (res) => {
	return () => res.send();
}	
