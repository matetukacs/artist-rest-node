const sendResponseAndNext = (res, next) => _.flow(sendResponse(res), next);

const sendResponse = (res) => {
	return (data = "") => res.send(data);
}

const sendEmptyResponseAndNext = (res, next) => _.flow(sendEmptyResponse(res), next);

const sendEmptyResponse = (res) => {
	return () => res.send();
}	