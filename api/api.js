
module.exports.common = {
	sendResponseAndNext : (res, next) => _.flow(sendResponse(res), next),
	sendResponse : (res) => {
		return (data = "") => res.send(data);
	},
	sendEmptyResponseAndNext : (res, next) => _.flow(sendEmptyResponse(res), next),
	sendEmptyResponse : (res) => {
		return () => res.send();
	}	
}