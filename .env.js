'use strict',

module.exports = {

// Confidential (TOP SECRET)
//_____________________________________________________________________________________
	
	// AWS Account ID. 1. Login to AWS console 2. Goto Support 3. Account number in upper right hand corner
	AWS_ACCOUNT_ID : '',

	// The AWS Confidential User Access key ID
	USER_ACCESS_KEY_ID : '',

	// TOP SECRET AWS Access Key
	SECRET_USER_ACCESS_KEY : '',

//-------------------------------------------------------------------------------------

// Less Sensitive AWS Config
//_____________________________________________________________________________________
	
	// AWS Region: http://docs.aws.amazon.com/general/latest/gr/rande.html
	AWS_REGION : '',

	// Define all of your Identity pools here
	IDENTITY_POOLS : {

		test: '',
		stage: '',
		prduction: '',
		etc: '',
	},

	IAM_ROLES : {

		test_identity_pool: '',
		stage_identity_pool: '',
	},

//-------------------------------------------------------------------------------------

// Server Variables
//_____________________________________________________________________________________
		
	// Determines Whether or not an Express web server will be started
	WEB_SERVER : true,

	// The Port to run off of
	SERVER_PORT : 9000,

//-------------------------------------------------------------------------------------

};
