'use strict';

class RequestHandler {
	constructor(req, res) {
		this.request  = req;
		this.response = res;
		this.sendResponse();
	}	

	sendResponse() {
		this.response.send('test');
	}


}

module.exports = RequestHandler;