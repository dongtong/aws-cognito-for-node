'use strict';

const AWS = require('aws-sdk');

class AWSWrapper {
	constructor(AWS_CONFIG){
		AWS.config.update(AWS_CONFIG);
	}

	// setCredentials (options) {

	// 	const IDENTITY_POOL_ID = options.IDENTITY_POOL_ID;

	// 	AWS.config.credentials = new AWS.CognitoIdentity({
	// 		IdentityPoolId: IDENTITY_POOL_ID,
	//    		IdentityId: 'test1234567890',
	//    		Logins: {
	// 			'cognito-identity.amazonaws.com': 'zdravo_serbia'
	// 		}
	// 	});
	// }

}

module.exports = AWSWrapper;