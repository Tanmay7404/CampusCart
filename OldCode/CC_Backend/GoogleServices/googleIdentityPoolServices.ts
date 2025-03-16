import { google } from "googleapis";
import axios from "axios";
import debug from "debug";
const log: debug.IDebugger = debug("app:googleIdentityPoolServices");
import { createUserInUserPoolVerified } from "../CognitoServices/cognitoUserPool";
const oauth2Client = new google.auth.OAuth2(
	process.env.GOOGLE_CLIENT_ID,
	process.env.GOOGLE_CLIENT_SECRET,
	process.env.GOOGLE_REDIRECT_URI
);
export const createGoogleUrl = () => {
	const scopes = [
		"https://www.googleapis.com/auth/userinfo.profile",
		"https://www.googleapis.com/auth/userinfo.email",
	];
	const authorizationUrl = oauth2Client.generateAuthUrl({
		access_type: "offline",
		scope: scopes,
		include_granted_scopes: true,
		prompt: "consent",
	});
	return authorizationUrl;
};
export const getGoogleTokens = async (code: string) => {
	let { tokens } = await oauth2Client.getToken(code);
	oauth2Client.setCredentials(tokens);
	return tokens;
};
export const fetchGoogleProfile = async (accessToken: string) => {
	const response = await axios.get("https://www.googleapis.com/oauth2/v1/userinfo?alt=json", {
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
	});
	return response.data;
};
export const googleIdentityUserPoolLogin = async (email: string, password: string) => {
	const tokens = await createUserInUserPoolVerified(email, password);
	return tokens;
};
