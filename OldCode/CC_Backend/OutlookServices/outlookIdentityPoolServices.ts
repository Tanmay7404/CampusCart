import axios from "axios";
import debug from "debug";
const log: debug.IDebugger = debug("app:outlookIdentityPoolServices");
import { createUserInUserPoolVerified } from "../CognitoServices/cognitoUserPool";
const outlookClientId = process.env.OUTLOOK_CLIENT_ID;
const outlookClientSecret = process.env.OUTLOOK_CLIENT_SECRET;
const outlookRedirect_uri = process.env.OUTLOOK_REDIRECT_URI;
import qs from "querystring";
export const createOutlookUrl = () => {
	const url = `https://login.microsoftonline.com/850aa78d-94e1-4bc6-9cf3-8c11b530701c/oauth2/v2.0/authorize?client_id=${outlookClientId}&response_type=code&redirect_uri=${outlookRedirect_uri}&response_mode=query&scope=offline_access%20user.read&state=12345`;
	return url;
};
export const getOutlookTokens = async (code: string) => {
	var data = {
		client_secret: outlookClientSecret,
		client_id: outlookClientId,
		redirect_uri: outlookRedirect_uri,
		scope: "user.read",
		grant_type: "authorization_code",
		code: code,
	};
	var config = {
		method: "post",
		url: `https://login.microsoftonline.com/850aa78d-94e1-4bc6-9cf3-8c11b530701c/oauth2/v2.0/token`,
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
			client_secret: outlookClientSecret,
		},
		data: data,
	};
	const response = await axios.post(config.url, config.data, {
		headers: config.headers,
	});
	return response.data;
};

export const fetchOutlookProfile = async (accessToken: string) => {
	const response = await axios.get("https://graph.microsoft.com/v1.0/me", {
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
	});
	return response.data;
};
export const outlookIdentityUserPoolLogin = async (email: string, password: string) => {
	const tokens = await createUserInUserPoolVerified(email, password);
	return tokens;
};
