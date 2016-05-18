'use strict';

/* MARK: Setup */
//____________________________________________________________________________

	
// Modules

	// Config
	const config = require('./.env');

	// Express
	const express = require('express');
	
	// AWS Stuff for test purposes
	const Cognito = require('./src/Cognito');
	
	// Custom Server
	const RequestHandler = require('./src/RequestHandler');

// Config
	
	// To run independantly of another project
	const WEB_SERVER = config.WEB_SERVER;

	// Port The Server will listen on:
	const APP_PORT   = config.SERVER_PORT;

	// AWS SDK Config
	const AWS_CONFIG = {
		region           : config.AWS_REGION,
		accessKeyId      : config.USER_ACCESS_KEY_ID,
		secretAccessKey  : config.SECRET_USER_ACCESS_KEY,
	};	

//----------------------------------------------------------------------------


if (WEB_SERVER) {

	// Initialization
	const app = express();

	// Helper Functions

	/**
	*  Just in case more logic might need to be added later
	*	@param Request
	*	@param Response
	*	@return void
	*/
	function handleRequest(req, res) {
		const handler = new RequestHandler(req, res)
	}

	/* MARK: Routes */
	//____________________________________________________________________________

		app.get('/test', (req, res) => {

			// ex: "arn:aws:iam::<ACCOUNT_ID>:role/test_unauth_MOBILEHUB_1234567890"
			const IAM_ROLE_ARN = '';

			// ex: "TEST"
			const COGNITO_DATASET_NAME = '';

			// ex: us-east-1:eaa4th05-3cbb-aet8-td2l-cajjvt024s7b
			const COGNITO_IDENTITY_POOL_ID = '';

			// ex: foo.company.myapp
			const DEVELOPER_PROVIDER_NAME = '';

			const options = {
				AWS_CONFIG                : AWS_CONFIG               || null,
				IAM_ROLE_ARN              : IAM_ROLE_ARN             || null,
				AWS_ACCOUNT_ID            : config.AWS_ACCOUNT_ID    || null,
				COGNITO_DATASET_NAME      : COGNITO_DATASET_NAME     || null,
				DEVELOPER_PROVIDER_NAME   : DEVELOPER_PROVIDER_NAME  || null,
				COGNITO_IDENTITY_POOL_ID  : COGNITO_IDENTITY_POOL_ID || null,
			};
			const handler = new Cognito(options);
			handler.setDeveloperProviderName('Kade');
			res.send(handler.testWorkFlow());
		});

	//----------------------------------------------------------------------------


	app.listen(APP_PORT, function () {
	  console.log('Example app listening on port' + APP_PORT + '!');
	});
}
