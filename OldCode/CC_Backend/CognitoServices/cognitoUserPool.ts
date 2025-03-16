import AWS from "aws-sdk";
AWS.config.update({
	region: process.env.AWS_REGION,
	accessKeyId: process.env.AWS_ACCESS_KEY_ID,
	secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});
import {
	CognitoUserPool,
	CognitoUser,
	AuthenticationDetails,
	CognitoUserSession,
	CognitoRefreshToken,
	ICognitoUserPoolData,
} from "amazon-cognito-identity-js";
import { CognitoUserAttribute } from "amazon-cognito-identity-js";
import request from "request";
import jwkToPem from "jwk-to-pem";
import env from "dotenv";
env.config();
import jwt from "jsonwebtoken";
import debug from "debug";
import {
	AdminCreateUserRequest,
	AdminSetUserPasswordRequest,
	InitiateAuthRequest,
} from "aws-sdk/clients/cognitoidentityserviceprovider";
const log: debug.IDebugger = debug("app:cognitoUserPool");
const poolData: ICognitoUserPoolData = {
	UserPoolId: process.env.USER_POOL_ID as string, // Your user pool id here
	ClientId: process.env.CLIENT_ID as string, // Your client id here
};
const userPool = new CognitoUserPool(poolData);
const pool_region = process.env.AWS_REGION;

//for creating new user in user pool
export const registerUser = (email: string, password: string, userName: string) => {
	return new Promise((resolve, reject) => {
		var attributeList = [];
		attributeList.push(new CognitoUserAttribute({ Name: "email", Value: email }));
		userPool.signUp(email, password, attributeList, [], function (err, result) {
			if (err) {
				log(err);
				return reject(err);
			} else {
				resolve(result);
			}
		});
	});
};

//for verifying the otp sent to the user
export const verifyOTP = (email: string, otp: string) => {
	log(email, otp);
	return new Promise((resolve, reject) => {
		const userData = {
			Username: email,
			Pool: userPool,
		};
		const cognitoUser = new CognitoUser(userData);
		cognitoUser.confirmRegistration(otp, true, (err, result) => {
			if (err) {
				return reject(err);
			} else {
				resolve(result);
			}
		});
	});
};
//for resending the otp
export const resendOTP = (email: string) => {
	return new Promise((resolve, reject) => {
		const userData = {
			Username: email,
			Pool: userPool,
		};
		const cognitoUser = new CognitoUser(userData);
		cognitoUser.resendConfirmationCode((err, result) => {
			if (err) {
				return reject(err);
			} else {
				log(result);
				resolve(result);
			}
		});
	});
};

//For logging in the user. It Will return all the tokens and user details.
export const logInUser = (email: string, password: string) => {
	return new Promise((resolve, reject) => {
		var authenticationDetails = new AuthenticationDetails({
			Username: email,
			Password: password,
		});
		const userData = {
			Username: email,
			Pool: userPool,
		};
		var cognitoUser = new CognitoUser(userData);
		cognitoUser.authenticateUser(authenticationDetails, {
			onSuccess: function (result) {
				resolve(result);
			},
			onFailure: function (err) {
				return reject(err);
			},
		});
	});
};

