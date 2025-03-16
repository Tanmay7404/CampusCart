import express from "express";
import usersService from "../services/users.service";
import debug from "debug";
import { CognitoUserSession } from "amazon-cognito-identity-js";
import { googleIdentityUserPoolLogin } from "../../GoogleServices/googleIdentityPoolServices";
import {
  registerUser,
  resendOTP,
  verifyOTP,
  logInUser,
  verifyToken,
  renewToken,
  resetPassword,
  changePassword,
  confirmPassword,
} from "../../CognitoServices/cognitoUserPool";
import {
  getGoogleTokens,
  fetchGoogleProfile,
  createGoogleUrl,
} from "../../GoogleServices/googleIdentityPoolServices";
import {
  getOutlookTokens,
  fetchOutlookProfile,
  createOutlookUrl,
  outlookIdentityUserPoolLogin,
} from "../../OutlookServices/outlookIdentityPoolServices";
const log: debug.IDebugger = debug("app:users-controller");

let userFullName: string;
let userEmail: string;
class UsersController {
  async createUser(req: express.Request, res: express.Response) {
    const { fullname, email, password } = req.body;
    userFullName = fullname;
    userEmail = email;
    let user = {
      fullname,
      email,
    };
    try {
      await registerUser(email, password, fullname);
      res.json({ success: true, userInfo: user });
    } catch (err: any) {
      log(err);
      res.json({ success: false, message: `${err.code}` });
    }
  }
  async listUsers(req: express.Request, res: express.Response) {
    const users = await usersService.list(100, 0);
    res.status(200).send(users);
  }

