'use strict';

// Modules
//____________________________________________________________________

	// The Amazon Web Services Library
	const AWS                 = require('aws-sdk');
	const AWSWrapper          = require('./AWSWrapper');

//--------------------------------------------------------------------


class Cognito extends AWSWrapper {
	constructor(config) {

		if (!config || !config.AWS_CONFIG) {
			console.log('Please Specify Amazon Web Services Config');
			return;
		}
		super(config.AWS_CONFIG);

		// TODO: When AWS Allows for Object Deconstruction
		this.AWS_CONFIG                = config.AWS_CONFIG               || null;
		this.IAM_ROLE_ARN              = config.IAM_ROLE_ARN             || null;
		this.AWS_ACCOUNT_ID            = config.AWS_ACCOUNT_ID           || null;
		this.COGNITO_DATASET_NAME      = config.COGNITO_DATASET_NAME     || null;
		this.DEVELOPER_PROVIDER_NAME   = config.DEVELOPER_PROVIDER_NAME  || null;
		this.COGNITO_IDENTITY_POOL_ID  = config.COGNITO_IDENTITY_POOL_ID || null;
		
		this.Cognito_Identity = new AWS.CognitoIdentity();
	}

	setDeveloperProviderName(DEVELOPER_PROVIDER_NAME) {
		this.DEVELOPER_PROVIDER_NAME = (DEVELOPER_PROVIDER_NAME && typeof DEVELOPER_PROVIDER_NAME === 'string') DEVELOPER_PROVIDER_NAME;
	}

	getDeveloperIdentityToken() {
		// Since we are using a developer Provider, we need to get tokens
		const Cognito_Identity = this.Cognito_Identity;
		const self = this;
		let Logins = {};
		Logins[self.DEVELOPER_PROVIDER_NAME] = "test_developer_user_id";
		//console.log(AWS);


		return new Promise((resolve, reject) => {
			if (!self.DEVELOPER_PROVIDER_NAME || typeof self.DEVELOPER_PROVIDER_NAME !== 'string') reject(self.throwError(1));
			Cognito_Identity.getOpenIdTokenForDeveloperIdentity({
		    IdentityPoolId: COGNITO_IDENTITY_POOL_ID,
		    Logins: Logins,
		    TokenDuration: 10
			}, (err, data) => {
				if (!err) resolve(data);
				reject(err);
			});
		});
	}

	getUserCredentials(developerIdentity) {
		const identityId = developerIdentity.IdentityId;
		const userToken = developerIdentity.Token;

		var params = {
		    AccountId: AWS_ACCOUNT_ID,
		    RoleArn: IAM_ROLE_ARN,
		    IdentityId: identityId,
		    IdentityPoolId: COGNITO_IDENTITY_POOL_ID,
		    Logins: {
		        'cognito-identity.amazonaws.com': userToken
		    }
		};
     
		//Initialize the Credentials object
		AWS.config.credentials = new AWS.CognitoIdentityCredentials(params);

		params = {
		  IdentityId: identityId, /* required */
		  Logins: {
		    'cognito-identity.amazonaws.com': userToken,
		  }
		};	

		const Something = new AWS.CognitoIdentity();

		return new Promise((resolve, reject) => {
			Something.getCredentialsForIdentity(params, (err, data) => {
				if(err) reject(err);
				if(data) resolve(data);
				reject('Something went Wrong');
			});
		});
	}

	getDataRecords(userCrendials) {
		// TODO: When AWS allows for Object Deconstruction...
		const identityId    = userCrendials.IdentityId;
		const secretToken   = userCrendials.Credentials.SecretKey;
		const accessKeyId   = userCrendials.Credentials.AccessKeyId;
		const sessionToken  = userCrendials.Credentials.SessionToken;

		const options = {
			identityId:      identityId,
			accessKeyId:     accessKeyId,
			sessionToken:    sessionToken,
			secretAccessKey: secretToken,
		};

		const params = {
			IdentityId: identityId,                   /* required */
			DatasetName: COGNITO_DATASET_NAME,        /* required */
			IdentityPoolId: COGNITO_IDENTITY_POOL_ID, /* required */
		};

		// Other AWS SDKs will automatically use the Cognito Credentials provider
		// configured in the JavaScript SDK.
		const cognitosync = new AWS.CognitoSync(options);
		cognitosync.listRecords(params, function(err, data) {
		    if ( !err ) {
		        console.log(data);
		    }else{
		    	console.log(err);
		    }
		});

		return;
	}


	testWorkFlow() {

		this.getDeveloperIdentityToken()
		.then(this.getUserCredentials)
		.then(this.getDataRecords)
		.catch((err) => {
			console.log(err);
		});

		return;
	}

	throwError(code) {
		const err = (code && typeof code === 'number') ? code : 0;

		switch (err) {
			case 1 : 
				return 'Please set a valid Developer Provider Name: setDeveloperProviderName(DEVELOPER_PROVIDER_NAME)';
			break;
			default:
				return 'Cryptic Error Message: 01001111 01101111 01101111 00100000 01010011 01101000 01101001 01110100 00100000 01001010 01101001 01101101 01101101 01100101 01101000 00101100 00100000 01010111 01100101 00100111 01110010 01100101 00100000 01000110 01101111 01101111 01101011 01100101 01100100 00100001';
			break;

		}
	}
}

module.exports = Cognito;