interface pems {
	[key: string]: string;
}
//for verifying the jwt token
export const verifyToken = async (token: string) => {
	return new Promise((resolve, reject) => {
		// console.log(token);
		// if (token === undefined) {
		//   const error = new Error("TOKEN_MISSING");
		//   error.code = 401;
		//   reject(error);
		//   return;
		// }
		request(
			{
				url: `https://cognito-idp.${pool_region}.amazonaws.com/${poolData.UserPoolId}/.well-known/jwks.json`,
				json: true,
			},
			function (error, response, body) {
				if (!error && response.statusCode === 200) {
					let pems: pems = {};
					var keys = body["keys"];
					for (var i = 0; i < keys.length; i++) {
						//Convert each key to PEM
						var key_id: string = keys[i].kid;
						var modulus = keys[i].n;
						var exponent = keys[i].e;
						var key_type = keys[i].kty;
						var jwk = { kty: key_type, n: modulus, e: exponent };
						var pem = jwkToPem(jwk);
						pems[key_id] = pem;
					}
					//validate the token
					var decodedJwt = jwt.decode(token, { complete: true });
					if (decodedJwt === null) {
						return reject(new Error("JWT_TOKEN_INVALID"));
						//not a jwt token
					}
					// console.log(decodedJwt)
					var kid = decodedJwt.header.kid;
					let pem2 = pems[`${kid}`];
					if (pem2 === null) {
						return reject(new Error("INVALID_TOKEN"));
						//jwt token recived is invalid
					}

					jwt.verify(token, pem2, { algorithms: ["RS256"] }, function (err, payload) {
						if (err) {
							return reject(new Error("JWT_EXPIRED"));
							//jwt token got expired
						} else {
							resolve(payload);
						}
					});
				} else {
					return reject(new Error("JWT_DOWNLOAD_FAILED"));
					//unable to donwload jwt public json file
				}
			}
		);
	});
};
//for renewing the token
export const renewToken = async (token: string) => {
	return new Promise((resolve, reject) => {
		const RefreshToken = new CognitoRefreshToken({ RefreshToken: token });
		const userData = {
			Username: "",
			Pool: userPool,
		};
		const cognitoUser = new CognitoUser(userData);
		cognitoUser.refreshSession(RefreshToken, (err, session) => {
			if (err) {
				return reject(err);
			} else {
				let retObj = {
					access_token: session.accessToken.jwtToken,
					id_token: session.idToken.jwtToken,
					refresh_token: session.refreshToken.token,
					//refresh token will remain as it is
				};
				resolve(retObj);
			}
		});
	});
};
//for resetting password
export const resetPassword = async (email: string) => {
	return new Promise((resolve, reject) => {
		const userData = {
			Username: email,
			Pool: userPool,
		};
		const cognitoUser = new CognitoUser(userData);
		cognitoUser.forgotPassword({
			onSuccess: function (result) {
				resolve(result);
			},
			onFailure: function (err) {
				return reject(err);
			},
		});
	});
};
//for confirming the new password
export const confirmPassword = async (email: string, otp: string, newPassword: string) => {
	return new Promise((resolve, reject) => {
		const userData = {
			Username: email,
			Pool: userPool,
		};
		const cognitoUser = new CognitoUser(userData);
		cognitoUser.confirmPassword(otp, newPassword, {
			onSuccess: function (result) {
				resolve(result);
			},
			onFailure: function (err) {
				return reject(err);
			},
		});
	});
};
//for changing the password
export const changePassword = async (email: string, oldPassword: string, newPassword: string) => {
	return new Promise((resolve, reject) => {
	  const userData = {
		Username: email,
		Pool: userPool,
	  };
	  const cognitoUser = new CognitoUser(userData);
  
	  // Authenticate the user using current credentials
	  const authenticationDetails = new AuthenticationDetails({
		Username: email,
		Password: oldPassword,
	  });
  
	  cognitoUser.authenticateUser(authenticationDetails, {
		onSuccess: (session) => {
		  // Authentication successful, change password
		  cognitoUser.changePassword(oldPassword, newPassword, (err, result) => {
			if (err) {
			  reject(err);
			} else {
			  resolve(result);
			}
		  });
		},
		onFailure: (err) => {
		  reject(err);
		},
	  });
	});
  };
export const createUserInUserPoolVerified = async (email: string, password: string) => {
	const clientId = process.env.CLIENT_ID as string;
	const userPoolId = process.env.USER_POOL_ID as string;
	const region = process.env.AWS_REGION as string;
	AWS.config.update({ region });
	const cognitoIdentityServiceProvider = new AWS.CognitoIdentityServiceProvider();
	let userExists = false;
	log(email, password)
	try {
		const params: AWS.CognitoIdentityServiceProvider.AdminGetUserRequest = {
			UserPoolId: userPoolId,
			Username: email,
		};
		const response = await cognitoIdentityServiceProvider.adminGetUser(params).promise();
		log("User exists:", response);
		if (response.UserStatus === "CONFIRMED") {
			userExists = true;
		}
		const tokens = await logInUser(email, password);
		if (tokens instanceof CognitoUserSession) {
			return tokens;
		}
	} catch (error) {
		log(error);
	}
	if (!userExists) {
		const params: AdminCreateUserRequest = {
			UserPoolId: userPoolId,
			Username: email,
			UserAttributes: [
				{ Name: "email", Value: email },
				{ Name: "email_verified", Value: "true" },
			],
			MessageAction: "SUPPRESS",
		};

		try {
			await cognitoIdentityServiceProvider.adminCreateUser(params).promise();
			const Authparams: AdminSetUserPasswordRequest = {
				UserPoolId: userPoolId,
				Username: email, // Replace with the username or email of the user
				Password: password, // Replace with the new password for the user
				Permanent: true, // Set to true if the password change should be permanent, or false to require a password reset on next login
			};
			const response = await cognitoIdentityServiceProvider
				.adminSetUserPassword(Authparams)
				.promise();
			log("User password changed successfully", response);
		} catch (error) {
			log("Error creating user", error);
		}
	}
};