  async getUserById(req: express.Request, res: express.Response) {
    const user = await usersService.readById(req.body.id);
    res.status(200).send(user);
  }
  async updateUserById(req: express.Request, res: express.Response) {
    const { userId } = req.body;
    const updateUserParameter = req.body;
    const updatedUser = await usersService.patchById(
      userId,
      updateUserParameter
    );
    res.status(200).send(updatedUser);
  }
  async deleteUserById(req: express.Request, res: express.Response) {
    const { userId } = req.body;
    await usersService.deleteById(userId);
    res.status(204).send();
  }
  async verifyCode(req: express.Request, res: express.Response) {
    const { email, otp } = req.body;
    try {
      await verifyOTP(email, otp);
      await usersService.create({
        fullName: userFullName,
        email: userEmail,
        permissionFlags: 0,
      });
      res.json({ success: true, message: "OTP Verified Successfully" });
    } catch (err: any) {
      log(err);
      res.json({ success: false, message: `${err.code}` });
    }
  }
  async resendCode(req: express.Request, res: express.Response) {
    const { email } = req.body;
    try {
      await resendOTP(email);
      res.json({ success: true, message: "OTP Sent Successfully" });
    } catch (err: any) {
      log(err);
      res.json({ success: false, message: `${err.code}` });
    }
  }
  async signIn(req: express.Request, res: express.Response) {
    const { email, password } = req.body;
    const user = await usersService.getUserByEmail(email);
    try {
      const result = await logInUser(email, password);
      if (result instanceof CognitoUserSession && user) {
        res.json({
          success: true,
          access_token: result.getAccessToken().getJwtToken(),
          id_token: result.getIdToken().getJwtToken(),
          refresh_token: result.getRefreshToken().getToken(),
          user_id: user.id,
        });
      } else {
        res.json({ success: false, message: `There was something wrong` });
      }
    } catch (err: any) {
      console.log(err);
      res.json({ success: false, message: `${err.code}` });
    }
  }
  async verifySession(req: express.Request, res: express.Response) {
    const bearerHeader = req.headers["authorization"];
    if (bearerHeader) {
      const bearer = bearerHeader.split(" ");
      const bearerToken = bearer[1];

      try {
        const data = await verifyToken(bearerToken.replace(/['"]+/g, ""));
        console.log(data);
        res.json({ success: true });
      } catch (err: any) {
        console.log(err);
        res.json({ success: false, errorMessage: err.message });
      }
    } else {
      console.log("Empty Authorization Header");
    }
  }
  async renewSession(req: express.Request, res: express.Response) {
    const bearerHeader = req.headers["authorization"];
    if (bearerHeader) {
      const bearer = bearerHeader.split(" ");
      const bearerToken = bearer[1];

      try {
        const data = await renewToken(bearerToken.replace(/['"]+/g, ""));
        res.json({ success: true, data });
      } catch (err: any) {
        console.log(err);
        res.json({ success: false, errorMessage: err.message });
      }
    } else {
      console.log("Empty Authorization Header");
    }
  }
  async forgetPassword(req: express.Request, res: express.Response) {
    const { email } = req.body;
    try {
      await resetPassword(email);
      res.json({
        success: true,
        message: "Password Reset Code Sent Successfully",
      });
    } catch (err: any) {
      console.log(err);
      res.json({ success: false, message: `${err.code}` });
    }
  }
  async confirmPassword(req: express.Request, res: express.Response) {
    const { email, otp, newPassword } = req.body;
    try {
      await confirmPassword(email, otp, newPassword);
      res.json({ success: true, message: "Password Changed Successfully" });
    } catch (err: any) {
      console.log(err);
      res.json({ success: false, message: `${err.code}` });
    }
  }
  async changePassword(req: express.Request, res: express.Response) {
    const { email, oldPassword, newPassword } = req.body;
    try {
      await changePassword(email, oldPassword, newPassword);
      res.json({ success: true, message: "Password Changed Successfully" });
    } catch (err: any) {
      console.log(err);
      res.json({ success: false, message: `${err.code}` });
    }
  }
  async googleLogin(req: express.Request, res: express.Response) {
    const authorizationUrl = createGoogleUrl();
    res.redirect(authorizationUrl);
  }
  async googleCallback(req: express.Request, res: express.Response) {
    const tokens = await getGoogleTokens(req.query.code as string);
    const profile = await fetchGoogleProfile(tokens.access_token as string);
    const result = await googleIdentityUserPoolLogin(
      profile.email as string,
      profile.id as string
    );
    let userExists = await usersService.getUserByEmail(profile.email);
    log("User already exists", userExists);
    if (!userExists) {
      userExists = await usersService.create({
        fullName: profile.name,
        email: profile.email,
        permissionFlags: 0,
      });
    }
    res.redirect(
      "campuscart://Home?access_token=" +
        result?.getAccessToken().getJwtToken() +
        "&id_token=" +
        result?.getIdToken().getJwtToken() +
        "&refresh_token=" +
        result?.getRefreshToken().getToken() +
        "&user_id=" +
        userExists?.id +
        "&success=true"
    );
  }
  async outlookLogin(req: express.Request, res: express.Response) {
    const authorizationUrl = createOutlookUrl();
    res.redirect(authorizationUrl);
  }
  async outlookCallback(req: express.Request, res: express.Response) {
    const tokens = await getOutlookTokens(req.query.code as string);
    const profile = await fetchOutlookProfile(tokens.access_token as string);
    const result = await outlookIdentityUserPoolLogin(
      profile.userPrincipalName as string,
      profile.id as string
    );
    let userExists = await usersService.getUserByEmail(profile.mail);
    log("User already exists", userExists);
    if (!userExists) {
      userExists = await usersService.create({
        fullName: profile.displayName,
        email: profile.mail,
        permissionFlags: 0,
      });
    }
    res.redirect(
      "campuscart://Home?access_token=" +
        result?.getAccessToken().getJwtToken() +
        "&id_token=" +
        result?.getIdToken().getJwtToken() +
        "&refresh_token=" +
        result?.getRefreshToken().getToken() +
        "&user_id=" +
        userExists?.id +
        "&success=true"
    );
  }
  // async patch(req: express.Request, res: express.Response) {
  // 	if (req.body.password) {
  // 		req.body.password = await argon2.hash(req.body.password);
  // 	}
  // 	log(await usersService.patchById(req.body.id, req.body));
  // 	res.status(204).send();
  // }

  // async put(req: express.Request, res: express.Response) {
  // 	req.body.password = await argon2.hash(req.body.password);
  // 	log(await usersService.putById(req.body.id, req.body));
  // 	res.status(204).send();
  // }

  // async removeUser(req: express.Request, res: express.Response) {
  // 	log(await usersService.deleteById(req.body.id));
  // 	res.status(204).send();
  // }
  // async updatePermissionFlags(req: express.Request, res: express.Response) {
  // 	const patchUserDto: PatchUserDto = {
  // 		permissionFlags: parseInt(req.params.permissionFlags),
  // 	};
  // 	log(await usersService.patchById(req.body.id, patchUserDto));
  // 	res.status(204).send();
  // }
}
// we export the instantiated class
export default new UsersController();
